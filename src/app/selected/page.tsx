'use client'

import {useState, useLayoutEffect} from "react"
import Link from "next/link"

import Layout from "@/components/Layout"

import {short, STORE_SELECTED_METHODS_KEY} from '@/env/env'

const SelectedPage = () => {
    const [methods, setMethods] = useState<any[] | null>(null)

    useLayoutEffect(() => {
        let result: any = localStorage.getItem(STORE_SELECTED_METHODS_KEY)

        if (result !== null) {
            result = JSON.parse(result)

            setMethods(result.methods)
        }
    }, [])

    const onReset = () => {
        localStorage.setItem(STORE_SELECTED_METHODS_KEY, JSON.stringify({text: '', methods: []}))
    }

    return (
        <Layout>
            <h2>Selected Methods</h2>

            {!Boolean(methods?.length) && <p className="pale">Most interesting and used methods will be here</p>}

            {methods !== null &&
                <div className="items medium">
                    {methods.map((el, idx) => 
                        <Link href={`/documentation/${el.category}/${el.index}`} key={idx} className="card selected">
                            <b>{short(el.title)}()</b> <br />            

                            <small>{el.category}</small>     
                        </Link>
                    )}
                </div>
            }

            <button onClick={onReset}>Reset</button>
        </Layout>
    )
}

export default SelectedPage