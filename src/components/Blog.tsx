import React, { useState, useEffect } from "react";
import "../styles/Blog.css";

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: number;
}

function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(true);
  const [showFrench, setShowFrench] = useState(true);
  const [showAmerican, setShowAmerican] = useState(true);
  const [showCrime, setShowCrime] = useState(true);
  const [showClassic, setShowClassic] = useState(true);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/posts");
      const data = await response.json();
      setPosts(data.posts as Post[]);

      setLoading(false);
    }
    getData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred</p>;
  }
  const historyPosts = posts.filter((post) => post.tags.includes("history"));
  const frenchPosts = posts.filter((post) => post.tags.includes("french"));
  const americanPosts = posts.filter((post) => post.tags.includes("american"));
  const crimePosts = posts.filter((post) => post.tags.includes("crime"));
  const classicPosts = posts.filter((post) => post.tags.includes("classic"));

  const toggleHistory = () => setShowHistory(!showHistory);
  const toggleFrench = () => setShowFrench(!showFrench);
  const toggleAmerican = () => setShowAmerican(!showAmerican);
  const toggleCrime = () => setShowCrime(!showCrime);
  const toggleClassic = () => setShowClassic(!showClassic);
  const sections = [
    {
      title: "History",
      posts: historyPosts,
      show: showHistory,
      toggle: toggleHistory,
    },
    {
      title: "French",
      posts: frenchPosts,
      show: showFrench,
      toggle: toggleFrench,
    },
    {
      title: "American",
      posts: americanPosts,
      show: showAmerican,
      toggle: toggleAmerican,
    },
    { title: "Crime", posts: crimePosts, show: showCrime, toggle: toggleCrime },
    {
      title: "Classic",
      posts: classicPosts,
      show: showClassic,
      toggle: toggleClassic,
    },
  ];
  return (
    <body>
      {sections.map(({ title, posts, show, toggle }) => (
        <section key={title}>
          <h2>
            {title}
            <select onChange={toggle} value={show ? "show" : "hide"}>
              <option value="show">Show</option>
              <option value="hide">Hide</option>
            </select>
          </h2>
          {show &&
            posts.map((post) => (
              <div key={post.id} className="card">
                <h3>{post.title}</h3> <br />
                <p>{post.body}</p> <br />
                <div className="tags">
                  Tags:&nbsp;
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag tag-separator">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="reactions">{post.reactions} reactions</div>
              </div>
            ))}
        </section>
      ))}
    </body>
  );
}

export default Blog;
