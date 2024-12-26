'use client'

import {useEffect, useLayoutEffect, useState, useRef} from 'react'

//@ts-ignore
import {Codus} from 'codus.js'

import Layout from "@/components/Layout";
import Image from "next/image";

import {LOCATION_URL, STORE_LOCATION_KEY, STORE_VISIT_KEY, LINKS, IMPORT_TEXT, STORE_METHODS_USING_KEY, INITIAL_METHODS_TYPES, USING_COLORS, METHOD_TYPES, NOTIFICATION_BORDERS} from '@/env/env'

export default function Home() {
  const codus = new Codus()

  const items = useRef(null)
  const notify = useRef(null)

  const [isNotifyVisible, setIsNotifyVisible] = useState<boolean>(false)

  const [state, setState] = useState<any>(null)
  const [using, setUsing] = useState<any>(null)

  const [emoji, setEmoji] = useState<string>('')

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
          
            localStorage.setItem(STORE_METHODS_USING_KEY, JSON.stringify({calls: 0, lines: 0, list: new Array(INITIAL_METHODS_TYPES.length).fill(null).map((_, idx) => {
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

  useEffect(() => {
    let node: any = notify.current
    let data = localStorage.getItem(STORE_METHODS_USING_KEY)

    if (data && node) {
      data = JSON.parse(data).lines

      node.textContent = `${data} lines of code were saved ${emoji}`
    
      setTimeout(() => {
        node.classList[isNotifyVisible ? 'remove' : 'add']('hidden')
      }, 2e1)
    }
  }, [isNotifyVisible])

  useLayoutEffect(() => {
    if (using !== null && items !== null) {
   
      //@ts-ignore
      items.current.childNodes.forEach(el => {
        let num = el.getAttribute('data-value')
        let colors = USING_COLORS.filter(el => num >= el.value)
        let color = colors[colors.length - 1]?.color
       
        el.style.boxShadow = `0px 0px 2px 1.5px ${color}`
      })

      let result = NOTIFICATION_BORDERS.findLast(el => using.lines >= el.lines)?.emoji

      if (result) {
        setEmoji(result)
      }
    }
  }, [using])

  const onGetUsingItem = (el: any, idx: number) => {
    let num = codus.part(el.value, using.calls, 1)

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

      <p>JavaScript library to handling, parsing, validation and formatting dates & time</p>
      
      <div className="items vertical">
        <h4 className="dot">* Stable Version: <span className="italic">2.0.5</span> ⭐</h4>
        <h4 className="dot">* Size ~ <span className="italic">250 kB</span> and <span className="italic">5.5K</span> lines of code with described <span className="italic">250/350 methods</span> 💎</h4>
      </div>

      <Image src='/js.png' alt='' width={96} height={96} />

      <h3>Links</h3>

      <div className="items small">
        {LINKS.map(el => <img onClick={() => onNavigate(el.url)} src={el.icon} />)}
      </div>

      <h3>Getting Started</h3>

      <p><span className='js-red'>import</span> {IMPORT_TEXT}<span className='js-red'> from</span> <span className='js-lib'>'datus.js'</span></p>
    
      <div className='notification hidden' ref={notify}></div>

      {using !== null &&
        <div onMouseEnter={() => setIsNotifyVisible(true)} onMouseLeave={() => setIsNotifyVisible(false)} className='main'>
            <h3>Stats of {using.calls} using methods</h3>
            <div className='using' ref={items}>
              {using.list.map((el: any, idx: number) => onGetUsingItem(el, idx))}
            </div>
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
