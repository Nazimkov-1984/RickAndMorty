import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="navBarContainer">
      <img
        className="logo"
        alt="logo"
        src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv28KR2ZH1SDnnX9VhVM4SJp_idrnTGAVWeQ&usqp=CAU"}
      />
      <Link className="linkRoute" to="/">
        Characters
      </Link>
      <Link className="linkRoute" to="todo">
        ToDo
      </Link>
    </div>
  );
};

export default NavBar;
