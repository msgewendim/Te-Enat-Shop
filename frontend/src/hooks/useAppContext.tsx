import { useContext } from "react";
import { AppContext, IContext } from "../providers/interface/context";

export const useAppContext = (): IContext => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context
};