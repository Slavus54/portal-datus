import React from "react"
import Link from "next/link"
import {onCountSessionDistance} from "@/store/store"
import {routes} from '@/env/env'

import '../app/globals.css'

const Layout: React.FC<any> = ({children}) => {

    window.onbeforeunload = () => {
        onCountSessionDistance()
    }    

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