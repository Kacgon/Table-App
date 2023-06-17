import React from "react";
import ReactDOM from "react-dom/client";
import TableOfProducts from "./ContentOfMainPage/TableOfProducts";
import "./styles/index.css";
import FooterComponent from "./components/Footer";
import HeaderComponent from "./components/Header";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeaderComponent />
    <TableOfProducts />
    <FooterComponent />
  </React.StrictMode>
);
