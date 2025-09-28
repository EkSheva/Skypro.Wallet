import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding-top: 24px;
  background-color: rgba(244, 245, 246, 1);
  padding-left: calc(50% - 600px);
  padding-right: calc(50% - 600px);
  @media screen and (max-width: 495px) {
    gap: 24px;
    padding: 0px 16px 24px 16px;
    background-color: rgba(255, 255, 255, 1);
    margin-top: ${({ $showForm }) => ($showForm ? "0px" : "24px")};
  }
`;

export const ContainerTBM = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const ContainerFilters = styled.div`
  display: flex;
  padding-bottom: 22px;
  align-items: baseline;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 46px;
`;

export const Title = styled.h2`
  text-align: left;
  font-weight: 700;
  font-size: 32px;
  line-height: 150%;
  color: #1f2937;

  @media screen and (max-width: 495px) {
    font-size: 24px;
    display: ${({ $showForm }) => ($showForm ? "none" : "block")};
  }
`;

export const Content = styled.div`
  display: flex;
  gap: 34px;
  align-items: stretch;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TableWrapper = styled.div`
  background: #fff;
  border-radius: 30px;
  border: none;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  padding: 32px;
  flex: ${({ isMobile }) => (isMobile ? "none" : "1")};
  width: ${({ isMobile }) => (isMobile ? "100%" : "auto")};
  display: ${({ isMobile, showForm }) =>
    isMobile && showForm ? "none" : "block"};
  @media screen and (max-width: 495px) {
    height: 100%;
    padding: 0px;
    box-shadow: none;
  }
`;

export const TableTitle = styled.h3`
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  @media screen and (max-width: 495px) {
    display: none;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-weight: 400;
  font-size: 12px;

  th,
  td {
    text-align: left;
    padding-top: 10px;
    font-weight: 400;
    font-size: 12px;
    @media screen and (max-width: 495px) {
      font-size: 10px;
    }
  }

  th {
    font-weight: 400;
    font-size: 12px;
    color: #999999;
    border-bottom: 2px solid #eee;
    padding-bottom: 6px;
    @media screen and (max-width: 495px) {
      font-size: 10px;
    }
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, color 0.2s ease;
    color: #999999;
  }

  button:hover {
    transform: scale(1.6);
    color: #7b2cbf;
  }
`;

export const Form = styled.form`
  flex: ${({ isMobile }) => (isMobile ? "none" : "1")};
  max-width: ${({ isMobile }) => (isMobile ? "100%" : "379px")};
  background: #fff;
  border-radius: 30px;
  border: none;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media screen and (max-width: 495px) {
    height: 100%;
    padding: 0px;
    box-shadow: none;
  }

  h3 {
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-weight: 600;
    font-size: 16px;
    line-height: 100%;

    span {
      color: red;
      margin-left: 4px;
    }
  }
`;
/* Поля */
export const Input = styled.input`
  padding: 12px;
  border-radius: 6px;
  border: 2px solid #ddd;
  transition: 0.2s;
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  font-family: Montserrat;

  ${(p) =>
    p.$valid &&
    css`
      background: #f5eaff;
      border-color: #7b2cbf;
      color: #5a189a;
    `}

  ${(p) =>
    p.$error &&
    css`
      background: #ffe5e5;
      border-color: #d00000;
      color: #9d0208;
    `}
`;

export const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const CategoryButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 20px;
  border-radius: 30px;
  border: none;
  background: #f4f5f6;
  cursor: pointer;
  transition: 0.2s;
  font-size: 12px;
  line-height: 1.2;
  color: #070707;
  font-weight: 400;
  outline: none;

  ${(p) =>
    p.$active &&
    css`
      background: #dbe2ff;
      color: #070707;
      font-weight: 400;
      outline: none;
    `}
`;

export const Filters = styled.div`
  display: flex;
  gap: 24px;
  font-family: Montserrat;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;

  @media (max-width: 768px) {
    gap: 16px;
    font-size: 10px;
  }
`;

export const Dropdown = styled.div`
  display: inline-block;
  position: relative;
`;

export const DropdownToggle = styled.span`
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  color: #7c3aed;
  text-decoration: underline;
  display: inline-flex;
  align-items: center;
  max-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 768px) {
    font-size: 10px;
  }

  &:hover {
    color: #7b2cbf;
  }
