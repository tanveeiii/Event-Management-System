import React from 'react';
import '../static/Sidebar.css';

const Sidebar = ({ team_names }) => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Teams</h3>
      <ul className="sidebar-list">
        {
            team_names.map((team , index) => (
                <li key={index} > <a href={`#${team}`} className='unstyled-link'>{team} </a></li>
            ))
        }
      </ul>
    </div>
  );
}

export default Sidebar;