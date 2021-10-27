import React from "react";
import MapComp from "../component/MapComp";
import { IoCloseSharp } from "react-icons/io5";
export default function ModalComp({ show, setModal, refetch }) {
  return (
    <React.Fragment>
      <div className="popup_container">
        <div className="popup_inner">
          <a href="#none" className="close" onClick={() => setModal("close")}>
            <IoCloseSharp />
          </a>
          <div className="pop_cont">
            <div
              style={{
                height: 500
              }}
            >
              <MapComp refetch={refetch} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
