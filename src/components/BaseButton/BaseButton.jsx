import { SBaseButton } from "./BaseButton.styled";

const BaseButton = ({ type = "button", text, disabled, onClick }) => {
  return (
    <SBaseButton type={type} onClick={onClick} disabled={disabled}>
      {text}
    </SBaseButton>
  );
};

export default BaseButton;
