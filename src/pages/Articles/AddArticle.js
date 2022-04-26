import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import {Editor, EditorState} from 'draft-js'
import '../../styles/forms.css'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { axiosInstance } from '../../axios'
import { checkAuthenticated } from '../../apiHelperFuncs/checkAuthenticated'

export const AddArticle = ({ }) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [thread, setThread] = useState()
    const [categories, setCategories] = useState()
    const [category, setCategory] = useState()
    const [threads, setThreads] = useState()

    const history = useHistory()

    useEffect(() => {
        axiosInstance.get('threads/?dash&category')
        .then((res) => {
            setThreads(res.data)
        })
        axiosInstance.get('categories/')
        .then((res) => {
            setCategories(res.data)
        })
        checkAuthenticated(history, false, false)
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        if (!title || !body ) {
            alert('please fill out all required fields (title, body)')
            return
        }
        if (thread) {
            getThreadId()
        }
        var url = thread ? `articles/?thread_id=${thread}` : `articles/?thread_id`
        axiosInstance.post(url, {
            title: title,
            body: body,
            category: category,
        })
        .then((res) => {
           history.push('/author-dash')
        })
        .catch((err) => {
            if (err.response.status === 401 && err.response.statusText === 'Unauthorized') {
                history.push('/na/')
            } else if (err.response.statusText === 'Bad Request') {
                alert('bug fix coming, press create again')
            }
        })        
    }

    const getThreadId = () => {
        threads.forEach(threadCheck=> {
            if (thread === threadCheck.title) {
                setThread(threadCheck.id)
            }
        })
    }

    if (threads !== undefined && categories !== undefined) {
        return (
            <form onSubmit={onSubmit} enctype="multipart/form-data">
                <div>
                    <label>Title</label>
                    <input type="text" placeholder='Title' value={title} onChange={(e) => {
                        setTitle(e.target.value)
                    }} required/>
                </div>
               
                <div>
                    <label >Body</label>
                    <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
                        <CKEditor
                            editor={ ClassicEditor }
                            data = {body}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setBody(data)
                            } }
                        />
                        </div>
                </div>
                <div>
                    <label>Category</label>
                    {thread ? 
                        <select disabled="True" id="category-selector" className="selector" onChange={(e) => {
                            setCategory(e.target.value)
                        }}>
                            <option></option>
                            {categories.map((category) => (
                            <option>{category.name}</option>
                            ))}
                        
                        </select>
                        :
                        <select id="category-selector" className="selector" onChange={(e) => {
                            setCategory(e.target.value)
                        }}>
                            <option></option>
                            {categories.map((category) => (
                            <option>{category.name}</option>
                            ))}
                        
                        </select>
                    }
                    
                </div>
                <div>
                    <label>Thread</label>
                    <select className="selector" onChange={(e) => {
                        setThread(e.target.value)
                        getThreadId()
                        threads.forEach(threadCheck=> {
                            if (e.target.value === threadCheck.title) {
                                var index = 1
                                categories.forEach(categoryCheck => {
                                    
                                    if (threadCheck.category === categoryCheck.name) {
                                        document.getElementById("category-selector").selectedIndex = index;
                                        setCategory(categories[index-1].name)
                                    }
                                    index++
                                })
                            }
                            
                        })
                        
                    }}>
                        <option></option>
                        {threads.map((thread) => (
                        <option>{thread.title}</option>
                        ))}
                    
                    </select>
                </div>
               
                <input type="submit" value='Save Draft' />
            </form>
        )
    } else {
        return (
            <div>Fetching Threads</div>
        )
    }
    
}

export default AddArticle
