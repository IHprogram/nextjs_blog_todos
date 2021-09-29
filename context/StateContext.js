import { createContext, useState } from "react";

export const StateContext = createContext();

export default function StateContextProvider(props) {
  const [selectedTask, setSelectedTask] = useState({ id: 0, title: "" });
  <StateContext.Provider
    value={{
      selectedTask,
      setSelecetdTask
    }}
  >
    {props.children}
  </StateContext.Provider>
}