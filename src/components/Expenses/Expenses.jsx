import React, { useState } from "react";
import * as S from "./Expenses.styled";
import Input from "../Input/Input";
import BaseButton from "../BaseButton/BaseButton";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: "", amount: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.amount) return;
    const newExpense = {
      id: Date.now(),
      title: form.title,
      amount: parseFloat(form.amount),
    };
    setExpenses([...expenses, newExpense]);
    setForm({ title: "", amount: "" });
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const handleEdit = (id) => {
    const exp = expenses.find((e) => e.id === id);
    if (exp) {
      setForm({ title: exp.title, amount: exp.amount });
      setExpenses(expenses.filter((e) => e.id !== id));
    }
  };

  return (
    <S.Container>
      <S.Title>Мои расходы</S.Title>

      <form onSubmit={handleSubmit}>
        <Input
          id="title"
          name="title"
          placeholder="Название"
          type="text"
          value={form.title}
          onChange={handleChange}
        />
        <Input
          id="amount"
          name="amount"
          placeholder="Сумма"
          type="number"
          value={form.amount}
          onChange={handleChange}
        />
        <BaseButton type="submit" text="Сохранить" />
      </form>

      <S.List>
        {expenses.map((e) => (
          <S.Item key={e.id}>
            <S.Info>
              <S.Name>{e.title}</S.Name>
              <S.Amount>{e.amount} ₽</S.Amount>
            </S.Info>
            <S.Actions>
              <button
                type="button"
                className="btn-icon edit"
                onClick={() => handleEdit(e.id)}
              >
                ✏️
              </button>
              <button
                type="button"
                className="btn-icon delete"
                onClick={() => handleDelete(e.id)}
              >
                🗑
              </button>
            </S.Actions>
          </S.Item>
        ))}
      </S.List>
    </S.Container>
  );
};

export default Expenses;
