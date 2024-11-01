'use client'

import React, {useState, useMemo} from "react"
//@ts-ignore
import {onRunMethod} from '@/engine/engine'
import {MethodRunProps, MethodArgumentType} from '@/env/types'

const MethodRun: React.FC<MethodRunProps> = ({title, category, args = [], size = 0}) => {
    const [index, setIndex] = useState<number>(0)
    const [argument, setArgument] = useState<MethodArgumentType>(args[index])
    const [values, setValues] = useState<string[]>([])
    const [value, setValue] = useState<string>('')
    const [isAllArgsExist, setIsAllArgsExist] = useState<boolean>(false)

    const [result, setResult] = useState<any | null>(null)

    useMemo(() => {
        setArgument(args[index])
    }, [index])

    const onAddArgument = () => {
        let data = values

        if (value !== '') {
            data = [...data, value]
        }
        
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
            <h2>Try it for yourself</h2>
            <h3 className="pale">Current Argument: {argument.name} ({argument.type})</h3>

            <textarea value={value} onChange={e => setValue(e.target.value)} placeholder="Value of argument" />
        
            <p>Result: {result ? result : '?'}</p>

            <button onClick={onAddArgument}>{isAllArgsExist ? 'Run' : 'Next'}</button>
        </>
    )
}

export default MethodRun