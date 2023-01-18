import "../styles/Footer.css";
import { BsGithub } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer-style">
      <nav>
        <p>View project on GitHub</p>
        <br />
        <a href="https://github.com/Carlholmstrom/tiny-blog-react" target="_blank" rel="noreferrer">
          <BsGithub color="white" size={40} />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
