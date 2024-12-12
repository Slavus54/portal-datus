'use client'

import {useParams, useRouter} from "next/navigation"
import {useState, useEffect} from "react"

import MethodRun from "@/components/MethodRun"

import methods from '@/api/methods.json' 
import {STORE_REVIEWS_KEY, STORE_REVIEW_DEFAULT_RATE} from '@/env/env'

const MethodPage = () => {
    const {push} = useRouter()
    const params = useParams<{category: string, index: string}>()

    const [method] = useState(methods.filter(el => el.category === params.category)[Number(params.index)])
    const [rate, setRate] = useState<number>(STORE_REVIEW_DEFAULT_RATE)

    let onUpdateMethodReview: any

    useEffect(() => {
        let data: any = localStorage.getItem(STORE_REVIEWS_KEY)
       
        if (data) {
            data = JSON.parse(data)

            let result: any = data[Number(params.index)]
 
            if (result !== undefined) {
                setRate(result.rate)
            }
        }
    }, [])

    useEffect(() => {
        onUpdateMethodReview = (title = '', rate = STORE_REVIEW_DEFAULT_RATE, index = 0) => {
            let data: any = localStorage.getItem(STORE_REVIEWS_KEY)
        
            data = JSON.parse(data)

            if (data) {
                data[index] = {title, rate}
        
                localStorage.setItem(STORE_REVIEWS_KEY, JSON.stringify(data))
            }
        }

        if (rate !== STORE_REVIEW_DEFAULT_RATE) {
            onUpdateMethodReview(method.title, rate, Number(params.index))
        }        
    }, [rate])

    return (
        <div className="main">
            <h2>{method.title}({method.args.map(el => el.name).join(', ')})</h2> 
            <p>- {method.description}</p>

            <MethodRun title={method.title} category={method.category} args={method.args} size={method.size} />

            <h2>Rate: {rate}%</h2>
            <input value={rate} onChange={e => setRate(parseInt(e.target.value))} type="range" step={1} />

            <h2>Examples</h2>

            <div className="items">
                {method.examples.map(el => 
                    <div className="item">
                        <p>Input: {el.input}</p> <br />
                        <h4>Output: <b>{el.output}</b></h4>
                    </div>
                )}
            </div>

            <button onClick={() => push('/documentation')} className="back light">Back</button>
        </div>
    )
}

export default MethodPage