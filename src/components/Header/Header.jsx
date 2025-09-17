import { useNavigate, useLocation } from "react-router-dom";

import {
  ButtonExit,
  HeaderBlock,
  HeaderLinkMobil,
  HeaderLogo,
  HeaderNav,
  Icon,
  Img,
  MobilNav,
  NavLinkS,
  SContainer,
  SHeader,
} from "./Header.styled";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import ModalMobil from "../MadalMobil/ModalMobil";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const getLinkText = () => {
    switch (location.pathname) {
      case "/expenses":
        return "Мои расходы";
      case "/analysis":
        return "Анализ расходов";
      case "/newExpense":
        return "Новый расход";
      default:
        return "Навигация";
    }
  };

  useEffect(() => {
  if (isModalOpen) {
    setIsModalOpen(false);
    }
  }, [location.pathname]);
  
  function handleLogout(e) {
    e.preventDefault();
    logout();
    navigate("/sign-in");
  }

  return (
    <SHeader>
      <SContainer>
        <HeaderBlock>
          <HeaderLogo>
            <Img $user={user} src="../Logo.svg" alt="logo" />
          </HeaderLogo>
          {user && (
            <>
              <HeaderNav>
                <NavLinkS to="expenses">Мои расходы</NavLinkS>
                <NavLinkS to="analysis">Анализ расходов</NavLinkS>
              </HeaderNav>
              <MobilNav>
                <HeaderLinkMobil onClick={toggleModal}>
                  {getLinkText()} <Icon src="../Head3.svg" alt="Клик" /> 
                </HeaderLinkMobil>
                {isModalOpen ? <ModalMobil isModalOpen={isModalOpen} /> : null}
                <div>
                  <ButtonExit onClick={handleLogout}>Выйти</ButtonExit>
                </div>
              </MobilNav>
            </>
          )}
        </HeaderBlock>
      </SContainer>
    </SHeader>
  );
};

export default Header;
