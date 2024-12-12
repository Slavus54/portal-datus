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
        setState({city: data.city, continent: data.continent, country: data.country, visit})
      }      
    }
  }, [])

  const onNavigate = (url: string) => {
    window.open(url)
  }

  return (
    <Layout>
      <h1>Datus.JS</h1>

      <p>JavaScript library to handling, parsing, validation and formatting date/time/year/weekday/number.</p>

      <div className="items vertical">
        <h4 className="dot">* Stable Version: <span className="italic">2.0.0</span></h4>
        <h4 className="dot">* Size ~ <span className="italic">200 kB</span> and <span className="italic">5.1K</span> lines of code with <span className="italic">135/330 methods</span></h4>
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
            Latest Visit: {state.visit} <br />
            Geolocation: {state.city}, {state.country} ({state.continent})
        </div>
      }
    </Layout>
  );
}
