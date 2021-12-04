import React from 'react'
import { axiosInstance } from '../../axios'
import { checkAuthenticated } from '../../apiHelperFuncs/checkAuthenticated'
import { useHistory } from 'react-router'
import { useState, useEffect } from 'react'

const DeleteCategory = ( {match }) => {
    const history = useHistory()

    useEffect(() => {
        checkAuthenticated(history, true, false)
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        
        axiosInstance.delete(`categories/${match.params.name}`)
        .then((res) => {
            if (res.data === "Not Admin") {
                history.push('/ridge-road-journal-website/na/')
            } 
            history.push("/author-dash")
        })       
    }

    return (
        <div>
            <h1>Are you sure you want to delete the category: {match.params.name}</h1>
            <form onSubmit={onSubmit}>
                <input type="submit" value="Delete"/>
            </form>
            
        </div>
    )
}

export default DeleteCategory
