import React from 'react'
import { axiosInstance } from '../axios'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { LinkStyle, WhiteLinkStyle } from '../styles/LinkStyle'
import { Link } from 'react-router-dom'

const CategoryNav = ( { isArticles }) => {
    const [categories, setCategories] = useState([])  
    const [articlesOrThreads, setArticlesOrThreads] = useState('threads')

    const fetchCategories = () => {
        axiosInstance.get('categories/')
        .then((res) => {
            console.log(res.data)
            setCategories(res.data)
        })
    }

    useEffect(() => {
        fetchCategories()
        if (isArticles) {
            setArticlesOrThreads('articles')
        }
    }, [])

    if (categories) {
        return (
            <div className="category-nav-outer">
                <div className="category-nav">
                        
                        <ul className="category-nav-links">
                           
                            {categories.map((category) => (
                                <Link to={`/${articlesOrThreads}/categories/${category.name}`} style={WhiteLinkStyle}>
                                    <li>{category.name}</li>
                                </Link>
                             ))}   
                        </ul>
                        
                    </div>
            </div>
            
        )
    } else {
        return (
            <div>Fetching Categories...</div>
        )
    }
    
}

export default CategoryNav
