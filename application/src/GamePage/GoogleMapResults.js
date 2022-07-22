import React, { useEffect } from 'react'
import './styles/google-map.css'
import $ from 'jquery'

import fork from '../images/answer.png'  

export default function GoogleMapResults(props) {
    let map
    let circle
    let mapOptions = {
        center: props.answerCoordinates,
        zoom: 18,
        mapTypeId: 'satellite',
        gestureHandling: 'greedy',
        mapTypeControl: false,
        disableDefaultUI: true,
        minZoom: 14, 
        tilt: 0,
        draggableCursor:'crosshair',
        restriction: {
            latLngBounds: {
              north: 33.44,
              south: 33.40,
              east: -111.90,
              west: -111.96,
            },
        }

    }
    function initMap() {
        map = new window.google.maps.Map(document.getElementById('round-results-bottom-wrapper'), mapOptions);
        let radiusCircle = 15
        if(props.difficulty == 'Hard' || props.difficulty == 'Impossible'){
            radiusCircle = 8
        }

        new window.google.maps.Circle({
            strokeColor: "#8e0c3a",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#ffc729",
            fillOpacity: 0.35,
            map,
            center: props.guessCoordinates,
            radius: radiusCircle,
        })

        new window.google.maps.Marker({
            position: props.answerCoordinates,
            map: map,
            icon: fork
        }); 
        const lineSymbol = {
            path: "M 0,-1 0,1",
            strokeOpacity: 1,
            scale: 4,
          };
        new window.google.maps.Polyline({
            path: [props.guessCoordinates, 
                props.answerCoordinates], 
                map: map, 
                strokeColor: '#8e0c3a',
                strokeOpacity: '0',
                icons: [
                    {
                      icon: lineSymbol,
                      offset: "0",
                      repeat: "20px",
                    },
                  ],
        })
    }

    function toggleTilt(toggleValue){
        if(toggleValue === true){
            map.setTilt(45)
        }
        else if(toggleValue === false){
            map.setTilt(0)
        }
        
    }

    function rotateCounterClockwise(){
        let heading = map.getHeading() || 0
        map.setHeading(heading - 90)
    }

    function rotateClockwise(){
        let heading = map.getHeading() || 0
        map.setHeading(heading + 90)
    }

    useEffect( () => {
        document.getElementById('google-map-script').addEventListener('load', function(){
            initMap()
        })
        
        if(window.google !== undefined){
            initMap()
            // ADD LOADING SCREEN FOR MAP!********************************** 
        }
    }, [])

  return (
    <div id='round-results-map' className='google-map'></div>
  )

}

