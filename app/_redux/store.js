import { configureStore } from "@reduxjs/toolkit";
import showAuthModal from "./slices/showAuthModal";
import loginStatus from "./slices/loginStatus";

export const store = configureStore({
  reducer: {
    showAuthModal: showAuthModal,
    loginStatus,
  },
});
