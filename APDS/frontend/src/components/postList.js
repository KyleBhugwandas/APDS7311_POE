import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../App.css'; // Fixed typo for the import path

const Post = (props) => (
  <tr>
    <td>{props.post.user}</td>
    <td>{props.post.content}</td>
    {props.post.image && (
      <td>
        <img
          src={`data:image/jpeg;base64,${props.post.image}`} // Convert base64 string to Image
          alt="Post"
          style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }} // Ensure the image fits within the size limits
        />
      </td>
    )}
    <td>
      <button className="btn btn-link" onClick={() => props.deletePost(props.post._id)}>
        Delete
      </button>
    </td>
  </tr>
);

export default function PostList() {
  const [posts, setPosts] = useState([]); // Fixed destructuring of useState

  // This method fetches the posts from the database.
  useEffect(() => {
    async function getPosts() {
      const response = await fetch(`https://localhost:3001/post/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const posts = await response.json();
      setPosts(posts);
    }

    getPosts();
  }, []); // You should only pass an empty dependency array so it doesn't create an infinite loop
}