import {React, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Countdown from '../components/Countdown'
import FluxusTitle from '../components/FluxusTitle'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import ChatAssistant from '../components/ChatAssistant'

const Homepage = () => {

    const {loggedIn, setLoggedIn, rollNo, setRollNo, teamName, setTeamName} = useAuth()
  useEffect(() => {
    const storedInfo = JSON.parse(sessionStorage.getItem("user"))
    if(storedInfo && storedInfo.loggedIn){
      setLoggedIn(true)
      setTeamName(storedInfo.teamName)
    }
  }, [])
    return (
        <>
            <Countdown />
            <FluxusTitle/>
            <ChatAssistant/>
        </>
    )
}

export default Homepage