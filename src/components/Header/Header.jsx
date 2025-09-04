import { useNavigate } from "react-router-dom";
import {
  ButtonExit,
  HeaderBlock,
  HeaderLogo,
  HeaderNav,
  Img,
  NavLinkS,
  SContainer,
  SHeader,
} from "./Header.styled";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

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
            <Img src="../Logo.svg" alt="logo" />
          </HeaderLogo>
          {user && (
            <>
              <HeaderNav>
                <NavLinkS to="expenses">Мои расходы</NavLinkS>
                <NavLinkS to="analysis">Анализ расходов</NavLinkS>
              </HeaderNav>
              <div>
                <ButtonExit onClick={handleLogout}>Выйти</ButtonExit>
              </div>
            </>
          )}
        </HeaderBlock>
      </SContainer>
    </SHeader>
  );
};

export default Header;
