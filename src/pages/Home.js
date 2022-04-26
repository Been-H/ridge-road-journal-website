import React from 'react'
import { LinkStyle } from '../styles/LinkStyle'
import { Link } from 'react-router-dom'
import CategoryNav from '../components/CategoryNav'
import { axiosInstance } from '../axios'
import {useState, useEffect} from 'react'
import { WhiteLinkStyle } from '../styles/LinkStyle'

const Home = () => {
    const [articles, setArticles] = useState([])  

    const fetchArticles = () => {
        var url = "articles/?category&dash"
        axiosInstance.get(url)
        .then((res) => {
            res.data.length > 3 ? setArticles(res.data.reverse().slice(0,3)) : setArticles(res.data.reverse()) 
        })
    }

    useEffect(() => {
        fetchArticles()
    }, [])

    return (
        <div>
            <CategoryNav />
            <div className="home-outer">
                <div className="home-page">
                    <div className="main-text">
                        <div>
                            <h1>The Ridge Road Journal</h1>
                            <br></br>
                            <h3 className="oej">Opinion Op-Ed Journal</h3>
                            <Link to="/articles" style={LinkStyle}>
                                <a className="button" href="">Read Now</a>
                            </Link>
                        </div>
                        
                    </div>
                    <div className="sidebar-outer">
                        <h2 className="sidebar-header">Recent Articles:</h2>
                        <div className='sidebar'>
                            {articles.map((article) => (
                                <Link to={`/articles/${article.id}`} style={WhiteLinkStyle}>
                                    <div className="article-link">
                                            <h3>{article.title}</h3> 
                                            <p>{article.category_name}</p>
                                            <p>{article.author_name}</p>
                                            <p>{article.date_created}</p>
                                    </div>

                                </Link> 
                            ))}
                        </div>
                        
                    </div>
                </div>
            </div>                                 
        </div>
        
    )
}

export default Home
