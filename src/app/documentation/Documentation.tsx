'use client'

import {useState, useEffect} from "react"
//@ts-ignore
import {Datus} from 'datus.js'
import Link from "next/link"

import Layout from "@/components/Layout"
import SearchMethods from "@/components/SearchMethods"
import {STORE_VISIT_KEY} from "@/env/env"

const Documentation = () => {
    const [filtered, setFiltered] = useState<any[]>([])
    const [value, setValue] = useState<string>('')

    const datus = new Datus()

    useEffect(() => {
        const onInitVisit = (dateUp = '') => localStorage.setItem(STORE_VISIT_KEY, JSON.stringify(dateUp))

        onInitVisit(datus.now())
    }, [])

    return (
        <Layout>
            <h2>Documentation</h2>

            <SearchMethods value={value} setValue={setValue} filtered={filtered} setFiltered={setFiltered} />

            <div className="items">
                {filtered.map((el, idx) => 
                    <Link href={`/documentation/${idx}`} key={idx} className="card">
                        <b>{el.title}()</b> <br />
    
                        <small>{el.size} lines</small>                     
                    </Link>
                )}
            </div>
        </Layout>
    )
}

export default Documentation