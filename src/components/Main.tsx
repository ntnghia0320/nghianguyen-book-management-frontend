import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Register from './pages/Register';

export default function Main() {
  return (
    <>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>
        <Route exact path='/home'>
          <h1>home</h1>
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/books-list'>
          <h1>books-list</h1>
        </Route>
        <Route path='/books-list/search/keyword=:keyword'>
          <h1>/books-list/search/keyword=:keyword</h1>
        </Route>
        <Route path='/my-books-list'>
          <h1>/my-books-list</h1>
        </Route>
        <Route path='/book/:bookId'>
          <h1>/book/:bookId</h1>
        </Route>
        <Route path='/profile'>
          <h1>profile</h1>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  )
}