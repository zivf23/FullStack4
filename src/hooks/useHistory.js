import { useReducer, useCallback } from "react";

/* ---------- Reducer ---------- */
function reducer(state, action) {
  const { past, present, future } = state;

  switch (action.type) {
    case "SET":   // כל שינוי בתוכן
      return { past: [...past, present], present: action.payload, future: [] };

    case "UNDO":
      if (!past.length) return state;
      return {
        past: past.slice(0, -1),
        present: past[past.length - 1],
        future: [present, ...future]
      };

    case "REDO":
      if (!future.length) return state;
      return {
        past: [...past, present],
        present: future[0],
        future: future.slice(1)
      };

    default:
      return state;
  }
}

/* ---------- Hook ---------- */
export default function useHistory(initialValue) {
  const [state, dispatch] = useReducer(reducer, {
    past: [],
    present: initialValue,
    future: []
  });

  const set  = useCallback(v => dispatch({ type: "SET",  payload: v }), []);
  const undo = useCallback(() => dispatch({ type: "UNDO"}), []);
  const redo = useCallback(() => dispatch({ type: "REDO"}), []);

  return {
    value: state.present,
    set,
    undo,
    redo,
    canUndo: state.past.length  > 0,
    canRedo: state.future.length > 0
  };
}
