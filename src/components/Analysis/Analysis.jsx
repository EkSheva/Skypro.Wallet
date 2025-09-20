// src/components/Analysis/Analysis.jsx
import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { AuthContext } from "../../context/AuthContext";
import { getTransactions } from "../../services/transactions";
import * as S from "./Analysis.styled";
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LabelList,
  BarChart,
} from "recharts";
import { useDeviceDetect } from "../hooks/useDeviceDetect";

const categories = [
  { id: "food", name: "Еда", color: "#c19aff" },
  { id: "transport", name: "Транспорт", color: "#ffb347" },
  { id: "housing", name: "Жильё", color: "#6be5c3" },
  { id: "joy", name: "Развлечения", color: "#9ec6ff" },
  { id: "education", name: "Образование", color: "#b5e06c" },
  { id: "others", name: "Другое", color: "#ff8b94" },
];

const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const weekDays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

export default function Analysis() {
  const { user } = useContext(AuthContext);
  const { isMobile } = useDeviceDetect();
  const [transactions, setTransactions] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [viewMode, setViewMode] = useState("month");
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [mobileView, setMobileView] = useState("chart"); // "chart", "period"
  const calendarScrollRef = useRef(null);
  const yearScrollRef = useRef(null);

  // Сокращение названий (только мобилка)
  const shortenLabel = (name) => {
    if (!isMobile) return name;
    const abbreviations = {
      Транспорт: "Трансп...",
      Развлечения: "Развл...",
      Образование: "Образ...",
    };
    return abbreviations[name] || name;
  };

  // Загрузка транзакций (без фильтров/сортировки через API)
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

  // Генерация месяцев для скролла
  const generateScrollMonths = () => {
    const monthsData = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const monthsBefore = 12;
    const monthsAfter = 12;

    for (let i = -monthsBefore; i <= monthsAfter; i++) {
      const date = new Date(currentYear, currentMonth + i, 1);
      const year = date.getFullYear();
      const month = date.getMonth();

      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();

      const days = [];
      for (
        let j = 0;
        j < (firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1);
        j++
      )
        days.push(null);
      for (let j = 1; j <= daysInMonth; j++) days.push(j);

      monthsData.push({
        month,
        year,
        days,
        title: `${months[month]} ${year}`,
        isCurrentMonth: i === 0,
        currentDay: i === 0 ? currentDate.getDate() : null,
      });
    }
    return monthsData;
  };

  const scrollMonths = generateScrollMonths();

  // Автоскролл к текущему месяцу (месячный режим)
  useEffect(() => {
    if (viewMode === "month" && calendarScrollRef.current) {
      const currentMonthElement = calendarScrollRef.current.querySelector(
        "[data-current-month='true']"
      );
      if (currentMonthElement)
        currentMonthElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }
  }, [viewMode]);

  // Автоскролл к текущему месяцу (годовой режим)
  useEffect(() => {
    if (viewMode === "year" && yearScrollRef.current) {
      const now = new Date();
      const currentMonthElement = yearScrollRef.current.querySelector(
        `[data-year='${now.getFullYear()}'][data-month='${now.getMonth()}']`
      );
      if (currentMonthElement) {
        currentMonthElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [viewMode]);

  // Выбор дней
  const handleDaySelect = (year, month, day) => {
    if (!day) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    if (selectedDays.length === 0) setSelectedDays([dateStr]);
    else if (selectedDays.length === 1)
      setSelectedDays([...selectedDays, dateStr]);
    else setSelectedDays([dateStr]);
  };

  // Выбор месяца (в годовом режиме)
  const handleMonthClick = (year, month) => {
    const monthStr = `${year}-${month}`;
    if (selectedMonths.includes(monthStr)) {
      setSelectedMonths(selectedMonths.filter((m) => m !== monthStr));
    } else {
      setSelectedMonths([...selectedMonths, monthStr]);
    }
  };

  // Подсветка выбранных дней
  const isDaySelected = (year, month, day) => {
    if (!day) return false;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    if (selectedDays.length === 0) return false;
    if (selectedDays.length === 1) return selectedDays.includes(dateStr);
    const sorted = [...selectedDays].sort();
    return dateStr >= sorted[0] && dateStr <= sorted[1];
  };

  // Подсветка текущего дня
  const isCurrentDay = (year, month, day, monthData) => {
    if (!day || !monthData.isCurrentMonth) return false;
    return day === monthData.currentDay;
  };

  // Подсветка текущего месяца в годовом режиме
  const isCurrentMonthInYearView = (year, month) => {
    const now = new Date();
    return year === now.getFullYear() && month === now.getMonth();
  };

  // Фильтрация по периоду (локально)
  let filtered = transactions;
  if (viewMode === "month" && selectedDays.length === 2) {
    const [start, end] = [...selectedDays].sort();
    filtered = transactions.filter((t) => {
      const d = new Date(t.date);
      return d >= new Date(start) && d <= new Date(end);
    });
  }
  if (viewMode === "year" && selectedMonths.length > 0) {
    filtered = transactions.filter((t) => {
      const tDate = new Date(t.date);
      return selectedMonths.some((m) => {
        const [y, mo] = m.split("-").map(Number);
        return tDate.getFullYear() === y && tDate.getMonth() === mo;
      });
    });
  }

  // Группировка по категориям (без displayValue)
  const expenses = categories.map((cat) => {
    const value = filtered
      .filter((t) => t.category === cat.id)
      .reduce((acc, cur) => acc + cur.sum, 0);

    return {
      name: cat.name,
      value,
      color: cat.color,
      id: cat.id,
    };
  });

  const total = expenses.reduce((acc, cur) => acc + cur.value, 0);
  const hasExpenses = total > 0;

  const formatDisplayDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    const monthsRu = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    return `${parseInt(day, 10)} ${monthsRu[parseInt(month, 10) - 1]} ${year}`;
  };

  const getSelectedPeriodText = () => {
    if (viewMode === "month") {
      if (selectedDays.length === 0) return "Расходы за весь период";
      if (selectedDays.length === 1)
        return `Расходы за ${formatDisplayDate(selectedDays[0])}`;
      const sorted = [...selectedDays].sort();
      return `Расходы с ${formatDisplayDate(sorted[0])} по ${formatDisplayDate(
        sorted[1]
      )}`;
    }
    if (viewMode === "year") {
      if (selectedMonths.length === 0) return "Расходы за весь период";
      return `Расходы за ${selectedMonths
        .map((m) => {
          const [y, mo] = m.split("-");
          return `${months[Number(mo)]} ${y}`;
        })
        .join(", ")}`;
    }
  };

  // Tooltip форматтер
  const customTooltipFormatter = (value, _name, props) => {
    const realValue = props?.payload?.value ?? 0;
    return [`${realValue.toLocaleString("ru-RU")} ₽`, "Сумма"];
  };

  // Мобильные обработчики
  const handleSelectPeriod = () => {
    setMobileView("period");
  };
  const handleApplyPeriod = () => {
    setMobileView("chart");
  };

  if (isMobile) {
    return (
      <S.MobileContainer>
        {/* Шапка для мобильной версии */}
        <S.MobileHeader>
          <S.MobileTitle>
            {mobileView === "chart" ? "Анализ расходов" : "Выбор периода"}
          </S.MobileTitle>

          {mobileView !== "chart" && (
            <S.ToggleGroup>
              <S.ToggleButton
                $active={viewMode === "month"}
                onClick={() => setViewMode("month")}
              >
                Месяц
              </S.ToggleButton>
              <S.ToggleButton
                $active={viewMode === "year"}
                onClick={() => setViewMode("year")}
              >
                Год
              </S.ToggleButton>
            </S.ToggleGroup>
          )}
        </S.MobileHeader>

        {mobileView === "chart" ? (
          // Страница с графиком (ТОЛЬКО ГРАФИК)
          <>
            <S.ChartSection>
              <S.TotalAmount>{total.toLocaleString("ru-RU")} ₽</S.TotalAmount>
              <S.PeriodText>{getSelectedPeriodText()}</S.PeriodText>

              <S.ChartWrapperMobile>
                {hasExpenses ? (
                  <BarChart
                    width={342}
                    height={376}
                    data={expenses}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <XAxis
                      dataKey="name"
                      tick={{
                        fontSize: 10,
                        fontFamily: "Montserrat",
                        fontWeight: 400,
                        fill: "#000000",
                      }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={shortenLabel}
                      interval={0}
                    />
                    <YAxis hide />
                    <Tooltip formatter={customTooltipFormatter} />
                    <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={52}>
                      {expenses.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      <LabelList
                        dataKey="value"
                        position="top"
                        formatter={(value) =>
                          value === 0 ? "" : value.toLocaleString("ru-RU") + " ₽"
                        }
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          fontFamily: "Montserrat",
                          fill: "#000000",
                        }}
                      />
                    </Bar>
                  </BarChart>
                ) : (
                  <S.EmptyState>Нет расходов за выбранный период</S.EmptyState>
                )}
              </S.ChartWrapperMobile>
            </S.ChartSection>

            <S.ChangePeriodButton onClick={handleSelectPeriod}>
              Выбрать другой период
            </S.ChangePeriodButton>
          </>
        ) : (
          // Страница выбора периода
          <S.PeriodSelection>
            {viewMode === "year" ? (
              <S.YearSelection ref={yearScrollRef}>
                {Array.from(new Set(scrollMonths.map((m) => m.year))).map(
                  (year) => (
                    <div key={year}>
                      <S.YearTitle>{year}</S.YearTitle>
                      <S.MonthsGrid>
                        {months.map((monthName, idx) => {
                          const monthStr = `${year}-${idx}`;
                          const active = selectedMonths.includes(monthStr);
                          return (
                            <S.MonthButton
                              key={monthStr}
                              $selected={active}
                              $current={isCurrentMonthInYearView(year, idx)}
                              data-year={year}
                              data-month={idx}
                              onClick={() => handleMonthClick(year, idx)}
                            >
                              {monthName}
                            </S.MonthButton>
                          );
                        })}
                      </S.MonthsGrid>
                    </div>
                  )
                )}
              </S.YearSelection>
            ) : (
              <S.MonthSelection>
                <S.CalendarContainer>
                  <S.FixedDaysHeader>
                    {weekDays.map((d) => (
                      <S.DayHeader key={d}>{d}</S.DayHeader>
                    ))}
                  </S.FixedDaysHeader>
                  <S.CalendarScroll ref={calendarScrollRef}>
                    {scrollMonths.map((md) => (
                      <div
                        key={`${md.year}-${md.month}`}
                        data-current-month={md.isCurrentMonth ? "true" : "false"}
                      >
                        <S.MonthTitle>{md.title}</S.MonthTitle>
                        <S.DaysGrid>
                          {md.days.map((day, idx) => (
                            <S.DayCell
                              key={idx}
                              selected={isDaySelected(md.year, md.month, day)}
                              $current={isCurrentDay(md.year, md.month, day, md)}
                              disabled={!day}
                              onClick={() =>
                                handleDaySelect(md.year, md.month, day)
                              }
                            >
                              {day}
                            </S.DayCell>
                          ))}
                        </S.DaysGrid>
                      </div>
                    ))}
                  </S.CalendarScroll>
                </S.CalendarContainer>
              </S.MonthSelection>
            )}

            <S.ApplyButton onClick={handleApplyPeriod}>
              Выбрать период
            </S.ApplyButton>
          </S.PeriodSelection>
        )}
      </S.MobileContainer>
    );
  }

  // Десктопная версия
  return (
    <S.Container>
      <S.Title>Анализ расходов</S.Title>

      <S.CalendarBox>
        <S.CalendarWrapper>
          {/* Период с кнопками справа */}
          <S.PeriodHeader>
            <span
              style={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: 24,
              }}
            >
              Период
            </span>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                gap: "12px",
                alignItems: "center",
                paddingRight: "32px",
              }}
            >
              <S.ToggleButton
                $active={viewMode === "month"}
                onClick={() => setViewMode("month")}
              >
                Месяц
              </S.ToggleButton>
              <S.ToggleButton
                $active={viewMode === "year"}
                onClick={() => setViewMode("year")}
              >
                Год
              </S.ToggleButton>
            </div>
          </S.PeriodHeader>

          {/* Годовой выбор месяцев */}
          {viewMode === "year" && (
            <S.CalendarScroll ref={yearScrollRef} style={{ height: "380px" }}>
              {Array.from(new Set(scrollMonths.map((m) => m.year))).map(
                (year) => (
                  <div key={year}>
                    <S.MonthTitle>{year}</S.MonthTitle>
                    <S.YearMonthsGrid
                      style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}
                    >
                      {months.map((monthName, idx) => {
                        const monthStr = `${year}-${idx}`;
                        const active = selectedMonths.includes(monthStr);
                        const current = isCurrentMonthInYearView(year, idx);
                        return (
                          <S.MonthSelectButton
                            key={monthStr}
                            data-year={year}
                            data-month={idx}
                            $active={active}
                            $current={current}
                            onClick={() => handleMonthClick(year, idx)}
                          >
                            {monthName}
                          </S.MonthSelectButton>
                        );
                      })}
                    </S.YearMonthsGrid>
                  </div>
                )
              )}
            </S.CalendarScroll>
          )}

          {/* Месячный календарь */}
          {viewMode === "month" && (
            <S.CalendarContainer>
              <S.FixedDaysHeader>
                {weekDays.map((d) => (
                  <S.DayHeader key={d}>{d}</S.DayHeader>
                ))}
              </S.FixedDaysHeader>
              <S.CalendarScroll ref={calendarScrollRef}>
                {scrollMonths.map((md) => (
                  <label
                    key={`${md.year}-${md.month}`}
                    data-current-month={md.isCurrentMonth ? "true" : "false"}
                  >
                    <S.MonthTitle>{md.title}</S.MonthTitle>
                    <S.DaysGrid>
                      {md.days.map((day, idx) => (
                        <S.DayCell
                          key={idx}
                          selected={isDaySelected(md.year, md.month, day)}
                          $current={isCurrentDay(md.year, md.month, day, md)}
                          disabled={!day}
                          onClick={() => handleDaySelect(md.year, md.month, day)}
                        >
                          {day}
                        </S.DayCell>
                      ))}
                    </S.DaysGrid>
                  </label>
                ))}
              </S.CalendarScroll>
            </S.CalendarContainer>
          )}
        </S.CalendarWrapper>

        {/* График расходов */}
        <S.ChartWrapper>
          <S.ChartHeader>
            <S.Total>{total.toLocaleString("ru-RU")} ₽</S.Total>
            <S.Subtitle>{getSelectedPeriodText()}</S.Subtitle>
          </S.ChartHeader>

          {hasExpenses ? (
            <S.ResponsiveContainer>
              <S.BarChart data={expenses}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12, fontWeight: 400, fill: "#000000" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip formatter={customTooltipFormatter} />
                <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={94}>
                  {expenses.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="top"
                    formatter={(value) =>
                      value === 0 ? "" : value.toLocaleString("ru-RU") + " ₽"
                    }
                    style={{
                      fontFamily: "Montserrat",
                      fontWeight: 600,
                      fontSize: 16,
                      fill: "#000000",
                    }}
                  />
                </Bar>
              </S.BarChart>
            </S.ResponsiveContainer>
          ) : (
            <S.EmptyState>Нет расходов за выбранный период</S.EmptyState>
          )}
        </S.ChartWrapper>
      </S.CalendarBox>
    </S.Container>
  );
}