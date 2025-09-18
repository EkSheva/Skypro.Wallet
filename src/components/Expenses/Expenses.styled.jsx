import styled, { css } from "styled-components";

/* Контейнер */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  background-color: rgba(244, 245, 246, 1);
  padding-left: calc(50% - 600px);
  padding-right: calc(50% - 600px);
  @media screen and (max-width: 495px) {
    gap: 24px;
    padding: 24px 16px;
    background-color: rgba(255, 255, 255, 1);
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
    display: ${({ showForm }) => (showForm ? "none" : "block")};
  }
`;

/* Контент */
export const Content = styled.div`
  display: flex;
  gap: 34px;
      align-items: stretch;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
/* Таблица */
export const TableWrapper = styled.div`
  /* flex: 2; */
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
    padding-top: 16px;
    font-weight: 400;
    font-size: 12px;
     @media screen and (max-width: 495px) {
    font-size: 10px;
  }
  }

  th {
    font-weight: 400;
    font-size: 12px;
    color: rgba(153, 153, 153, 1);
    border-bottom: 1px solid #eee;
  }

  /* Кнопка удаления */
  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      transform 0.2s ease,
      color 0.2s ease; /* анимация цвета */
    color: #999999; /* начальный цвет иконки */
  }

  button:hover {
    transform: scale(1.6); /* увеличение иконки */
    color: #7b2cbf; /* цвет при наведении */
  }
`;

/* Форма */
export const Form = styled.form`
  flex: ${({ isMobile }) => (isMobile ? "none" : "1")};
  max-width: ${({ isMobile }) => (isMobile ? "100%" : "379px")};
  /* flex: 1; */
  /* max-width: 379px; */
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
    font-family: Montserrat;
    font-weight: 700;
    font-size: 24px;
    line-height: 100%;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-family: Montserrat;
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

/* Категории */
export const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const CategoryButton = styled.button`
  display: inline-flex; /* иконка + текст рядом */
  align-items: center;
  padding: 8px 20px 8px 20px;
  border-radius: 30px;
  border: none;
  background: #f5f5f5;
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
      background: #d6cbe0;
      border-color: #7b2cbf;
      color: #7631bb; /* цвет текста в активном */
      font-weight: 600;
      outline: none;
    `}
`;
/* Фильтры */
export const Filters = styled.div`
  display: flex;
  gap: 16px;
  font-family: Montserrat;
  font-weight: 400;
  font-size: 10px;
  line-height: 150%;
`;

export const Dropdown = styled.div`
  display: inline-block;
  position: relative;
`;

export const DropdownToggle = styled.span`
  cursor: pointer;
  font-weight: 600;
  font-size: 10px;
  line-height: 150%;
  color: #7c3aed;
  text-decoration: underline;
  display: inline-flex;
  align-items: center;

  max-width: 80px;          /* ограничение ширины на мобилке */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #7b2cbf;
  }

  @media screen and (min-width: 496px) {
    max-width: none; /* на десктопе показываем полностью */
  }
`;

export const ArrowIcon = styled.span`
  font-size: 10px;
  display: inline-block;
  color: #000; /* полностью черная */
  transform: rotate(${(props) => (props.open ? "180deg" : "0deg")});
  transition: transform 0.3s ease;
  margin-left: 4px;
`;



export const DropdownMenu = styled.div`
  position: absolute;
  margin-top: 4px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  min-width: 120px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const DropdownItem = styled.div`
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: 0.2s;

  &:hover {
    background: #f5eaff;
    color: #7b2cbf;
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

/* Кнопки действий */
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


/* Модалка */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
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
/* Select (выпадающий список) */
export const Select = styled.select`
  width: auto; /* ширина по содержимому */
  min-width: fit-content; /* чтобы не схлопывалось */
  max-width: 100%; /* ограничение */

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
    text-decoration: underline; /* Подчёркивание выбранного */
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
  }
`;

export const TableRow = styled.tr`
 
  cursor: pointer;


  ${({ $isSelected }) => 
    $isSelected &&
    `background-color:rgba(241, 235, 253, 1);
      color: #7631bb;
      padding:0px;
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
