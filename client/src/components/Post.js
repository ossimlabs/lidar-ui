import React from 'react'

const Posts = ({ posts, loading }) => {
  if(loading) {
    return <h2>Loading ... </h2>;
  }
  return (
    <div className="posts">
    {posts.map(post => (

    <div className="post" key={post.id}>
        <div className="details">
            <p><span role="img" aria-label="man">Id test</span>: {post.id}</p>
            <p><span role="img" aria-label="book">Ingested on</span>: {new Date(post.ingest_date).toDateString()}</p>
            <p><span role="img" aria-label="house">Character</span>: {post.keyword}</p>
            <p><span role="img" aria-label="clock">Link</span>: {post.s3_link}</p>
        </div>
    </div>
  ))}
  </div>
  );
};
export default Posts
