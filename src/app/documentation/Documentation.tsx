'use client'

import {useState, useLayoutEffect} from "react"
//@ts-ignore
import {Datus} from 'datus.js'
import Link from "next/link"

import Layout from "@/components/Layout"
import SearchMethods from "@/components/SearchMethods"
import {onInitVisit} from '@/store/store'

const Documentation = () => {
    const [filtered, setFiltered] = useState<any[]>([])
    const [value, setValue] = useState<string>('')

    const datus = new Datus()

    useLayoutEffect(() => {
        onInitVisit(datus.now())
    }, [])

    return (
        <Layout>
            <h2>Documentation</h2>

            <SearchMethods value={value} setValue={setValue} filtered={filtered} setFiltered={setFiltered} />

            <div className="items">
                {filtered.map((el, idx) => 
                    <Link href={`/documentation/${idx}`} key={idx} className="card">
                        {el.title}()<br />
    
                        <small>{el.size} lines of code</small>                     
                    </Link>
                )}
            </div>
        </Layout>
    )
}

export default Documentation