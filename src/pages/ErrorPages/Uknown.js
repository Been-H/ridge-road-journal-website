import React from 'react'
import { useHistory } from 'react-router'

const Unknown = () => {
    const history = useHistory()
    
    return (
        <div>
            <h1>Sorry, an Unknown Error Occured</h1>
            <button onClick={() => history.go(-2)}>Go Back</button>
        </div>
    )
}

export default Unknown
