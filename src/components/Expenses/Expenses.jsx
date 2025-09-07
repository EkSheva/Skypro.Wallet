import React, { useState, useMemo } from "react";
import Categories from "./Categories"; 
import * as S from "./ExpensesStyled";

const initialExpenses = [
  { id: 1, title: "Обед в кафе", amount: 750, date: "2025-09-01", category: "food" },
  { id: 2, title: "Поездка на такси", amount: 420, date: "2025-09-02", category: "transport" },
  { id: 3, title: "Аренда жилья", amount: 25000, date: "2025-09-01", category: "housing" },
  { id: 4, title: "Кинотеатр", amount: 600, date: "2025-09-03", category: "entertainment" },
  { id: 5, title: "Курс по React", amount: 12000, date: "2025-08-20", category: "education" },
  { id: 6, title: "Канцелярия", amount: 300, date: "2025-09-04", category: "other" },
];

const Expenses = () => {
  // По умолчанию активна категория "food" — соответствует defaultCategories в Categories.jsx
  const [selectedCategories, setSelectedCategories] = useState(["food"]);

  // Получаем обновлённый массив категорий из компонента Categories через onChange
  const handleCategoriesChange = (nextCategories) => {
    const active = nextCategories.filter((c) => c.active).map((c) => c.id);
    setSelectedCategories(active);
  };

  // Фильтрация расходов по выбранным категориям
  const filteredExpenses = useMemo(() => {
    if (!selectedCategories || selectedCategories.length === 0) return initialExpenses;
    return initialExpenses.filter((e) => selectedCategories.includes(e.category));
  }, [selectedCategories]);

  // Сумма отображаемых расходов
  const total = useMemo(
    () => filteredExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0),
    [filteredExpenses]
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Расходы</S.Title>
        <S.Total>{total.toLocaleString("ru-RU")} ₽</S.Total>
      </S.Header>

      <S.ChipsWrapper>
        <Categories onChange={handleCategoriesChange} />
      </S.ChipsWrapper>

      <S.List>
        {filteredExpenses.length === 0 ? (
          <S.NoExpenses>Нет расходов в выбранных категориях.</S.NoExpenses>
        ) : (
          filteredExpenses.map((e) => (
            <S.Item key={e.id}>
              <S.ItemLeft>
                <S.ItemTitle>{e.title}</S.ItemTitle>
                <S.ItemMeta>
                  {e.date} · <S.CategoryBadge>{e.category}</S.CategoryBadge>
                </S.ItemMeta>
              </S.ItemLeft>
              <S.ItemRight>{e.amount.toLocaleString("ru-RU")} ₽</S.ItemRight>
            </S.Item>
          ))
        )}
      </S.List>
    </S.Container>
  );
};

export default Expenses;
