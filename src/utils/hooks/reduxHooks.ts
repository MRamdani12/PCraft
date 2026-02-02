import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../utils/types/ReduxTypes";

export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
