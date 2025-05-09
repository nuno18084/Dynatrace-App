import { useSelector, useDispatch } from "react-redux";
import { setEnv, setApi, setColumns } from "../store/filtersSlice";

export const useFilters = () => {
  const filters = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  return {
    filters,
    setEnv: (env) => dispatch(setEnv(env)),
    setApi: (api) => dispatch(setApi(api)),
    setColumns: (columns) => dispatch(setColumns(columns)),
  };
};
