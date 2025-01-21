import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterSwitch } from "../components/filter-switch";
import { Filter } from "../types";

describe("FilterSwitch", () => {
  const mockSetFilter = jest.fn();

  beforeEach(() => {
    mockSetFilter.mockClear();
  });

  it("renders all filter options", () => {
    render(<FilterSwitch setFilter={mockSetFilter} />);

    const radioButtons = screen.getAllByRole("radio");
    expect(radioButtons).toHaveLength(3);
    expect(radioButtons[0]).toHaveTextContent(/all/i);
    expect(radioButtons[1]).toHaveTextContent(/completed/i);
    expect(radioButtons[2]).toHaveTextContent(/uncompleted/i);
  });

  it("highlights the selected filter", () => {
    render(<FilterSwitch setFilter={mockSetFilter} />);

    const radioButtons = screen.getAllByRole("radio");
    const allButton = radioButtons[0];
    expect(allButton).toHaveAttribute("data-state", "on");
    expect(radioButtons[1]).toHaveAttribute("data-state", "off");
    expect(radioButtons[2]).toHaveAttribute("data-state", "off");
  });

  it("calls setFilter when a different filter is selected", () => {
    render(<FilterSwitch setFilter={mockSetFilter} />);

    const radioButtons = screen.getAllByRole("radio");
    const uncompletedButton = radioButtons[2];
    fireEvent.click(uncompletedButton);

    expect(mockSetFilter).toHaveBeenCalledWith("uncompleted" as Filter);
  });
});
