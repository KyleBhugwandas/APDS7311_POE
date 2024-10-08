import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'; 

const Post = (props) => (
  <tr>
    <td>{props.post.user}</td>
    <td>{props.post.content}</td>
    <td>
      {props.post.image && (
        <img
          src={`data:image/jpeg;base64,${props.post.image}`} // Convert base64 string to Image
          alt="Post"
          style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }} // Ensure the image fits within the size limits
        />
      )}
    </td>
    <td>
      <button className="btn btn-link"
        onClick={() => {
          props.deletePost(props.post._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function PostList() {
  const [posts, setPosts] = useState([]); // State for posts
  const [loading, setLoading] = useState(true); // State for loading

  // This method fetches the posts from the database.
  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch(`http://localhost:3001/post/`);
        
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          console.error(message);
          window.alert(message);
          return;
        }

        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
        window.alert('Failed to fetch posts. Please check the console for details.');
      } finally {
        setLoading(false); // Ensure loading is set to false after fetching
      }
    }
    
    getPosts();
  }, []); // Ensure this runs only once by passing an empty array

  // This method will delete a post
  async function deletePost(id) {
    const token = localStorage.getItem('jwt');
    await fetch(`http://localhost:3001/post/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const newPosts = posts.filter((el) => el._id !== id);
    setPosts(newPosts);
  }
  
  // This method will map out the posts on the table
  function postList() {
    return posts.map((post) => (
      <Post
        post={post}
        deletePost={() => deletePost(post._id)}
        key={post._id}
      />
    ));
  }
  
  return (
    <div className="container">
      <h3 className="header">APDS Notice Board</h3>
      {loading ? ( // Show loading message
        <p>Loading posts...</p>
      ) : posts.length === 0 ? ( // Check if there are no posts
        <p>No posts available.</p>
      ) : (
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>User</th>
              <th>Caption</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {postList()}
          </tbody>
        </table>
      )}
    </div>
  );
}
