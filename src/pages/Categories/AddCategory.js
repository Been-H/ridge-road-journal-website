import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import { axiosInstance } from '../../axios'
import { checkAuthenticated } from '../../apiHelperFuncs/checkAuthenticated'

export const AddCategory = ({ fetchArticles }) => {
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState()
    const [categories, setCategories] = useState()
    const history = useHistory()

    const fetchCategories = () => {
        axiosInstance.get('categories/')
        .then((res) => {
            setCategories(res.data)
        })
    }

    useEffect(() => {
        checkAuthenticated(history, false, false)
        fetchCategories();
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()

        if (!title) {
            alert('please fill out all fields')
            return
        }
        
        axiosInstance.post('categories/', {
            name: title,
        })
        .then((res) => {
            history.push('/author-dash/')
        })
        .catch((err) => {
            if (err.response.status === 401 && err.response.statusText === 'Unauthorized') {
                history.push('/na/')
            } else if (err.response.statusText === 'Bad Request') {
                alert("Make sure the category name is unique")
            }
        })        
    }

    if (categories) {
        return (
            <form onSubmit={onSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" placeholder='Title' value={title} onChange={(e) => {
                        setTitle(e.target.value)
                    }} required/>
                </div>
                <input type="submit" value='Create Category' />
            </form>
        )
    } else {
        return (
            <div>fetching categories</div>
        )
    }
    
}

export default AddCategory