`;

export const ArrowIcon = styled.span`
  font-size: 10px;
  display: inline-block;
  color: #000;
  transform: rotate(${(props) => (props.open ? "180deg" : "0deg")});
  transition: transform 0.3s ease;
  margin-left: 4px;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  right: calc(10% + 1px);
  overflow-y: auto;
  background: #fff;
  border: 1px solid #999999;
  border-radius: 6px;
  padding: 12px 12px;
  box-shadow: 0px 12px 30px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 768px) {
    padding: 10px 10px;
  }
`;

export const CatDropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  border-radius: 30px;
  padding: 8px 20px 8px 20px;
  background: ${({ $active }) => ($active ? "#f1dbff" : "#e6e6e6")};
  color: #111827;
  cursor: pointer;
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  text-align: left;
  transition: background 0.2s ease;
  @media (max-width: 768px) {
    font-size: 10px;
  }
  &:hover {
    background: ${({ $active }) => ($active ? "#ddd2f8" : "#E9EAEB")};
  }
`;

export const CatIcon = styled.span`
  width: 14px;
  height: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
`;

export const SortDropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  border: none;
  border-radius: 30px;
  padding: 8px 20px;
  background: ${({ $active }) => ($active ? "#f1dbff" : "#E9EAEB")};
  color: #111827;
  cursor: pointer;
  font-weight: 400;
  font-size: 12px;
  line-height: 1;
  text-align: left;
  transition: background 0.2s ease;
  @media (max-width: 768px) {
    font-size: 10px;
  }
  &:hover {
    background: ${({ $active }) => ($active ? "#efdbff" : "#E9EAEB")};
  }
`;

export const FilterButton = styled.button`
  padding: 6px 10px;
  border-radius: 16px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 14px;

  ${(p) =>
    p.$active &&
    css`
      background: #f5eaff;
      border-color: #7b2cbf;
      color: #7631bb;
      font-weight: 600;
    `}
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 6px;
  font-size: 16px;

  &:hover {
    color: #7b2cbf;
    transform: scale(1.2);
  }
  @media screen and (max-width: 495px) {
    display: none;
  }
`;

export const ModalOverlay = styled.div`
  flex: ${({ isMobile }) => (isMobile ? "none" : "1")};
  max-width: ${({ isMobile }) => (isMobile ? "100%" : "379px")};
  background: #fff;
  border-radius: 30px;
  border: none;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  @media screen and (max-width: 495px) {
    height: 100%;
    padding: 0px;
    box-shadow: none;
  }
`;

export const Modal = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Select = styled.select`
  width: auto;
  min-width: fit-content;
  max-width: 100%;
  padding: 6px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;

  &:focus {
    outline: none;
    border-color: #7b2cbf;
    background: #f5eaff;
    color: #7631bb;
    font-weight: 600;
    text-decoration: underline;
  }

  option {
    background: #fff;
    color: #333;
  }
`;

export const AddButton = styled.a`
  color: rgba(0, 0, 0, 1);
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 12px;
  height: 12px;
  padding-right: 3px;
`;
export const AddButtonF = styled.a`
  font-family: "Montserrat";
  color: rgba(153, 153, 153, 1);
  font-weight: 600;
  font-size: 12px;
  line-height: 150%;
  align-items: center;
  justify-content: left;
  cursor: pointer;
  display: none;
  @media screen and (max-width: 495px) {
    display: block;
    margin-bottom: -12px;
  }
`;

export const TableRow = styled.tr`
  cursor: pointer;

  ${({ $isSelected }) =>
    $isSelected &&
    `
      background-color: rgba(241, 235, 253, 1);
      color: #7631bb;
      padding:0px;
      
      /* чтобы фон и цвет применились ко всем ячейкам */
      & > td {
        background-color: #e1daf0;
        color: #7631bb;
      }
    `}
`;

export const ConteunerActionButton = styled.td`
  @media screen and (max-width: 495px) {
    display: none;
  }
`;

export const MobileActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
  align-items: center;
`;

export const DeleteText = styled.span`
  color: #999999;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 400;
  font-size: 12px;
`;