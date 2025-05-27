/* eslint-env node */
import { describe, it, expect, beforeAll, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "../src/store/filtersSlice";
import dataReducer from "../src/store/dataSlice";
import App from "../src/App";
import { MemoryRouter } from "react-router-dom";

// Create a test store with preloadedState for filters.columns and data
const testStore = configureStore({
  reducer: {
    filters: filtersReducer,
    data: dataReducer,
  },
  preloadedState: {
    filters: {
      env: [],
      api: [],
      columns: ["id", "displayName"], // Add columns your DataTable expects
    },
    data: {
      columns: ["id", "displayName"],
      env: [],
      api: [],
      headers: ["id", "displayName"],
      entities: [{ id: 1, displayName: "Test Entity", metrics: {} }],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      hasMore: false,
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

  // Mock IntersectionObserver
  globalThis.IntersectionObserver = class {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
  };

  // Mock fetch to always return a successful response with mock data
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          entities: [{ id: 1, displayName: "Test Entity", metrics: {} }],
        }),
    })
  );
});

describe("App", () => {
  it("renders the Data Export page and sidebar navigation", async () => {
    render(
      <Provider store={testStore}>
        <MemoryRouter initialEntries={["/data-export"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    screen.debug();
    const heading = await screen.findByRole("heading", {
      name: /data export/i,
    });
    expect(heading).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /data export/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /charts/i })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /data governance/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toBeInTheDocument();
  });
});
