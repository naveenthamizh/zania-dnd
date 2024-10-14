import { useState, useEffect, useCallback } from "react";
import { TSelectedCard } from "../types";

export const useDragAndDrop = (
  allCards: TSelectedCard[] | undefined,
  containerRef: React.MutableRefObject<HTMLDivElement | null>
): {
  items: TSelectedCard[] | undefined;
  handleDragStart: (index: number) => void;
  handleDragOver: (index: number) => void;
  handleDrop: () => void;
} => {
  const [items, setItems] = useState(allCards);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (index: number) => {
    setHoveredIndex(index);
  };

  const handleDrop = useCallback(() => {
    if (draggedIndex !== null && hoveredIndex !== null && items) {
      const newItems = [...items];
      const [movedItem] = newItems.splice(draggedIndex, 1);
      newItems.splice(hoveredIndex, 0, movedItem);

      setItems(newItems.map((item, index) => ({ ...item, position: index })));
    }
    setDraggedIndex(null);
    setHoveredIndex(null);
  }, [draggedIndex, hoveredIndex, items]);

  useEffect(() => {
    const container = containerRef.current;

    const handleContainerDrop = (e: DragEvent) => {
      e.preventDefault();
      handleDrop();
    };

    if (container) {
      container.addEventListener("dragover", (e: DragEvent) =>
        e.preventDefault()
      );
      container.addEventListener("drop", handleContainerDrop);
    }

    return () => {
      if (container) {
        container.removeEventListener("dragover", (e: DragEvent) =>
          e.preventDefault()
        );
        container.removeEventListener("drop", handleContainerDrop);
      }
    };
  }, [containerRef, draggedIndex, handleDrop, hoveredIndex, items]);

  return {
    items,
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
};
