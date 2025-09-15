// Analysis.jsx
import React, { useState, useRef, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getTransactions } from "../../services/transactions";
import {
  Container, Title, CalendarBox, CalendarWrapper, PeriodHeader,
  CalendarContainer, CalendarScroll, FixedDaysHeader, DayHeader,
  DaysGrid, DayCell, ChartWrapper, ChartHeader, Total,
  Subtitle, MonthTitle, ResponsiveContainer, BarChart
} from "./Analysis.styled";
import { Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

const categories = [
  { id: "food", name: "Еда", color: "#c19aff" },
  { id: "transport", name: "Транспорт", color: "#ffb347" },
  { id: "housing", name: "Жильё", color: "#6be5c3" },
  { id: "joy", name: "Развлечения", color: "#9ec6ff" },
  { id: "education", name: "Образование", color: "#b5e06c" },
  { id: "others", name: "Другое", color: "#ff8b94" },
];

// --- утилиты ---
const formatDate = (year, month, day) =>
  `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

const formatDisplayDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  const monthsRu = [
    "января","февраля","марта","апреля","мая","июня",
    "июля","августа","сентября","октября","ноября","декабря"
  ];
  return `${parseInt(day, 10)} ${monthsRu[parseInt(month, 10) - 1]} ${year}`;
};

const weekDays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const months = [
  "Январь","Февраль","Март","Апрель","Май","Июнь",
  "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"
];

export default function Analysis() {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const calendarScrollRef = useRef(null);

  // --- загрузка транзакций ---
  const fetchTransactions = useCallback(async () => {
    if (!user?.token) return;
    try {
      const data = await getTransactions(user.token);
      setTransactions(data || []);
    } catch (err) {
      console.error("Ошибка загрузки:", err.message);
    }
  }, [user?.token]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // --- генерация календаря ---
  const generateScrollMonths = () => {
    const monthsData = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    const monthsBefore = 12;
    const monthsAfter = 12;

    // прошлые месяцы
    for (let i = monthsBefore; i > 0; i--) {
      const date = new Date(currentYear, currentMonth - i, 1);
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
        isCurrentMonth: false,
        currentDay: null,
      });
    }

    // текущий месяц
    const currentFirstDay = new Date(currentYear, currentMonth, 1);
    const currentLastDay = new Date(currentYear, currentMonth + 1, 0);
    const currentDaysInMonth = currentLastDay.getDate();

    const currentDays = [];
    for (let j = 0; j < (currentFirstDay.getDay() === 0 ? 6 : currentFirstDay.getDay() - 1); j++) {
      currentDays.push(null);
    }
    for (let j = 1; j <= currentDaysInMonth; j++) {
      currentDays.push(j);
    }

    monthsData.push({
      month: currentMonth,
      year: currentYear,
      days: currentDays,
      title: `${months[currentMonth]} ${currentYear}`,
      isCurrentMonth: true,
      currentDay: currentDay,
    });

    // будущие месяцы
    for (let i = 1; i <= monthsAfter; i++) {
      const date = new Date(currentYear, currentMonth + i, 1);
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
        isCurrentMonth: false,
        currentDay: null,
      });
    }

    return monthsData;
  };

  const scrollMonths = generateScrollMonths();

  // Автоскролл к текущему месяцу
  useEffect(() => {
    if (calendarScrollRef.current) {
      const currentMonthElement = calendarScrollRef.current.querySelector(
        "[data-current-month='true']"
      );
      if (currentMonthElement) {
        currentMonthElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  // --- выбор дат ---
  const handleDaySelect = (year, month, day) => {
    if (!day) return;
    const dateStr = formatDate(year, month, day);

    if (selectedDays.length === 0) {
      setSelectedDays([dateStr]);
    } else if (selectedDays.length === 1) {
      setSelectedDays([...selectedDays, dateStr]);
    } else {
      setSelectedDays([dateStr]);
    }
  };

  const isDaySelected = (year, month, day) => {
    if (!day) return false;
    const dateStr = formatDate(year, month, day);

    if (selectedDays.length === 0) return false;
    if (selectedDays.length === 1) return selectedDays.includes(dateStr);

    const sorted = [...selectedDays].sort();
    return dateStr >= sorted[0] && dateStr <= sorted[1];
  };

  const isCurrentDay = (year, month, day, monthData) => {
    if (!day || !monthData.isCurrentMonth) return false;
    return day === monthData.currentDay;
  };

  // --- фильтрация по периоду ---
  let filtered = transactions;
  if (selectedDays.length === 2) {
    const [start, end] = [...selectedDays].sort();
    filtered = transactions.filter((t) => {
      const d = new Date(t.date);
      return d >= new Date(start) && d <= new Date(end);
    });
  }

  // --- группировка по категориям ---
  const expenses = categories.map((cat) => {
    const sum = filtered
      .filter((t) => t.category === cat.id)
      .reduce((acc, cur) => acc + cur.sum, 0);
    return { name: cat.name, value: sum, color: cat.color };
  });

  const total = expenses.reduce((acc, cur) => acc + cur.value, 0);

  const getSelectedPeriodText = () => {
    if (selectedDays.length === 0) return "Расходы за весь период";
    if (selectedDays.length === 1) return `Расходы за ${formatDisplayDate(selectedDays[0])}`;
    const sorted = [...selectedDays].sort();
    return `Расходы с ${formatDisplayDate(sorted[0])} по ${formatDisplayDate(sorted[1])}`;
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
            <CalendarScroll ref={calendarScrollRef}>
              {scrollMonths.map((monthData) => (
                <label
                  key={`${monthData.year}-${monthData.month}`}
                  data-current-month={monthData.isCurrentMonth ? "true" : "false"}
                >
                  <MonthTitle>{monthData.title}</MonthTitle>
                  <DaysGrid>
                    {monthData.days.map((day, dayIndex) => (
                      <DayCell
                        key={dayIndex}
                        selected={isDaySelected(monthData.year, monthData.month, day)}
                        $current={isCurrentDay(monthData.year, monthData.month, day, monthData)}
                        disabled={!day}
                        onClick={() => handleDaySelect(monthData.year, monthData.month, day)}
                      >
                        {day}
                      </DayCell>
                    ))}
                  </DaysGrid>
                </label>
              ))}
            </CalendarScroll>
          </CalendarContainer>
        </CalendarWrapper>
        <ChartWrapper>
          <ChartHeader>
            <Total>{total.toLocaleString("ru-RU")} ₽</Total>
            <Subtitle>{getSelectedPeriodText()}</Subtitle>
          </ChartHeader>
          <ResponsiveContainer>
            <BarChart data={expenses}>
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
