import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import BookDetail from './pages/BookDeatails';
import BooksList from './pages/BooksList';
import Home from './pages/Home';
import Login from './pages/Login';
import MyBooksList from './pages/MyBooksList';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import UserManagement from './pages/UserManagement';

export default function Main() {
  return (
    <>
      <Switch>
        <Route path='/' exact>
          <Redirect to='/home' />
        </Route>
        <Route path='/home'>
          <Home />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route exact path='/books-list'>
          <BooksList />
        </Route>
        <Route path='/my-books-list'>
          <MyBooksList />
        </Route>
        <Route path='/user-management'>
          <UserManagement />
        </Route>
        <Route exact path="/book/:bookId">
          <BookDetail />
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