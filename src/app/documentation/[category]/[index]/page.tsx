'use client'

import {useParams, useRouter} from "next/navigation"
import {useState, useEffect} from "react"

import MethodRun from "@/components/MethodRun"

import methods from '@/api/methods.json' 
import {STORE_REVIEWS_KEY, STORE_REVIEW_DEFAULT_RATE, STORE_METHOD_KEY, STORE_SELECTED_METHODS_KEY, SELECTED_ICON} from '@/env/env'

const MethodPage = () => {
    const {push} = useRouter()
    const params = useParams<{category: string, index: string}>()

    const [method] = useState(methods.filter(el => el.category === params.category)[Number(params.index)])
    const [selectedMethods, setSelectedMethods] = useState<any>(null)
    const [isSelected, setIsSelected] = useState<boolean | null>(false)
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

        localStorage.setItem(STORE_METHOD_KEY, JSON.stringify({title: method.title, category: method.category, index: Number(params.index)}))

        let methods: any = localStorage.getItem(STORE_SELECTED_METHODS_KEY)

        if (methods !== null) {
            methods = JSON.parse(methods)

            let flag = methods.text.includes(method.title)

            setIsSelected(flag)

            if (!flag) {
                setSelectedMethods(methods)
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

    useEffect(() => {
        if (selectedMethods !== null && isSelected === null) {
            localStorage.setItem(STORE_SELECTED_METHODS_KEY, 
                JSON.stringify({text: selectedMethods.text + method.title, methods: [...selectedMethods.methods, {title: method.title, category: method.category, index: Number(params.index)}]})
            )   
        }
    }, [isSelected])

    return (
        <div className="main">
            <h2>{method.title}({method.args.map(el => el.name).join(', ')})</h2> 
            <p>- {method.description}</p>

            {isSelected ? 
                    <img src={SELECTED_ICON} className="icon" alt="selected" />
                :
                    <span onClick={() => setIsSelected(null)} className="selected-method">+</span>
            }

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