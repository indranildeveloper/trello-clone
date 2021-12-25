import { useRef, FC } from "react";
import { useDrop } from "react-dnd";
import { ColumnContainer, ColumnTitle } from "../styles/styles";
import AddNewItem from "./AddNewItem";
import Card from "./Card";
import { useAppState } from "../state/AppStateContext";
import { addTask, moveList, moveTask, setDraggedItem } from "../state/actions";
import { isHidden } from "../utils/isHidden";
import { useItemDrag } from "../utils/useItemDrag";
import { DragItem } from "../drag-drop/DragItem";

type ColumnProps = {
  text: string;
  id: string;
  isPreview?: boolean;
};

const Column: FC<ColumnProps> = ({ text, id, isPreview }) => {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();

  const tasks = getTasksByListId(id);
  const ref = useRef<HTMLDivElement>(null);

  const { drag } = useItemDrag({
    type: "COLUMN",
    id,
    text,
  });

  drag(ref);

  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover(item: DragItem) {
      if (!draggedItem) {
        return;
      }

      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }
      } else {
        if (draggedItem.columnId === id) {
          return;
        }
        if (tasks.length) {
          return;
        }
        dispatch(moveTask(draggedItem.id, null, draggedItem.columnId, id));
        dispatch(setDraggedItem({ ...draggedItem, columnId: id }));
      }
      dispatch(moveList(draggedItem.id, id));
    },
  });

  drag(drop(ref));

  return (
    <ColumnContainer
      isPreview={isPreview}
      ref={ref}
      isHidden={isHidden(draggedItem, "COLUMN", id)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card columnId={id} text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add task"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark={true}
      />
    </ColumnContainer>
  );
};

export default Column;
