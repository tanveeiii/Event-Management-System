import React from 'react';
import "../static/Speaker.css"

const Speaker = ({ image, name,  description }) => {
  return (
    <>
      <div className="speaker-panel">
        <div className="speaker-ring">
          <div className="speaker-card card1"><img className="speaker-image"src={image} alt={name} /></div>
          <div className="speaker-border">
            <p className="speaker-title" style={{"textAlign":"center"}}>{name}</p>
            <div className="speaker-slide">
              <div className="speaker-line">
                <h6 className="speaker-para">{description}</h6> <i className="fa speaker-fa-plane" aria-hidden="true"></i>
              </div>
              
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
};

const styles = {
  card: {
    width: '250px',
    padding: '20px',
    borderRadius: '15px',
    textAlign: 'center',
    backgroundColor: 'white',
    boxShadow: "0px 0px 25px white ",
  },
  image: {
    width: '200px',
    height: '200px',
    borderRadius: '40%',
    marginBottom: '15px',
  },
  name: {
    fontSize: '20px',
    color: '#333',
    margin: '0',
  },
  description: {
    fontSize: '14px',
    color: '#03022d',
  },
};

export default Speaker;