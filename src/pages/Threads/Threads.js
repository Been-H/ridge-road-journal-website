import React from 'react'
import {useState, useEffect} from 'react'
import { axiosInstance } from '../../axios'
import { Link } from 'react-router-dom'
import CategoryNav from '../../components/CategoryNav'

import { WhiteLinkStyle } from '../../styles/LinkStyle'

const Threads = ({ match }) => {
    const [threads, setThreads] = useState()  

    const fetchThreads = () => {
        var url = match.params.category ? `threads/?category=${match.params.category}&dash` : "threads/?category&dash"
        axiosInstance.get(url)
        .then((res) => {
            setThreads(res.data.reverse())
        })
    }

    useEffect(() => {
        fetchThreads()
    }, [match.params.category])

    if (threads) {
        
        return (
            <div className="threads">
                <CategoryNav isArticles={false}/>
                <h1 className="threads-header">Recent {match.params.category ? match.params.category +" ": ""}Threads:</h1>
                {threads.reverse().map((thread) => (
                   <Link to={`/threads/${thread.id}`} style={WhiteLinkStyle}>
                        <div className="thread-link">
                            <h1 className="thread-title">{thread.title}</h1> 
                            <h3 className="thread-category">{thread.category}</h3>
                            <h3 className="thread-date">{thread.date_created}</h3>
                        </div>
                        
                   </Link> 
                 ))}
            </div>
        )
    } else {
        return (
            <div>
                <div>No Threads Retrieved...</div>
            </div>
        )
    }
}

export default Threads
