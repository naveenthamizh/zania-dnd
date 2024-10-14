import { TCardProps } from "./types";
import styles from "./cards.module.css";

export const Card = (props: TCardProps): JSX.Element => {
  const { content, onDrop, onClick, onDragEnd, onDragStart } = props;
  return (
    <div
      key={content.id}
      className={styles.card}
      draggable
      onDragStart={() => onDragStart(content.position)}
      onDragOver={() => onDragEnd(content.position)}
      onDrop={onDrop}
      onClick={onClick}
    >
      <div>{content.type}</div>
      <img className={styles.image} src={content.image} alt={content.content} />
    </div>
  );
};
