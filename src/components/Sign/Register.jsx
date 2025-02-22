import { Link } from "react-router-dom";
import { useState } from "react";
import "../../blocks/sign.css";

const Register = ({ handleRegistration }) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegistration(data);
  }

  return (
    <div className="sign">
      <p className="sign__welcome">Inscrever-se</p>
      <form className="sign__form" onSubmit={handleSubmit}>     
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
            Inscreva-se aqui
          </button>
        </div>
      </form>
      <div className="sign__signin">
        <p>Já é um membro?</p>
        <Link to="/login" className="sign__login-link">
          Faça o login aqui!
        </Link>
      </div>
    </div>
  );
};

export default Register;
