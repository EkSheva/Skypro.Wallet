import "../App.css";
import Header from "../components/Header/Header";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
`;

function MainPage() {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
}

export default MainPage;
