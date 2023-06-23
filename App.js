import React, { useState, useEffect } from 'react';

const PostCard = ({ title, body, imageUrl }) => (
  <div className="card">
    <img style={{ width: '50px'}} id=" ing" src={imageUrl} alt="Post" />
    <div className="card-content">
      <h3 style={{marginLeft: '200px'}}>{title}</h3>
      <p style={{marginLeft: '200px' , marginBottom : '20px'}}>{body}</p>
    </div>
  </div>
  
  
);

const App = () => {
  const [posts, setPosts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(posts => {
        const firstTenPosts = posts.slice(0, 10);
        setPosts(firstTenPosts);
      });
  }, []);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewPost(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (newPost.title.trim() === '' || newPost.body.trim() === '') {
      alert('Please fill in both the title and body fields.');
      return;
    }

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...newPost,
        userId: 1
      })
    })
      .then(response => response.json())
      .then(data => {
        alert('Post created successfully!');
        setNewPost({ title: '', body: '' });
        setShowPopup(false);
        setPosts(prevPosts => [data, ...prevPosts]);
      })
      .catch(error => {
        alert('Post adding failed.');
        console.error(error);
      });
  };

  return (
    <div>
      <div className="post-cards">
        {posts.map(post => (
          <PostCard key={post.id} title={post.title} body={post.body} imageUrl={`https://picsum.photos/200/200?random=${post.id}`} />
        ))}
      </div>
      <button onClick={() => setShowPopup(true)}>Create New Post</button>
      {showPopup && (
        <div className="popup">
          <h3>Create New Post</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              required
            />
            <br />
            <label htmlFor="body">Body:</label>
            <textarea
              id="body"
              name="body"
              value={newPost.body}
              onChange={handleInputChange}
              rows="4"
              cols="30"
              required
            ></textarea>
            <br />
            <button type="submit">Post</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
