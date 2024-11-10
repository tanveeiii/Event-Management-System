import React ,{ useState } from 'react';
import Table from '../components/Table'; // Import the Table component
import '../static/Dashboard.css'; // Custom styles for TeamLogin page

const Dashboard = () => {
    const [showTable, setShowTable] = useState(false);

    // Define the toggle function to switch showTable state
    const toggleTableVisibility = () => {
        setShowTable((prevShowTable) => !prevShowTable);
    };
    
    return (
        <div className="team-login-container">
            {/* <button 
                className="table-toggle-button" 
                onClick={toggleTableVisibility}
            >
                Team Members
            </button>
            {showTable && (
                <div className="table-wrapper">
                    
                    <Table />
                </div>
            )} */}
            <Table />
        </div>
    );
};

export default Dashboard;
