import type { PropsWithChildren } from "react";
import { createContext, useContext, useState } from "react";





type SetId = (
  key: "bookId" | "chapterId" | "portionId" | "userId",
  value: number | string,
) => void;

interface IdsContextType {
  bookId: number;
  chapterId: number;
  portionId: number;
  userId: string;
  setId: SetId;
}

const initialIds = {
  bookId: -1,
  chapterId: -1,
  portionId: -1,
  userId: "",
};

const IdsContext = createContext<IdsContextType>({
  ...initialIds,
  setId: () => {
    throw new Error(
      "setId must be implemented by the consumer of this context",
    );
  },
});

export const useIds = () => useContext(IdsContext);

export const IdsProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [ids, setIds] = useState(initialIds);

  const setId: SetId = (key, value) => {
    setIds((prev) => ({ ...prev, [key]: value }));
  };

  const contextValue = {
    ...ids,
    setId,
  };

  return (
    <IdsContext.Provider value={contextValue}>{children}</IdsContext.Provider>
  );
};
