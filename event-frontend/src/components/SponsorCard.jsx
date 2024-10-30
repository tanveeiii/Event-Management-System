import React from 'react'
import '../static/Partners.css'


const SponsorCard = () => {
    return (
        <div className="Scard">
            <a target='_blank' href="https://www.geekster.in/">
                <img alt="" className="Scard-img" src="https://2k21.s3.amazonaws.com/images/Canva.png" />
            </a>
            <div className="Scard-info">
                <p className="Stext-name" style={{ color: "black" }}>
                    Canva
                </p>
                <p className="Stext-title" style={{ color: "black" }}>
                    Creative Partner
                </p>
            </div>
        </div>

    )
}

export default SponsorCard