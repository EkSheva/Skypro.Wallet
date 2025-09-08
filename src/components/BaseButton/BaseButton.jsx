import { SBaseButton } from "./BaseButton.styled";

const BaseButton = ({ submit, text, disabled, onClick }) => {
  return (
    <SBaseButton type={submit} onClick={onClick} disabled={disabled}>
      {text}
    </SBaseButton>
  );
};

export default BaseButton;
