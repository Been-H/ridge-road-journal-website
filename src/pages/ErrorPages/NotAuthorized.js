import React from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'

const NotAuthorized = () => {
    const history = useHistory()
    return (
        <div>
            <h1>You need to be logged in to be here!</h1>
            <button onClick={() => history.go(-2)}>Go Back</button>
            <button onClick={() => history.push('/author-login')}>Login</button>
        </div>
    )
}

export default NotAuthorized
