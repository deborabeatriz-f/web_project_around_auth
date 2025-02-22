import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import { useState, useEffect } from "react";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { CardsContext } from "../contexts/CardsContext.js";
import ProtectedRoute from "./ProtectedRoute/index.jsx";
import Login from "./Sign/Login.jsx";
import Register from "./Sign/Register.jsx";
import InfoTooltip from "./InfoTooltip/index.jsx";
import * as auth from "../utils/auth.js";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [infoTooltipData, setInfoTooltipData] = useState({
    text: "",
    icon: null,
  });

  const [popup, setPopup] = useState(null);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleLogin = ({ email, password }) => {
    auth
      .signin(email, password)
      .then(() => {
        navigate("/");
        setIsLoggedIn(true);
        setInfoTooltipData({
          // olhar no figma a mensagem e icone correto
          text: "Deu certo no login",
          icon: "successIcon",
        });
      })
      .catch((error) => {
        setInfoTooltipData({
          // olhar no figma a mensagem e icone correto
          text: "Deu ruim",
          icon: "failIcon",
        });
        console.error(error);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  };

  const handleRegistration = ({ email, password }) => {
    auth
      .signup(email, password)
      .then(() => {
        navigate("/login");
        setInfoTooltipData({
          // olhar no figma a mensagem e icone correto
          text: "Deu certo no registro",
          icon: "successIcon",
        });
      })
      .catch((error) => {
        setInfoTooltipData({
          // olhar no figma a mensagem e icone correto
          text: "Deu ruim",
          icon: "failIcon",
        });
        console.error(error);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  };

  const handleUpdateUser = (data) => {
    (async () => {
      await api.setUserInfo(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  const handleUpdateAvatar = (data) => {
    (async () => {
      await api.setAvatar(data).then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      });
    })();
  };

  const handleAddPlaceSubmit = (data) => {
    (async () => {
      await api.newCard(data).then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      });
    })();
  };

  async function handleCardLike(card) {
    const isLiked = card.isLiked;
    if (isLiked) {
      await api.unlikedCard(card._id).then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      });
    } else {
      await api.likedCard(card._id).then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      });
    }
  }

  async function handleCardDelete(card) {
    await api.deleteCard(card._id).then(() => {
      setCards((state) =>
        state.filter((currentCard) => currentCard._id !== card._id)
      );
    });
  }

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleCloseInfoTooltip() {
    setIsInfoTooltipOpen(false);
  }

  return (
    <div className="page">
      <CardsContext.Provider value={handleAddPlaceSubmit}>
        <CurrentUserContext.Provider
          value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}
        >
          <Routes>
            <Route
              path="/login"
              element={
                <>
                  <Header />
                  <Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <Header />
                  <Register
                    handleRegistration={handleRegistration}
                    isLoggedIn={isLoggedIn}
                  />
                </>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Header currentUser={currentUser} />
                  <Main
                    handleOpenPopup={handleOpenPopup}
                    handleClosePopup={handleClosePopup}
                    popup={popup}
                    handleCardLike={handleCardLike}
                    handleCardDelete={handleCardDelete}
                    cards={cards}
                  />
                  <Footer />
                </ProtectedRoute>
              }
            />
          </Routes>
          {isInfoTooltipOpen ? (
            <InfoTooltip
              onClose={handleCloseInfoTooltip}
              icon={infoTooltipData.icon}
              text={infoTooltipData.text}
            />
          ) : null}
        </CurrentUserContext.Provider>
      </CardsContext.Provider>
    </div>
  );
}

export default App;

{
  /* <!-- POPUP DELETE CARD --> */
}
{
  /* <div className="popup__container popup__container-deleteCard">
        <div className="popup__card">
          <h3 className="popup__title">Tem certeza?</h3>
          <form className="popup__input input-deleteCard" noValidate>
            <button type="submit" className="input__submit input__submit-delete">
              Sim
            </button>
          </form>
          <button
            className="popup__button-close button-closeDelete"
            draggable="true"
          ></button>
        </div>
      </div> */
}
