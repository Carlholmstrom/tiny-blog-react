import "./App.css";
import Header from './components/Header';
import BlogPosts from './components/BlogPosts';
import Footer from "./components/Footer";


const App = () => {
  return (
      <div>
          <Header />
          <BlogPosts />
          <Footer />
      </div>
  );
};

export default App;
