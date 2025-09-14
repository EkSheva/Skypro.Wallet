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
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 32px;
  line-height: 150%;
  color: #1f2937;
`;

/* Контент */
export const Content = styled.div`
  display: flex;
  gap: 34px;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/* Таблица */
export const TableWrapper = styled.div`
  flex: 2;
  background: #fff;
  border-radius: 16px;
  border: 1px solid #ccc;
  padding: 32px;
`;

export const TableTitle = styled.h3`
  font-family: Montserrat;
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  

  th,
  td {
    text-align: left;
    padding-top: 24px;
  }

  th {
    font-weight: 600;
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
  flex: 1;
  max-width: 379px;
  background: #fff;
  border-radius: 30px;
  border: 1px solid #ccc;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;

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
  border: 1px solid #ddd;
  background: #f5f5f5;
  cursor: pointer;
  transition: 0.2s;
  font-size: 12px; /* явно задаём размер текста */
  line-height: 1.2;
  color: #070707; /* всегда тёмный текст */
  font-family: Montserrat;
  font-weight: 400;

  ${(p) =>
    p.$active &&
    css`
      background: #d6cbe0;
      border-color: #7b2cbf;
      color: #7631bb; /* цвет текста в активном */
      font-weight: 600;
    `}
`;
/* Фильтры */
export const Filters = styled.div`
  display: flex;
  gap: 24px;
  font-family: Montserrat;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
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
  &:hover {
    color: #7b2cbf;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  margin-top: 4px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  min-width: 120px;
  box-shadow: 0px 4px 8px rgba(0,0,0,0.1);
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


