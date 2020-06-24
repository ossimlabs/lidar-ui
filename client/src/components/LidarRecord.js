import React from 'react'

const LidarRecord = ({ posts, loading }) => {
  if(loading) {
    return <h2>Loading... </h2>;
  }
  return (
    <div className="posts">
    {posts.map(post => (

    <div className="post" key={post.id}>
        <div className="details">
            <p><span>Id</span>: {post.id}</p>
            <p><span>Ingested on</span>: {new Date(post.ingest_date).toDateString()}</p>
            <p><span>Character</span>: {post.keyword}</p>
            <p><span>Link</span>: <a href={post.s3_link} target="_blank">{post.s3_link}</a></p>
        </div>
    </div>
  ))}
  </div>
  );
};
export default LidarRecord
