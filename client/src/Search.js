import React, { useState, useEffect } from 'react';
import Posts from './components/Post';
import Pagination from './components/Pagination';
import axios from 'axios';
import './styles.css';


//Read in Data from the API
const Search = () => {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);

    useEffect(() => {
      const fetchPost = async () => {
        setLoading(true);
        const response = await axios.get('http://lidar-indexer.ossim.io/lidarProducts/findAll');
  
        setPost(response.data);
        setLoading(false);
      }
      fetchPost();
    }, []);

// Get current posts
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

// Change page
const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

//Return the formatted data from the api
    return (
        <div className="Search">
            <h1>Star Wars Characters</h1>
            <Posts posts={currentPosts} loading={loading} />
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}/>
        </div>
    );
};

export default Search
