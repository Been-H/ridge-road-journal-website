import React from 'react'
import { useState, useEffect } from 'react'
import { axiosInstance } from '../../axios'
import { useHistory } from 'react-router'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { checkAuthenticated } from '../../apiHelperFuncs/checkAuthenticated'

const ArticleUpdate = ({match}) => {
    const history = useHistory()
    const [formData, updateFormData] = useState({})
    
    useEffect(() => {
        axiosInstance.get(`/articles/${match.params.id}`) 
        .then((response) => {
            updateFormData(response.data)
        })
        .catch((err) => {
            if (err.response.status === 400) {
                history.push('/nf')
            }
        })
        checkAuthenticated(history, false, false)
    }, [])

    
    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name] : e.target.value,
        })
        console.log(formData)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axiosInstance.put(`articles/${match.params.id}`, {
                title: formData.title,
                body: formData.text
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

    if (formData) {
        
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label >Title</label>
                        <input name="title" type="text" placeholder="Title..." value={formData.title} onChange={handleChange} required/>
                    </div>
                    <div>
                        <label>Body</label>
                        <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
                        <CKEditor
                            editor={ ClassicEditor }
                            data = {formData.body}
                            onReady={ editor => {
                                // You can store the "editor" and use when it is needed.
                            } }
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                formData.text = data
                            } }
                        />
                        </div>
                    </div>
                    <input type="submit" value='Update Article' />
                </form>
            </div>
        )
    } else {
        return (
            <div>
                Getting the post...
            </div>
        )
    }
    
}

export default ArticleUpdate

