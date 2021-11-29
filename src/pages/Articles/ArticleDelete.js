import React from 'react'
import {useState, useEffect} from 'react'
import { useHistory } from 'react-router'
import { checkAuthenticated } from '../../apiHelperFuncs/checkAuthenticated'
import { axiosInstance } from '../../axios'

const ArticleDelete = ( {match} ) => {
    const [article, setArticle] = useState('')
    const history = useHistory()

    useEffect(() => {
        axiosInstance.get(`articles/${match.params.id}`) 
        .then((response) => {
            setArticle(response.data)
        })
        .catch((err) => {
            if (err.response.status === 400) {
                history.push('/nf')
            }
        })
        checkAuthenticated(history, false, false)
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()
        
        axiosInstance.delete(`articles/${match.params.id}`)
        .then((res) => {
            history.push("/author-dash")
        })
        .catch((err) => {
            if (err.response.status === 401 && err.response.statusText === 'Unauthorized') {
                history.push('/na/')
            }
        })        
    }

    if (article !== null) {
        return (
            <div>
                <h1>Are you sure you want to delete the article: {article.title}</h1>
                <form onSubmit={onSubmit}>
                    <input type="submit" value="Delete"/>
                </form>
                
            </div>

        )
    }
}
export default ArticleDelete
