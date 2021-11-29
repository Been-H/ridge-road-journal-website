import React from 'react'
import { LinkStyle } from '../styles/LinkStyle'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className="home-page">
            <div className="main-text">
                <span className="trr">The Ridge Road</span>
                <span className="j"> Journal</span>
                <Link to="/threads" style={LinkStyle}>
                    <a className="read-now" href="">Read Now</a>
                </Link>
               
            </div>
        </div>
    )
}

export default Home
