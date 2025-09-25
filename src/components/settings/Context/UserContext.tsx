import { createContext } from "react";
export interface State {
  url: string;
  enabledSetting: boolean;
  setEnabledSetting: (enabledSetting: boolean) => void;
  setUrl: (url: string) => void;
}
const UserContext = createContext<State | undefined>(undefined);
export default UserContext;
