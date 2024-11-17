
import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import '../static/Dashboard.css';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const teamDictionary = {
        "Team": false,
        "Attendees": false,
        "Competitions": false,
        "Speakers": false,
        "Sponsors": false,
        "Participants": false,
        "Events": false,
        "Gallery": false,
    };

    
    const {loggedIn, setLoggedIn, rollNo, setRollNo, teamName, setTeamName} = useAuth()
    const [teamname, setteamname] = useState()

    useEffect(() => {
        if (!loggedIn) {
            window.location.href = '/login';
        } else {
            const storedUser = JSON.parse(sessionStorage.getItem("user"));
            if (storedUser && storedUser.teamName) {
                setTeamName(storedUser.teamName); 
            }
        }
    }, [loggedIn]);
    useEffect(() => {
      
    }, [teamname])
    
    

    const [showComponents, setShowComponents] = useState(teamDictionary);
    const [tableData, setTableData] = useState({}); 
    const [url, seturl] = useState('')
    let apiUrl = '';
    const fetchTableData = async (team) => {

        switch (team) {
            case "Team":
                apiUrl = 'http://localhost:8000/api/team/';
                break;
            case "Attendees":
                apiUrl = 'http://localhost:8000/api/attendees/';
                break;
            case "Competitions":
                apiUrl = 'http://localhost:8000/api/competitions/';
                break;
            case "Speakers":
                apiUrl = 'http://localhost:8000/api/speaker/';
                break;
            case "Sponsors":
                apiUrl = 'http://localhost:8000/api/sponsors/';
                break;
            case "Participants":
                apiUrl = 'http://localhost:8000/api/participants/';
                break;
            case "Events":
                apiUrl = 'http://localhost:8000/api/event/';
                break;
            case "Gallery":
                apiUrl = 'http://localhost:8000/api/gallery/';
                break;
            default:
                return;

        }
        seturl(apiUrl)

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setTableData(prevData => ({ ...prevData, [team]: data }));
        } catch (error) {
            console.error(`Error fetching data for ${team}:`, error);
        }
    };

    const handleToggleTable = (team) => {
        setShowComponents(prev => ({
            ...teamDictionary,
            [team]: !prev[team],
        }));
        if (!tableData[team]) {
            fetchTableData(team);
        }
    };
    useEffect(() => {

    }, [url])


    return (
        <div className="table-box">
            <div className='table-sidebar-box'>
                <div className="table-sidebar">
                    <ul className="table-sidebar-list">
                        {Object.keys(teamDictionary).map((team, index) => (
                            <li key={index}>
                                <button
                                    className="table-toggle-button"
                                    onClick={() => handleToggleTable(team)}
                                >
                                    {team}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="team-login-container">
                {Object.keys(teamDictionary).map((team, index) => (
                    showComponents[team] && (
                        <div key={index} className="table-wrapper">
                            <h1 className='table-name'>{team}</h1>
                            <Table tableData={{ "data": tableData[team] || [], "api": url, "team":teamName }} />
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

