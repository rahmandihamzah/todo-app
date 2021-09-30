// import react, { useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./containers/dashboard/Dashboard";
import { Provider } from "react-redux";
import { useStore } from "./store/store";

function App() {
  const store = useStore();

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
}

export default App;

/*
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";

function MyApp(props) {
  const { Component, pageProps } = props;

  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
*/
