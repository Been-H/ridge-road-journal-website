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
import './styles/na.css'

import Home from './pages/Home'
import About from './pages/About';
import Nav from './components/Nav';
import CategoryNav from './components/CategoryNav';

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
        <Route path="ridgeroadjournal.org/" exact component={Home}/>
        <Route path="ridgeroadjournal.org/about" component={About}/> 

        <Route path="ridgeroadjournal.org/articles/" exact component={Articles}/> 
        <Route path="/articles/categories/:category" exact component={Articles}/>  
        <Route path="/articles/:id" exact component={ArticleDetail}/>

        <Route path="/articles/actions/update/:id" exact component={ArticleUpdate}/>
        <Route path="/articles/actions/delete/:id" exact component={ArticleDelete}/>
        <Route path="/articles/actions/create/" exact component={AddArticle}/>

        <Route path="/threads" exact component={Threads}/> 
        <Route path="/threads/categories/:category" exact component={Threads}/> 
        <Route path="/threads/:id" exact component={ThreadDetail}/> 
        <Route path="/threads/actions/update/:id" exact component={UpdateThread}/> 
        <Route path="/threads/actions/create" exact component={CreateThread}/> 
        <Route path="/threads/actions/delete/:id" exact component={ThreadDelete}/> 

        <Route path="/categories/actions/create/" exact component={AddCategory}/>
        <Route path="/categories/actions/delete/:name" exact component={DeleteCategory}/>

        <Route path="/register-author" exact component={RegisterAuthor}/>
        <Route path="/author-login" exact component={AuthorLogin}/>  
        <Route path="/author-logout" exact component={AuthorLogout}/> 

        <Route path="/author-dash" exact component={AuthorDash}/> 

        <Route path="/nf" exact component={NotFound}/>
        <Route path="/na" exact component={NotAuthorized}/>
        <Route path="/error" exact component={Unknown}/>

      </Switch>
    </React.StrictMode>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
