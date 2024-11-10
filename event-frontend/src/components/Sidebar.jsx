import React from 'react';
import '../static/Sidebar.css';

const Sidebar = ({ title , list_names }) => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-title">{title}</h3>
      <ul className="sidebar-list">
        {
            list_names.map((team , index) => (
                <li key={index} > <a href={`#${team}`} className='unstyled-link'>{team} </a></li>
            ))
        }
      </ul>
    </div>
  );
}

export default Sidebar;