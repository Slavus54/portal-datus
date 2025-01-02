'use client'

import {useState, useRef, useMemo, useLayoutEffect} from "react"

import Layout from "@/components/Layout"

import {STORE_CODE_METHOD_KEY, CODE_SHARE_ICONS, CODE_SIZE_COLORS, GMAIL_ICON} from "@/env/env"

const SandboxPage = () => {
    const [method, setMethod] = useState<any | null>(null)
    const [lines, setLines] = useState<number>(0)
    const [code, setCode] = useState<string>('')

    const [functionQuantity, setFunctionQuantity] = useState<number>(0)
    const [variablesQuantity, setVariablesQuantity] = useState<number>(0)

    const linesLabel = useRef(null)
    const area = useRef(null)

    useLayoutEffect(() => {
        let result = localStorage.getItem(STORE_CODE_METHOD_KEY)

        if (result) {
            setMethod(JSON.parse(result))
        }
    }, [])

    useMemo(() => {
        let result: any = code.match(/\n/g)

        if (result) {        
            setLines(result.length)
        }      

        if (code.includes('=>') && code.length !== 0) {
            setFunctionQuantity(code.split('=>').length - 1)
        } else {
            setFunctionQuantity(0)
        }

        let lets = code.split('let')
        let consts = code.split('const')

        consts = consts.filter(el => !el.includes('(') && el.length !== 0)

        setVariablesQuantity(lets.length + consts.length - 1)

    }, [code])

    useMemo(() => {
        if (method !== null) {
            let label: any = linesLabel.current
            let coefficient = lines / method.lines
    
            if (label !== null) {
                let color = CODE_SIZE_COLORS.findLast(el => coefficient > el.coefficient)?.code

                label.style.color = color
                label.style.textShadow = '0px 0px .5px#333333'
            }
        }        
    }, [method, lines])

    const onCheck = () => {
        try {
            eval(code)
        } catch (err) {
            alert(err)
        }        
    }

    const onKeyDown = (e: any) => {
        if (e.code === 'Tab') {
            let textarea: any = area.current

            if (textarea) {
                e.preventDefault()

                setCode(code.slice(0, textarea.selectionStart) + '    ' + code.slice(textarea.selectionStart))
            }        
        }
    }

    const onView = (link: string) => window.open(link)

    return (
        <Layout>
            {method !== null &&
                <>
                    <h2>Rewrite it and share with own code</h2>

                    <h3>Method: {method?.title}()</h3>

                    <p>Inside method use global variables as context of class instance</p>

                    <textarea ref={area} value={code} onChange={e => setCode(e.target.value)} onKeyDown={e => onKeyDown(e)} placeholder="Do it better..." className="code" />                   

                    <b ref={linesLabel}>Size: {code !== '' ? lines : 0}/{method.lines} lines</b>

                    <p>Functions: {functionQuantity} Variables: {variablesQuantity}</p>

                    <button onClick={onCheck}>Check</button>

                    <h2>Contact Information</h2>

                    <h4>Send an email on <b>x.mirosfromsibir@gmail.com</b></h4>

                    <img src={GMAIL_ICON} className="icon" alt="gmail" />

                    <div className="items small">
                        {CODE_SHARE_ICONS.map((el, i) => 
                            <img onClick={() => onView(el.link)} src={el.icon} className="icon" key={i} />
                        )}
                    </div>
                </>
            }            
        </Layout>
    )
}

export default SandboxPage