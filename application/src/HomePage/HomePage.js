import React, { useRef, useEffect, useState } from 'react'
import './styles/home-page.css'
import FancyText from './FancyText'
import asuTempeCampus from '../images/asu-tempe-campus.jpg'  
import HomePageGameSelectionButtons from './HomePageGameSelectionButtons'
import HomePageSinglePlayerButtons from './HomePageSinglePlayerButtons'
import HomePageHeaders from './HomePageHeaders'
import { useNavigate } from "react-router-dom";
import $ from 'jquery'
import MultiplayerNewGameJoinGame from './MultiplayerNewGameJoinGame'
import HomePageMultiplayerLobby from './HomePageMultiplayerLobby'

export default function App() {
  
  const [ASUHeaderFancyText, setASUHeaderFancyText] = useState(<FancyText InnerTextID={'asu-guesser-fancy-text-id'}/>)
  const [currentHomeScreenButtons, setCurrentHomeScreenButtons] = useState(<HomePageGameSelectionButtons 
    isFirstLoad={true}
    selectMultiplayerGame={selectMultiplayerGame}
    selectSinglePlayerGame={selectSinglePlayerGame}
  />)

  const tempeBackgroundImageRef = useRef()
  const tempeBackgroundImageParentRef = useRef()

  let navigate = useNavigate();

  useEffect(() => {
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
          
          navigate('/mobile')
    }
    $("img.background-image").blowup();    

    document.getElementById('home-screen-game-selection-wrapper').style.transform = 'translateX(0)'

    localStorage.removeItem('completedRounds')
    

    window.addEventListener('resize', windowResize)

    const currentWidth = window.innerWidth
    
    if(currentWidth > 676){
      if(document.getElementById('asu-guesser-fancy-text-id') == null){
        setASUHeaderFancyText(null)
        setASUHeaderFancyText(<FancyText InnerTextID={'asu-guesser-fancy-text-id'}/>)
      }
    }
    else if(currentWidth < 675 && currentWidth > 376){
      if(document.getElementById('asu-guesser-fancy-text-id-675') == null){
        setASUHeaderFancyText(null)
        setASUHeaderFancyText(<FancyText InnerTextID={'asu-guesser-fancy-text-id-675'}/>)
      }
    }
    else if(currentWidth < 375){
      if(document.getElementById('asu-guesser-fancy-text-id-375') == null){
        setASUHeaderFancyText(null)
        setASUHeaderFancyText(<FancyText InnerTextID={'asu-guesser-fancy-text-id-375'}/>)
      }
    }

    // Unmount
    return () => {
      window.removeEventListener('resize', windowResize)
    }
  }, [])

  function windowResize(){
    const currentWidth = window.innerWidth
    
    if(currentWidth > 676){
      if(document.getElementById('asu-guesser-fancy-text-id') == null){
        setASUHeaderFancyText(null)
        setASUHeaderFancyText(<FancyText InnerTextID={'asu-guesser-fancy-text-id'}/>)
      }
    }
    else if(currentWidth < 675 && currentWidth > 376){
      if(document.getElementById('asu-guesser-fancy-text-id-675') == null){
        setASUHeaderFancyText(null)
        setASUHeaderFancyText(<FancyText InnerTextID={'asu-guesser-fancy-text-id-675'}/>)
      }
    }
    else if(currentWidth < 375){
      if(document.getElementById('asu-guesser-fancy-text-id-375') == null){
        setASUHeaderFancyText(null)
        setASUHeaderFancyText(<FancyText InnerTextID={'asu-guesser-fancy-text-id-375'}/>)
      }
    }
    

  }


    $.fn.blowup = function (attributes) {
  
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
      var defaults = {
        round         : true,
        width         : 200,
        height        : 200,
        background    : "#FFF",
        shadow        : "10px 10px 50px 0 #000",
        border        : "3px solid white",
        cursor        : true,
        zIndex        : 999999,
        scale         : 1,
        customClasses : ""
      }
  
      // Update defaults with custom attributes
      var $options = $.extend(defaults, attributes);
  
      // Modify target image
      $element.on('dragstart', function (e) { e.preventDefault(); });
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
  
      // Show magnification lens
      $element.mouseenter(function () {
        $blowupLens.css("display", "block");
      })
  
      // Mouse motion on image
      $element.mousemove(function (e) {
  
        // Lens position coordinates
        var lensX = e.pageX - $options.width / 2;
        var lensY = e.pageY - $options.height / 2;
  
        // Relative coordinates of image
        var relX = e.pageX - $(this).offset().left;
        var relY = e.pageY - $(this).offset().top;
       
        // Zoomed image coordinates 
        var zoomX = -Math.floor(relX / $element.width() * (NATIVE_IMG.width * $options.scale) - $options.width / 2);
        var zoomY = -Math.floor(relY / $element.height() * (NATIVE_IMG.height * $options.scale) - $options.height / 2);
  
        var backPos = zoomX + "px " + zoomY + "px";
        var backgroundSize = NATIVE_IMG.width * $options.scale + "px " + NATIVE_IMG.height * $options.scale + "px";
  
        // Apply styles to lens
        $blowupLens.css({
          left                  : lensX,
          top                   : lensY,
          "background-image"    : "url(" + encodeURI($IMAGE_URL) + ")",
          "background-size"     : backgroundSize,
          "background-position" : backPos
        });
      })
  
      // Hide magnification lens
      $element.mouseleave(function () {
        $blowupLens.css("display", "none");
      });
    }

  function selectSinglePlayerGame(){
    document.getElementById('home-screen-game-selection-wrapper').style.transition = ''
    document.getElementById('home-screen-game-selection-wrapper').style.transform = 'translateX(-100vw)'
    document.getElementById('home-page-back-button').style.transform = 'translateX(0)'

    setTimeout(()=> {
      setCurrentHomeScreenButtons(<HomePageSinglePlayerButtons />)
    }, 500)
  }

  function selectMultiplayerGame(){
    document.getElementById('home-screen-game-selection-wrapper').style.transition = ''
    document.getElementById('home-screen-game-selection-wrapper').style.transform = 'translateX(-100vw)'
    document.getElementById('home-page-back-button').style.transform = 'translateX(0)'

    setTimeout(()=> {
      setCurrentHomeScreenButtons(<MultiplayerNewGameJoinGame 
        multiplayerJoinGameClick={multiplayerJoinGameClick}
        multiplayerNewGameClick={multiplayerNewGameClick}
      />)
    }, 500)
  }

  function homePageBackButton(){
    //document.getElementById('home-screen-single-player-buttons-wrapper').style.transform = 'translateX(100vw)'
    //document.getElementById('single-player-home-page-back-button').style.transform = 'translateY(300px)'

    if(document.getElementById('home-screen-single-player-buttons-wrapper')){
      document.getElementById('home-screen-single-player-buttons-wrapper').style.transform = 'translateX(100vw)'
      document.getElementById('home-page-back-button').style.transform = 'translateY(300px)'
    }
    else if(document.getElementById('multiplayer-new-game-join-game-wrapper')){
      document.getElementById('multiplayer-new-game-join-game-wrapper').style.transform = 'translateX(100vw)'
      document.getElementById('home-page-back-button').style.transform = 'translateY(300px)'
    }
    else if(document.getElementById('home-page-multiplayer-lobby-wrapper')){
      document.getElementById('home-page-multiplayer-lobby-wrapper').style.transform = 'translateX(100vw)'
      document.getElementById('home-page-back-button').style.transform = 'translateY(300px)'
    }

    setTimeout(()=>{
      setCurrentHomeScreenButtons(<HomePageGameSelectionButtons 
        isFirstLoad={false}
        selectMultiplayerGame={selectMultiplayerGame}
        selectSinglePlayerGame={selectSinglePlayerGame}
      />)
    }, 500)
    
  }

  function multiplayerNewGameClick(){
    document.getElementById('multiplayer-new-game-wrapper').style.transform = 'translateY(100vh)'
    document.getElementById('multiplayer-join-game-wrapper').style.transform = 'translateY(100vh)'

    setTimeout(()=>{
        setCurrentHomeScreenButtons(<HomePageMultiplayerLobby />)
    }, 500)
  }

  function multiplayerJoinGameClick(){
    document.getElementById('multiplayer-new-game-wrapper').style.transform = 'translateY(100vh)'
    document.getElementById('multiplayer-join-game-wrapper').style.transform = 'translateY(100vh)'

    setTimeout(()=>{
        
    }, 500)

  }

  return (
    
      <div ref={tempeBackgroundImageParentRef}  className='background-image-wrapper'>
        <div className='background-image-filter'></div>
        <img id='background-image' ref={tempeBackgroundImageRef} src={asuTempeCampus} draggable="false" className='background-image' alt='asu tempe campus background' />
        
        <div id="home-page-content" className='home-page-content'>
          <HomePageHeaders />
          <div className='asu-header-wrapper'>
            {ASUHeaderFancyText}
          </div>

          <div className='home-page-lower-half-buttons'>
            {currentHomeScreenButtons}
          </div>
          <div id='home-page-back-button' className='home-page-back-button' onClick={homePageBackButton}>
            Back!
          </div>
        </div>
        
      </div>

  )

}
