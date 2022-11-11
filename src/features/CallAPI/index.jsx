import React from 'react';
import { useEffect, useState } from 'react';
import queryString from 'query-string';
import FilterPost from './Components/FiltersPost';
import CallAPI from './Components/FetchAPI';
import Pagination from './Components/Pagination';





function CallApiList() {
    

const [postList, setPostList] = useState([]);
const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 11,
});

const [filters, setFilters] = useState({
    _page: 1,
    _limit: 10,
    title_like: '',
});

useEffect(() => {
    async function fetchPostList() {
    try {
        const paramsString = queryString.stringify(filters);
        const requestURL = `https://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestURL);
        const responseJSON = await response.json();
        console.log('responseJSON', responseJSON);
        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
    } catch (error) {
        throw new Error('fail to fetch post list', error.message);
    }
    }
    fetchPostList();
}, [filters]);



function handlePageChange(newPage) {
    // console.log(newPage);
    setFilters({ ...filters, _page: newPage });
}

function handleFilterChange(newFilter) {
    setFilters({ ...filters, _page: 1, title_like: newFilter.searchTerm });
}
    return (
        <div>
            <FilterPost onSubmit={handleFilterChange} />
            <CallAPI dataList={postList} />
            <Pagination pagination={pagination} onPageChange={handlePageChange} /> 
            {/* <TodoFrom onSubmit={handleFromSubmit} />
            <TodoList todoList={todoList} onTodoClick={handleTodoClick} /> */}
        </div>
    );
}

export default CallApiList;