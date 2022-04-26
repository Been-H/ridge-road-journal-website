import React from 'react'
import { useState, useEffect } from 'react'
import { axiosInstance } from '../axios'
import { useHistory } from 'react-router'

import { checkAuthenticated } from '../apiHelperFuncs/checkAuthenticated'

const RegisterAuthor = () => {
    
    const history = useHistory()
    
    const initialFormData = Object.freeze({
        email: '',
        name: "",
        password: '',
    })
    const [admin, setAdmin] = useState(false)

    const [formData, updateFormData] = useState(initialFormData)

    useEffect(() => {
        checkAuthenticated(history, true, false)
    }, [])

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axiosInstance.post('author-auth/', {
                email: formData.email,
                name: formData.name,
                password: formData.password,
                is_superuser: admin,
        })
        .then((res) => {
            history.push('/author-dash/')
        })
        .catch((err) => {
            if (err.response.status === 403 && err.response.statusText === 'Unauthorized') {
                history.push('/na/')
            } else if (err.response.statusText === 'Bad Request') {
            } 
        })        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label >Author's Name</label>
                    <input name="name" type="text" placeholder="Author's Name..." value={formData.name} onChange={handleChange} required/>
                </div>
                <div>
                    <label>email</label>
                    <input name="email" type="email" placeholder='Email...' value={formData.email} onChange={handleChange} required/>
                </div>
                <div>
                    <label >Password</label>
                    <input name="password" type="password" placeholder='Password...' value={formData.password} onChange={handleChange} required/>
                </div>
                <div>
                    <label >Admin</label>
                    <input name="admin" type="checkbox" value={admin} onChange={(e) => setAdmin(e.target.checked)}/>
                </div>
                <input type="submit" value='Register Author' />
            </form>
        </div>
       
    )
}

export default RegisterAuthor
