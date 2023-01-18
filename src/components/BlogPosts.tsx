import { useState, useEffect } from "react";
import "../styles/BlogPosts.css";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";

interface IPostsData {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: number;
  userId: number;
}

interface IShowState {
  history: boolean;
  french: boolean;
  american: boolean;
  crime: boolean;
  classic: boolean;
}

const BlogPosts = () => {
  const [posts, setPosts] = useState<IPostsData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [showState, setShowState] = useState<IShowState>({
    history: true,
    french: true,
    american: true,
    crime: true,
    classic: true,
  });

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const response = await fetch("https://dummyjson.com/posts");
        const data = await response.json();
        setPosts(data.posts as IPostsData[]);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) {
    return <p className="loading-message">Loading...</p>;
  }

  if (error) {
    return <p className="loading-message">An error occurred</p>;
  }

  const filterPostsByTag = (tag: string, posts: IPostsData[]) =>
    posts.filter((post) => post.tags.includes(tag));

  const tagFilters = {
    history: (posts: IPostsData[]) => filterPostsByTag("history", posts),
    french: (posts: IPostsData[]) => filterPostsByTag("french", posts),
    american: (posts: IPostsData[]) => filterPostsByTag("american", posts),
    crime: (posts: IPostsData[]) => filterPostsByTag("crime", posts),
    classic: (posts: IPostsData[]) => filterPostsByTag("classic", posts),
  };

  const sections = Object.entries(tagFilters).map(([title, filterFn]) => {
    const filteredPosts = filterFn(posts);
    return {
      title,
      posts: filteredPosts,
      toggle: () =>
        setShowState({
          ...showState,
          [title as keyof IShowState]: !showState[title as keyof IShowState],
        }),
      show: showState[title as keyof IShowState],
    };
  });
  return (
    <body>
      {sections.map(({ title, posts, show, toggle }) => (
        <section key={title}>
          <h2>
            #{title}
            <select onChange={toggle}>
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
                <div className="share-btns-container">
                 
                  <div className="share-btns">
                    <BsInstagram size={25}/>
                  </div>
                  <div className="share-btns">
                    <BsFacebook size={25}/>
                  </div>
                  <div className="share-btns">
                    <BsTwitter size={25}/>
                  </div>
                </div>
              </div>
            ))}
        </section>
      ))}
    </body>
  );
};

export default BlogPosts;
