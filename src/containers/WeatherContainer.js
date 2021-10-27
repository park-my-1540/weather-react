import React, { useState } from "react";
import MainComp from "../component/MainComp";
import SubComp from "../component/SubComp";
import Modal from "../component/ModalComp";

export default function WeatherContainer({ data, refetch }) {
  const [modal, setModal] = useState("close");
  return (
    <div className="container">
      <MainComp mainData={data} />
      <SubComp mainData={data} modal={modal} setModal={setModal} />
      {modal === "open" && (
        <Modal modal={modal} setModal={setModal} refetch={refetch} />
      )}
    </div>
  );
}
