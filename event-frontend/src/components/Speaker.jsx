import React from 'react';

const Speaker = ({ image, name, title, description }) => {
  return (
    <div style={styles.card}>
      <img src={image} alt="Profile" style={styles.image} />
      <h2 style={styles.name}>{name}</h2>
      <p style={styles.title}>{title}</p>
      <p style={styles.description}>{description}</p>
    </div>
  );
};

const styles = {
  card: {
    width: '250px',
    padding: '20px',
    borderRadius: '15px',
    textAlign: 'center',
    backgroundColor: '#f76c6c',
    boxShadow: "0px 0px 25px #f76c6c ",
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