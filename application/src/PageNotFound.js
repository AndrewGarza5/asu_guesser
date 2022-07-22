import React from 'react'
import './styles/page-not-found.css'

export default function PageNotFound(){


    return(
        <>
            <div className='header-404'>
                <u><b>404 Error!</b></u>
            </div>
            <div className='body-404'>
                Page not found.<br></br>
                Uh Oh Oopsies this is an invalid page!
            </div>
        </>
    )
}

