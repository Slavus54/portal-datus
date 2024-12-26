'use client'

import {useState, useRef, useMemo, useLayoutEffect} from "react"

import Layout from "@/components/Layout"

import {STORE_CODE_METHOD_KEY, CODE_SHARE_ICONS, CODE_SIZE_COLORS, GMAIL_ICON} from "@/env/env"

const SandboxPage = () => {
    const [method, setMethod] = useState<any | null>(null)
    const [lines, setLines] = useState<number>(0)
    const [code, setCode] = useState<string>('')

    const linesLabel = useRef(null)

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

    const onView = (link: string) => window.open(link)

    return (
        <Layout>
            {method !== null &&
                <>
                    <h2>Rewrite it and share with own code</h2>

                    <h3>Method: {method?.title}()</h3>

                    <p>Inside method use global variables as context of class instance</p>

                    <textarea value={code} onChange={e => setCode(e.target.value)} placeholder="Do it better..." className="code" />                   

                    <h4 ref={linesLabel}>Size: {code !== '' ? lines : 0}/{method.lines} lines</h4>

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