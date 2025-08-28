// Analysis.jsx
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  AnalysisWrapper,
  Card,
  Title,
  WeekDays,
  DaysGrid,
  DayButton,
  Summary,
  Period,
} from "./Analysis.styled";

const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const categories = ["Еда", "Транспорт", "Жилье", "Развлечения", "Образование", "Другое"];

// 🔹 Генерация дней месяца
const generateDays = (year, month) => {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

// 🔹 Случайные расходы
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const generateExpenses = (year, month) => {
  const days = generateDays(year, month);
  const expenses = [];

  days.forEach((day) => {
    const numExpenses = randomInt(1, 3);
    for (let i = 0; i < numExpenses; i++) {
      const category = categories[randomInt(0, categories.length - 1)];
      const amount = randomInt(100, 3000);
      expenses.push({
        category,
        amount,
        date: day.toISOString().split("T")[0],
      });
    }
  });

  return expenses;
};

// Автогенерация данных на текущий месяц
const today = new Date();
const allExpenses = generateExpenses(today.getFullYear(), today.getMonth());

const Analysis = () => {
  const [selectedRange, setSelectedRange] = useState([]);
  const days = generateDays(today.getFullYear(), today.getMonth());

  const toggleDay = (day) => {
    if (
      selectedRange.length === 2 ||
      selectedRange.find((d) => d.getTime() === day.getTime())
    ) {
      setSelectedRange([day]);
    } else {
      setSelectedRange((prev) => [...prev, day].sort((a, b) => a - b));
    }
  };

  const isSelected = (day) => {
    if (selectedRange.length === 1) {
      return day.getTime() === selectedRange[0].getTime();
    }
    if (selectedRange.length === 2) {
      return (
        day.getTime() >= selectedRange[0].getTime() &&
        day.getTime() <= selectedRange[1].getTime()
      );
    }
    return false;
  };

  const filteredExpenses = allExpenses.filter((exp) => {
    const expDate = new Date(exp.date);
    if (selectedRange.length === 1) {
      return expDate.toDateString() === selectedRange[0].toDateString();
    }
    if (selectedRange.length === 2) {
      return expDate >= selectedRange[0] && expDate <= selectedRange[1];
    }
    return false;
  });

  const groupedData = filteredExpenses.reduce((acc, exp) => {
    const found = acc.find((item) => item.category === exp.category);
    if (found) {
      found.amount += exp.amount;
    } else {
      acc.push({ category: exp.category, amount: exp.amount });
    }
    return acc;
  }, []);

  const total = groupedData.reduce((sum, d) => sum + d.amount, 0);

  return (
    <AnalysisWrapper>
      {/* 📅 Календарь */}
      <Card>
        <Title>Период</Title>
        <WeekDays>
          {daysOfWeek.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </WeekDays>
        <DaysGrid>
          {days.map((day, i) => (
            <DayButton
              key={i}
              onClick={() => toggleDay(day)}
              $selected={isSelected(day)}
            >
              {day.getDate()}
            </DayButton>
          ))}
        </DaysGrid>
      </Card>

      {/* 📊 График */}
      <Card>
        <Summary>
          {total > 0 ? `${total.toLocaleString("ru-RU")} ₽` : "Нет расходов"}
        </Summary>
        <Period>
          {selectedRange.length === 1
            ? selectedRange[0].toLocaleDateString("ru-RU")
            : selectedRange.length === 2
            ? `${selectedRange[0].toLocaleDateString(
                "ru-RU"
              )} - ${selectedRange[1].toLocaleDateString("ru-RU")}`
            : "Не выбран"}
        </Period>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={groupedData}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </AnalysisWrapper>
  );
};

export default Analysis;
