import React from 'react'

import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'
import { LinkStyle } from '../styles/LinkStyle'
import { useState, useEffect } from 'react'

const Nav = () => {
    const history = useHistory()

        return (
            <header>
                <div className="empty">empty</div>
                <div className="logo">
                    <div className="topLevel">
                        <h3>The</h3>
                    </div>
                    <div className="bottomLevel">
                        <h2>Ridge Road Journal</h2>
                    </div>
                </div>
                
                <nav>
                    <ul className="nav-links">
                        <Link to="ridgeroadjournal.org/articles/" style={LinkStyle}>
                            <li>Articles</li>
                        </Link>
                        <Link to="/threads" style={LinkStyle}>
                            <li>Threads</li>
                        </Link>
                        <Link to="/author-dash" style={LinkStyle}>
                            <li>Author Tools</li>
                        </Link>
                    </ul>
                </nav>
            </header>
                
            )
    } 
    

export default Nav
