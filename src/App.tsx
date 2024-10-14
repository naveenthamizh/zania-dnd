import { useCallback, useEffect, useRef, useState } from "react";

import { useDragAndDrop } from "./Hooks/useDragAndDrop";

import { Card } from "./Components/Card";
import { TSelectedCard } from "./types";

import { Modal } from "./Components/Modal";

import { INTIAL_CARDS_ALIGNMENT } from "./common/contants";
import { useAutosave } from "./Hooks/useAutosave";
import { getTimeFromNow } from "./common/helpers/datehelpers";

import "./App.css";

const App = (): JSX.Element => {
  const containerRef = useRef(null);

  const [cards, setCards] = useState<TSelectedCard[] | undefined>(
    INTIAL_CARDS_ALIGNMENT
  );

  const { items, handleDragStart, handleDragOver } = useDragAndDrop(
    cards,
    containerRef
  );

  const { setDataToSave, isSaving, timeSinceLastSave } = useAutosave({
    items: cards,
  });

  const [selectedCard, setSelectedCard] = useState<TSelectedCard | undefined>(
    undefined
  );

  useEffect(() => {
    fetch("/api/cards")
      .then((response) => response.json())
      .then((data) =>
        setCards(data ? JSON.parse(data) : INTIAL_CARDS_ALIGNMENT)
      );
  }, []);

  const updateCardOrder = useCallback(
    (cards: TSelectedCard[]) => {
      setCards(cards);
      setDataToSave(cards);
    },
    [setDataToSave]
  );
  return (
    <main ref={containerRef} className="container">
      <div className="syncTimer">
        Last refreshed :&nbsp;
        <span className="lastSynced">{getTimeFromNow(timeSinceLastSave)}</span>
      </div>
      <section className="section-dnd">
        {isSaving ? (
          <>
            <div className="scrim" />
            <img
              width="50"
              height="50"
              src="https://media.tenor.com/I6kN-6X7nhAAAAAi/loading-buffering.gif"
              alt="loader"
            />
          </>
        ) : (
          <>
            <div className="row-1">
              {cards?.slice?.(0, 3)?.map((card) => (
                <Card
                  key={card.id}
                  content={card}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragOver}
                  onClick={() => setSelectedCard(card)}
                  onDrop={() => {
                    updateCardOrder(items || []);
                  }}
                />
              ))}
            </div>
            <div className="row-2">
              {cards?.slice?.(3, 5)?.map((card) => (
                <Card
                  key={card.id}
                  content={card}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragOver}
                  onClick={() => setSelectedCard(card)}
                  onDrop={() => {
                    updateCardOrder(items || []);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </section>
      <Modal
        open={Boolean(selectedCard)}
        onClose={() => setSelectedCard(undefined)}
      >
        <div className="modal-content">
          <img
            width="100%"
            height="70%"
            src={selectedCard?.image}
            alt={selectedCard?.content}
          />
          <div>{selectedCard?.content}</div>
        </div>
      </Modal>
    </main>
  );
};

export default App;
