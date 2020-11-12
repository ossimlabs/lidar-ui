import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import DataTable from "./DataTable/DataTable";
import Pagination from "./DataTable/Pagination"
import SearchTable from "./DataTable/SearchTable";
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip';

import "../styles.css";
import "../search-style.css"

const Search = (props) => {
  const [posts, setPost] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setQuery] = useState("");

  const [isRunning, setIsRunning] = useState(true);
  const delay = 5000;

  useInterval(() => {
    getLidarData();

  }, isRunning ? delay : null);

  const webHostLink = props.webHostLink;
  const POSTS_PER_PAGE = 5;

  const getLidarData = () => {
    console.log('getting Lidar data...');
    axios.get(props.indexerUrl)
      .then(response => {
        response.data.sort((a,b) => b.ingest_date - a.ingest_date);
        setPost(response.data);

      })
      .catch(error => {
        console.log(`${error}`);

      });
  }

  useEffect(() => {
    getLidarData();
  }, []);

  // search  and  pagination computations
  const postsData = useMemo(() => {
    let filteredPosts = posts;

    // Search function compares the search value to all keyword values(name values)
    // in posts and returns any posts that contain the value entered to filtered posts
    if (search) {
      filteredPosts = filteredPosts.filter((post) =>
        post.keyword.toLowerCase().includes(search.toLowerCase()));
    }

    setTotalPosts(filteredPosts.length);

    // slices the filtered post that have been searched over or all the
    // posts by defualt if no search is entered for the pagiation
    return filteredPosts.slice(
      (currentPage - 1) * POSTS_PER_PAGE,
      (currentPage - 1) * POSTS_PER_PAGE + POSTS_PER_PAGE)
  },[posts, currentPage, search]);

  const renderTooltip = (props) => (
    <Tooltip id="refresh-tooltip" {...props}>
      Automatically refreshes the Lidar Data table every 5 seconds, and adds any new records
    </Tooltip>
  );

  return (
    <>
      <SearchTable
        onSearch={value => {
          setQuery(value)
          setCurrentPage(1)
        }}
      />
      <OverlayTrigger
        placement="right"
        delay={{ show: 1000, hide: 200 }}
        overlay={renderTooltip}
      >
        <div style={{width: "180px"}}>
          <Form.Check
            id="autoRefresh"
            type="switch"
            label="Auto Refresh Table"
            checked={isRunning}
            onChange={() =>  setIsRunning(prevState => !prevState)}/>
        </div>
        </OverlayTrigger>
      <DataTable data={postsData} webHostLink={webHostLink}/>
      <Pagination
        total = {totalPosts}
        postsPerPage={POSTS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={page => setCurrentPage(page)}
      />
    </>
  );
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Search;
