import React from 'react'
import { useState, useEffect } from 'react'
import { axiosInstance } from '../../axios'
import { useHistory } from 'react-router'
import Threads from './Threads'

const ThreadDetail = ({ match }) => {
    const [thread, setThread] = useState()
    const history = useHistory()

    useEffect(() => {
        axiosInstance.get(`http://127.0.0.1:8000/api/threads/${match.params.id}`) 
        .then((response) => {
            setThread(response.data)
        })
        .catch((err) => {
            if (err.response.status === 400) {
                history.push('/nf')
            }
        })
    }, [])


    if (thread) {
        console.log(thread)
        return (
            <div>
                <div className="thread-standalone-title">
                    <h1>{thread.title}</h1>
                    <h3>{thread.author_name}</h3>
                    <h3>{thread.date_created}</h3>
                </div>
                <div className="thread-body">
                    {thread.articles.map((article) => (
                    <div className="thread-article">
                        <div className="article-title">
                            <h1 className="article-thread-title">{article.title}</h1>
                            <h3 className="thread-article-author">{article.author_name}</h3>
                            <h3 className="thread-article-date">{article.date_created}</h3>
                        </div>
                        <div className="thread-article-body">
                            <p dangerouslySetInnerHTML={{__html: article.body}}></p>
                        </div>
                   
                    </div>
                    ))}
                </div>    
            </div>
        )
    } else {
        return (
            <div>Getting Thread...</div>
        )
    }
}

export default ThreadDetail
