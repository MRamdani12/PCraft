import type store from "../../reduxStore";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
