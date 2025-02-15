import logo from "../../images/logo_around.png";

export default function Header() {
  return (
    <header className="header page__container">
      <img src={logo} alt="Logo Around The U.S." className="header__image" />
    </header>
  );
}
