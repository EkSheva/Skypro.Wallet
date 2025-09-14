import styled, { css } from "styled-components";

/* Контейнер */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background-color: rgba(244, 245, 246, 1);
  padding-left: calc(50% - 600px);
  padding-right: calc(50% - 600px);
`;
export const ContainerFilters = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 56px; 
  
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
  gap: 24px;
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
  padding: 16px;
`;

export const TableTitle = styled.h3`
  margin-bottom: 12px;
  font-weight: 600;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 8px 12px;
    border-bottom: 1px solid #eee;
    text-align: left;
  }

  th {
    font-weight: 600;
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
  background: #fff;
  border-radius: 16px;
  border: 1px solid #ccc;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  h3 {
    font-size: 18px;
    margin-bottom: 8px;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 14px;

    span {
      color: red;
      margin-left: 4px;
    }
  }
`;

/* Поля */
export const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 2px solid #ddd;
  outline: none;
  transition: 0.2s;

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
  gap: 8px;
`;

export const CategoryButton = styled.button`
  display: inline-flex; /* иконка + текст рядом */
  align-items: center;
  gap: 6px;

  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  cursor: pointer;
  transition: 0.2s;

  font-size: 14px; /* явно задаём размер текста */
  line-height: 1.2;
  color: #333; /* всегда тёмный текст */

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
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
`;

export const Dropdown = styled.div`
  display: inline-block;
  position: relative;
`;

export const DropdownToggle = styled.span`
  cursor: pointer;
  font-size: 14px;
  color: #1f2937;
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


