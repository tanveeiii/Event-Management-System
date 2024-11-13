
import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import '../static/Dashboard.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const teamDictionary = {
        "Team": false,
        "Attendees": false,
        "Competitions": false,
        "Speakers": false,
        "Sponsors": false,
        "Participants": false,
        "Events": false,
    };

    const location = useLocation();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!location.state?.loggedIn) {
            navigate('/login');
        }
    }, [location.state, navigate]);
    

    const [showComponents, setShowComponents] = useState(teamDictionary);
    const [tableData, setTableData] = useState({}); // Holds data for each table
    const [url, seturl] = useState('')
    let apiUrl = '';
    // Function to fetch data based on team name
    const fetchTableData = async (teamName) => {

        switch (teamName) {
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
            default:
                return;

        }
        seturl(apiUrl)

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setTableData(prevData => ({ ...prevData, [teamName]: data }));
        } catch (error) {
            console.error(`Error fetching data for ${teamName}:`, error);
        }
    };

    const handleToggleTable = (teamName) => {
        setShowComponents(prev => ({
            ...teamDictionary,
            [teamName]: !prev[teamName],
        }));

        // Fetch data for the selected table if it hasn’t been loaded
        if (!tableData[teamName]) {
            fetchTableData(teamName);
        }
    };
    useEffect(() => {

    }, [url])


    return (
        <div className="table-box">
            <div className='table-sidebar-box'>
                <div className="table-sidebar">
                    <ul className="table-sidebar-list">
                        {Object.keys(teamDictionary).map((teamName, index) => (
                            <li key={index}>
                                <button
                                    className="table-toggle-button"
                                    onClick={() => handleToggleTable(teamName)}
                                >
                                    {teamName}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="team-login-container">
                {Object.keys(teamDictionary).map((teamName, index) => (
                    showComponents[teamName] && (
                        <div key={index} className="table-wrapper">
                            <h1 className='table-name'>{teamName}</h1>
                            <Table tableData={{ "data": tableData[teamName] || [], "api": url, "team":location.state.team }} />
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

