// services/transactions.js
import axios from "axios";

const API_URL = "https://wedev-api.sky.pro/api/transactions";

// Форматирование даты для API (M-D-YYYY)
const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const [year, month, day] = dateStr.split("-");
  return `${+month}-${+day}-${year}`; // убираем лидирующие нули
};

// Получение всех транзакций с возможной сортировкой и фильтром
export const getTransactions = async (token, sortBy = "", filterBy = []) => {
  try {
    let url = API_URL;
    const params = [];
    if (sortBy) params.push(`sortBy=${sortBy}`);
    if (filterBy.length > 0) params.push(`filterBy=${filterBy.join(",")}`);
    if (params.length) url += `?${params.join("&")}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Проверяем, где лежит массив транзакций
    return response.data.transactions || response.data || [];
  } catch (err) {
    console.error("Ошибка при загрузке транзакций:", err.response?.data || err);
    throw new Error(err.response?.data?.error || "Ошибка при загрузке транзакций");
  }
};


// Добавление новой транзакции
export const addTransaction = async (transaction, token) => {
  try {
    const body = {
      description: transaction.description,
      sum: Number(transaction.sum),
      category: transaction.category,
      date: formatDate(transaction.date),
    };

    const response = await axios.post(API_URL, body, {
      headers: {
        "Content-Type": "",
        Authorization: `Bearer ${token}`,
      },
    });

    // API возвращает обновленный список всех транзакций
    return response.data.transactions;
  } catch (err) {
    console.error("Ошибка при добавлении транзакции:", err.response?.data || err);
    throw new Error(err.response?.data?.error || "Ошибка при добавлении транзакции");
  }
};

// Удаление транзакции по ID
export const deleteTransaction = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // API возвращает обновленный список всех транзакций
    return response.data.transactions;
  } catch (err) {
    console.error("Ошибка при удалении транзакции:", err.response?.data || err);
    throw new Error(err.response?.data?.error || "Ошибка при удалении транзакции");
  }
};

// Функция изменения задачи:

export async function redactTransaction({ id, token, transaction }) {
  try {
    const data = await axios.patch(`${API_URL}/${id}`, transaction, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': '',
      },
    })
    return data.data.transactions
  } catch (error) {
    throw new Error(error.message)
  }
}