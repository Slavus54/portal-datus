'use client'

import React, {useState, useMemo, useEffect} from "react"

import methods from '@/api/methods.json'

import {METHOD_TYPES, STORE_REVIEWS_KEY, STORE_REVIEW_DEFAULT_RATE} from "@/env/env"
import {MethodSearchProps} from '@/env/types'

const SearchMethods: React.FC<MethodSearchProps> = ({value, setValue, filtered, setFiltered}) => {
    const [category, setCategory] = useState<string>(METHOD_TYPES[0])

    useEffect(() => {
        setFiltered(methods)

        let data: any = localStorage.getItem(STORE_REVIEWS_KEY)

        data = JSON.parse(data)

        if (data === null) {
            localStorage.setItem(STORE_REVIEWS_KEY, JSON.stringify(new Array(methods.length).fill({title: '', rate: STORE_REVIEW_DEFAULT_RATE})))
        }
    }, [])

    useMemo(() => {
        let result: any[] = methods.filter(el => el.category === category)

        if (value.length !== 0) {
            result = result.filter(el => el.title.includes(value))
        }

        setFiltered(result)
    }, [value, category])

    return (
        <>
            <input value={value} onChange={e => setValue(e.target.value)} placeholder="Enter title of method" type="text" />
        
            <h3 className="pale">Choose Type</h3>

            <div className="items small">
                {METHOD_TYPES.map(el => <div onClick={() => setCategory(el)} className="label">{el}</div>)}
            </div>

            <b>{filtered.length} method{filtered.length > 1 ? 's' : ''} found</b>
        </>
    )
}

export default SearchMethods