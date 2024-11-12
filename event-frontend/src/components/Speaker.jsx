import React from 'react';
import "../static/Speaker.css"

const Speaker = ({ image, name, title, description }) => {
  return (
    // <div style={styles.card}>
    //   <img src={image} alt="Profile" style={styles.image} />
    //   <h2 style={styles.name}>{name}</h2>
    //   <p style={styles.title}>{title}</p>
    //   <p style={styles.description}>{description}</p>
    // </div>
    <>
      
      <div className="speaker-panel">
        <div className="speaker-ring">
          <div className="speaker-card card1"><img className="speaker-image"src={image} alt={name} /></div>
          <div className="speaker-border">
            <p className="speaker-title">{name}</p>
            <div className="speaker-slide">
              <h6 className="speaker-para">{title}</h6>
              <div className="speaker-line">
                <h6 className="speaker-para">{description}</h6> <i className="fa speaker-fa-plane" aria-hidden="true"></i>
                {/* <h6 className="speaker-para">£849</h6> */}
              </div>
              {/* <div className="speaker-line"> */}
                {/* <h6 className="speaker-para">RTN</h6> <i className="fa speaker-fa-plane" aria-hidden="true"></i> */}
                {/* <h6 className="speaker-para">£659</h6> */}
              {/* </div> */}
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
  title: {
    fontSize: '16px',
    color: '#03022d', // Adjust color to your preference
    margin: '5px 0',
    fontFamily: "poppins , sans-serif" ,
    fontWeight: "800",
  },
  description: {
    fontSize: '14px',
    color: '#03022d',
  },
};

export default Speaker;