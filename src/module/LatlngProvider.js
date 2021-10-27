// useLatLng :  클릭한 위경도 가져오는
// 초기값, 조회
import React, { useReducer, useContext, createContext } from "react";

//초기값은...세팅
const initalState = {
  lat: 37,
  lng: 127,
  flag: "initState",
  city: "where"
};

function reducer(state, action) {
  switch (action.type) {
    case "CHANGE": {
      return {
        lat: action.lat,
        lng: action.lng,
        flag: "change"
      };
    }
    case "INIT": {
      return {
        lat: action.lat,
        lng: action.lng,
        flag: "init"
      };
    }
    default:
      return state;
  }
}

const LatlngStateContext = createContext();
const LatlngDispatchContext = createContext();

export function LatlngProvider({ children }) {
  // init();
  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <LatlngStateContext.Provider value={state}>
      <LatlngDispatchContext.Provider value={dispatch}>
        {children}
      </LatlngDispatchContext.Provider>
    </LatlngStateContext.Provider>
  );
}

export function useLatlngState() {
  return useContext(LatlngStateContext);
}
export function useLatlngDispatch() {
  return useContext(LatlngDispatchContext);
}
