import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LogoImg from '../assets/pronites.jpeg'

const Register = () => {
    const [data, setdata] = useState([])
    const { index } = useParams();
    // const params = {"id": index}
    const participantListURL = "http://localhost:8000/api/participants/";
    const getCompDetails=async()=>{
    const res = await fetch(`http://localhost:8000/api/competitions/?id=${index}`, {
        method: "GET",
    })
    const resData = await res.json()
    // console.log(resData)
    setdata(resData)}
    useEffect(() => {
        getCompDetails()
    }, [])
    useEffect(() => {
        // console.log(data)
    }, [data])
    const handleRegister = async()=>{
        const partName = document.getElementById('name').value
        const contact = document.getElementById('contact').value
        const email = document.getElementById('email').value
        const compName = data[0]['name']
        const body = {
            "name":partName,
            "phoneNo":contact,
            "emailId":email,
            "competitionName":compName,
        }
        console.log(compName)
        const response = await fetch(participantListURL,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(body)
            }
        )
        const dataReg = await response.json()
        console.log(dataReg)
    }
    
    return (
        <>
            <form method='post' className='T-form'>
                <div className="form-details">
                    <h3 className='comp-name' style={{marginBottom:"20px"}}> { data.length>0?data[0]['name']:"Loading.. "} </h3>
                    <div className="T-field">
                        <input type="text" className='T-input' placeholder='' required id="name" />
                        <label htmlFor="name" className='input-label'>Name</label>
                    </div>
                    <div className="T-field">
                        <input type="text" className='T-input' placeholder='' required id="email" />
                        <label htmlFor="email" className='input-label'>Email ID</label>
                    </div>
                    <div className="T-field">
                        <input type="text" className='T-input' placeholder='' required id="contact" />
                        <label htmlFor="contact" className='input-label'>Contact No.</label>
                    </div>
                    <button type='button' onClick={handleRegister} className='pay'>Register</button>
                </div>
                <div className="R-poster poster">
                    <img src={data.length>0?data[0]['poster']:"loading"} alt="" />
                </div>
            </form>
        </>
    )
}

export default Register