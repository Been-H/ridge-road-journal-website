import React from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router'

const NotFound = () => {
    const history = useHistory()
    return (
        <div>
            <h1>Not Found</h1>
            <button onClick={() => history.go(-2)}>Go Back</button>
        </div>
    )
}

export default NotFound
