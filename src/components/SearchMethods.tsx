import React, {useState, useMemo, useLayoutEffect} from "react"

import methods from '@/api/methods.json'

import {onGetStorageValue, onInitMethodsReview} from '@/store/store'
import {METHOD_TYPES, STORE_REVIEWS_KEY} from "@/env/env"
import {MethodSearchProps} from '@/env/types'

const SearchMethods: React.FC<MethodSearchProps> = ({value, setValue, filtered, setFiltered}) => {
    const [category, setCategory] = useState<string>(METHOD_TYPES[0])

    useLayoutEffect(() => {
        setFiltered(methods)

        let data = onGetStorageValue(STORE_REVIEWS_KEY)

        if (data === null) {
            onInitMethodsReview()
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