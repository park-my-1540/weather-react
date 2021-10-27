import React from "react";
// import Weather from "./module/Weather";
import "./sass/common.scss";
import { LatlngProvider } from "./module/LatlngProvider";
import Weather from "./module/Weather";

export default function App() {
  return (
    <>
      <LatlngProvider>
        <div className="App">
          <Weather />
        </div>
      </LatlngProvider>
    </>
  );
}
