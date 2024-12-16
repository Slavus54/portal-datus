'use client'

import {useEffect, useLayoutEffect, useState, useRef} from 'react'
//@ts-ignore
import {Codus} from 'codus.js'
import Layout from "@/components/Layout";
import Image from "next/image";

import {LOCATION_URL, STORE_LOCATION_KEY, STORE_VISIT_KEY, LINKS, IMPORT_TEXT, STORE_METHODS_USING_KEY, INITIAL_METHODS_TYPES, USING_COLORS, METHOD_TYPES} from '@/env/env'

export default function Home() {
  const codus = new Codus()

  const items = useRef(null)

  const [state, setState] = useState<any>(null)
  const [using, setUsing] = useState<any>(null)

  useEffect(() => {
    const onGetLocationData = async () => {
        let data: any = await fetch(LOCATION_URL)
    
        data = await data.json()
    
        if (!data.error) {
            localStorage.setItem(STORE_LOCATION_KEY, JSON.stringify(data))
        }
    }

    let data: any = localStorage.getItem(STORE_LOCATION_KEY)

    data = JSON.parse(data)

    if (data === null) {
      onGetLocationData()
    } else {
      let visit: any = localStorage.getItem(STORE_VISIT_KEY)

      visit = JSON.parse(visit)

      if (visit !== null) {
        setState({city: data.city, continent: data.continent, country: data.country, visit})
      }      
    }

    const onInitUsingMethods = () => {
        let data = localStorage.getItem(STORE_METHODS_USING_KEY) === null
    
        if (data) {
          
            localStorage.setItem(STORE_METHODS_USING_KEY, JSON.stringify({total: 0, list: new Array(INITIAL_METHODS_TYPES.length).fill(null).map((_, idx) => {
                  return {title: INITIAL_METHODS_TYPES[idx], value: 0}
            })}))
        
          } else {

          let result: any = localStorage.getItem(STORE_METHODS_USING_KEY)

          result = JSON.parse(result)

          setUsing(result)
        }
    }

    onInitUsingMethods()
  }, [])

  useLayoutEffect(() => {
    if (using !== null && items !== null) {
   
      //@ts-ignore
      items.current.childNodes.forEach(el => {
        let num = el.getAttribute('data-value')
        let colors = USING_COLORS.filter(el => num >= el.value)
        let color = colors[colors.length - 1]?.color
       
        el.style.boxShadow = `0px 0px 2px 1.5px ${color}`
      })
    }
  }, [using])

  const onGetUsingItem = (el: any, idx: number) => {
    let num = codus.part(el.value, using.total, 1)

    num = isNaN(num) ? 0 : num
    
    return (
        <div className='using__item' data-value={num}>
          {METHOD_TYPES[idx]}<br />{num}%
        </div>
    )
  }

  const onNavigate = (url: string) => {
    window.open(url)
  }

  return (
    <Layout>
      <h1>Datus.js</h1>

      <p>JavaScript library to handling, parsing, validation and formatting date/time/year/weekday/number.</p>

      <div className="items vertical">
        <h4 className="dot">* Stable Version: <span className="italic">2.0.0</span></h4>
        <h4 className="dot">* Size ~ <span className="italic">200 kB</span> and <span className="italic">5.1K</span> lines of code with described <span className="italic">200/330 methods</span></h4>
      </div>

      <Image src='/js.png' alt='' width={96} height={96} />

      <h3>Links</h3>

      <div className="items small">
        {LINKS.map(el => <img onClick={() => onNavigate(el.url)} src={el.icon} />)}
      </div>

      <h3>Getting Started</h3>

      <p>{IMPORT_TEXT}</p>

      <h3>Using Methods Stats</h3>

      {using !== null &&
        <div className='using' ref={items}>
          {using.list.map((el: any, idx: number) => onGetUsingItem(el, idx))}
        </div>
      }

      {state !== null &&
        <div className='info'>
            Latest visit: {state.visit} <br />
            Geolocation: {state.city}, {state.country} ({state.continent})
        </div>
      }
    </Layout>
  );
}
