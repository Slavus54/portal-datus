'use client'
import {useLayoutEffect} from "react";

import Layout from "@/components/Layout";
import Image from "next/image";

import {onGetStorageValue, onInitStatistics, onInitCodeUsing, onGetLocationData} from '@/store/store'
import {STORE_VISIT_KEY, STORE_STATS_KEY, STORE_CODE_KEY, STORE_SESSION_DISTANCE_KEY, STORE_LOCATION_KEY, LINKS, IMPORT_TEXT} from '@/env/env'

export default function Home() {

  const visit = onGetStorageValue(STORE_VISIT_KEY)
  const code = onGetStorageValue(STORE_CODE_KEY) || 0
  const session = onGetStorageValue(STORE_SESSION_DISTANCE_KEY)
  const location = onGetStorageValue(STORE_LOCATION_KEY)

  useLayoutEffect(() => {
    let data = onGetStorageValue(STORE_STATS_KEY)
    let code = onGetStorageValue(STORE_CODE_KEY)
   
    if (data === null) {
      onInitStatistics()
    } 

    if (code === null) {
      onInitCodeUsing()
    }

    if (location === null) {
      onGetLocationData()
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
        <h3 className="dot">* Stable Version: <span className="italic">1.8.7</span></h3>
        <h3 className="dot">* Size ~ <span className="italic">150 kB</span> and <span className="italic">3.9K</span> lines of code with <span className="italic">245 methods</span></h3>
      </div>

      <Image src='/js.png' alt='' width={96} height={96} />

      <h2>Links</h2>

      <div className="items small">
        {LINKS.map(el => <img onClick={() => onNavigate(el.url)} src={el.icon} className="icon" />)}
      </div>

      <h2>Getting Started</h2>

      <p>{IMPORT_TEXT}</p>

      {visit !== null && code !== null && session !== null && location !== null &&
        <div className="info">
          <p className="pale">Latest visit: {visit} from {location.city}, {location.country} ({session})</p>
          <b>You saved {code} lines of code</b>
        </div>
      }
    </Layout>
  );
}
