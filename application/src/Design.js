import React, { useEffect, useState, useRef } from 'react'
import './styles/design.css'
import FancyText from './HomePage/FancyText'

import asuGuesserLogo from './images/asu_guesser_logo.png'
import { useNavigate } from "react-router-dom";

export default function Mobile(){
    


    useEffect(() => {
        
      }, [])

    return(
        <div className='design-wrapper'>
            <FancyText InnerTextID={'easy-difficulty-option'}/>
        </div>
    )
}

