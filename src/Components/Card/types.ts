import { TSelectedCard } from "../../types";

export type TCardProps = {
  content: TSelectedCard;
  onDragStart: (value: number) => void;
  onDragEnd: (value: number) => void;
  onClick: () => void;
  onDrop: () => void;
};
