import React, { useState, useContext } from "react";
import { Menu, MenuItemProps } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import { useHistory } from "react-router-dom";

interface Props {}

const MenuBar: React.FC<Props> = () => {
  const { user, logout: userLogout } = useContext(AuthContext);
  const history = useHistory();
  const pathname = window.location.pathname;

  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState<string>(path);

  const handleItemClick = ({ name }: MenuItemProps) => {
    setActiveItem(name as string);
  };

  const handleLogout = () => {
    userLogout();
    history.replace("/");
  };

  return user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user?.username} active as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={() => handleLogout()} />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
        as={Link}
        to="/"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "login"}
          onClick={handleItemClick}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "register"}
          onClick={handleItemClick}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  );
};
export default MenuBar;
