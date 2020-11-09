import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../styles.css";
import DataTable from "./DataTable/DataTable";
import "../search-style.css"
import Pagination from "./DataTable/Pagination"
import SearchTable from "./DataTable/SearchTable";

const Search = (props) => {
  const [posts, setPost] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setQuery] = useState("");
  const [refreshTable, setRefreshTable] = useState(true);

  const webHostLink = props.webHostLink;

  const POSTS_PER_PAGE = 5;

  const fetchPost = () => {

    let fetchPostTimer =  setInterval(
      function getLidarRecords(){
        //console.log('Getting Lidar Records');
        axios.get(props.indexerUrl)
          .then(response => {
            setPost(response.data);
          })
          .catch(error => {
            console.log(`${error}`);
          });

        // Clear the initial 0ms interval that is used the very
        // first time the page is loaded.
        clearInterval(fetchPostTimer);

        if(refreshTable) {
          console.log('In if check: ' + refreshTable);
          // Set a new 5000ms interval to for each request that happens
          // after initial page load.
          fetchPostTimer = setInterval(
            getLidarRecords, 5000
          );

        } else {
          clearInterval(fetchPostTimer);
        }

      },0
    );
  };

  useEffect(() => {
    fetchPost();

  }, []);

  // search  and  pagination computations
  const postsData = useMemo(() => {
    let filteredPosts = posts;

    // Search function compares the search value to all keyword values(name values)
    // in posts and returns any posts that contain the value entered to filtered posts
    if (search) {
      filteredPosts = filteredPosts.filter((post) => 
        post.keyword.toLowerCase().includes(search.toLowerCase()))
    }

    setTotalPosts(filteredPosts.length)

    // slices the filtered post that have been searched over or all the 
    // posts by defualt if no search is entered for the pagiation
    return filteredPosts.slice(
      (currentPage - 1) * POSTS_PER_PAGE,
      (currentPage - 1) * POSTS_PER_PAGE + POSTS_PER_PAGE)
  },[posts, currentPage, search])

  return (
    <React.Fragment>
      <SearchTable
        onSearch={value => {
          setQuery(value)
          setCurrentPage(1)
        }}
      />
      <input type="checkbox" checked={refreshTable} onChange={(e) => {setRefreshTable(e.target.checked)}}/>
      <DataTable data={postsData} webHostLink={webHostLink}/> 
      <Pagination
        total = {totalPosts}
        postsPerPage={POSTS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      /> 
    </React.Fragment>
  );
};

export default Search;