import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Container,
  Title,
  CalendarBox,
  CalendarWrapper,
  PeriodHeader,
  CalendarContainer,
  CalendarScroll,
  FixedDaysHeader,
  DayHeader,
  DaysGrid,
  DayCell,
  ChartWrapper,
  ChartHeader,
  Total,
  Subtitle,
  MonthTitle,
} from "./Analysis.styled";

const weekDays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const months = [
  "Январь","Февраль","Март","Апрель","Май","Июнь",
  "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
];

const categories = [
  { name: "Еда", color: "#c19aff" },
  { name: "Транспорт", color: "#ffb347" },
  { name: "Жильё", color: "#6be5c3" },
  { name: "Развлечения", color: "#9ec6ff" },
  { name: "Образование", color: "#b5e06c" },
  { name: "Другое", color: "#ff8b94" },
];

// форматируем дату для хранения
const formatDate = (year, month, day) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

// форматируем дату для отображения
const formatDisplayDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  const monthsRu = [
    "января","февраля","марта","апреля","мая","июня",
    "июля","августа","сентября","октября","ноября","декабря"
  ];
  return `${parseInt(day, 10)} ${monthsRu[parseInt(month, 10) - 1]} ${year}`;
};

function generateExpenses() {
  return categories.map((cat) => ({
    name: cat.name,
    value: Math.floor(Math.random() * 4000),
    color: cat.color,
  }));
}

export default function Analysis() {
  const [selectedDays, setSelectedDays] = useState([]); // храним даты в формате YYYY-MM-DD
  const [expenses] = useState(generateExpenses());

  const total = expenses.reduce((acc, cur) => acc + cur.value, 0);

  // генерируем месяцы для скролла
  const generateScrollMonths = () => {
    const monthsData = [];
    const currentDate = new Date();

    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setMonth(currentDate.getMonth() + i);

      const year = date.getFullYear();
      const month = date.getMonth();

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();

      const days = [];

      for (let j = 0; j < (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1); j++) {
        days.push(null);
      }

      for (let j = 1; j <= daysInMonth; j++) {
        days.push(j);
      }

      monthsData.push({
        month,
        year,
        days,
        title: `${months[month]} ${year}`,
      });
    }

    return monthsData;
  };

  const scrollMonths = generateScrollMonths();

  // выбор дня
  const handleDaySelect = (year, month, day) => {
    if (!day) return;
    const dateStr = formatDate(year, month, day);

    if (selectedDays.length === 0) {
      setSelectedDays([dateStr]);
    } else if (selectedDays.length === 1) {
      setSelectedDays([...selectedDays, dateStr]);
    } else {
      // если выбрали третью дату — сброс
      setSelectedDays([dateStr]);
    }
  };

  // проверка — выделен ли день
  const isDaySelected = (year, month, day) => {
    if (!day) return false;
    const dateStr = formatDate(year, month, day);

    if (selectedDays.length === 0) return false;
    if (selectedDays.length === 1) return selectedDays.includes(dateStr);

    const sorted = [...selectedDays].sort();
    return dateStr >= sorted[0] && dateStr <= sorted[1];
  };

  // подпись под графиком
  const getSelectedPeriodText = () => {
    if (selectedDays.length === 0) {
      return "Расходы за период";
    } else if (selectedDays.length === 1) {
      return `Расходы за ${formatDisplayDate(selectedDays[0])}`;
    } else {
      const sorted = [...selectedDays].sort();
      return `Расходы за период с ${formatDisplayDate(sorted[0])} по ${formatDisplayDate(sorted[1])}`;
    }
  };

  return (
    <Container>
      <Title>Анализ расходов</Title>

      <CalendarBox>
        <CalendarWrapper>
          <PeriodHeader>Период</PeriodHeader>

          <CalendarContainer>
            <FixedDaysHeader>
              {weekDays.map((day) => (
                <DayHeader key={day}>{day}</DayHeader>
              ))}
            </FixedDaysHeader>

            <CalendarScroll>
              {scrollMonths.map((monthData, index) => (
                <div key={index}>
                  <MonthTitle>{monthData.title}</MonthTitle>
                  <DaysGrid>
                    {monthData.days.map((day, dayIndex) => (
                      <DayCell
                        key={dayIndex}
                        selected={isDaySelected(monthData.year, monthData.month, day)}
                        disabled={!day}
                        onClick={() => handleDaySelect(monthData.year, monthData.month, day)}
                      >
                        {day}
                      </DayCell>
                    ))}
                  </DaysGrid>
                </div>
              ))}
            </CalendarScroll>
          </CalendarContainer>
        </CalendarWrapper>

        <ChartWrapper>
          <ChartHeader>
            <Total>{total.toLocaleString("ru-RU")} ₽</Total>
            <Subtitle>{getSelectedPeriodText()}</Subtitle>
          </ChartHeader>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expenses} margin={{ top: 20 }}>
              <XAxis dataKey="name" />
              <YAxis hide />
              <Tooltip formatter={(value) => [`${value} ₽`, "Сумма"]} />
              <Bar dataKey="value">
                {expenses.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </CalendarBox>
    </Container>
  );
}
