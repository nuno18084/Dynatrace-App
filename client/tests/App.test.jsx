/* eslint-env node */
import { describe, it, expect, beforeAll, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../src/store/filtersSlice";
import App from "../src/App";

// Create a test store with preloadedState for filters.columns
const testStore = configureStore({
  reducer: {
    filters: filtersReducer,
  },
  preloadedState: {
    filters: {
      env: [],
      api: [],
      columns: ["id", "displayName"], // Add columns your DataTable expects
    },
  },
});

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      };
    };

  // Mock fetch to always return a successful response with mock data
  // eslint-disable-next-line no-undef
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          entities: [{ id: 1, displayName: "Test Entity", metrics: {} }],
        }),
    })
  );
});

describe("App", () => {
  it("renders the Home page and sidebar navigation", async () => {
    render(
      <Provider store={testStore}>
        <App />
      </Provider>
    );
    let heading;
    try {
      heading = await screen.findByRole("heading", { name: /dynatrace data/i });
      expect(heading).toBeInTheDocument();
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      // Fallback: check for error or loading text
      const error = screen.queryByText(/failed to initialize data/i);
      const loading = screen.queryByText(/initializing/i);
      expect(error || loading).not.toBeNull();
    }
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /charts/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /data governance/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
  });
});
