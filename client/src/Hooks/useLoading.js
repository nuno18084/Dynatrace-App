// hooks/useLoading.js
import { useState } from "react";

export default function useLoading(initialValue = true) {
  const [loading, setLoading] = useState(initialValue);
  return { loading, setLoading };
}
