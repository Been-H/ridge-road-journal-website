import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import { axiosInstance } from '../../axios'
import { checkAuthenticated } from '../../apiHelperFuncs/checkAuthenticated'

export const CreateThread = ({ fetchArticles }) => {
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
        
        axiosInstance.post('threads/?dash', {
            title: title,
            category: category
        })
        .then((res) => {
            history.push('/author-dash/')
        })
        .catch((err) => {
            if (err.response.status === 401 && err.response.statusText === 'Unauthorized') {
                history.push('/ridge-road-journal-website/na/')
            } else if (err.response.statusText === 'Bad Request') {
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
                <div>
                    <label>Category</label>
                    <select className="selector" onChange={(e) => {
                        setCategory(e.target.value)
                    }}>
                        <option></option>
                        {categories.map((category) => (
                            <option>{category.name}</option>
                        ))}
                    
                    </select>
                    </div>
    
                <input type="submit" value='Create Thread' />
            </form>
        )
    } else {
        return (
            <div>fetching categories</div>
        )
    }
    
}

export default CreateThread
