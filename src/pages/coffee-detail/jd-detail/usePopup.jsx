import { useState } from "react";
import { PopupFrame } from "./PopupFrame";

export function usePopup() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return { PopupFrame, isOpen, openPopup, closePopup };
}
