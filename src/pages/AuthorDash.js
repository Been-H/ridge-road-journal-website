import React from 'react'
import { useEffect, useState } from 'react'
import { useHistory} from 'react-router'
import { Link } from 'react-router-dom'
import { checkAuthenticated } from '../apiHelperFuncs/checkAuthenticated'
import { axiosInstance } from '../axios'
import { WhiteLinkStyle, BlueLinkStyle, LinkStyle } from '../styles/LinkStyle'
import '../styles/dash.css'
import bin from '../img/bin.png'
import axios from 'axios'
import pencil from '../img/pencil.png'

const AuthorDash = () => {
    const history = useHistory()
    const [author, setAuthor] = useState({})
    const [authorArticles, setAuthorArticles] = useState()
    const [authorThreads, setAuthorThreads] = useState()
    const [threads, setThreads] = useState()
    const [isAdmin, setIsAdmin] = useState(true)
    const [categories, setCategories] = useState(true)

    const fetchAuthorData = () => {
        axiosInstance.defaults.headers['Authorization'] = 
                    'JWT ' + localStorage.getItem('access_token')
        axiosInstance.get('authors/')
        .then((res) => {
            setAuthor(res.data)
        })
        fetchCategories()
        fetchAuthorThreads()
        fetchAuthorArticles()
    }

    const fetchCategories = () => {
        axiosInstance.get('categories/')
        .then((res) => {
            setCategories(res.data)
        })
    }

    const fetchAuthorArticles = () => {
        axiosInstance.get('articles/?dash=True&category')
        .then((res) => {
            setAuthorArticles(res.data)
        })
    }

    const fetchAuthorThreads = () => {
        axiosInstance.get(`threads/?dash=True&category`)
        .then((res) => {
            setAuthorThreads(res.data.reverse())
            
        }).catch((err) => {
            if (err.response.status === 401 && err.response.statusText === 'Unauthorized') {
                history.push('/ridge-road-journal-website/na')
            }
        })
        axiosInstance.get(`threads/?dash&category`)
        .then((res) => {
            setThreads(res.data.reverse())
            
        })
    }

    const checkAdmin = (history) => {
        axiosInstance.get("author-auth/?req-supuser=True")
        .then((res) => {
            if (res.data === "Not Admin") {
                setIsAdmin(false)
            }
        })
    }

    useEffect(() => {
        checkAuthenticated(history, false, false)
        checkAdmin() 
        fetchAuthorData()
         
    }, [])

    if (authorThreads === undefined || threads === undefined || authorArticles === undefined || categories === undefined) {
        return (
            <div>
                fetching threads
            </div>
        )
    } else {
        return (
            <div>
                <div className="author-dash">
                    <h1>{author.name}</h1>
                    <Link to={`/articles/actions/create`} style={BlueLinkStyle}>
                        <h3>Write an article</h3>
                    </Link>
                    <Link to={`/threads/actions/create`} style={BlueLinkStyle}>
                        <h3>Start a new thread</h3>
                    </Link>  
                    <Link to={`/author-logout`} style={BlueLinkStyle}>
                        <h3>Logout</h3>
                    </Link> 
                    <div className="author-threads">
                        <h2>Your Posts:</h2>
                        {authorArticles.map((authorArticle) => (
                            <div>
                                <Link to={`/articles/${authorArticle.id}`} style={WhiteLinkStyle}>
                                    <h3 className="title-flex__text">{authorArticle.title}</h3>
                                </Link> 
                                <Link to={`/articles/actions/update/${authorArticle.id}`} style={WhiteLinkStyle}>
                                    <img className="title-flex__image" src={pencil} alt="" />
                                </Link>
                                
                                <Link to={`/articles/actions/delete/${authorArticle.id}`} style={WhiteLinkStyle}>
                                    <img className="title-flex__image" src={bin} alt="" />
                                </Link>
                              
                            </div>
                        
                         ))}
                         <h2>Your Threads:</h2>
                         {authorThreads.map((authorThread) => (
                            <div>
                                <Link to={`/threads/${authorThread.id}`} style={WhiteLinkStyle}>
                                    <h3>Thread: {authorThread.title}</h3>
                                </Link> 
                                {authorThread.articles.map((article) => (
                                    article.author_name === author.name ? 
                                    <div>
                                        <Link to={`/articles/${article.title}`} style={WhiteLinkStyle}>
                                            <h4 className="title-flex__text">{article.title}</h4>
                                        </Link> 
                                        <Link to={`/articles/actions/update/${article.id}`} style={WhiteLinkStyle}>
                                            <img className="title-flex__image" src={pencil} alt="" />
                                        </Link>
                                        
                                        <Link to={`/articles/actions/delete/${article.id}`} style={WhiteLinkStyle}>
                                            <img className="title-flex__image" src={bin} alt="" />
                                        </Link>
                                    </div>
                                     : 
                                    <div></div> 
                                ))}
                            </div>
                        
                        ))}
                    </div>               
                </div>
            
                {isAdmin ?
                    <div className="admin-dash">
                        <h1>Admin Dash:</h1>
                        <Link to={`/register-author`} style={BlueLinkStyle}>
                            <h3 className="title-flex__text">Register a New Author</h3>
                        </Link>
                        <br/>
                        <Link to={`/categories/actions/create`} style={BlueLinkStyle}>
                            <h3 className="title-flex__text">Add a Category</h3>
                        </Link>
                        <h2>All Threads</h2>       
                        {threads.map((thread) => (
                                <div className="title-flex"> 
                                    <Link to={`/threads/${thread.id}`} style={WhiteLinkStyle}>
                                        <h3 className="title-flex__text">{thread.title}</h3>
                                    </Link>
                                    <Link to={`/threads/actions/update/${thread.id}`} style={WhiteLinkStyle}>
                                        <img className="title-flex__image" src={pencil} alt="" />
                                    </Link>
                                    <Link to={`/threads/actions/delete/${thread.id}`} style={WhiteLinkStyle}>
                                        <img className="title-flex__image" src={bin} alt="" />
                                    </Link>
                                    
                                </div>       
                        ))}
                        <h2>Categories</h2>       
                        {categories.map((category) => (
                                <div className="title-flex"> 
                                    <Link to={`/threads/${category.name}`} style={WhiteLinkStyle}>
                                        <h3 className="title-flex__text">{category.name}</h3>
                                    </Link>
                                    <Link to={`/categories/actions/delete/${category.name}`} style={WhiteLinkStyle}>
                                        <img className="title-flex__image" src={bin} alt="" />
                                    </Link>
                                    
                                </div>       
                        ))}          
                    </div>
                    : <div></div>
                }
                
            </div>
            
        )
    }
    
}

export default AuthorDash
