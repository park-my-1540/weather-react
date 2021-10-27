import React, { useMemo } from "react";
import "../sass/marker.scss";
import { IoBookmarkSharp, IoLocationSharp } from "react-icons/io5";

const Marker = (props) => {
  const { name, scope } = props;
  return (
    <div className="marker" style={{ cursor: "pointer" }} title={name}>
      {scope === "current" ? (
        <IoLocationSharp value={name} />
      ) : (
        <IoBookmarkSharp value={name} />
      )}
    </div>
  );
};

export default React.memo(Marker);
