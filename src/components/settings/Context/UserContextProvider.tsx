import React, { useState } from "react";
import UserContext from "./UserContext";
const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [url, setUrl] = useState<string>("https://example.com");
  const [enabledSetting,setEnabledSetting] = useState<boolean>(false)
  return (
    <UserContext.Provider value={{url,enabledSetting,setUrl,setEnabledSetting}}>
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
