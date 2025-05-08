// hooks/useData.js
import { useState } from "react";

export default function useData(initialValue = []) {
  const [data, setData] = useState(initialValue);
  return { data, setData };
}
