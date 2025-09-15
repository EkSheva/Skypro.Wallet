import styled from "styled-components";

export const Bg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(244, 245, 246, 1);
     @media screen and (max-width: 495px) {
    background-color: rgba(255, 255, 255, 1);
  }
`;

export const Modal = styled.div`
  width: 100%;
  height: 100%;
  min-width: 379px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const FWrapper = styled.div`
  display: block;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 1);
  max-width: 379px;
  width: 100%;
  padding: 32px;
  border-radius: 30px;
  border: none;
  box-shadow: 0px 20px 67px -12px rgba(0, 0, 0, 0.13);
   @media screen and (max-width: 495px) {
    height: 100%;
    margin-top:125px;
    padding: 0 16px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: none;
  }
`;

export const FTitle = styled.h2`
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  color: rgba(0, 0, 0, 1);
  font-style: bold;
  text-align: center;
  margin-bottom: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  width: 100%;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  position: relative;

  /* Звездочка для обязательного поля */
  ${({ $required }) =>
    $required &&
    `
    &::before {
      content: "*";
      position: absolute;
      right: 10px;
      top: 5px; 
      color: rgba(242, 80, 80, 1);
      font-size: 12px;
      font-weight: bold;
      z-index: 1; 
    }
  `}
`;

export const FormGroupP = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: rgba(153, 153, 153, 1);
  text-align: center;
`;

export const FormGroupPLink = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: rgba(153, 153, 153, 1);
  text-decoration: underline rgba(153, 153, 153, 1);
  text-align: center;
`;
