import { StyledInput, StyledTextarea } from "./Input.styled";

const Input = ({
  tag = "input",
  id,
  name,
  placeholder = "",
  type = "text",
  error = false,
  onChange,
}) => {
  // Выбираем компонент в зависимости от тега
  const Component = tag === "textarea" ? StyledTextarea : StyledInput;

  return (
    <Component
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      $error={error}
      onChange={onChange}
    />
  );
};

export default Input;
