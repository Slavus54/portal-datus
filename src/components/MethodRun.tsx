'use client'

import React, {useState, useMemo, useEffect} from "react"
//@ts-ignore
import {onRunMethod} from '@/engine/engine'
import {STORE_METHODS_USING_KEY} from "@/env/env"
import {MethodRunProps, MethodArgumentType} from '@/env/types'

const MethodRun: React.FC<MethodRunProps> = ({title, category, args = [], size = 0}) => {
    const [index, setIndex] = useState<number>(0)
    const [argument, setArgument] = useState<MethodArgumentType>(args[index])
    const [computed, setComputed] = useState<string[]>(args.map(el => el.name))
    const [values, setValues] = useState<string[]>([])
    const [value, setValue] = useState<string>('')
    const [isAllArgsExist, setIsAllArgsExist] = useState<boolean>(false)

    const [result, setResult] = useState<any | null>(null)

    useMemo(() => {
        setArgument(args[index])
    }, [index])

    useEffect(() => {
        if (index === args.length - 1) {
            let data: any = localStorage.getItem(STORE_METHODS_USING_KEY)

            data = JSON.parse(data)

            if (data) {        
                data.calls += 1
                data.lines += size

                data.list = data.list.map((el: any) => {
                    let flag = el.title === category
                    let value = flag ? el.value + 1 : el.value

                    return {title: el.title, value}
                })

                localStorage.setItem(STORE_METHODS_USING_KEY, JSON.stringify(data))
            }
        }
    }, [index])

    const onAddArgument = () => {
        let data = values
        let result: any[] = []

        if (value !== '') {
            data = [...data, value]
        }
        
        args.map((el, idx) => {
            let item = idx < data.length ? data[idx] : el.name
            
            result = [...result, item]
        })
        
        setComputed(result)
        setValues(data)
        setValue('')

        if (index < args.length - 1) {
            setIndex(index + 1)
        } else if (index === args.length - 1) {
            setResult(JSON.parse(onRunMethod(title, data)))
        }
       
        if (index === args.length - 2) {
            setIsAllArgsExist(true)
        }
    }
    
    return (
        <>
            <p><span className="js-red">const</span> datus = new <span className="js-inst">Datus</span>() <br /></p>
                
            <p>datus.<span className="js-pur">{title}</span>({computed.join(', ')})</p>

            <h3>Argument: {argument.name} ({argument.type})</h3>
   
            <textarea value={value} onChange={e => setValue(e.target.value)} placeholder="Value of argument" />
        
            <p>Result: {result ? result : '?'}</p>

            <button onClick={onAddArgument}>{isAllArgsExist ? 'Run' : 'Next'}</button>
        </>
    )
}

export default MethodRun