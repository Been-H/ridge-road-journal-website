import React from 'react'
import { useState, useEffect } from 'react'
import { axiosInstance } from '../../axios'
import { useHistory } from 'react-router'

const PostDetail = ({ match }) => {
    const [article, setArticle] = useState({})
    const history = useHistory()

    useEffect(() => {
        axiosInstance.get(`/articles/${match.params.id}`) 
        .then((response) => {
            console.log(response)
            setArticle(response.data)
        })
        .catch((err) => {
            if (err.response.status === 400) {
                history.push('/nf')
            }
        })
    }, [])

    
    

    if (article !== null) {
        window.history.replaceState(null, null, `/articles/${article.title}`)
        return (
            <div>
                <div className="article-standalone-title">
                    <h1>{article.title}</h1>
                    <h3>{article.author_name}</h3>
                    <h3>{article.date_created}</h3>
                </div>
                <div className="article-body">
                    <p dangerouslySetInnerHTML={{__html: article.body}}></p>
                </div>
               
            </div>
            
        )
    } else {
        return (
            <div>Article Not Retrieved</div>
        )
    }
}

export default PostDetail
