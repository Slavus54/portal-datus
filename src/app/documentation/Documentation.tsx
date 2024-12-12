'use client'

import {useState, useEffect} from "react"
//@ts-ignore
import {Datus} from 'datus.js'
import Link from "next/link"

import Layout from "@/components/Layout"
import SearchMethods from "@/components/SearchMethods"
import {short, STORE_VISIT_KEY} from "@/env/env"

const Documentation = () => {
    const [filtered, setFiltered] = useState<any[]>([])
    const [category, setCategory] = useState<string>('')
    const [value, setValue] = useState<string>('')

    const datus = new Datus()

    useEffect(() => {
        window.document.title = 'Methods | Datus.js'

        const onInitVisit = (dateUp = '') => localStorage.setItem(STORE_VISIT_KEY, JSON.stringify(dateUp))

        onInitVisit(datus.now())
    }, [])

    return (
        <Layout>
            <h2>Library's Methods</h2>

            <SearchMethods value={value} setValue={setValue} category={category} setCategory={setCategory} filtered={filtered} setFiltered={setFiltered} />

            <div className="items medium">
                {filtered.map((el, idx) => 
                    <Link href={`/documentation/${category}/${idx}`} key={idx} className="card selected">
                        <b>{short(el.title)}()</b> <br />
    
                        <small>{el.size} lines</small>                     
                    </Link>
                )}
            </div>
        </Layout>
    )
}

export default Documentation