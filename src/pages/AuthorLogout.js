import React, { useEffect }from 'react'
import { axiosInstance } from '../axios'
import { useHistory } from 'react-router'

const AuthorLogout = () => {
    const history = useHistory()

    useEffect(() => {
        const response = axiosInstance.post('author-auth/logout/blacklist', {
            refresh_token: localStorage.getItem('refresh_token'),
        })
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        axiosInstance.defaults.headers['Authorization'] = null
        
        history.push('/')
        window.location.reload(false);
    })

    return (
        <div>
            Logout
        </div>
    )
}

export default AuthorLogout
