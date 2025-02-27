import { configureStore } from "@reduxjs/toolkit";
import showAuthModal from "./slices/showAuthModal";

export const store = configureStore({
  reducer: {
    showAuthModal: showAuthModal,
  },
});
