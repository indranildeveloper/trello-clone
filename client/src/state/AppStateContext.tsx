import React, { createContext, useContext, useEffect, Dispatch } from "react";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../drag-drop/DragItem";
import { appStateReducer, AppState, List, Task } from "./appStateReducer";
import { Action } from "./actions";
import { save } from "../api/api";
import { wihInitialState } from "../hoc/withInitialState";

// type Task = {
//   id: string;
//   text: string;
// };

// type List = {
//   id: string;
//   text: string;
//   tasks: Task[];
// };

// export type AppState = {
//   lists: List[];
// };

type AppStateProviderProps = {
  children: React.ReactNode;
  initialState: AppState;
};

type AppStateContextProps = {
  draggedItem: DragItem | null;
  lists: List[];
  getTasksByListId(id: string): Task[];
  dispatch: Dispatch<Action>;
};

const appData: AppState = {
  draggedItem: null,
  lists: [
    // {
    //   id: "0",
    //   text: "To Do",
    //   tasks: [{ id: "c0", text: "Do something" }],
    // },
    // {
    //   id: "1",
    //   text: "In Progress",
    //   tasks: [{ id: "c1", text: "Do something" }],
    // },
    // {
    //   id: "2",
    //   text: "Done",
    //   tasks: [{ id: "c2", text: "Do something" }],
    // },
  ],
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

export const useAppState = () => {
  return useContext(AppStateContext);
};

export const AppStateProvider = wihInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);

    useEffect(() => {
      save(state);
    }, [state]);

    const { draggedItem, lists } = state;

    const getTasksByListId = (id: string) => {
      return lists.find((list) => list.id === id)?.tasks || [];
    };

    return (
      <AppStateContext.Provider
        value={{ draggedItem, lists, getTasksByListId, dispatch }}
      >
        {children}
      </AppStateContext.Provider>
    );
  }
);
