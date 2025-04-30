import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useCountriesQuery } from "@/api/table-query";
import Row1 from "./Row1";
import { format } from "d3-format";

// Mock the useCountriesQuery hook
jest.mock("@/api/table-query", () => ({
  useCountriesQuery: jest.fn(),
}));

const numberFormat = format(".2s");

describe("Row1 Component", () => {
  const mockCountriesData = [
    {
      name: { common: "Country A" },
      population: 1000000,
      area: 1000,
    },
    {
      name: { common: "Country B" },
      population: 2000000,
      area: 2000,
    },
  ];

  it("renders loading state when data is not yet available", () => {
    useCountriesQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    });
    render(<Row1 />);
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("renders error state when there is an error fetching data", () => {
    useCountriesQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
    });
    render(<Row1 />);
    expect(screen.getByText("Error fetching data")).toBeInTheDocument();
  });

  it("renders AreaChart and BarChart with data", async () => {
    useCountriesQuery.mockReturnValue({
      data: mockCountriesData,
      isLoading: false,
      isError: false,
    });

    render(<Row1 />);

    // Wait for the component to render the charts
    await waitFor(() => {
      expect(screen.getByText("Population")).toBeInTheDocument();
      expect(screen.getByText("Area")).toBeInTheDocument();
    });

    // Basic check for data presence in charts
    expect(screen.getByText("Country A")).toBeInTheDocument();
    expect(screen.getByText("Country B")).toBeInTheDocument();
  });

  it("handles missing country names and data gracefully", async () => {
    const mockCountriesDataWithMissingData = [
      {
        name: {}, // Missing common name
        population: null, // Null population
        area: undefined, // Undefined area
      },
    ];

    useCountriesQuery.mockReturnValue({
      data: mockCountriesDataWithMissingData,
      isLoading: false,
      isError: false,
    });

    render(<Row1 />);

    await waitFor(() => {
      expect(screen.getByText("Unknown")).toBeInTheDocument(); // Should display "Unknown" for missing name
    });
  });
});
