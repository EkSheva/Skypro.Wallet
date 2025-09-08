import { SBaseButton } from "./BaseButton.styled";

const BaseButton = ({ type = "button", text, disabled, onClick, ...rest }) => {
  return (
    <SBaseButton type={type} onClick={onClick} disabled={disabled} {...rest}>
      {text}
    </SBaseButton>
  );
};

export default BaseButton;
