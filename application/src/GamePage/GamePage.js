import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import './styles/game-page.css'
import './styles/sidebar.css'
import $ from 'jquery'
import GoogleMap from './GoogleMap'
import RoundResults from './RoundResults'
import Summary from './Summary'
import FancyText from '../HomePage/FancyText'
import Lock from './Lock'
import mapIncrease from '../images/map-increase.png'
import mapDecrease from '../images/map-decrease.png'
import mapTiltOff from '../images/map-tilt-off.png'
import mapTiltOn from '../images/map-tilt-on.png'
import rotateMapLeftImage from '../images/rotate-left.png'
import rotateMapRightImage from '../images/rotate-right.png'
import blackRotationBox from '../images/black-rotation-box.png'
import mapFullScreen from '../images/map-full-screen.png'


export default function GamePage() {
  const [singlePlayerGameSettings, setSinglePlayerGameSettings] = useState(null)
  const [photoToGuess, setPhotoToGuess] = useState()
  const [currentRound, setCurrentRound] = useState(1)
  const [magnificationStrength, setMagnificationStrength] = useState(2)
  const [magnificationSize, setMagnificationSize] = useState(4)
  const [tiltState, setTiltState] = useState(false)
  const [rotateMapLeft, setRotateMapLeft] = useState(blackRotationBox)
  const [rotateMapRight, setRotateMapRight] = useState(blackRotationBox)
  const [roundResultsPage, setRoundResultsPage] = useState(null)
  const [hasSetFirstBLowupImage, setHasSetFirstBLowupImage] = useState(false)
  const [submitButtonInside, setSubmitButtonInside] = useState(<Lock />)
  const [totalScore, setTotalScore] = useState(0)
  const [photoNumber, setPhotoNumber] = useState(null)
  const [currentRoundDifficulty, setCurrentRoundDifficulty] = useState(null)
  const [summaryPage, setSummaryPage] = useState(null)


  const blowupImageDisabled = useRef(true)
  const googleMapToggleTilt = useRef(null)
  const googleMapRotateClockwise = useRef(null)
  const googleMapRotateCounterClockwise = useRef(null)
  const googleMapChangeZoom = useRef(null)
  const mapFullScreenEnableListeners = useRef(null)
  const mapFullScreenDisableListeners = useRef(null)
  const getCircleCoordinates = useRef(null)
  const updateGoogleMapRoundDifficulty = useRef(null)
  const resetGoogleMap = useRef(null)
  const mapFullScreenState = useRef(false)
  const tiltMapPhoto = useRef(mapTiltOff)

  let navigate = useNavigate();

  useEffect(() => {
    const blowupLens = document.getElementById('BlowupLens')
    if(blowupLens != null){
      blowupLens.remove()
    }
    setTimeout(() => {
      $("img.photo-to-guess").blowupStart();
    }, 100)
    
      
  }, [photoToGuess])

  useEffect( () => {
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
          
          navigate('/mobile')
    }

    if (localStorage && localStorage.getItem('singlePlayerGameSettings')) {

      let gameSettings = JSON.parse(localStorage.getItem('singlePlayerGameSettings'))
      setSinglePlayerGameSettings(gameSettings)

      let firstPhotoName
      const completedRoundsGetItem = localStorage.getItem('completedRounds')
      if(completedRoundsGetItem != null){
        const completedRoundsArray = completedRoundsGetItem.split(',')
        if(completedRoundsArray.length == 5){
          navigate('/')
          window.location.reload()

        }
        else{
          setCurrentRound(completedRoundsArray.length + 1)
          setPhotoToGuess('https://www.asuguesser.com:5001/api/v1/photos/' + gameSettings[completedRoundsArray.length].photoname)
          setCurrentRoundDifficulty(gameSettings[completedRoundsArray.length].difficulty)

          updateGoogleMapRoundDifficulty.current(gameSettings[completedRoundsArray.length].difficulty)
          firstPhotoName = gameSettings[completedRoundsArray.length].photoname

          switch(completedRoundsArray.length){
            case 1:
              setTotalScore(parseInt(localStorage.getItem('round1')))
            break;
            case 2:
              setTotalScore(parseInt(localStorage.getItem('round1')) + parseInt(localStorage.getItem('round2')))
            break;
            case 3:
              setTotalScore(parseInt(localStorage.getItem('round1')) + parseInt(localStorage.getItem('round2'))
          + parseInt(localStorage.getItem('round3')))
            break;

            case 4:
              setTotalScore(parseInt(localStorage.getItem('round1')) + parseInt(localStorage.getItem('round2'))
          + parseInt(localStorage.getItem('round3')) + parseInt(localStorage.getItem('round4')))
            break;
          }
        }

      
      }
      else{
        setCurrentRound(1)
        setPhotoToGuess('https://www.asuguesser.com:5001/api/v1/photos/' + gameSettings[0].photoname)
        setCurrentRoundDifficulty(gameSettings[0].difficulty)
        updateGoogleMapRoundDifficulty.current(gameSettings[0].difficulty)
        firstPhotoName = gameSettings[0].photoname
      }
      //
      let currentPhotoNumber = ''
      for(let i = 6; i < 11; i++){
        if(firstPhotoName[i] >= '0' && firstPhotoName[i] <= '9'){
          currentPhotoNumber += firstPhotoName[i]
        }
        else{
          break
        }
      }

      setPhotoNumber(currentPhotoNumber)
      //
    }
    else if(localStorage.getItem('singlePlayerGameSettings') == null){
      navigate('/')
    }

    // // Photos
    // if (localStorage && localStorage.getItem('singlePlayerGameSettings')) {

    //   let gameSettings = JSON.parse(localStorage.getItem('singlePlayerGameSettings'))
    //   setSinglePlayerGameSettings(gameSettings)
    //   setPhotoToGuess('https://www.asuguesser.com:5001/api/v1/photos/' + gameSettings[currentRound - 1].photoname)
    //   updateGoogleMapRoundDifficulty.current(gameSettings[currentRound - 1].difficulty)
    //   setCurrentRoundDifficulty(gameSettings[currentRound - 1].difficulty)
    //   let firstPhotoName = gameSettings[0].photoname
    //   let firstPhotoNumber = ''
    //   for(let i = 6; i < 10; i++){
    //     if(firstPhotoName[i] >= '0' && firstPhotoName[i] <= '9'){
    //       firstPhotoNumber += firstPhotoName[i]
    //     }
    //     else{
    //       break
    //     }
    //   }

    //   setPhotoNumber(firstPhotoNumber)
    // }
    // else if(localStorage.getItem('singlePlayerGameSettings') == null){
    //   navigate('/')
    // }

    startEventListeners()
    setTimeout(() => {
      blowupImageDisabled.current = false
    }, 500)

    window.addEventListener('resize', windowResize)
    const windowWidth = window.innerWidth
    if(windowWidth <= 1550 && windowWidth > 1000){
      const photoWrapperWidth = document.getElementById('photo-to-guess-wrapper').clientWidth
      const photoWrapperHeight = document.getElementById('photo-to-guess-wrapper').clientHeight
      const ratio = photoWrapperHeight / photoWrapperWidth
      const photoToGuess = document.getElementById('photo-to-guess')
      if(ratio < 0.75){
        photoToGuess.style.width = 'auto'
        photoToGuess.style.height = '100%'
      }
      else{
        photoToGuess.style.width = '100%'
        photoToGuess.style.height = 'auto'
      }
    }
    else if(windowWidth <= 1000){
      const photoWrapperWidth = document.getElementById('photo-to-guess-wrapper').clientWidth
      const photoWrapperHeight = document.getElementById('photo-to-guess-wrapper').clientHeight
      const ratio = photoWrapperHeight / photoWrapperWidth
      const photoToGuess = document.getElementById('photo-to-guess')
      if(ratio < 0.75){
        photoToGuess.style.width = 'auto'
        photoToGuess.style.height = '100%'
      }
      else{
        photoToGuess.style.width = '100%'
        photoToGuess.style.height = 'auto'
      }
    }
    else if(windowWidth > 1550){
      const photoToGuess = document.getElementById('photo-to-guess')
      photoToGuess.style.width = '100%'
      photoToGuess.style.height = 'auto'
      
    }
 
     // Unmount
    return () => {
      localStorage.removeItem('singlePlayerGameSettings')
      window.removeEventListener('resize', windowResize)
    }
     
    
  }, [])

  function windowResize(){

    const windowWidth = window.innerWidth
    if(windowWidth <= 1550 && windowWidth > 1000){
      const photoWrapperWidth = document.getElementById('photo-to-guess-wrapper').clientWidth
      const photoWrapperHeight = document.getElementById('photo-to-guess-wrapper').clientHeight
      const ratio = photoWrapperHeight / photoWrapperWidth
      const photoToGuess = document.getElementById('photo-to-guess')
      if(ratio < 0.75){
        photoToGuess.style.width = 'auto'
        photoToGuess.style.height = '100%'
      }
      else{
        photoToGuess.style.width = '100%'
        photoToGuess.style.height = 'auto'
      }
    }
    else if(windowWidth <= 1000){
      const photoWrapperWidth = document.getElementById('photo-to-guess-wrapper').clientWidth
      const photoWrapperHeight = document.getElementById('photo-to-guess-wrapper').clientHeight
      const ratio = photoWrapperHeight / photoWrapperWidth
      const photoToGuess = document.getElementById('photo-to-guess')
      if(ratio < 0.75){
        photoToGuess.style.width = 'auto'
        photoToGuess.style.height = '100%'
      }
      else{
        photoToGuess.style.width = '100%'
        photoToGuess.style.height = 'auto'
      }
    }
    else if(windowWidth > 1550){
      const photoToGuess = document.getElementById('photo-to-guess')
      photoToGuess.style.width = '100%'
      photoToGuess.style.height = 'auto'
      
    }
}

  function setSubmitButtonInsideState(){
    setSubmitButtonInside('Submit!')
  }

  function submitGuess(){
    const answerCoordinates = {
      lat: singlePlayerGameSettings[currentRound - 1].latitude,
      lng: singlePlayerGameSettings[currentRound - 1].longitude
    }
    const guessCoordinates = getCircleCoordinates.current()
    const distanceUnrounded = window.google.maps.geometry.spherical.computeDistanceBetween(guessCoordinates, answerCoordinates)
    const distance = Math.ceil(distanceUnrounded)

    let score

    if(currentRoundDifficulty == 'Easy' || currentRoundDifficulty == 'Medium'){
      let exponent = (0.25 * (distanceUnrounded * 5) - 5000)
      score = Math.ceil( ( 1 / ( Math.pow(1.0017304, exponent) ) - 500 ) )
      if(distance <= 15 ){ 
        score = 5000
      }
      else if(distance > 1000){
        score = 0
      }
    }
    else{
      let exponent = (0.25 * (distanceUnrounded * 5) - 5000)

      score = Math.ceil( ( 1 / ( Math.pow(1.0017274, exponent) ) - 500 ) )
      if(distance <= 8 ){ 
        score = 5000
      }
      else if(distance > 1000){
        score = 0
      }
    }

    localStorage.setItem('round'+currentRound, score)
    localStorage.setItem('round'+currentRound+'distance', +distanceUnrounded.toFixed(1))
    
    const blowupLens = document.getElementById('BlowupLens')
    if(blowupLens != null){
      blowupLens.remove()
    }
    blowupImageDisabled.current = true
    mapFullScreenDisableListeners.current()
    if(currentRound < 5){
      setRoundResultsPage(<RoundResults 
        currentRound={currentRound}
        nextRoundClick={nextRoundClick} 
        guessCoordinates={guessCoordinates}
        answerCoordinates={answerCoordinates}
        distance={distance}
        score={score}
        difficulty={currentRoundDifficulty}
      />)
      setTimeout(() =>{
        setPhotoToGuess('https://www.asuguesser.com:5001/api/v1/photos/' + singlePlayerGameSettings[currentRound].photoname) 
        setSubmitButtonInside(<Lock />)
        const submitButtonReset = document.getElementById('submit-guess-button')
        submitButtonReset.style.opacity = '0.5'
        submitButtonReset.style.cursor = 'default'
        setTotalScore(totalScore + score)
        resetGoogleMap.current()
        setTiltState(true)
        tiltMapPhoto.current = mapTiltOff
        setRotateMapLeft(blackRotationBox)
        setRotateMapRight(blackRotationBox)

        let firstPhotoName = singlePlayerGameSettings[currentRound].photoname
        let firstPhotoNumber = ''
        for(let i = 6; i < 10; i++){
          if(firstPhotoName[i] >= '0' && firstPhotoName[i] <= '9'){
            firstPhotoNumber += firstPhotoName[i]
          }
          else{
            break
          }
        }
        
        setPhotoNumber(firstPhotoNumber)
        setCurrentRound(currentRound + 1)
      }, 800)
    }
    else if(currentRound == 5){
      setRoundResultsPage(<RoundResults 
        currentRound={currentRound}
        nextRoundClick={summaryPageClick} 
        guessCoordinates={guessCoordinates}
        answerCoordinates={answerCoordinates}
        distance={distance}
        score={score}
        difficulty={currentRoundDifficulty}
      />)
      setTimeout(() =>{
        setTotalScore(totalScore + score)
      }, 800)
    }
    
    if(localStorage.getItem('completedRounds') != null){
      const completedRoundsArray = (localStorage.getItem('completedRounds')).split(',')
      completedRoundsArray.push(currentRound + '-' + score + '-' + distance)
      //
      
      localStorage.setItem('completedRounds', completedRoundsArray)
    }
    else{
      localStorage.setItem('completedRounds', currentRound + '-' + score + '-' + distance)
      
    }
    
  }

  function nextRoundClick(){
    const roundResultsTopWrapper = document.getElementById('round-results-top-wrapper')
    const roundResultsBottomWrapper = document.getElementById('round-results-bottom-wrapper')
    
    roundResultsTopWrapper.style.transition = ''
    roundResultsBottomWrapper.style.transition = ''
    roundResultsTopWrapper.style.transform = 'translateX(100vw)'
    roundResultsBottomWrapper.style.transform = 'translateX(-100vw)'
    roundResultsTopWrapper.style.opacity = '0'
    roundResultsBottomWrapper.style.opacity = '0'
    updateGoogleMapRoundDifficulty.current(singlePlayerGameSettings[currentRound].difficulty)
    setCurrentRoundDifficulty(singlePlayerGameSettings[currentRound].difficulty)

    setTimeout(() =>{
      document.getElementById('results-bar-inner').style.width = '0px'
      setRoundResultsPage(null)
    }, 800)

    setTimeout(() => {
      blowupImageDisabled.current = false
      mapFullScreenEnableListeners.current()

    }, 900)
    
  }

  function summaryPageClick(){

    setSummaryPage(<Summary />)
    const roundResultsTopWrapper = document.getElementById('round-results-top-wrapper')
    const roundResultsBottomWrapper = document.getElementById('round-results-bottom-wrapper')
    
    roundResultsTopWrapper.style.transition = ''
    roundResultsBottomWrapper.style.transition = ''
    roundResultsTopWrapper.style.transform = 'translateY(100vh)'
    roundResultsBottomWrapper.style.transform = 'translateY(-100vh)'
    roundResultsTopWrapper.style.opacity = '0'
    roundResultsBottomWrapper.style.opacity = '0'

    setTimeout(() =>{
      setRoundResultsPage(null)
    }, 800)
  }

  function increaseMagnificationStrength(){
    if(magnificationStrength < 6){
      setMagnificationStrength(magnificationStrength + 1)
    }
  }

  function descreaseMagnificationStrength(){
    if(magnificationStrength > 0){
      setMagnificationStrength(magnificationStrength - 1)
    }
  }

  function increaseMagnificationSize(){
    if(magnificationSize < 5){
      setMagnificationSize(magnificationSize + 1)
    }
  }

  function decreaseMagnificationSize(){
    if(magnificationSize > 0){
      setMagnificationSize(magnificationSize - 1)
    }
  }

  function toggleTiltClick(){
    
    if(tiltState === true){
      googleMapToggleTilt.current(false)
      tiltMapPhoto.current = mapTiltOff
      setTiltState(false)
      setRotateMapLeft(blackRotationBox)
      setRotateMapRight(blackRotationBox)
    }
    else{
      googleMapToggleTilt.current(true)
      tiltMapPhoto.current = mapTiltOn
      setTiltState(true)
      setRotateMapLeft(rotateMapLeftImage)
      setRotateMapRight(rotateMapRightImage)
    }
  }

  function rotateClockwiseClick(){
    googleMapRotateClockwise.current()
  }

  function rotateCounterClockwiseClick(){
    // spin icon
    googleMapRotateCounterClockwise.current()

  }

  function googleMapIncreaseZoomClick(){
    googleMapChangeZoom.current(1)
  }
  function googleMapDecreaseZoomClick(){
    googleMapChangeZoom.current(-1)

  }

  function mapFullScreenClick(){
    if(mapFullScreenState.current === false){
      mapFullScreenDisableListeners.current()
      const mapOuterWrapper = document.getElementById('map-outer-wrapper')
      const mapSidebar = document.getElementById('map-sidebar-wrapper')

      mapOuterWrapper.style.width = '100vw'
      mapOuterWrapper.style.height = '100vh'

      mapSidebar.style.transition = 'ease-in 250ms'
      mapSidebar.style.width = '60px'

      document.getElementById('map-tilt-setting').style.width = '24px'
      document.getElementById('rotate-map-left').style.width = '24px'
      document.getElementById('rotate-map-right').style.width = '24px'
      document.getElementById('map-increase-button').style.width = '24px'
      document.getElementById('map-decrease-button').style.width = '24px'
      document.getElementById('map-full-screen').style.width = '24px'

      document.getElementById('map-tilt-setting').style.height = '24px'
      document.getElementById('rotate-map-left').style.height = '24px'
      document.getElementById('rotate-map-right').style.height = '24px'
      document.getElementById('map-increase-button').style.height = '24px'
      document.getElementById('map-decrease-button').style.height = '24px'
      document.getElementById('map-full-screen').style.height = '24px'

      mapFullScreenState.current = true

    }
    else{
      const mapOuterWrapper = document.getElementById('map-outer-wrapper')
      const mapSidebar = document.getElementById('map-sidebar-wrapper')

      mapOuterWrapper.style.width = ''
      mapOuterWrapper.style.height = ''

      mapSidebar.style.width = ''
      document.getElementById('map-tilt-setting').style.width = ''
      document.getElementById('rotate-map-left').style.width = ''
      document.getElementById('rotate-map-right').style.width = ''
      document.getElementById('map-increase-button').style.width = ''
      document.getElementById('map-decrease-button').style.width = ''
      document.getElementById('map-full-screen').style.width = ''

      document.getElementById('map-tilt-setting').style.height = ''
      document.getElementById('rotate-map-left').style.height = ''
      document.getElementById('rotate-map-right').style.height = ''
      document.getElementById('map-increase-button').style.height = ''
      document.getElementById('map-decrease-button').style.height = ''
      document.getElementById('map-full-screen').style.height = ''

      mapFullScreenState.current = false
      setTimeout(() => {
        mapFullScreenEnableListeners.current()
      }, 200)
      

    }
    
  }


  $.fn.blowupStart = function (attributes) {

    var $element = this;

    // If the target element is not an image
    if (!$element.is("img")) {
      console.log("%c Blowup.js Error: ", "%cTarget element is not an image.", 
        "background: #FCEBB6; color: #F07818; font-size: 17px; font-weight: bold;",
        "background: #FCEBB6; color: #F07818; font-size: 17px;");
      return;
    }

    // Constants
    var $IMAGE_URL    = $element.attr("src");
    var NATIVE_IMG    = new Image();
    NATIVE_IMG.src    = $element.attr("src");

    // Default attributes
    var scaleOfficial = .25 * (magnificationStrength + 1)
    var sizeOfficial = 50 * magnificationSize
    var defaults = {
      round         : true,
      width         : sizeOfficial,
      height        : sizeOfficial,
      background    : "#FFF",
      shadow        : "10px 10px 50px 0 #000",
      border        : "3px solid white",
      cursor        : true,
      zIndex        : 999999,
      scale         : scaleOfficial,
      customClasses : ""
    }

    // Update defaults with custom attributes
    var $options = $.extend(defaults, attributes);

    
    
    $element.css("cursor", $options.cursor ? "crosshair" : "none");

    // Create magnification lens element
    var lens = document.createElement("div");
    lens.id = "BlowupLens";

    // Attack the element to the body
    $("body").append(lens);

    // Updates styles
    var $blowupLens = $("#BlowupLens");

    $blowupLens.css({
      "position"          : "absolute",
      "display"           : "none",
      "pointer-events"    : "none",
      "zIndex"            : $options.zIndex,
      "width"             : $options.width,
      "height"            : $options.height,
      "border"            : $options.border,
      "background"        : $options.background,
      "border-radius"     : $options.round ? "50%" : "none",
      "box-shadow"        : $options.shadow,
      "background-repeat" : "no-repeat",
    });

    // Add custom CSS classes
    $blowupLens.addClass($options.customClasses);
  }

  function startEventListeners(){
    document.getElementById('photo-to-guess').addEventListener('dragstart', (e) => {
      e.preventDefault()
    })

    // Mouse motion on image
    document.getElementById('photo-to-guess').addEventListener('mousemove', (e) => {
      if(blowupImageDisabled.current === false){
        $("#BlowupLens").css("display", "block");
        
        var $element = $("img.photo-to-guess")

        // Lens position coordinates
        let lensOptions = document.getElementById('BlowupLens')
        let lensDiameter = lensOptions.style.width.substring(0, (lensOptions.style.width).length - 2)
        var lensX = e.pageX - lensDiameter / 2;
        var lensY = e.pageY - lensDiameter / 2;

        // Relative coordinates of image
        var relX = e.pageX - $element.offset().left;
        var relY = e.pageY - $element.offset().top;
      
        // Zoomed image coordinates 
        
        var $IMAGE_URL    = $element.attr("src")
        var NATIVE_IMG    = new Image()
        NATIVE_IMG.src    = $element.attr("src")
        var scaleValue = .25 * (magnificationStrength + 1)
        var zoomX = -Math.floor(relX / $element.width() * (NATIVE_IMG.width * scaleValue) - lensDiameter / 2)
        var zoomY = -Math.floor(relY / $element.height() * (NATIVE_IMG.height * scaleValue) - lensDiameter / 2)

        var backPos = zoomX + "px " + zoomY + "px";
        var backgroundSize = NATIVE_IMG.width * scaleValue + "px " + NATIVE_IMG.height * scaleValue + "px";

        // Apply styles to lens
        $("#BlowupLens").css({
          left                  : lensX,
          top                   : lensY,
          "background-image"    : "url(" + document.getElementById('photo-to-guess').src + ")",
          "background-size"     : backgroundSize,
          "background-position" : backPos
        });
      }
    })


    document.getElementById('photo-to-guess').addEventListener('mouseleave', () => {
      $("#BlowupLens").css("display", "none");
    })
  }

  return (
    <div className='wrapper'>
      {summaryPage}
      {roundResultsPage}
      <div id='photo-to-guess-wrapper' className='photo-to-guess-wrapper'>
        <img src={photoToGuess} id='photo-to-guess' className='photo-to-guess' alt='guess'/>
      </div>

      <div id='sidebar-wrapper' className='sidebar-wrapper'>
        <div id='game-information-wrapper' className='game-information-wrapper'>
          <div className='game-information-top'>
            <p style={{color: "#8e0c3a"}}><u>Photo:</u></p> &nbsp; <p style={{fontFamily: "Pacifico", fontSize: "23px", marginTop: '20px'}}>  #{photoNumber} </p> 
            <p style={{fontFamily: "Pacifico", fontSize: "20px", marginTop: '20px'}}>&nbsp;- {currentRoundDifficulty}</p> 
             
          </div>
          <div className='game-information-bottom'>
            <div className='game-information-header'>
              <div className='game-information-header-sections'>
                <div className='game-information-header-titles'>
                  <u>Score</u>
                </div>
                <div className='game-information-header-content'>
                  <div className='game-information-header-content-score'>
                    {totalScore.toLocaleString()}
                  </div>
                  <div className='game-information-header-content-mg'>
                    M&G
                  </div>
                </div>
              </div>
              <div className='game-information-header-sections'>
                <div className='game-information-header-titles'>
                  <u>Round</u>
                </div>
                <div className='game-information-header-content'>
                  {currentRound} / 5
                </div>
              </div>
            </div>

            <div id='submit-guess-button' className='submit-guess-button' onClick={submitGuess}>
              {submitButtonInside}
            </div>
          </div>

        </div>
        
        <div id='map-outer-wrapper' className='map-outer-wrapper'>
          <div id='map-sidebar-wrapper' className='map-sidebar-wrapper'>
            <div className='map-sidebar-magnifier-settings'>

            </div>
            <div className='map-sidebar-map-settings'>
              <div className='map-sidebar-map-settings-tilt-group'>
                <div id='map-sidebar-map-settings-tilt-title' className='map-sidebar-map-settings-tilt-title'>
                  Tilt<br></br>
                  map
                </div>
                
                <img src={tiltMapPhoto.current} onClick={toggleTiltClick} id='map-tilt-setting' className='map-sidebar-map-settings-icon' alt='enable or disable map tilt' title='enable or disable map tilt'/>
                <img src={rotateMapLeft} onClick={rotateCounterClockwiseClick} id='rotate-map-left' className='map-sidebar-map-settings-icon' alt='rotate map counter clockwise' title='rotate map counter clockwise'/>
                <img src={rotateMapRight} onClick={rotateClockwiseClick} id='rotate-map-right' className='map-sidebar-map-settings-icon' alt='rotate map clockwise' title='rotate map clockwise'/>
              </div>
              <div className='map-sidebar-map-settings-zoom-group'>
                <img src={mapIncrease} onClick={googleMapIncreaseZoomClick} id='map-increase-button' className='map-sidebar-map-settings-icon' alt='inrease map zoom' title='inrease map zoom'/>
                <img src={mapDecrease} onClick={googleMapDecreaseZoomClick} id='map-decrease-button' className='map-sidebar-map-settings-icon' alt='decrease map zoom' title='derease map zoom'/>
              </div>
              
              
              <img src={mapFullScreen} onClick={mapFullScreenClick} id='map-full-screen' className='map-sidebar-map-settings-icon' alt='make map full screen' title='make map full screen'/>
            </div>
          </div>
          <div id='map-wrapper' className='map-wrapper'>
            <GoogleMap 
              googleMapToggleTilt={googleMapToggleTilt} 
              googleMapRotateClockwise={googleMapRotateClockwise} 
              googleMapRotateCounterClockwise={googleMapRotateCounterClockwise}
              googleMapChangeZoom={googleMapChangeZoom}
              getCircleCoordinates={getCircleCoordinates}
              mapFullScreenEnableListeners={mapFullScreenEnableListeners}
              mapFullScreenDisableListeners={mapFullScreenDisableListeners}
              updateGoogleMapRoundDifficulty={updateGoogleMapRoundDifficulty}
              resetGoogleMap={resetGoogleMap}
              singlePlayerGameSettings={JSON.parse(localStorage.getItem('singlePlayerGameSettings'))}
              setSubmitButtonInsideState={setSubmitButtonInsideState}
            />
          </div>
        </div>

        
      </div>
      
    </div>
    
  )

}

