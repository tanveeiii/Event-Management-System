import React from 'react';
import '../static/Partners.css';

const SponsorCard = ({ sponsors }) => {
    return (
        <div className="Scontainer">
            {sponsors.map((sponsor, index) => (
                <div className="Scell">
                    <div key={index} className="Scard">
                        <a target='_blank' rel="noopener noreferrer" href={sponsor.link}>
                            <img alt={sponsor.name} className="Scard-img" src={sponsor.image} />
                        </a>
                        <div className="Scard-info">
                            <p className="Stext-name" style={{ color: "black" }}>
                                {sponsor.name}
                            </p>
                            <p className="Stext-title" style={{ color: "black" }}>
                                {sponsor.title}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SponsorCard;
