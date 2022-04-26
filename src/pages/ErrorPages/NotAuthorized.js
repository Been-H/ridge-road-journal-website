import React from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'

const NotAuthorized = () => {
    const history = useHistory()
    return (
        <div className='na-container'>
            <div className='na-message'>
                <h2>You need to be logged in to be here!</h2>
                <a className="button" onClick={() => history.go(-3)}>Go Back</a>
                <a className="button" onClick={() => history.push('/author-login')}>Login</a>
            </div>
        </div>
    )
}

export default NotAuthorized
