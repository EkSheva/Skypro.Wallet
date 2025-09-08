import styled, { css } from "styled-components";

/* Контейнер */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`;

export const Title = styled.h2`
  font-size: 22px;
  font-weight: 700;
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
  transition: transform 0.2s ease, color 0.2s ease; /* анимация цвета */
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
  display: inline-flex;      /* иконка + текст рядом */
  align-items: center;
  gap: 6px;

  padding: 8px 12px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: #f5f5f5;
  cursor: pointer;
  transition: 0.2s;

  font-size: 14px;           /* явно задаём размер текста */
  line-height: 1.2;
  color: #333;               /* всегда тёмный текст */

  ${(p) =>
    p.$active &&
    css`
      background: #f5eaff;
      border-color: #7b2cbf;
      color: #7631bb;        /* цвет текста в активном */
      font-weight: 600;
    `}
`;


