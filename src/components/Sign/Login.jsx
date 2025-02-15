import { Link } from "react-router-dom";
import { useState } from "react";
import "../blocks/sign.css";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="sign">
      <p className="sign__welcome">Entrar</p>
      <form className="sign__form">
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <div className="sign__button-container">
          <button type="submit" className="sign__link">
            Entrar
          </button>
        </div>
      </form>
      <div className="sign__signin">
        <p>Ainda não é um membro?</p>
        <Link to="login" className="sign__login-link">
          Inscreva-se aqui!
        </Link>
      </div>
    </div>
  );
};

export default Login;
