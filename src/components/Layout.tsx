'use client'

import React, {useEffect} from "react"
import Link from "next/link"
import {datus} from '@/store/store'
import {STORE_VISIT_KEY, STORE_SESSION_DISTANCE_KEY, routes} from '@/env/env'

import '../app/globals.css'

const Layout: React.FC<any> = ({children}) => {

    useEffect(() => {
        const onCountSessionDistance = () => {
            let from: any = localStorage.getItem(STORE_VISIT_KEY)
            let to = datus.now('time')
          
            let distance = '00:00'

            from = JSON.parse(from)
        
            if (from) {
                distance = datus.timeDistance(from.split(' ')[2], to)
            }
        
            localStorage.setItem(STORE_SESSION_DISTANCE_KEY, JSON.stringify(distance))
        }

        window.onbeforeunload = () => {
            onCountSessionDistance()
        }    
    }, []) 

    return (
        <div className="main">
            <nav>
                {routes.map(el => 
                    <Link href={el.url} className="nav_item">
                        {el.title}
                    </Link>
                )}
            </nav>

            {children}
        </div>
    )
}

export default Layout