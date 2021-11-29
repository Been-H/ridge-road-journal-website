import React from 'react'

import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'
import { LinkStyle } from '../styles/LinkStyle'
import { useState, useEffect } from 'react'
import { checkAuthenticated } from '../apiHelperFuncs/checkAuthenticated'

const Footer = () => {
    return (
        <footer>
                <nav>
                    <h1 className="logo">Ridge Road Journal</h1>
                    <ul className="footer-links">
                        <Link to="/" style={LinkStyle}>
                            <li>Home</li>
                        </Link>
                        <Link to="/about" style={LinkStyle}>
                            <li>About</li>
                        </Link>
                        <Link to="/articles" style={LinkStyle}>
                            <li>Articles</li>
                        </Link>
                    
                    </ul>
                        <Link to="/author-dash" style={LinkStyle}>
                            <li>Author Dash</li>
                        </Link>
                </nav>
            </footer>
    )
}

export default Footer
