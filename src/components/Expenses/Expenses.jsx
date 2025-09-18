import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { addTransaction, deleteTransaction } from "../../services/transactions";
import * as S from "./Expenses.styled";
import BaseButton from "../BaseButton/BaseButton";
import { useNavigate } from "react-router-dom";
import { ExpensesContext } from "../../context/EspensesContext";

const categories = [
  { id: "food", label: "Еда", icon: "🍔" },
  { id: "transport", label: "Транспорт", icon: "🚕" },
  { id: "housing", label: "Жилье", icon: "🏠" },
  { id: "joy", label: "Развлечения", icon: "🎮" },
  { id: "education", label: "Образование", icon: "📚" },
  { id: "others", label: "Другое", icon: "📦" },
];

// хелпер для сокращения текста
const truncateLabel = (text, max = 4) =>
  text.length > max ? text.slice(0, max) + "..." : text;

const Expenses = () => {
  const { user } = useContext(AuthContext);
  const {
    fetchExpenses,
    isMobile,
    setShowForm,
    transactions,
    loading,
    errors,
    showForm,
    setErrors,
  } = useContext(ExpensesContext);

  const [form, setForm] = useState({
    title: "",
    category: "",
    date: "",
    amount: "",
  });
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [editModal, setEditModal] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);

  const handleRowClick = (id) => {
    setSelectedTransactionId(id === selectedTransactionId ? null : id);
  };

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
    <S.Container $showForm={showForm}>
      <S.ContainerTBM>
        <S.Title $showForm={showForm}>Мои расходы </S.Title>
        {isMobile && !showForm && (
          <>
            <S.AddButton
              onClick={() => {
                setShowForm(true);
                navigate("/expenses/new");
              }}
            >
              <S.Icon src="../+.svg" alt="Плюс" />
              Новый расход
            </S.AddButton>
          </>
        )}
      </S.ContainerTBM>

      {/* Контент */}
      <S.Content>
        {(!isMobile || (isMobile && !showForm)) && (
          <>
            <S.TableWrapper $isMobile={isMobile}>
              <S.ContainerFilters>
                <S.TableTitle>Таблица расходов</S.TableTitle>
                {/* Фильтры */}
                <S.Filters>
                  <label>
                    Фильтровать по категории:{" "}
                    <S.Dropdown>
                      <S.DropdownToggle
                        onClick={() => setOpenCategory((p) => !p)}
                      >
                        {truncateLabel(
                          categories.find((c) => c.id === filter)?.label ||
                            "все"
                        )}
                        <S.ArrowIcon open={openCategory}>
                          <svg
                            width="7"
                            height="5"
                            viewBox="0 0 7 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.5101 4.47876L0.930499 0.010757L6.0897 0.0107574L3.5101 4.47876Z"
                              fill="black"
                            />
                          </svg>
                        </S.ArrowIcon>
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
                  </label>

                  <label>
                    Сортировать по:{" "}
                    <S.Dropdown>
                      <S.DropdownToggle onClick={() => setOpenSort((p) => !p)}>
                        {sortBy === "date" ? "Дата" : "Сумма"}
                        <S.ArrowIcon open={openSort}>
                          <svg
                            width="7"
                            height="5"
                            viewBox="0 0 7 5"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.5101 4.47876L0.930499 0.010757L6.0897 0.0107574L3.5101 4.47876Z"
                              fill="black"
                            />
                          </svg>
                        </S.ArrowIcon>
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
                  </label>
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
                      <S.TableRow
                        key={t._id}
                        onClick={() => handleRowClick(t._id)}
                        $isSelected={selectedTransactionId === t._id}
                      >
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

                        {/* Кнопки редактирования/удаления только для ПК */}
                        {!isMobile && (
                          <S.ConteunerActionButton
                            style={{
                              display: "flex",
                              gap: "5px",
                              alignItems: "center",
                              justifyContent: "flex-end",
                            }}
                          >
                            <S.ActionButton onClick={() => handleEdit(t)}>
                              ✏️
                            </S.ActionButton>
                            <S.ActionButton
                              onClick={() => handleDeleteTransaction(t._id)}
                            >
                              🗑️
                            </S.ActionButton>
                          </S.ConteunerActionButton>
                        )}
                      </S.TableRow>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5}>Нет транзакций</td>
                    </tr>
                  )}
                </tbody>
              </S.Table>
            </S.TableWrapper>
            {/* Мобильные действия под таблицей */}
            {isMobile && filteredTransactions.length > 0 && (
              <S.MobileActions>
                <BaseButton
                  text="Редактировать расход"
                  onClick={() => {
                    if (selectedTransactionId) {
                      const t = transactions.find(
                        (t) => t._id === selectedTransactionId
                      );
                      handleEdit(t);

                      setShowForm(true);
                      navigate("/expenses/new");
                    }
                  }}
                  disabled={!selectedTransactionId} // активна только если выбрана строка
                />
                <S.DeleteText
                  onClick={() => {
                    if (selectedTransactionId) {
                      handleDeleteTransaction(selectedTransactionId);
                      setSelectedTransactionId(null);
                    }
                  }}
                >
                  Удалить расход
                </S.DeleteText>
              </S.MobileActions>
            )}
          </>
        )}
        {/* Форма */}
        {showForm && (
          <S.Form $isMobile={isMobile} onSubmit={handleSubmit}>
            <S.AddButtonF
              onClick={() => {
                setShowForm(false);
                navigate("/expenses");
              }}
            >
              <S.Icon src="../Str.svg" alt="Назад" />
              Мои расходы
            </S.AddButtonF>
            <h3>{editModal ? "Редактирование" : "Новый расход"}</h3>
            <label>
              Описание {errors.title && <span>{errors.title}</span>}
              {!editModal && (
                <S.Input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  $error={errors.title}
                  $valid={form.title && !errors.title}
                  placeholder="Введите описание"
                />
              )}
              {editModal && (
                <S.Input
                  value={editModal.description}
                  onChange={(e) =>
                    setEditModal({ ...editModal, description: e.target.value })
                  }
                  $error={errors.title}
                  $valid={form.title && !errors.title}
                />
              )}
            </label>
            <label>
              Категория {errors.category && <span>{errors.category}</span>}
              {!editModal && (
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
              )}
              {editModal && (
                <S.Categories>
                  {categories.map((c) => (
                    <S.CategoryButton
                      type="button"
                      key={c.id}
                      $active={editModal.category === c.id}
                      onClick={() =>
                        setEditModal({ ...editModal, category: c.id })
                      }
                    >
                      {c.icon} {c.label}
                    </S.CategoryButton>
                  ))}
                </S.Categories>
              )}
            </label>
            <label>
              Дата {errors.date && <span>{errors.date}</span>}
              {!editModal && (
                <S.Input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  $error={errors.date}
                  $valid={form.date && !errors.date}
                />
              )}
              {editModal && (
                <S.Input
                  type="date"
                  value={editModal.date.split("T")[0]}
                  onChange={(e) =>
                    setEditModal({ ...editModal, date: e.target.value })
                  }
                  $error={errors.date}
                  $valid={form.date && !errors.date}
                  name="date"
                />
              )}
            </label>
            <label>
              Сумма {errors.amount && <span>{errors.amount}</span>}
              {!editModal && (
                <S.Input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  $error={errors.amount}
                  $valid={form.amount && !errors.amount}
                  placeholder="Введите сумму"
                />
              )}
              {editModal && (
                <S.Input
                  type="number"
                  name="amount"
                  value={editModal.sum}
                  $error={errors.amount}
                  $valid={form.amount && !errors.amount}
                  onChange={(e) =>
                    setEditModal({ ...editModal, sum: e.target.value })
                  }
                />
              )}
            </label>
            {!editModal && (
              <BaseButton
                type="submit"
                text={
                  editModal
                    ? "Сохранить редактирование"
                    : "Добавить новый расход"
                }
                disabled={
                  !form.title.trim() ||
                  !form.category ||
                  !form.date ||
                  !form.amount ||
                  isNaN(form.amount) ||
                  +form.amount <= 0
                }
              />
            )}
            {editModal && (
              <BaseButton
                text="Сохранить редактирование"
                onClick={handleSaveEdit}
              />
            )}
          </S.Form>
        )}
      </S.Content>
    </S.Container>
  );
};

export default Expenses;
