// hooks/useError.js
import { useState } from "react";

export default function useError(initialValue = null) {
  const [error, setError] = useState(initialValue);
  return { error, setError };
}
