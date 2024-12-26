'use client'

import {useState, useEffect} from "react"
//@ts-ignore
import {Datus} from 'datus.js'
import {useRouter} from "next/navigation"
import Link from "next/link"

import Layout from "@/components/Layout"
import SearchMethods from "@/components/SearchMethods"
import {short, STORE_VISIT_KEY, STORE_METHOD_KEY, STORE_SELECTED_METHODS_KEY, STORE_CODE_METHOD_KEY, SELECTED_ICON} from "@/env/env"

const Documentation = () => {
    const [filtered, setFiltered] = useState<any[]>([])
    const [category, setCategory] = useState<string>('')
    const [value, setValue] = useState<string>('')
    const [method, setMethod] = useState<any | null>(null)

    const {push} = useRouter() 

    const datus = new Datus()

    useEffect(() => {
        window.document.title = 'Methods | Datus.js'

        const onInitVisit = (dateUp = '') => localStorage.setItem(STORE_VISIT_KEY, JSON.stringify(dateUp))

        const onInitLatestMethod = () => {
            let data = localStorage.getItem(STORE_METHOD_KEY)

            if (data === null) {
                localStorage.setItem(STORE_METHOD_KEY, JSON.stringify({title: '', category: '', index: 0}))
            } else {
                data = JSON.parse(data)
            }

            return data
        }

        const onInitSelectedMethods = () => {
            let data = localStorage.getItem(STORE_SELECTED_METHODS_KEY)

            if (data === null) {
                localStorage.setItem(STORE_SELECTED_METHODS_KEY, JSON.stringify({text: '', methods: []}))
            } else {
                data = JSON.parse(data)
            }

            return data
        }

        const onInitCodeMethod = () => {
            let data = localStorage.getItem(STORE_CODE_METHOD_KEY)

            if (data === null) {
                localStorage.setItem(STORE_CODE_METHOD_KEY, JSON.stringify({title: '', category: '', lines: 0}))
            } else {
                data = JSON.parse(data)
            }

            return data
        }
       
        onInitVisit(datus.now())

        let result = onInitLatestMethod()

        if (result !== null) {
            setMethod(result)
        }

        onInitSelectedMethods()
        onInitCodeMethod()
    }, [])

    return (
        <Layout>
            <h2>Library's Methods</h2>

            <SearchMethods value={value} setValue={setValue} category={category} setCategory={setCategory} filtered={filtered} setFiltered={setFiltered} />

            {method !== null && method.title !== '' ? 
                    <span onClick={() => push(`/documentation/${method.category}/${method.index}`)} className="method">Last viewed: {method.title}()</span>    
                :
                    <span className="method">Haven't tried any method yet</span>    
            }

            <img onClick={() => push('/selected')} src={SELECTED_ICON} className="icon" alt="selected" />

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