// Analysis.styled.jsx
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
  align-items: flex-start;
  flex-direction: column;
  align-items: stretch;
  @media screen and (max-width: 495px) {
    box-shadow: none;
    padding: 0px;
  }
`;

export const PeriodHeader = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #1f2937;
  margin-bottom: 20px;
  text-align: start;
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
    selected ? "#DBFFE9" : $current ? "#DBFFE9" : "transparent"};
  color: ${({ disabled, selected, $current }) => {
    if (disabled) return "#DBFFE9";
    if (selected) return "#1FA46C";
    if ($current) return "#1FA46C";
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

export const ChartWrapper = styled.div`
  flex: 1;
  background: #fff;
  border-radius: 30px;
  padding: 24px;
  border: none;
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
