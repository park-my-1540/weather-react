import React, { useEffect, useRef } from "react";
import axios from "axios";
import useAsync from "../module/useAsync";
import WeatherContainer from "../containers/WeatherContainer";
//날씨 데이터를 가져오는 State-useAsync로 관리
import { useLatlngState, useLatlngDispatch } from "../module/LatlngProvider";
import Geocode from "react-geocode";
import Loading from "../component/loadingComp";
function Weather() {
  const WEATHER_API_KEY = "ffc012cd698a9beca9d896a3efcc1576";
  const GEOCODE_API_KEY = "AIzaSyAtpI23q-I9qXLrdfPVk7O2wCTlWHWaseo";
  // 위,경도 context api -> state,dispatcg
  const latlng_state = useLatlngState();
  const latlng_dispatch = useLatlngDispatch();

  var stateLat = useRef(latlng_state.lat);
  var stateLng = useRef(latlng_state.lng);
  var stateFlag = useRef(latlng_state.flag);

  //state 값들 조회
  var { lat, lng, flag } = latlng_state;
  /**초기화 : 현재 위,경도로 초기화 */
  const init = async () => {
    let position = await getLongAndLat(),
      { coords } = position;
    latlng_dispatch({
      type: "INIT",
      lat: coords.latitude,
      lng: coords.longitude
    });
  };

  useEffect(() => {
    init();
  }, []);

  /***** 최대, 최저온도 구하기 ****/
  var tempMax = [];
  var tempMin = [];
  var max, min;
  //tempMax 변수를 빼고 함수 파라미터로 써보자.
  function getMax() {
    max = Math.max(...tempMax);
    return max;
  }
  function getMin() {
    min = Math.min(...tempMin);
    return min;
  }

  /***** 배열 선언 ****/
  let mainArray = [];
  let weekArray = [];
  let maxminArray = {
    min: [],
    max: []
  };

  /** Promise 약속하기 */
  /**현재 위경도 구하기 */
  function getLongAndLat() {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  }
  /**** 주어진 위경도로 해당 도시이름 구하기 ****/
  function GeocodeFunc(latitude, longitude) {
    return new Promise((resolve, reject) => {
      Geocode.setApiKey(GEOCODE_API_KEY);
      Geocode.setLanguage("en");
      Geocode.setRegion("en");
      Geocode.enableDebug();
      Geocode.fromLatLng(latitude, longitude).then((response) => {
        var jbString = response.results[0].formatted_address.split(",");
        let stateName =
          jbString[jbString.length - 3] + " , " + jbString[jbString.length - 2];
        resolve(stateName); //얘가 꼭 있어야 되
        return stateName;
      });
    });
  }
  /** //Promise 약속 끝 */
  /**
   * 조회한 위경도와 도시이름 그리고 날씨 데이터를 mainArray에 넣기.
   */

  useEffect(() => {
    /**
     * 이렇게 한 이유는 setstate가 기존 상태를 변경하는 대신 새 상태를 반환하는 비동기 함수이기 때문에
     * 암튼 즉시 반영이 되지 않는다. 그래서 useEffect에 즉시 바뀔때마다 useRef로 넣어놨다.
     */

    stateLat.current = latlng_state.lat;
    stateLng.current = latlng_state.lng;
    stateFlag.current = latlng_state.flag;
  }, [latlng_state]);

  const getData = async () => {
    try {
      let cnt = -1; // 4시간 마다 하루가 바뀌므로 카운트 하기위해 있는 변수
      let position = await getLongAndLat();
      let { coords } = position;
      /**
       * !change : 초기 값일때만 현재위치,
       * change : 위치 변경 했을시에 값 state 로 조회
       */
      let latitude =
        stateFlag.current === "change" ? stateLat.current : coords.latitude;
      let longitude =
        stateFlag.current === "change" ? stateLng.current : coords.longitude;

      let stateName = await GeocodeFunc(latitude, longitude);

      //초기화
      mainArray = [];
      weekArray = [];
      // var tempMax = [];
      // var tempMin = [];
      // var max, min; let 통일해보자.
      /*
          url : 현재날씨
          url2 : 예보날씨
        */
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=daily&appid=${WEATHER_API_KEY}&units=metric`;
      let url2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&exclude=daily&appid=${WEATHER_API_KEY}&cnt=20&units=metric`;

      //const response = await axios.all([axios.get(url), axios.get(url2)]);
      // const response1 = response[0].data;
      //const response2 = response[1].data.list;
      await axios.all([axios.get(url), axios.get(url2)]).then(
        axios.spread(function (...response) {
          const response1 = response[0].data;
          const response2 = response[1].data.list;

          response2.forEach(function (data, index) {
            /**
             * tempMax : 0~4 -> 하루치 max 온도 배열에 넣고 그날 하루의 최대온도 구함
             * tempMin : 0~4 -> 하루치 min 온도 배열에 넣고 그날 하루의 최저온도 구함
             */
            tempMax.push(Math.round(data.main.temp_max));
            tempMin.push(Math.round(data.main.temp_min));
            /**
             * 배열이 4n이 되면 하루치 이므로 계산
             */
            if (index % 4 === 0) {
              cnt++;
              maxminArray.min.push(getMin());
              maxminArray.max.push(getMax());
              //하루치 계산후 초기화
              tempMin = [];
              tempMax = [];

              /**
               * weekArray 배열 : 하루치 날씨 정보 * 4
               * main : summary
               * tmp : 평균온도
               * max : 최대온도
               * min : 최저온도
               */
              // 최상단에는 이름을 붙여주지않는편 _ 황희대리님

              weekArray.push({
                main: data.weather[0].main,
                temp: Math.round(data.main.temp),
                max: Math.round(maxminArray.max[cnt]),
                min: Math.round(maxminArray.min[cnt])
              });
            }
          });
          /**
           * mainArray : 현재 날씨 + 4일치 날씨
           * temp : 현재온도
           * name : 현재도시
           * main : 현재날씨
           * country : 현재국가
           * wind : 바람세기
           * humidity : 습도
           * desc : 현재날씨 desc
           * forecast : 4일치 날씨정보
           */
          // mainArray.push({...response1})
          mainArray.push({
            temp: Math.round(response1.main.temp),
            name: response1.name,
            main: response1.weather[0].main,
            country: response1.sys.country,
            wind: response1.wind.speed,
            humidity: response1.main.humidity,
            desc: response1.weather[0].description,
            forecast: weekArray,
            state: stateName
          });
        })
      );
    } catch (e) {
      console.log("Error: " + e.message);
    }
    return mainArray;
  };

  /******* 날씨 데이터 컨테이너 컴포넌트에 전달  *******/
  const [state, refetch] = useAsync(getData, []);
  const { loading, data, error } = state;

  if (loading) return <Loading />;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return null;
  return data.map((d, index) => (
    <WeatherContainer data={d} refetch={refetch} key={index} />
  ));
}
export default React.memo(Weather);
