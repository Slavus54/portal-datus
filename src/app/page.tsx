'use client'

import {useEffect, useState} from 'react'
import Layout from "@/components/Layout";
import Image from "next/image";

import {LOCATION_URL, STORE_LOCATION_KEY, STORE_VISIT_KEY, LINKS, IMPORT_TEXT} from '@/env/env'

export default function Home() {

  const [state, setState] = useState<any>(null)

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
        setState({city: data.city, country: data.country, visit})
      }      
    }
  }, [])

  const onNavigate = (url: string) => {
    window.open(url)
  }

  return (
    <Layout>
      <h2>Datus.JS - light and powerful library to work with dates</h2>

      <h2>About</h2>

      <p>JavaScript library to handling, parsing, validation and formatting date or time.</p>

      <div className="items vertical">
        <h3 className="dot">* Stable Version: <span className="italic">1.9.1</span></h3>
        <h3 className="dot">* Size ~ <span className="italic">175 kB</span> and <span className="italic">4.5K</span> lines of code with <span className="italic">275 methods</span></h3>
      </div>

      <Image src='/js.png' alt='' width={96} height={96} />

      <h2>Links</h2>

      <div className="items small">
        {LINKS.map(el => <img onClick={() => onNavigate(el.url)} src={el.icon} className="icon" />)}
      </div>

      <h2>Getting Started</h2>

      <p>{IMPORT_TEXT}</p>

      {state !== null &&
        <div className='info'>
            Visit: {state.visit} <br />
            Location: {state.city}, {state.country}
        </div>
      }
    </Layout>
  );
}
