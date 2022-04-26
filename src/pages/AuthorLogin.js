import React from 'react'
import { useState } from 'react'
import { axiosInstance } from '../axios'
import { useHistory } from 'react-router'

const AuthorLogin = () => {
    const history = useHistory()
    const initialFormData = Object.freeze({
        email: '',
        password: '',
    })

    const [formData, updateFormData] = useState(initialFormData)
    const [errorMessage, setErrorMessage] = useState("")

    const handleChange = (e) => {

        updateFormData({
            ...formData,
            [e.target.name] : e.target.value.trim(),
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axiosInstance.post('author-auth/token/', {
                email: formData.email,
                password: formData.password,
            }).then((response) => {
                localStorage.setItem('access_token', response.data.access)
                localStorage.setItem('refresh_token', response.data.refresh)
                axiosInstance.defaults.headers['Authorization'] = 
                    'JWT ' + localStorage.getItem('access_token')
                    history.push('')
            }).catch((err) => {
                alert("Make Sure Login Credentials Are Correct")
                history.push('/author-login')
            })
            
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>email</label>
                    <input name="email" type="email" placeholder='Email...' value={formData.email} onChange={handleChange} required/>
                </div>
                <div>
                    <label >Password</label>
                    <input name="password" type="password" placeholder='Password...' value={formData.password} onChange={handleChange} required/>
                </div>
                <input type="submit" value='Login' />
            </form>
            <div>
                <h3>{errorMessage}</h3>
            </div>
        </div>
       
    )
}

export default AuthorLogin
