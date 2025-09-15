import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

export const SHeader = styled.header`
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  padding-left: calc(50% - 600px);
  padding-right: calc(50% - 600px);
  @media screen and (max-width: 495px) {
    width: 100%;
    padding: 0 16px;
    background-color: rgba(244, 245, 246, 1);
  }
`;

export const SContainer = styled.div``;

export const HeaderBlock = styled.div`
  height: 64px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
`;

export const HeaderLogo = styled.div`
  width: 144px;
`;
export const Img = styled.img`
  width: 144px;
  @media screen and (max-width: 495px) {
    width: ${({ user }) => (user ? "109px" : "144px")};
  }
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
  @media screen and (max-width: 495px) {
    display: none;
  }
`;

export const ButtonExit = styled.a`
  font-weight: 600;
  font-size: 14px;
  line-height: 170%;
  color: rgba(0, 0, 0, 1);
  text-align: center;
  &:hover {
    color: rgba(115, 52, 234, 1);
  }
  @media screen and (max-width: 495px) {
    font-size: 12px;
    line-height: 150%;
  }
`;
export const HeaderLinkMobil = styled(RouterNavLink)`
  display: none;
  @media screen and (max-width: 495px) and (min-width: 375px) {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 12px;
    line-height: 150%;
    color: rgba(115, 52, 234, 1);
    text-decoration: 1px underline rgba(115, 52, 234, 1);
    text-align: center;

    &::after {
      content: "";
      display: block;
      width: 7px;
      height: 7px;
      border-radius: 1px;
      border-left: 1.9px rgba(0, 0, 0, 1);
      border-bottom: 1.9px rgba(0, 0, 0, 1);
      transform: rotate(-45deg);
      margin: 4px 0 0 5px;
      padding: 0;
    }
  }
`;
export const MobilNav = styled.nav`
  display: flex;
  gap: 20px;
`;
