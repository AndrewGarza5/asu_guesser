import React, { useEffect, useRef, useState } from 'react'
import './styles/home-page-headers.css'
import twitter from '../images/twitter.png'
import discord from '../images/discord.png'
import instagram from '../images/instagram.png'
import { useNavigate } from "react-router-dom";
import axios from 'axios'


export default function HomePageHeaders(){

  let navigate = useNavigate();
  const [donation, setDonation] = useState('')

  useEffect(async ()=> {
    const res = await axios.get('https://asuguesser.com:5001/api/v1/photos/donations/recent')
    setDonation(res.data['msg'])
  }, [])


    return(
        <>
            <div className='home-screen-leaderboards-wrapper' onClick={() => {
                    navigate('/leaderboards')
                }}>
                    Leaderboards

            </div>
            <div className='home-screen-socials-wrapper' onClick={() => {
                    navigate('/about')
                }}>
                    About / Contact

            </div>
            <div className='home-screen-donate-wrapper' title='Donations' onClick={() => {
                    navigate('/donate')
                }}>
                <div className='home-screen-recent-donation-wrapper'>
                    {donation}
                </div>
                <div className='home-screen-donate-button'>
                    Donate!
                </div>
            </div>
        </>
    )
}



