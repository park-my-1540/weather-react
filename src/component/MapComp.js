import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Geocode from "react-geocode";
import Marker from "./Marker";
import { useLatlngDispatch, useLatlngState } from "../module/LatlngProvider";
import { IoReturnDownBackSharp } from "react-icons/io5";

export default function MapComp({ refetch }) {
  const dispatch = useLatlngDispatch();
  const state = useLatlngState();
  const [center, setCenter] = useState(state); // 위치 초기화
  const [clickedLatLng, setClickedLatLng] = useState(center);
  //placeList : 서울, 전주, 부산, 광주 마크
  const placeList = [
    {
      id: 1,
      name: "seoul",
      pos: { lat: 37.55138986009033, lng: 126.98588446406256 }
    },
    {
      id: 2,
      name: "jeonju",
      pos: { lat: 35.82163848334147, lng: 127.10523012135582 }
    },
    {
      id: 3,
      name: "busan",
      pos: { lat: 35.16419348131997, lng: 129.04981019948082 }
    },
    {
      id: 4,
      name: "gwangju",
      pos: { lat: 35.12929531292171, lng: 126.83248992982925 }
    }
  ];
  const handleApiLoaded = ({ map, maps }) => {
    // 현재 위치 (위경도 가져오기) 지도 center 로 세팅
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      () => {}
    );
  };
  async function changeLoc(e) {
    e.preventDefault();
    await dispatch({
      type: "CHANGE",
      lat: clickedLatLng.lat,
      lng: clickedLatLng.lng,
      flag: "change"
    });
    refetch();
  }
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        // ref={this.mapRef}
        center={center}
        defaultZoom={11}
        // onReady={this.autoCenterMap}
        yesIWantToUseGoogleMapApiInternals
        onClick={(e) => {
          setClickedLatLng({
            lat: e.lat,
            lng: e.lng
          });
        }}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        bootstrapURLKeys={{
          key: "AIzaSyAtpI23q-I9qXLrdfPVk7O2wCTlWHWaseo",
        }}
      >
        <Marker lat={center.lat} lng={center.lng} scope="current" />
        {placeList.map((place) => (
          <Marker
            lat={place.pos.lat}
            lng={place.pos.lng}
            name={place.name}
            scope="sub"
          />
        ))}
      </GoogleMapReact>
      <div className="cont">
        {clickedLatLng && (
          <span>
            해당 위치 조회<br/>: {clickedLatLng.lat}, {clickedLatLng.lng}
          </span>
        )}
        <button type="button" onClick={(e) => changeLoc(e)}>
          선택한 위치로 변경
          <IoReturnDownBackSharp />
        </button>
      </div>
    </div>
  );
}
