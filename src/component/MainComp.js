import React from "react";
import { FiCompass, FiSun, FiCloud, FiCloudRain } from "react-icons/fi";

export default function MainComp({ mainData }) {
  let today = new Date();
  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let day = today.getDay(); // 요일
  var week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wensday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var Calender = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Nov",
    "Dec"
  ];
  var todayLabel = week[day]; //요일
  var calLabel = Calender[month - 1]; //월
  return (
    <div className="Main_Box">
      <div className="inner">
        <div className="title_wrap">
          <p className="dayWeek">{todayLabel}</p>
          <div className="day">
            <p>
              {date} {calLabel} {year}
            </p>
            <p>
              <FiCompass />
              <span>{mainData.state}</span>
              <span>, {mainData.country}</span>
            </p>
          </div>
        </div>
        {/* title_wrap */}
        <div className="content_wrap">
          {mainData.main === "Sunny" && <FiSun />}
          {mainData.main === "Clear" && <FiCloud />}
          {mainData.main === "Rain" && <FiCloudRain />}
          <p className="main_temp">{mainData.temp}°C</p>
          <p className="main_desc">{mainData.main}</p>
        </div>
      </div>
    </div>
  );
}
