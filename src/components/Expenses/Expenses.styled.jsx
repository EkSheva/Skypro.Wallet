// ExpensesStyled.jsx
import styled, { createGlobalStyle } from "styled-components";

/* Глобальные переменные и базовые стили (взято из вашего CSS) */
export const GlobalStyle = createGlobalStyle`
  :root{
    --bg:#f3f5f7;
    --panel:#ffffff;
    --muted:#8b8f98;
    --accent:#6a42f4;
    --radius:14px;
    --shadow: 0 10px 30px rgba(15,23,42,0.06);
    --text:#0f1724;
    font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    font-size:15px;
  }

  *{box-sizing:border-box}
  body{
    margin:0;
    background:var(--bg);
    color:var(--text);
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale;
    font-family: inherit;
    font-size: inherit;
  }

  .page{
    max-width:1200px;
    margin:48px auto;
    padding:0 20px;
  }

  /* Заголовок */
  .page-header h1{
    font-size:28px;
    margin:0 0 18px;
    font-weight:700;
  }

  /* Контент: две колонки */
  .content{
    display:flex;
    gap:28px;
    align-items:flex-start;
  }

  /* Панели */
  .panel{
    background:var(--panel);
    border-radius:var(--radius);
    box-shadow:var(--shadow);
    padding:22px;
  }

  .table-panel{
    flex:1;
    padding:28px 26px;
  }

  .form-panel{
    width: 360px;
    background: #fff;
    border-radius: 14px;
    padding: 26px 22px;
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
    border: 1px solid rgba(15,23,42,0.04);
    box-sizing: border-box;
    color: #0f1724;
  }

  /* Таблица */
  .table-wrap{
    overflow:auto;
    border-radius:10px;
  }

  .expenses-table{
    width:100%;
    border-collapse:collapse;
    min-width:620px;
  }

  .expenses-table thead th{
    text-align:left;
    padding:12px 10px;
    color:var(--muted);
    font-weight:600;
    font-size:13px;
    border-bottom:1px solid #f0f0f2;
  }

  .expenses-table tbody td{
    padding:12px 10px;
    border-bottom:1px solid #f6f6f7;
    font-size:14px;
    color:var(--text);
  }

  .expenses-table tbody tr:hover td{
    background:linear-gradient(90deg, rgba(106,66,244,0.03), transparent);
  }

  .col-right{
    text-align:right;
  }

  .col-action{
    text-align:center;
    width:48px;
    color:#b6bac2;
  }

  /* Форма */
  .field{
    display:block;
    margin-bottom:14px;
  }

  .field .label{
    display:block;
    color:var(--muted);
    font-size:13px;
    margin-bottom:8px;
  }

  .field input[type="text"],
  .field input[type="date"],
  .field input[type="number"]{
    width:100%;
    padding:10px 12px;
    border:1px solid #e8e8ea;
    border-radius:8px;
    background:#fff;
    font-size:14px;
    color:var(--text);
  }

  .field input::placeholder{color:#c4c7cc}

  /* Категории (чипы) — важно, т.к. Categories.jsx использует .categories и .chip */
  .label{
    color:var(--muted);
    font-size:13px;
    margin-bottom:8px;
  }

  .categories{
    display:flex;
    flex-wrap:wrap;
    gap:8px;
    margin-bottom:14px;
  }

  .chip{
    padding:8px 12px;
    border-radius:999px;
    border:1px solid #eef0f3;
    background:#fbfbfd;
    color:var(--text);
    font-size:13px;
    cursor:pointer;
    box-shadow: 0 1px 0 rgba(15,23,42,0.02);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    box-sizing: border-box;
  }

  .chip.active{
    background:linear-gradient(90deg,#7b5cff,#5b33ff);
    color:#fff;
    border:1px solid rgba(0,0,0,0.06);
  }

  /* Кнопка */
  .btn-submit{
    display:block;
    width:100%;
    padding:12px 14px;
    border-radius:10px;
    border:0;
    background:var(--accent);
    color:#fff;
    font-weight:700;
    cursor:pointer;
    margin-top:6px;
    box-shadow: 0 8px 20px rgba(106,66,244,0.18);
  }

  /* Мелкие адаптивы */
  @media (max-width:980px){
    .content{flex-direction:column}
    .form-panel{width:100%}
    .table-panel{order:1}
    .form-panel{order:2}
  }

  /* Мобильные */
  @media (max-width:480px){
    .page{
      margin:20px auto;
      padding:0 12px;
    }
    .page-header h1{font-size:20px}
    .panel{padding:16px}
    .table-panel{padding:18px 12px}
    .form-panel{padding:18px 12px}
    .expenses-table thead th{padding:10px 6px}
    .expenses-table tbody td{padding:10px 6px}
  }
`;

/* Далее — именованные styled-компоненты, которые используются в Expenses.jsx */
export const Container = styled.div`
  padding: 16px;
  max-width: 880px;
  margin: 0 auto;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: var(--text);
`;

export const Total = styled.div`
  font-weight: 700;
  color: #fff;
  background: linear-gradient(90deg,#7b5cff,#5b33ff);
  padding: 6px 10px;
  border-radius: 10px;
  font-size: 14px;
`;

export const ChipsWrapper = styled.div`
  margin-top: 4px;
`;

/* Список расходов — используется как <ul> */
export const List = styled.ul`
  margin-top: 16px;
  list-style: none;
  padding: 0;
`;

/* Пустой список */
export const NoExpenses = styled.li`
  color: var(--muted);
  padding: 12px;
  background: var(--panel);
  border-radius: 8px;
  border: 1px dashed #e5e7eb;
`;

/* Каждый элемент списка */
export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--panel);
  border: 1px solid #eee;
  margin-bottom: 8px;
  align-items: center;
  gap: 12px;

  &:hover {
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.04);
  }
`;

export const ItemLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const ItemTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ItemMeta = styled.div`
  font-size: 12px;
  color: var(--muted);
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const CategoryBadge = styled.span`
  background: #f3f6ff;
  color: #0a58ca;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
`;

export const ItemRight = styled.div`
  font-weight: 700;
  min-width: 80px;
  text-align: right;
  color: var(--text);
`;
