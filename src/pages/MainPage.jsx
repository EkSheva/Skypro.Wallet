import "../App.css";
import Header from "../components/Header/Header";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { ExpensesProvider } from "../context/ExpensesProvider";

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
`;

function MainPage() {
  return (
    <ExpensesProvider>
      <Wrapper>
        <Header />
        <Outlet />
      </Wrapper>
    </ExpensesProvider>
  );
}

export default MainPage;
