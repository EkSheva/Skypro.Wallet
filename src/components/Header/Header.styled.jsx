import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

export const SHeader = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
`;

export const SContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 30px;
  @media screen and (max-width: 495px) {
    width: 100%;
    padding: 0 16px;
  }
`;

export const HeaderBlock = styled.div`
  height: 64px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 10px;
`;

export const HeaderLogo = styled.div`
  width: 144px;
`;
export const Img = styled.img`
  width: 144px;
`;

export const HeaderNav = styled.div`
  max-width: 274px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 48px;
`;
const activeLinkStyles = `
  color: rgba(115, 52, 234, 1);
  font-weight: 600;
  text-decoration: 1px underline rgba(115, 52, 234, 1);
`;
export const NavLinkS = styled(RouterNavLink)`
  font-weight: 400;
  font-size: 14px;
  line-height: 170%;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  &.active {
    ${activeLinkStyles}
  }
`;

export const ButtonContainer = styled.div``;
export const ButtonExit = styled.a`
  font-weight: 600;
  font-size: 14px;
  line-height: 170%;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  &:hover {
    color: rgba(115, 52, 234, 1);
  }
`;

