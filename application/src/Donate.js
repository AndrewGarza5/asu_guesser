import React, { useEffect, useState } from 'react'
import './styles/donate.css'
import { useNavigate } from "react-router-dom";
import venmo from './images/venmo.png'
import cashapp from './images/cashapp.png'
import paypal from './images/paypal.png'
import creditdebit from './images/creditdebit.png'

export default function Donate(){

    const [photoToGuess, setPhotoToGuess] = useState(null)
    const [photoNumber, setPhotoNumber] = useState(null)
    let navigate = useNavigate();


    useEffect(() => {

        const goodPhotos = [17, 19, 23, 44, 48, 54, 65, 71, 91, 98, 101, 102, 116, 117, 427, 570, 610, 734, 608, 601, 216]
        const randomNumber = Math.floor(Math.random() * 21)

        setPhotoNumber(goodPhotos[randomNumber])
        setPhotoToGuess('https://asuguesser.com:5001/api/v1/photos/tempe_' + goodPhotos[randomNumber] + '.jpg')
      }, [])

    return(
        <div className='donate-actual-wrapper'>
            <div className='donate-back-button' onClick={() => {
                    navigate('/')
                }}>
                Back!
            </div>
            <div className='donate-photo-details'>
                Photo #{photoNumber}
            </div>
                    
            <div className='donate-photo-to-guess-wrapper'>
                <img src={photoToGuess} className='donate-photo-to-guess'/>
            </div>
            
            <div className='donate-wrapper'>
                <div className='donate-images-wrapper'>
                    <img src={creditdebit} className='donate-image-link' onClick={() => {
                        window.open('https://givebutter.com/asuguesser')
                    }}/>
                    <img src={venmo} className='donate-image-link' onClick={() => {
                        window.open('https://venmo.com/code?user_id=3516953616450648040&created=1650237158.5489058&printed=1')
                    }}/>
                    <img src={cashapp} className='donate-image-link' onClick={() => {
                        window.open('https://cash.app/$AndyGarza005')
                    }}/>
                    <img src={paypal} className='donate-image-link' onClick={() => {
                        window.open('https://paypal.me/AndrewGarza005')
                    }}/>
                    


                </div>
                <div className='donate-paragraph-test'>
                I'll be straightforward - I put a ton of heart & effort into this project and any donation would
                    be appreciated. The money would first go to covering server costs and then probably tasty food.<br></br> <br></br> 
                    Thank you and have a good day!

                    <br></br><br></br>~~~~~~~<br></br><br></br>
                    Some of my thoughts: <br></br><br></br>
                    Hello, I hope you enjoyed this game. I started working on it 1/31/22 when I was on
                    a walk around campus. I told myself it sounded pretty easy to make and I would get it done in 3 weeks tops. That was not true at all, I have 
                    easily put 400+ hours into it over the past few months. I have worked harder on this than I have anything in my life.<br></br><br></br>
                    And at face value that is sort of silly. I understand this game inherently lacks longevity and will be a fart in the wind - people will notice it for a 
                    moment and then go on with their life. I did not create this game to make big bucks or because I thought it was some amazing thing - I am pretty much copying
                    GeoGuesser. Really, there are many reasons I made this game, some more significant than others: <br></br><br></br>
                    1) I love ASU Campus and always wished this kind of game existed for me to play, so I thought I would make it.<br></br><br></br>
                    2) I am graduating next month and wanted to do something "cool" before I graduated.<br></br><br></br>
                    3) I created this to prove a point to myself. Throughout my past years in college I know I lacked discipline - I did not
                    study as hard as I should have, I did not put effort into the right places, and I was rarely the ideal version of myself when it came to 
                    saying "yes" to the right things & "no" to the wrong things. This past school year I have been trying immensely hard to be more 
                    disciplined with my behaviors. And that is stupidly hard. It's crazy. This game is a product of that; a statement to myself that I have it in me
                    to be more disciplined.
                    As this year ends, I think I have been moderately successful. I am more disciplined in certain regards, in others not so much. All I know is that I have put
                    a tremendous amount of effort into changing myself this past year and it has payed off. Truthfully, this past school year has been the happiest I have ever been.
                    <br></br><br></br>
                    4) I want to be my own boss. I really enjoy creating stuff, it's fulfilling. You know what I don't think is fulfilling? Sitting in an office 8-5
                    making someone elses dreams come true for the next 40 years. Now-a-days there are so many mediums through which one can find personal success with creativity. ASUGuesser represents
                    the start of me trying to find my own path towards success that is independent. ASUGuesser was not
                    meant to be a super success. Creating this game was to get better at web development, learn how to release a game, and prove to myself that I have
                     it in me to make an idea come to fruition. I hope that 10 years from now you see my name again for something
                    that is monumental.
                    <br></br><br></br>
                    Those last 2 paragraphs sum up a large part of my emotional state the past few months. Thanks for playing. Thanks for reading. And thanks to ASU
                    and all the students for the past 5 years. Although imperfect, I am proud of the person I have transformed into during my time here.
                    <p style={{fontFamily: "Damion", fontSize: "20px"}}>- Andy</p>
                </div>
                
            </div>
        </div>
    )
}

