import React from 'react';
import Footer from 'components/Layout/Footer';
import Header from 'components/Layout/Header';
import NotFound from 'components/NotFound';
import CallApiList from 'features/CallAPI';
import ProductFeature from 'features/Product';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import CounterFeature from './features/Counter/index';
import TodoFeature from './features/Todo/index';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Redirect from="/home" to="/" />
        <Redirect from="/todoList" to="/todo" exact />
        <Redirect from="/c" to="/counter" />
        <Redirect from="/api" to="/callapilist" />

        <Route path="/" component={TodoFeature} exact />
        <Route path="/todo" component={TodoFeature} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/counter" component={CounterFeature} exact />
        <Route path="/callapilist" component={CallApiList} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
      {/* <Route path="/filterPost" component={<FilterPost onSubmit={handleFilterChange}/>} />
      <Route path="/callApi" component={<CallAPI dataList={postList}/>} />
      <Route path="/pagination" component={<Pagination pagination={pagination} onPageChange={handlePageChange}/>} /> */}
    </div>
  );
}

export default App;
