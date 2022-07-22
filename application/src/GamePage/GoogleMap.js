import React, { useEffect } from 'react'
import './styles/google-map.css'
import $ from 'jquery'

import fork from '../images/fork.png'  

export default function GoogleMap(props) {
    
    let map
    let marker
    let circle
    let myTimeout
    let currentDifficulty
    let mapMouseOverListener
    let mapMouseOutListener
    let mapMouseDownListener
    let mapMouseUpListener
    
    let mapOptions = {
        center: {lat: 33.41925110997366, lng: -111.93285502162028},
        zoom: 15,
        mapTypeId: 'satellite',
        mapTypeControl: false,
        disableDefaultUI: true,
        gestureHandling: 'greedy',
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

    function mousedownSidebarListener(){
        window.google.maps.event.removeListener(mapMouseOutListener)
        document.getElementById('map-sidebar-wrapper').removeEventListener('mouseover', mouseoverSidebarListener)

        document.getElementById('map-sidebar-wrapper').removeEventListener('mouseout', mouseoutSidebarListener)
    }

    function mouseupSidebarListener(){
        mapMouseOutListener = map.addListener('mouseout', mouseoutSidebarListener)
        document.getElementById('map-sidebar-wrapper').addEventListener('mouseover', mouseoverSidebarListener)
        document.getElementById('map-sidebar-wrapper').addEventListener('mouseout', mouseoutSidebarListener)
        
    }

    function mouseoverSidebarListener(){
        if(document.getElementById('sidebar-wrapper').clientWidth <= document.getElementById('photo-to-guess-wrapper').clientWidth){
            clearTimeout(myTimeout)
            const mapOuterWrapper = document.getElementById('map-outer-wrapper')
            const mapSidebar = document.getElementById('map-sidebar-wrapper')
            
            const currentScreenWidth = $(window).width()

            if(currentScreenWidth > 1000){
                mapOuterWrapper.style.transition = 'ease-in 250ms'
                mapOuterWrapper.style.width = '50%'

                mapSidebar.style.transition = 'ease-in 250ms'
                mapSidebar.style.width = '60px'
                
                document.getElementById('map-sidebar-map-settings-tilt-title').style.fontSize = '14px'
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
            }
            else{
                mapOuterWrapper.style.transition = 'ease-in 250ms'
                mapOuterWrapper.style.height = '50%'

                mapSidebar.style.transition = 'ease-in 250ms'
                mapSidebar.style.width = '60px'
                if($(window).height() > 850){
                    document.getElementById('map-sidebar-map-settings-tilt-title').style.fontSize = '14px'
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
                }
                else if($(window).height() <= 850 && $(window).height() > 600){
                    document.getElementById('map-sidebar-map-settings-tilt-title').style.fontSize = '14px'
                    document.getElementById('map-tilt-setting').style.width = '20px'
                    document.getElementById('rotate-map-left').style.width = '20px'
                    document.getElementById('rotate-map-right').style.width = '20px'
                    document.getElementById('map-increase-button').style.width = '20px'
                    document.getElementById('map-decrease-button').style.width = '20px'
                    document.getElementById('map-full-screen').style.width = '20px'

                    document.getElementById('map-tilt-setting').style.height = '20px'
                    document.getElementById('rotate-map-left').style.height = '20px'
                    document.getElementById('rotate-map-right').style.height = '20px'
                    document.getElementById('map-increase-button').style.height = '20px'
                    document.getElementById('map-decrease-button').style.height = '20px'
                    document.getElementById('map-full-screen').style.height = '20px'
                }
                else{
                    document.getElementById('map-sidebar-map-settings-tilt-title').style.fontSize = '14px'
                    document.getElementById('map-tilt-setting').style.width = '16px'
                    document.getElementById('rotate-map-left').style.width = '16px'
                    document.getElementById('rotate-map-right').style.width = '16px'
                    document.getElementById('map-increase-button').style.width = '16px'
                    document.getElementById('map-decrease-button').style.width = '16px'
                    document.getElementById('map-full-screen').style.width = '16px'

                    document.getElementById('map-tilt-setting').style.height = '16px'
                    document.getElementById('rotate-map-left').style.height = '16px'
                    document.getElementById('rotate-map-right').style.height = '16px'
                    document.getElementById('map-increase-button').style.height = '16px'
                    document.getElementById('map-decrease-button').style.height = '16px'
                    document.getElementById('map-full-screen').style.height = '16px'
                }
            }
            // mapOuterWrapper.style.borderTopLeftRadius = '40px'
            mapOuterWrapper.style.borderLeft = 'px solid black'
            mapOuterWrapper.style.borderTop = '6px solid black'
        }
        else{
            clearTimeout(myTimeout)
            const mapOuterWrapper = document.getElementById('map-outer-wrapper')
            const mapSidebar = document.getElementById('map-sidebar-wrapper')

            mapSidebar.style.transition = 'ease-in 250ms'
            mapSidebar.style.width = '60px'

            document.getElementById('map-sidebar-map-settings-tilt-title').style.fontSize = '14px'
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
        }
        
    }

    function mouseoutSidebarListener(){
        myTimeout = setTimeout(async () => {
            const mapOuterWrapper = document.getElementById('map-outer-wrapper')
            const mapSidebar = document.getElementById('map-sidebar-wrapper')
            const currentScreenWidth = $(window).width()

            if(currentScreenWidth > 1000){
                mapOuterWrapper.style.width = ''
                mapSidebar.style.width = ''
            }
            else{
                mapOuterWrapper.style.height = ''
                mapSidebar.style.width = ''
            }
            document.getElementById('map-sidebar-map-settings-tilt-title').style.fontSize = ''
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
            // mapOuterWrapper.style.transition = 'ease-in 200ms'
            // mapSidebar.style.transition = 'ease-in 200ms'
            setTimeout(async () => {
                mapOuterWrapper.style.transition = 'ease-in 0ms'
                mapSidebar.style.transition = 'ease-in 0ms'
            }, 200);
            mapOuterWrapper.style.borderLeft = '3px solid black'
            mapOuterWrapper.style.borderTop = '3px solid black'
        }, 800);
    }

    function initMap() {
        map = new window.google.maps.Map(document.getElementById('map-wrapper'), mapOptions);
        
    
        map.addListener('click', (mapsMouseEvent) => {

            const location = mapsMouseEvent.latLng
            let radius = 15

            switch (currentDifficulty.toLowerCase()){

                case 'hard':
                    radius = 8
                break;

                case 'impossible':
                    radius = 8
                break;
            }

            if (circle == null){
                circle = new window.google.maps.Circle({
                    strokeColor: "#8e0c3a",
                    strokeOpacity: 0.8,
                    strokeWeight: 3,
                    fillColor: "#ffc729",
                    fillOpacity: 0.35,
                    map,
                    center: location,
                    radius: radius,
                })
            }
            else {
                circle.setCenter(location); 
            } 

            setTimeout(() => {
                props.setSubmitButtonInsideState()
            }, 250)
            
            const submitButton = document.getElementById('submit-guess-button')
            submitButton.style.opacity = '1'
            submitButton.style.cursor = 'pointer'

            
        })


        mapMouseOverListener = map.addListener('mouseover', mouseoverSidebarListener)

        mapMouseDownListener = map.addListener('mousedown', mousedownSidebarListener)

        mapMouseUpListener = map.addListener('mouseup', mouseupSidebarListener)

        mapMouseOutListener = map.addListener('mouseout', mouseoutSidebarListener)

        document.getElementById('map-sidebar-wrapper').addEventListener('mouseover', mouseoverSidebarListener)

        document.getElementById('map-sidebar-wrapper').addEventListener('mouseout', mouseoutSidebarListener)
    }

    

    function resetGoogleMap(){
        circle.setMap(null)
        map.setCenter({lat: 33.41925110997366, lng: -111.93285502162028})
        map.set('zoom', 15)
        map.setTilt(0)
        circle = null
    }

    function updateGoogleMapRoundDifficulty(newDifficulty){
        currentDifficulty = newDifficulty
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

    function changeZoom(change){
        if(change === 1){
            map.setZoom(map.zoom + 1)
        }
        else if(change === -1){
            map.setZoom(map.zoom - 1)
        }
    }

    function mapFullScreenEnableListeners(){
        mapMouseOverListener = map.addListener('mouseover', mouseoverSidebarListener)
        mapMouseOutListener = map.addListener('mouseout', mouseoutSidebarListener)
        mapMouseDownListener = map.addListener('mousedown', mousedownSidebarListener)
        mapMouseUpListener = map.addListener('mouseup', mouseupSidebarListener)

        document.getElementById('map-sidebar-wrapper').addEventListener('mouseover', mouseoverSidebarListener)
        document.getElementById('map-sidebar-wrapper').addEventListener('mouseout', mouseoutSidebarListener)
    }

    function mapFullScreenDisableListeners(){

        window.google.maps.event.removeListener(mapMouseOverListener)
        window.google.maps.event.removeListener(mapMouseOutListener)
        window.google.maps.event.removeListener(mapMouseDownListener)
        window.google.maps.event.removeListener(mapMouseUpListener)

        document.getElementById('map-sidebar-wrapper').removeEventListener('mouseover', mouseoverSidebarListener)
        document.getElementById('map-sidebar-wrapper').removeEventListener('mouseout', mouseoutSidebarListener)
    }

    function getCircleCoordinates(){
        return circle.center
    }

    useEffect( () => {
        document.getElementById('google-map-script').addEventListener('load', function(){
            initMap()
        })

        if(window.google !== undefined){
            initMap()
            // ADD LOADING SCREEN FOR MAP!********************************** 
        }

        props.googleMapToggleTilt.current = toggleTilt
        props.googleMapRotateClockwise.current = rotateClockwise
        props.googleMapRotateCounterClockwise.current = rotateCounterClockwise
        props.googleMapChangeZoom.current = changeZoom
        props.mapFullScreenEnableListeners.current = mapFullScreenEnableListeners
        props.mapFullScreenDisableListeners.current = mapFullScreenDisableListeners
        props.getCircleCoordinates.current = getCircleCoordinates
        props.updateGoogleMapRoundDifficulty.current = updateGoogleMapRoundDifficulty
        props.resetGoogleMap.current = resetGoogleMap
    }, [])

  return (
    <div id='google-map' className='google-map'></div>
  )

}

