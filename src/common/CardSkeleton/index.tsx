import { FaSpinner } from "react-icons/fa6";

import "./skeleton.css";

type TCardSkeleton = {
  cardCount: number;
};

export const CardSkeleton = (props: TCardSkeleton): JSX.Element => {
  return (
    <>
      {[...new Array(props.cardCount)].map((item, index) => (
        <div className="card" key={index}>
          <FaSpinner className="rotating" />
        </div>
      ))}
    </>
  );
};
