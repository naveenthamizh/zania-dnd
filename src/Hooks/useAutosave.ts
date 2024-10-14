import { useCallback, useRef, useEffect, useState } from "react";
import { TSelectedCard } from "../types";

type TAutoSave = {
  items: TSelectedCard[] | undefined;
};

export const useAutosave = (props: TAutoSave) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const lastSaveTimeRef = useRef(Date.now());

  const hasChanges = useRef(false);

  const [dataToSave, setDataToSave] = useState<TSelectedCard[] | undefined>(
    undefined
  );

  const [timeSinceLastSave, setTimeSinceLastSave] = useState(0);

  const [isSaving, setIsSaving] = useState(false);

  const updateCardOrder = useCallback(async () => {
    if (!hasChanges.current || dataToSave === null) {
      return;
    }
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    fetch("/api/cards", {
      method: "PUT",
      body: JSON.stringify(props.items),
    })
      .then((response) => response.json())
      .then(() => {
        setTimeSinceLastSave(0);
        hasChanges.current = false;
      })
      .finally(() => setIsSaving(false));
  }, [dataToSave, props.items]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeSinceLastSave(
        Math.floor((Date.now() - lastSaveTimeRef.current) / 1000)
      );
      updateCardOrder();
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [updateCardOrder]);

  const setDataToSaveHandler = useCallback((data: typeof dataToSave) => {
    setDataToSave(data);
    hasChanges.current = true; // Mark as changed
  }, []);

  return {
    isSaving,
    timeSinceLastSave,
    setDataToSave: setDataToSaveHandler,
  };
};
