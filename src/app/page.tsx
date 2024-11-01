'use client'
import Layout from "@/components/Layout";
import Image from "next/image";

import {LINKS, IMPORT_TEXT} from '@/env/env'

export default function Home() {

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
    </Layout>
  );
}
