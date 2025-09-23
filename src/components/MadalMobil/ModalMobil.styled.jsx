import styled from "styled-components";
import { NavLink as RouterNavLink } from "react-router-dom";

export const ModalConteiner = styled.div`
  display: block;
  position: absolute;
  top: 47px;
  left: 159px;
  border-radius: 6px;
  border: 0.5px solid rgba(148, 166, 190, 0.4);
  background: #fff;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  padding: 10px;
  text-align: center;
  z-index: 2;
`;

export const ModalBlock = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: 6px;
`;

const activeLinkStyles = `
  color: rgba(115, 52, 234, 1);
  background:rgba(241, 235, 253, 1);
`;

export const TitleModal = styled(RouterNavLink)`
  background: rgba(244, 245, 246, 1);
  color: rgba(0, 0, 0, 1);
  border-radius: 24px;
  border: none;
  font-weight: 400;
  font-size: 10px;
  padding: 7px 14px;
  &.active {
    ${activeLinkStyles}
  }
`;
