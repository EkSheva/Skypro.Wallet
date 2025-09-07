// Expenses.jsx
import React, { useState } from "react";
import * as S from "./Expenses.styled";
import BaseButton from "../BaseButton/BaseButton";

const categories = [
  { id: "food", label: "Еда", icon: "🍔" },
  { id: "transport", label: "Транспорт", icon: "🚕" },
  { id: "housing", label: "Жилье", icon: "🏠" },
  { id: "fun", label: "Развлечения", icon: "🎮" },
  { id: "education", label: "Образование", icon: "📚" },
  { id: "other", label: "Другое", icon: "📦" },
];

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
    date: "",
    amount: "",
  });
  const [errors, setErrors] = useState({});

  // Проверка и установка ошибок
  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "*";
    if (!form.category) newErrors.category = "*";
    if (!form.date) newErrors.date = "*";
    if (!form.amount || isNaN(form.amount) || +form.amount <= 0)
      newErrors.amount = "*";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategorySelect = (id) => {
    setForm({ ...form, category: id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newExpense = {
      id: Date.now(),
      ...form,
      amount: parseFloat(form.amount),
    };

    setExpenses([...expenses, newExpense]);
    setForm({ title: "", category: "", date: "", amount: "" });
    setErrors({});
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // Простая проверка формы без setState
  const isFormValid =
    form.title.trim() &&
    form.category &&
    form.date &&
    form.amount &&
    !isNaN(form.amount) &&
    +form.amount > 0;

  return (
    <S.Container>
      <S.Title>Мои расходы</S.Title>

      <S.Content>
        {/* Таблица */}
        <S.TableWrapper>
          <S.TableTitle>Таблица расходов</S.TableTitle>
          <S.Table>
            <thead>
              <tr>
                <th>Описание</th>
                <th>Категория</th>
                <th>Дата</th>
                <th>Сумма</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e) => (
                <tr key={e.id}>
                  <td>{e.title}</td>
                  <td>
                    {categories.find((c) => c.id === e.category)?.label || e.category}
                  </td>
                  <td>{new Date(e.date).toLocaleDateString("ru-RU")}</td>
                  <td>{e.amount} ₽</td>
                  <td>
                    <button onClick={() => handleDelete(e.id)}>
                      <svg
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.62 3.29003H9.42L7.73 1.60003C7.595 1.46503 7.375 1.46503 7.235 1.60003C7.1 1.73503 7.1 1.95503 7.235 2.09503L8.43 3.29003H3.57L4.765 2.09503C4.9 1.96003 4.9 1.74003 4.765 1.60003C4.63 1.46503 4.41 1.46503 4.27 1.60003L2.585 3.29003H2.385C1.935 3.29003 1 3.29003 1 4.57003C1 5.05503 1.1 5.37503 1.31 5.58503C1.43 5.71003 1.575 5.77503 1.73 5.81003C1.875 5.84503 2.03 5.85003 2.18 5.85003H9.82C9.975 5.85003 10.12 5.84003 10.26 5.81003C10.68 5.71003 11 5.41003 11 4.57003C11 3.29003 10.065 3.29003 9.62 3.29003Z"
                          fill="currentColor"
                        />
                        <path
                          d="M9.52502 6.5H2.43502C2.12502 6.5 1.89002 6.775 1.94002 7.08L2.36002 9.65C2.50002 10.51 2.87502 11.5 4.54002 11.5H7.34502C9.03002 11.5 9.33002 10.655 9.51002 9.71L10.015 7.095C10.075 6.785 9.84002 6.5 9.52502 6.5ZM5.30502 9.725C5.30502 9.92 5.15002 10.075 4.96002 10.075C4.76502 10.075 4.61002 9.92 4.61002 9.725V8.075C4.61002 7.885 4.76502 7.725 4.96002 7.725C5.15002 7.725 5.30502 7.885 5.30502 8.075V9.725ZM7.44502 9.725C7.44502 9.92 7.29002 10.075 7.09502 10.075C6.90502 10.075 6.74502 9.92 6.74502 9.725V8.075C6.74502 7.885 6.90502 7.725 7.09502 7.725C7.29002 7.725 7.44502 7.885 7.44502 8.075V9.725Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        </S.TableWrapper>

        {/* Форма */}
        <S.Form onSubmit={handleSubmit}>
          <h3>Новый расход</h3>

          <label>
            Описание {errors.title && <span>{errors.title}</span>}
            <S.Input
              name="title"
              value={form.title}
              onChange={handleChange}
              $error={errors.title}
              $valid={form.title && !errors.title}
              placeholder="Введите описание"
            />
          </label>

          <div>
            Категория {errors.category && <span>{errors.category}</span>}
            <S.Categories>
              {categories.map((c) => (
                <S.CategoryButton
                  type="button"
                  key={c.id}
                  $active={form.category === c.id}
                  onClick={() => handleCategorySelect(c.id)}
                >
                  {c.icon} {c.label}
                </S.CategoryButton>
              ))}
            </S.Categories>
          </div>

          <label>
            Дата {errors.date && <span>{errors.date}</span>}
            <S.Input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              $error={errors.date}
              $valid={form.date && !errors.date}
            />
          </label>

          <label>
            Сумма {errors.amount && <span>{errors.amount}</span>}
            <S.Input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              $error={errors.amount}
              $valid={form.amount && !errors.amount}
              placeholder="Введите сумму"
            />
          </label>

          <BaseButton
            type="submit"
            text="Добавить новый расход"
            disabled={!isFormValid}
          />
        </S.Form>
      </S.Content>
    </S.Container>
  );
};

export default Expenses;
