// src/components/Analysis/Analysis.styled.jsx
import styled from "styled-components";
import { ResponsiveContainer as RC, BarChart as BC } from "recharts";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 20px;
  background-color: rgba(244, 245, 246, 1);
  padding-left: calc(50% - 600px);
  padding-right: calc(50% - 600px);
  @media screen and (max-width: 495px) {
    font-size: 24px;
    gap: 24px;
    padding: 24px 16px;
    background-color: rgba(255, 255, 255, 1);
  }
`;

export const Title = styled.h2`
  text-align: left;
  font-weight: 700;
  font-size: 32px;
  line-height: 150%;
  color: #1f2937;
  @media screen and (max-width: 495px) {
    font-size: 24px;
  }
`;

export const CalendarBox = styled.div`
  display: flex;
  gap: 35px;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const CalendarWrapper = styled.div`
  width: 379px;
  background: #fff;
  border-radius: 30px;
  padding: 24px;
  border: none;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media screen and (max-width: 495px) {
    box-shadow: none;
    padding: 0px;
  }
`;

export const PeriodHeader = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 16px;
`;

export const ToggleButton = styled.span`
  font-family: "Montserrat";
  font-size: 12px;
  line-height: 150%;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ $active }) => ($active ? "#7c3aed" : "#000000")};
  text-decoration: ${({ $active }) => ($active ? "underline" : "none")};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #7c3aed;
    font-weight: 600;
    text-decoration: underline;
  }
`;

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 440px;
  overflow: hidden;
`;

export const FixedDaysHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
  background: #fff;
  padding: 8px 0;
  border-bottom: 2px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const DayHeader = styled.div`
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  color: #6b7280;
  padding: 6px;
`;

export const CalendarScroll = styled.div`
  overflow-y: auto;
  height: 380px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c4b5fd;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #7c3aed;
  }
`;

export const MonthTitle = styled.h4`
  display: flex;
  margin: 16px 0 8px 0;
  color: #000000;
  font-weight: 600;
  font-size: 16px;
  font-family: "Montserrat";
`;

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
  margin-bottom: 20px;
`;

export const DayCell = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 60px;
  background: ${({ selected, $current }) =>
    selected ? "#ceb8e0" : $current ? "#ceb8e0" : "transparent"};
  color: ${({ disabled, selected, $current }) => {
    if (disabled) return "#DBFFE9";
    if (selected) return "#855bb9";
    if ($current) return "#855bb9";
    return "#374151";
  }};
  font-weight: ${({ selected, $current }) =>
    selected || $current ? 600 : 400};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: all 0.2s ease;
  font-size: 14px;

  &:hover {
    background: ${({ disabled }) => (disabled ? "transparent" : "#eeeef0")};
    color: ${({ disabled }) => (disabled ? "#d1d5db" : "#7c3aed")};
  }
`;

export const YearMonthsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

export const MonthSelectButton = styled.button`
  width: 101px;
  border-radius: 30px;
  background: ${({ $active, $current }) =>
    $active || $current ? "#d7c9ec" : "#e4e4e4"};
  font-family: "Montserrat";
  font-weight: ${({ $active, $current }) =>
    $active || $current ? 600 : 400};
  font-size: 12px;
  color: ${({ $active, $current }) =>
    $active || $current ? "#b24aee" : "#000000"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #7c3aed;
    color: #FFFFFF;
    font-weight: 600;
  }
`;

export const ChartWrapper = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 30px;
  padding: 24px;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
  @media screen and (max-width: 495px) {
    box-shadow: none;
    padding: 0px;
  }
`;

export const ChartHeader = styled.div`
  text-align: left;
  margin-bottom: 24px;
`;

export const Total = styled.h3`
  margin: 0;
  font-family: "Montserrat";
  font-size: 24px;
  color: #000000;
  font-weight: 700;
`;

export const Subtitle = styled.p`
  margin: 8px 0 0 0;
  font-size: 12px;
  color: #999999;
`;

export const ResponsiveContainer = styled(RC).attrs({
  width: "100%",
  height: 387,
})``;

export const BarChart = styled(BC).attrs({
  margin: { top: 20 },
})``;

// Плейсхолдер при отсутствии данных
export const EmptyState = styled.div`
  height: 387px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
  font-size: 14px;
  text-align: center;
`;

// Мобильные стили
export const MobileContainer = styled.div`
  padding: 16px;
  margin: 0 auto;

  @media (min-width: 768px) {
    display: none;
  }
`;

export const MobileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: baseline;
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #7c3aed;
  cursor: pointer;
  padding: 8px;
`;

export const MobileTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

export const ChartSection = styled.div`
  text-align: center;
  margin-bottom: 31px;
  width: 343px;
`;

export const TotalAmount = styled.h2`
  display: flex;
  font-size: 20px;
  font-weight: 700;
  color: #000;
  margin-bottom: 8px;
`;

export const PeriodText = styled.p`
  display: flex;
  font-weight: 400;
  font-size: 12px;
  color: #999999;
  margin-bottom: 24px;
`;

export const ChartWrapperMobile = styled.div``;

export const ChangePeriodButton = styled.button`
  background: #7c3aed;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 24px;
`;

export const PeriodSelection = styled.div``;

export const ToggleGroup = styled.div`
  display: flex;
  gap: 12px;
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 24px;
`;

export const YearSelection = styled.div`
  margin-bottom: 24px;
  overflow-y: auto;
  max-height: 396px;
`;

export const YearTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 16px 0 12px 0;
  color: #374151;
`;

export const MonthsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 16px;
`;

export const MonthButton = styled.button`
  padding: 12px 8px;
  border: 1px solid ${(props) => {
    if (props.$selected) return "#9653e2";
    if (props.$current) return "#9653e2";
    return "#e5e7eb";
  }};
  background: ${(props) => {
    if (props.$selected) return "#f3f0ff";
    if (props.$current) return "#f3f0ff";
    return "white";
  }};
  color: ${(props) => {
    if (props.$selected) return "#7c3aed";
    if (props.$current) return "#7c3aed";
    return "#374151";
  }};
  border-radius: 8px;
  font-size: 12px;
  font-weight: ${(props) => (props.$selected || props.$current ? 600 : 400)};
  cursor: pointer;

  &:hover {
    border-color: ${(props) => (props.$selected ? "#7c3aed" : "#10b981")};
  }
`;

export const MonthSelection = styled.div`
  margin-bottom: 24px;
`;

export const ApplyButton = styled.button`
  background: #7c3aed;
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
`;