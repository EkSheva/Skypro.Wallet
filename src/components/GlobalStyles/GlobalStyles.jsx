import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

*:before,
*:after {
  box-sizing: border-box;
}

a,
a:visited {
  text-decoration: none;
  cursor: pointer;
}

button {
  cursor: pointer;
  outline: none;
}

ul li {
  list-style: none;
}

html,
body {
  width: 100%;
  height: 100%;
  /* font-family: "Montserrat", Arial, Helvetica, sans-serif; */
  color: #000000;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  padding: 6px;
  border-radius: 6px;
  transition: 0.2s;
  color: #666;
}

.btn-icon:hover {
  color: #000;
}

.btn-icon.edit:hover {
  color: #0f9d58; /* зелёный */
}

.btn-icon.delete:hover {
  color: #d11a2a; /* красный */
}

`;

export default GlobalStyle;

