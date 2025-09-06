import styled from "styled-components";

/* Контейнер */
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 16px;
`;

/* Заголовок */
export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
`;

/* Список */
export const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

/* Каждый элемент */
export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--panel, #fff);
  border: 1px solid #eee;
`;

/* Левая часть (название и сумма) */
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Name = styled.span`
  font-size: 14px;
  font-weight: 500;
`;

export const Amount = styled.span`
  font-size: 13px;
  color: #555;
`;

/* Правая часть (кнопки) */
export const Actions = styled.div`
  display: flex;
  gap: 8px;
`;
