import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'

import { Link } from 'react-router-dom'
import { axiosInstance } from '../../axios'
import {AddArticle} from './AddArticle'
import CategoryNav from '../../components/CategoryNav'
import { WhiteLinkStyle } from '../../styles/LinkStyle'

const Articles = ( {match }) => {
    const history = useHistory()
    const [articles, setArticles] = useState([])  

    const fetchArticles = () => {
        var url = match.params.category ? `articles/?category=${match.params.category}&dash`:"articles/?category&dash"
        axiosInstance.get(url)
        .then((res) => {
            setArticles(res.data.reverse())
        })
    }

    useEffect(() => {
        fetchArticles()
    }, [match.params.category])

    if (articles) {
        return (
            
            <div className="articles">
                <CategoryNav isArticles={true}/>
                <h1 className="articles-header">Recent {match.params.category ? match.params.category +" ": ""}Articles:</h1>
                {articles.map((article) => (
                   <Link to={`/articles/${article.id}`} style={WhiteLinkStyle}>
                       <div className="article-link">
                            <h1 className="article-title">{article.title}</h1> 
                            <h3 className="article-category">{article.category_name}</h3>
                            <h3 className="article-author">{article.author_name}</h3>
                            <h3 className="article-date">{article.date_created}</h3>
                       </div>

                   </Link> 
                 ))}
            </div>
        )
    } else {
        return (
            <div>
                <div>No Articles Retrieved</div>
            </div>
        )
    }
      
}

export default Articles
