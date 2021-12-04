import React from 'react'
import {useState, useEffect} from 'react'
import { useHistory } from 'react-router'
import { checkAuthenticated } from '../../apiHelperFuncs/checkAuthenticated'
import { axiosInstance } from '../../axios'

const UpdateThread = ( {match} ) => {
    const [thread, setThread] = useState('')
    const [title, setTitle] = useState('')
    const history = useHistory()

    useEffect(() => {
        axiosInstance.get(`threads/${match.params.id}`) 
        .then((response) => {
            setThread(response.data)
            setTitle(response.data.title)
        })
        .catch((err) => {
            if (err.response.status === 400) {
                history.push('/nf')
            }
        })
        checkAuthenticated(history, true, false)
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()

        if (!title) {
            alert('please fill out all fields')
            return
        }
        
        axiosInstance.put(`threads/${match.params.id}`, {
            title: title,
        })
        .then((res) => {
            history.push("/author-dash")
        })
        .catch((err) => {
            if (err.response.status === 401 && err.response.statusText === 'Unauthorized') {
                history.push('/ridge-road-journal-website/na/')
            } else if (err.response.statusText === 'Bad Request') {
                alert(err.response.data)
            } 
        })        
    }

    if (title !== undefined) {
        return (
            <form onSubmit={onSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" placeholder='Title' value={title} onChange={(e) => {
                        setTitle(e.target.value)
                    }} required/>
                </div>
    
                <input type="submit" value='Update Thread' />
            </form>
        )
    } else {
        return (
            <div>getting thread...</div>
        )
    }
    
}

export default UpdateThread
