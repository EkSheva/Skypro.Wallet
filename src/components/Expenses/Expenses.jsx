// Expenses.jsx
import React, { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  getTransactions,
  addTransaction,
  deleteTransaction,
} from "../../services/transactions";
import * as S from "./Expenses.styled";
import BaseButton from "../BaseButton/BaseButton";

const categories = [
   { id: "food", label: "Еда", icon: "🍔" },
  { id: "transport", label: "Транспорт", icon: "🚕" },
  { id: "housing", label: "Жилье", icon: "🏠" },
  { id: "joy", label: "Развлечения", icon: "🎮" },
 { id: "education", label: "Образование", icon: "📚" },
  { id: "others", label: "Другое", icon: "📦" },
];

const Expenses = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    category: "",
    date: "",
    amount: "",
  });
  const [errors, setErrors] = useState({});

  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [editModal, setEditModal] = useState(null);

  const [openCategory, setOpenCategory] = useState(false);
  const [openSort, setOpenSort] = useState(false);


  // --- загрузка транзакций ---
  const fetchExpenses = useCallback(async () => {
    if (!user?.token) return;
    setLoading(true);
    try {
      const data = await getTransactions(user.token);
      setTransactions(data || []);
    } catch (err) {
      console.error("Ошибка загрузки транзакций:", err.message);
    } finally {
      setLoading(false);
    }
  }, [user?.token]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // --- валидация формы ---
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

  // --- изменение формы ---
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleCategorySelect = (id) => setForm({ ...form, category: id });

  // --- добавление транзакции ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newTransaction = {
      description: form.title,
      category: form.category,
      date: form.date,
      sum: Number(form.amount),
    };

    try {
      await addTransaction(newTransaction, user.token);
      await fetchExpenses();
      setForm({ title: "", category: "", date: "", amount: "" });
      setErrors({});
    } catch (err) {
      console.error("Ошибка добавления транзакции:", err.message);
    }
  };

  // --- удаление транзакции ---
  const handleDeleteTransaction = async (id) => {
    try {
      await deleteTransaction(id, user.token);
      await fetchExpenses();
    } catch (err) {
      console.error("Ошибка удаления транзакции:", err.message);
    }
  };

  // --- открыть модал редактирования ---
  const handleEdit = (t) => setEditModal(t);

  // --- сохранить изменения ---
  const handleSaveEdit = async () => {
    try {
      await deleteTransaction(editModal._id, user.token);
      await addTransaction(
        {
          description: editModal.description,
          category: editModal.category,
          date: editModal.date,
          sum: Number(editModal.sum),
        },
        user.token
      );
      setEditModal(null);
      await fetchExpenses();
    } catch (err) {
      console.error("Ошибка редактирования транзакции:", err.message);
    }
  };

  // --- фильтрация + сортировка ---
  const filteredTransactions = transactions
    .filter((t) => (filter === "all" ? true : t.category === filter))
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date);
      if (sortBy === "sum") return b.sum - a.sum;
      return 0;
    });

  if (loading) return <p>Загрузка...</p>;

  return (
    <S.Container>      
      <S.Title>Мои расходы</S.Title>    
      {/* Контент */}
      <S.Content>
        <S.TableWrapper>          
          <S.ContainerFilters>
            <S.TableTitle>Таблица расходов</S.TableTitle>
             {/* Фильтры */}
            <S.Filters>
              <div>
                Фильтровать по категории:{" "}
                <S.Dropdown>
                  <S.DropdownToggle onClick={() => setOpenCategory((p) => !p)}>
                    {categories.find((c) => c.id === filter)?.label || "все"}
                  </S.DropdownToggle>
                  {openCategory && (
                    <S.DropdownMenu>
                      <S.DropdownItem
                        onClick={() => {
                          setFilter("all");
                          setOpenCategory(false);
                        }}
                      >
                        Все
                      </S.DropdownItem>
                      {categories.map((c) => (
                        <S.DropdownItem
                          key={c.id}
                          onClick={() => {
                            setFilter(c.id);
                            setOpenCategory(false);
                          }}
                        >
                          {c.label}
                        </S.DropdownItem>
                      ))}
                    </S.DropdownMenu>
                  )}
                </S.Dropdown>
              </div>

              <div>
                Сортировать по:{" "}
                <S.Dropdown>
                  <S.DropdownToggle onClick={() => setOpenSort((p) => !p)}>
                    {sortBy === "date" ? "дате" : "сумме"}
                  </S.DropdownToggle>
                  {openSort && (
                    <S.DropdownMenu>
                      <S.DropdownItem
                        onClick={() => {
                          setSortBy("date");
                          setOpenSort(false);
                        }}
                      >
                        Дате
                      </S.DropdownItem>
                      <S.DropdownItem
                        onClick={() => {
                          setSortBy("sum");
                          setOpenSort(false);
                        }}
                      >
                        Сумме
                      </S.DropdownItem>
                    </S.DropdownMenu>
                  )}
                </S.Dropdown>
              </div>
            </S.Filters>
          </S.ContainerFilters>
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
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((t) => (
                  <tr key={t._id}>
                    <td>{t.description}</td>
                    <td>
                      {categories.find((c) => c.id === t.category)?.label ||
                        t.category}
                    </td>
                    <td>
                      {new Date(t.date).toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td>{t.sum} ₽</td>
                    <td style={{ display: "flex", gap: "5px", alignItems: "center", justifyContent: "flex-end" }}>
                      <S.ActionButton onClick={() => handleEdit(t)}>✏️</S.ActionButton>
                      <S.ActionButton onClick={() => handleDeleteTransaction(t._id)}>
                        🗑️
                      </S.ActionButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>Нет транзакций</td>
                </tr>
              )}
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
          <label>
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
          </label>
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
            disabled={
              !form.title.trim() ||
              !form.category ||
              !form.date ||
              !form.amount ||
              isNaN(form.amount) ||
              +form.amount <= 0
            }
          />
        </S.Form>
      </S.Content>
      {/* Модалка редактирования */}
      {editModal && (
        <S.ModalOverlay>
          <S.Modal>
            <h3>Редактирование</h3>
            <input
              value={editModal.description}
              onChange={(e) =>
                setEditModal({ ...editModal, description: e.target.value })
              }
            />
            <input
              type="date"
              value={editModal.date.split("T")[0]}
              onChange={(e) =>
                setEditModal({ ...editModal, date: e.target.value })
              }
            />
            <input
              type="number"
              value={editModal.sum}
              onChange={(e) =>
                setEditModal({ ...editModal, sum: e.target.value })
              }
            />
            <S.Categories>
              {categories.map((c) => (
                <S.CategoryButton
                  key={c.id}
                  $active={editModal.category === c.id}
                  onClick={() => setEditModal({ ...editModal, category: c.id })}
                >
                  {c.label}
                </S.CategoryButton>
              ))}
            </S.Categories>
            <div style={{ display: "flex", gap: "10px" }}>
              <BaseButton  text="Сохранить" onClick={handleSaveEdit} />
              <BaseButton text="Отмена" onClick={() => setEditModal(null)} />
            </div>
          </S.Modal>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default Expenses;
