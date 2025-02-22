import logo from "../../images/logo_around.png";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Header({ text }) {
  const { currentUser, loggedIn, setLoggedIn } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setLoggedIn(false);
  };

  return (
    <header className="header page__container">
      <img src={logo} alt="Logo Around The U.S." className="header__image" />
      {loggedIn ? (
        <div>
          <p>{currentUser.email}</p>
          <button onClick={handleLogOut}>Sair</button>{" "}
        </div>
      ) : (
        <a href={text === "Entrar" ? "/login" : "/register"}>{text}</a>
      )}
    </header>
  );
}
