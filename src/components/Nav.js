import React from 'react'

import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'
import { LinkStyle } from '../styles/LinkStyle'
import { useState, useEffect } from 'react'

const Nav = () => {
    const history = useHistory()

        return (
            <header>
                <nav>
                    <h3 className="logo">The Ridge Road Journal</h3>
                    <ul className="nav-links">
                        <Link to="/ridge-road-journal-website" style={LinkStyle}>
                            <li>Home</li>
                        </Link>
                        
                        <Link to="/ridge-road-journal-website/articles" style={LinkStyle}>
                            <li>Articles</li>
                        </Link>
                        <Link to="/ridge-road-journal-website/threads" style={LinkStyle}>
                            <li>Threads</li>
                        </Link>
                        <Link to="/ridge-road-journal-website/author-dash" style={LinkStyle}>
                            <li>Author Tools</li>
                        </Link>
                    
                    </ul>
                </nav>
            </header>
                
            )
    } 
    

export default Nav
