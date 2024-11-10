import React ,{ useState } from 'react';
import Table from '../components/Table'; // Import the Table component
import '../static/Dashboard.css'; // Custom styles for TeamLogin page
// import "../static/TableSidebar.css"

const Dashboard = () => {

    const teamDictionary = {
        "core Team": false,
        "marketing Team": false,
        "outreach Team": false
    }

    const [showComponents, setShowComponents] = useState(
        teamDictionary
    );

    
    return (
        <>
        <div className="table-box">
            <div className='table-sidebar-box'>
                <div className="table-sidebar">
                <h3 className="table-sidebar-title">Tables</h3>
                <ul className="table-sidebar-list">
                    {
                        Object.entries(teamDictionary).map(([key , value] , index) => (
                            <>
                            <li key={index} >
                            <button 
                                className="table-toggle-button" 
                                onClick={() => setShowComponents({
                                    [key]: !showComponents[key],
                                })}
                                >
                                {key}
                            </button>
                            </li>
                            </>
                        ))
                    }
                </ul>
                </div>
            </div>

            <div className="team-login-container">

                {
                    
                    Object.entries(teamDictionary).map(([key , value] , index) => (
                        <>
                            {
                                showComponents[key] && (
                                    <div className="table-wrapper"  >
                                    <h1 className='table-name'>{key}</h1>
                                    <Table/>
                                </div>
                                )
                            }
                        </>
                    ))


                } 

            </div>
        </div>
        
        </>

    );
};

export default Dashboard;
