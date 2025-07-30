import { useContext } from "react";
import { ReloadContext } from "../ui/reloadContext";

export function useReloadContext() {
  const context = useContext(ReloadContext);
  if (!context) {
    throw new Error("useReloadContext must be used within a ReloadProvider");
  }
  return context;
}
