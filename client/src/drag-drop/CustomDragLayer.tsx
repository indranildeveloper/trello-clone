import { FC } from "react";
import { useDragLayer } from "react-dnd";
import Column from "../components/Column";
import { CustomDragLayerContainer, DragPreviewWrapper } from "../styles/styles";
import { useAppState } from "../state/AppStateContext";
import Card from "../components/Card";

export const CustomDragLayer: FC = () => {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {draggedItem.type === "COLUMN" ? (
          <Column
            id={draggedItem.id}
            text={draggedItem.text}
            isPreview={true}
          />
        ) : (
          <Card
            columnId={draggedItem.columnId}
            isPreview
            id={draggedItem.id}
            text={draggedItem.text}
          />
        )}
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null;
};
