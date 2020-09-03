import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";
import LidarTable from "./LidarTable";
import Pagination from "./Pagination";

//Read in Data from the API
const Search = (props) => {

  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(props.postsPerPage);
  const s3WebHostLink = props.s3WebHostLink

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const response = await axios.get(props.indexerUrl);
      setPost(response.data);
      setLoading(false);
    };
    fetchPost();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumbers) => setCurrentPage(pageNumbers);

  // Hide the pagination if there is only one page of records
  if (posts.length <= postsPerPage) {
    return <LidarTable lidarRecords={currentPosts} loading={loading} />
  }

  return (
    <React.Fragment>
      <LidarTable s3WebHostLink={s3WebHostLink} lidarRecords={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </React.Fragment>
  );
};

export default Search;
