import styled from "styled-components";

export const StyledInput = styled.input`
  border-radius: 6px;
  padding: 12px;
  border: 0.7px solid rgba(153, 153, 153, 1);
  font-size: 12px;
  outline: none;

  &:not(:placeholder-shown):not([aria-invalid="true"]):not(:focus) {
    background-color: rgba(241, 235, 253, 1) !important;
    border: 0.5px solid rgba(115, 52, 234, 1);
  }

  &::placeholder {
    font: inherit;
    color: rgba(153, 153, 153, 1);
  }

  ${({ $error }) =>
    $error &&
    `outline: 0.5px solid rgba(242, 80, 80, 1); background-color: rgba(255, 235, 235, 1);
    
    &::placeholder {
    font: inherit;
    color: #000;
  }`
}
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  border-radius: 8px;
  padding: 8px 10px;
  outline: none;
  border: 0.7px solid rgba(148, 166, 190, 0.4);
  font-size: 14px;
  &:not(:placeholder-shown):not([aria-invalid="true"]):not(:focus) {
    background-color: rgba(241, 235, 253, 1) !important;
    border: 0.5px solid rgba(115, 52, 234, 1);
  }

  &::placeholder {
    color: rgba(148, 166, 190, 1);
  }

  ${({ $error }) =>
    $error &&
    `padding-bottom:24px; outline: 0.5px solid rgba(242, 80, 80, 1); background-color: rgba(255, 235, 235, 1);
    
    &::placeholder {
    font: inherit;
    color: #000;
  }`
}
`;

export const ErrorP = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: rgba(248, 77, 77, 1);
  letter-spacing: -1%;
  text-align: center;
  margin-top: -12px;
  padding-top: 12px;
`;
