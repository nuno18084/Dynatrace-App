// hooks/useHeaders.js
import { useState } from "react";

export default function useHeaders(initialValue = []) {
  const [headers, setHeaders] = useState(initialValue);
  return { headers, setHeaders };
}
