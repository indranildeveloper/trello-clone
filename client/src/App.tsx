import { FC } from "react";
import { AppContainer } from "./styles/styles";
import AddNewItem from "./components/AddNewItem";
import Column from "./components/Column";
import { useAppState } from "./state/AppStateContext";
import { CustomDragLayer } from "./drag-drop/CustomDragLayer";
import { addList } from "./state/actions";

const App: FC = ({ children }) => {
  const { lists, dispatch } = useAppState();

  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map((list) => (
        <Column text={list.text} key={list.id} id={list.id} />
      ))}

      <AddNewItem
        toggleButtonText="+ Add list"
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  );
};

export default App;
