import styled from "styled-components";

// Контейнер аналитики (календарь + график)
export const AnalysisWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// Общая карточка (фон + тень)
export const Card = styled.div`
  background: #e4e2e2;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  padding: 16px;
`;

// Заголовок блока
export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
`;

// Дни недели (фиксируются сверху)
export const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: 600;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 2;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
`;

// Сетка чисел календаря
export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  max-height: 250px;
  overflow-y: auto;
  margin-top: 8px;
  padding-right: 4px;

  /* 🔹 Стилизация скроллбара */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #c448a5; /* фиолетовый */
    border-radius: 8px;
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: #8b5cf6 transparent;
`;

// Кнопка-день
export const DayButton = styled.button`
  padding: 8px;
  border-radius: 8px;
  border: none;
  background: ${({ $selected }) => ($selected ? "#b7b5b9" : "transparent")};
  color: ${({ $selected }) => ($selected ? "#fff" : "#333")};
  font-weight: ${({ $selected }) => ($selected ? "600" : "400")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ $selected }) => ($selected ? "#7c3aed" : "#f3f4f6")};
  }
`;

// Итоговая сумма расходов
export const Summary = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;

// Текст выбранного периода
export const Period = styled.div`
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 16px;
`;
