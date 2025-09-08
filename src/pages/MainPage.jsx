import "../App.css";
import Header from "../components/Header/Header";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

function MainPage() {
  const Wrapper = styled.div`
    max-width: 100%;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    background-color: rgba(244, 245, 246, 1);
  `;

  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
}

export default MainPage;
