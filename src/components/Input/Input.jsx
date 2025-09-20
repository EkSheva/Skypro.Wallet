import { InputWrapper } from "../AuthForm/AuthForm.styled";
import { StyledInput, StyledTextarea } from "./Input.styled";

const Input = ({
  tag = "input",
  id,
  name,
  placeholder = "",
  type = "",
  error = false,
  onChange,
  required = false,
}) => {
  // Выбираем компонент в зависимости от тега
  const Component = tag === "textarea" ? StyledTextarea : StyledInput;
  return (
    <InputWrapper $required={required}>
      <Component
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        $error={error}
        onChange={onChange}
        required={required}
        aria-invalid={error ? "true" : "false"}
      />
    </InputWrapper>
  );
};

export default Input;
