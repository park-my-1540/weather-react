import React from "react";
import "../sass/loading.scss";

const loadingComp = () => {
  return (
    <>
      <div class="container">
        <div class="loader">
          <div class="loader--dot"></div>
          <div class="loader--dot"></div>
          <div class="loader--dot"></div>
          <div class="loader--dot"></div>
          <div class="loader--dot"></div>
          <div class="loader--dot"></div>
          <div class="loader--text"></div>
        </div>
      </div>
    </>
  );
};

export default React.memo(loadingComp);
