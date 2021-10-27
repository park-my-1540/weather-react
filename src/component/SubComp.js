import React from "react";
import { FiCompass, FiUmbrella, FiSun, FiCloud } from "react-icons/fi";
export default function SubComp({ mainData, setModal }) {
  return (
    <div className="Sub_Box">
      <div className="sub_desc_box">
        <dl>
          <dt>DESCRIPTION</dt>
          <dd>{mainData.desc}</dd>
        </dl>
        <dl>
          <dt>HUMIDITY</dt>
          <dd>{mainData.humidity} %</dd>
        </dl>
        <dl>
          <dt>WIND</dt>
          <dd>{mainData.wind} km/h</dd>
        </dl>
      </div>
      {/* sub_desc_box */}
      <div className="weather_list_wrap">
        <ul>
          {mainData.forecast.map((data, index) => (
            <li key={index}>
              {data.main === "Sunny" && <FiSun />}
              {data.main === "Clear" && <FiCloud />}
              {data.main === "Clouds" && <FiCloud />}
              {data.main === "Rain" && <FiUmbrella />}
              <p className="">{data.main}</p>
              <p className="">{data.temp}</p>
              <p className="">
                {data.max} / {data.min}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {/* weather_list_wrap */}
      <button type="button" className="btn" onClick={() => setModal("open")}>
        <FiCompass className="test" />
        Change location
      </button>
    </div>
  );
}
