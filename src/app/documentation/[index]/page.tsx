'use client'

import {useParams, useRouter} from "next/navigation"
import {useState, useLayoutEffect} from "react"

import MethodRun from "@/components/MethodRun"

import methods from '@/api/methods.json' 

import {onGetStorageValue, onUpdateMethodReview} from '@/store/store'
import {STORE_REVIEWS_KEY, STORE_REVIEW_DEFAULT_RATE} from '@/env/env'


const MethodPage = () => {
    const {push} = useRouter()
    const params = useParams<{index: string}>()

    const [method] = useState(methods[Number(params.index)])
    const [rate, setRate] = useState<number>(STORE_REVIEW_DEFAULT_RATE)

    useLayoutEffect(() => {
        let data = onGetStorageValue(STORE_REVIEWS_KEY)

        if (data) {
            let result = data[Number(params.index)]

            if (result !== undefined) {
                setRate(result.rate)
            }
        }
    }, [])

    const onRate = () => onUpdateMethodReview(method.title, rate, Number(params.index))

    return (
        <div className="main">
            <h2>{method.title}({method.args.map(el => el.name).join(', ')})</h2> 
            <p>- {method.description}</p>

            <MethodRun title={method.title} category={method.category} args={method.args} size={method.size} />

            <h2>Rate: {rate}%</h2>
            <input value={rate} onChange={e => setRate(parseInt(e.target.value))} type="range" step={1} />

            <button onClick={onRate}>Update</button>

            <h2>Examples</h2>

            <div className="items">
                {method.examples.map(el => 
                    <div>
                        <p>Input: {el.input}</p> <br />
                        <h4>Output: <b>{el.output}</b></h4>
                    </div>
                )}
            </div>

            <button onClick={() => push('/documentation')} className="light">Back</button>
        </div>
    )
}

export default MethodPage