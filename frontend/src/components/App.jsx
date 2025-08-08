import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import api from "../utils/api.js";
import auth from "../utils/auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { AuthContext } from "../contexts/AuthContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [token, setToken] = useState("");

  // --------- contextProviders -------
  function AuthProvider({ children }) {
    return (
      <AuthContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, setCurrentUser }}
      >
        {children}
      </AuthContext.Provider>
    );
  }

  function CurrentUserProvider({ children }) {
    return (
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
        }}
      >
        {children}
      </CurrentUserContext.Provider>
    );
  }

  // --------- LOG IN -------

  useEffect(() => {
    async function checkToken() {
      if (localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        const validToken = await auth.isValidToken("/users/me", token);
        setToken(validToken);
      }
    }
    checkToken();
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    async function obtainUser() {
      try {
        const user = await api.getUserInfo();

        setCurrentUser(user);
        setIsLoggedIn(true);
      } catch (error) {
        console.log(error);
      }
    }
    api.setToken(token);

    obtainUser();
  }, [token]);

  // --------- USER -------

  const handleUpdateUser = async (data) => {
    const updatedUser = await api.updateUserInfo(data);
    setCurrentUser(updatedUser);
    handleClosePopup();
  };

  const handleUpdateAvatar = async (data) => {
    const updatedUser = await api.changeAvatar(data);
    setCurrentUser(updatedUser);
    handleClosePopup();
  };

  // --------- CARDS -------
  useEffect(() => {
    async function obtainCardsData() {
      try {
        const cardsData = await api.getCardsData();

        return setCards(cardsData);
      } catch (error) {
        console.log(error);
      }
    }
    obtainCardsData();
  }, [isLiked]);

  const handleAddCard = async (data) => {
    const addedCard = await api.addCardData(data);
    setCards([addedCard, ...cards]);
    handleClosePopup();
  };

  const handleCardLike = async (card) => {
    card._id && card.isLiked
      ? await api._dislikeCard(card._id)
      : await api._likeCard(card._id);

    setIsLiked(!isLiked);
  };

  const handleCardDelete = async (card) => {
    card._id && (await api.deleteCard(card._id));

    const idCardToDelete = card._id;

    const filteredCards = cards.filter((card) => card._id !== idCardToDelete);
    setCards(filteredCards);
  };

  // --------- POPUPS -------
  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  return (
    <AuthProvider>
      <CurrentUserProvider>
        <Routes>
          <Route
            path="/signup"
            element={
              <ProtectedRoute anonymous>
                <div className="page">
                  <Header />
                  <Register
                    popup={popup}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                  />
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <ProtectedRoute anonymous>
                <div className="page">
                  <Header />
                  <Login
                    popup={popup}
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                  />
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div className="page">
                  <Header />
                  <Main
                    onOpenPopup={handleOpenPopup}
                    onClosePopup={handleClosePopup}
                    popup={popup}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onAddCard={handleAddCard}
                  />
                  <Footer />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </CurrentUserProvider>
    </AuthProvider>
  );
}

export default App;
