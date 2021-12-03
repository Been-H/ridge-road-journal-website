import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import './styles/Nav.css'
import './styles/footer.css'
import './styles/index.css'
import './styles/thread.css'
import './styles/article.css'
import './styles/home.css'
import './styles/threads.css'
import './styles/articles.css'

import Home from './pages/Home'
import About from './pages/About';
import Nav from './components/Nav';

import Articles from './pages/Articles/Articles';
import ArticleDetail from './pages/Articles/ArticleDetail';
import ArticleUpdate from './pages/Articles/ArticleUpdate';
import ArticleDelete from './pages/Articles/ArticleDelete';
import AddArticle from './pages/Articles/AddArticle';

import Threads from './pages/Threads/Threads';
import ThreadDetail from './pages/Threads/ThreadDetail';
import CreateThread from './pages/Threads/CreateThread';
import UpdateThread from './pages/Threads/UpdateThread';
import ThreadDelete from './pages/Threads/ThreadDelete';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import AuthorDash from './pages/AuthorDash';
import RegisterAuthor from './pages/RegisterAuthor';
import AuthorLogin from './pages/AuthorLogin';
import AuthorLogout from './pages/AuthorLogout';

import NotFound from './pages/ErrorPages/NotFound';
import NotAuthorized from './pages/ErrorPages/NotAuthorized';
import Unknown from './pages/ErrorPages/Uknown';
import Footer from './components/Footer';

import AddCategory from './pages/Categories/AddCategory';
import DeleteCategory from './pages/Categories/DeleteCategory';

const routing = (
  <Router>
    <React.StrictMode>
      <Nav />
      <Switch>
      <Route path="/ridge-road-journal" exact component={Home}/>
        <Route path="/ridge-road-journal/about" component={About}/> 

        <Route path="/ridge-road-journal/articles/" exact component={Articles}/> 
        <Route path="/ridge-road-journal/articles/categories/:category" exact component={Articles}/>  
        <Route path="/ridge-road-journal/articles/:id" exact component={ArticleDetail}/>

        <Route path="/ridge-road-journal/articles/actions/update/:id" exact component={ArticleUpdate}/>
        <Route path="/ridge-road-journal/articles/actions/delete/:id" exact component={ArticleDelete}/>
        <Route path="/ridge-road-journal/articles/actions/create/" exact component={AddArticle}/>

        <Route path="/ridge-road-journal/threads" exact component={Threads}/> 
        <Route path="/ridge-road-journal/threads/categories/:category" exact component={Threads}/> 
        <Route path="/ridge-road-journal/threads/:id" exact component={ThreadDetail}/> 
        <Route path="/ridge-road-journal/threads/actions/update/:id" exact component={UpdateThread}/> 
        <Route path="/ridge-road-journal/threads/actions/create" exact component={CreateThread}/> 
        <Route path="/ridge-road-journal/threads/actions/delete/:id" exact component={ThreadDelete}/> 

        <Route path="/ridge-road-journal/categories/actions/create/" exact component={AddCategory}/>
        <Route path="/ridge-road-journal/categories/actions/delete/:name" exact component={DeleteCategory}/>

        <Route path="/ridge-road-journal/register-author" exact component={RegisterAuthor}/>
        <Route path="/ridge-road-journal/author-login" exact component={AuthorLogin}/>  
        <Route path="/ridge-road-journal/author-logout" exact component={AuthorLogout}/> 

        <Route path="/ridge-road-journal/author-dash" exact component={AuthorDash}/> 

        <Route path="/ridge-road-journal/nf" exact component={NotFound}/>
        <Route path="/ridge-road-journal/na" exact component={NotAuthorized}/>
        <Route path="/ridge-road-journal/error" exact component={Unknown}/>
      </Switch>
    </React.StrictMode>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
