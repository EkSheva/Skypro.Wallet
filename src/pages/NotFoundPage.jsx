import { useNavigate } from "react-router-dom";
import BaseButton from "../components/BaseButton/BaseButton";
import styled from "styled-components";

const WrapperNF = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  margin: 20px 0;
`;
const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleMain = () => {
    navigate("/");
  };

  return (
    <WrapperNF>
      <p>Страница не найдена</p>
      <BaseButton type="submit" oncClick={handleMain} text={"На главную"} />
    </WrapperNF>
  );
};

export default NotFoundPage;
