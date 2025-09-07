import React, { useState, useEffect } from "react";

/* Иконки (минимально) */
const IconFood = () => (
  <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path d="M11.2234 3.75507H10.99L9.01835 1.78341C8.86085 1.62591 8.60419 1.62591 8.44085 1.78341C8.28335 1.94091 8.28335 2.19757 8.44085 2.36091L9.83502 3.75507H4.16502L5.55919 2.36091C5.71669 2.20341 5.71669 1.94674 5.55919 1.78341C5.40169 1.62591 5.14502 1.62591 4.98169 1.78341L3.01585 3.75507H2.78252C2.25752 3.75507 1.16669 3.75507 1.16669 5.24841C1.16669 5.81424 1.28335 6.18757 1.52835 6.43257C1.66835 6.57841 1.83752 6.65424 2.01835 6.69507C2.18752 6.73591 2.36835 6.74174 2.54335 6.74174H11.4567C11.6375 6.74174 11.8067 6.73007 11.97 6.69507C12.46 6.57841 12.8334 6.22841 12.8334 5.24841C12.8334 3.75507 11.7425 3.75507 11.2234 3.75507Z" fill="currentColor"/>
  </svg>
);
const IconTransport = () => (<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M12.6875 5.16671C12.6875 5.40588 12.4892 5.60421 12.25 5.60421H1.75C1.51083 5.60421 1.3125 5.40588 1.3125 5.16671C1.3125 4.92755 1.51083 4.72921 1.75 4.72921H2.345L2.56667 3.67338C2.77667 2.65255 3.21417 1.71338 4.9525 1.71338H9.0475C10.7858 1.71338 11.2233 2.65255 11.4333 3.67338L11.655 4.72921H12.25C12.4892 4.72921 12.6875 4.92755 12.6875 5.16671Z" fill="currentColor"/></svg>);
const IconHousing = () => (<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M12.8334 12.8958H12.25V6.32167C12.25 5.96 12.0867 5.62167 11.8009 5.4L11.0834 4.84L11.0717 3.41084C11.0717 3.09 10.8092 2.83334 10.4884 2.83334H8.49919L7.71752 2.22667C7.29752 1.89417 6.70252 1.89417 6.28252 2.22667L2.19919 5.4C1.91335 5.62167 1.75002 5.96 1.75002 6.31584L1.72085 12.8958H1.16669C0.92752 12.8958 0.729187 13.0942 0.729187 13.3333C0.729187 13.5725 0.92752 13.7708 1.16669 13.7708H12.8334C13.0725 13.7708 13.2709 13.5725 13.2709 13.3333C13.2709 13.0942 13.0725 12.8958 12.8334 12.8958Z" fill="currentColor"/></svg>);
const IconEntertainment = () => (<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M9.91667 1.6665H4.08333C2.8 1.6665 1.75 2.7165 1.75 3.99984V10.9998C1.75 12.2832 2.8 13.3332 4.08333 13.3332H9.91667C11.2 13.3332 12.25 12.2832 12.25 10.9998V3.99984C12.25 2.7165 11.2 1.6665 9.91667 1.6665Z" fill="currentColor"/></svg>);
const IconEducation = () => (<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M9.81755 9.62342C10.2084 9.36676 10.7217 9.64676 10.7217 10.1134V10.8659C10.7217 11.6068 10.1442 12.4001 9.45005 12.6334L7.58922 13.2518C7.26255 13.3626 6.73171 13.3626 6.41088 13.2518L4.55005 12.6334C3.85005 12.4001 3.27838 11.6068 3.27838 10.8659V10.1076C3.27838 9.64676 3.79171 9.36676 4.17671 9.61759Z" fill="currentColor"/></svg>);
const IconOther = () => (<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden><path d="M9.33332 1.6665H4.66666C2.33332 1.6665 1.16666 2.83317 1.16666 5.1665V12.7498C1.16666 13.0707 1.42916 13.3332 1.74999 13.3332H9.33332C11.6667 13.3332 12.8333 12.1665 12.8333 9.83317V5.1665C12.8333 2.83317 11.6667 1.6665 9.33332 1.6665Z" fill="currentColor"/></svg>);

const defaultCategories = [
  { id: "food", label: "Еда", icon: <IconFood />, active: true },
  { id: "transport", label: "Транспорт", icon: <IconTransport />, active: false },
  { id: "housing", label: "Жильё", icon: <IconHousing />, active: false },
  { id: "entertainment", label: "Развлечения", icon: <IconEntertainment />, active: false },
  { id: "education", label: "Образование", icon: <IconEducation />, active: false },
  { id: "other", label: "Другое", icon: <IconOther />, active: false },
];

export default function Categories({ items = defaultCategories, onChange }) {
  const [list, setList] = useState(items);

  useEffect(() => setList(items), [items]);

  const toggle = (id) => {
    const next = list.map((it) => (it.id === id ? { ...it, active: !it.active } : it));
    setList(next);
    if (onChange) onChange(next);
  };

  return (
    <div className="categories" role="list">
      {list.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`chip ${item.active ? "active" : ""}`}
          aria-pressed={item.active}
          onClick={() => toggle(item.id)}
          title={item.label}
        >
          <span style={{ display: "inline-flex", alignItems: "center" }}>{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}


