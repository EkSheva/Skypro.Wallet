import styled from "styled-components";

export const SBaseButton = styled.button`
  width: 100%;
  height: 39px;
  border-radius: 6px;
  background-color: rgba(115, 52, 234, 1);
  color: rgba(255, 255, 255, 1);
  border: none;
  font-size: 12px;
  font-weight: 600;
  &:disabled {
    background-color: rgba(153, 153, 153, 1);
    outline: none;
    cursor: not-allowed;
  }
  @media screen and (max-width: 495px) and (min-width: 375px) {
    z-index: 3;
    position: fixed;
    left: 16px;
    bottom: 30px;
    top: auto;
    width: calc(100vw - 32px);
  }
`;
