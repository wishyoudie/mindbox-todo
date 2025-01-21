import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoForm } from "../components/todo-form";

describe("TodoForm", () => {
  it("renders input field and submit button", () => {
    const mockAddTodo = jest.fn();
    render(<TodoForm onCreate={mockAddTodo} />);

    expect(
      screen.getByPlaceholderText("what needs to be done?"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls onCreate with input value when form is submitted", () => {
    const mockAddTodo = jest.fn();
    const { container } = render(<TodoForm onCreate={mockAddTodo} />);

    const input = screen.getByPlaceholderText("what needs to be done?");
    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.submit(form!);

    expect(mockAddTodo).toHaveBeenCalledWith("New Todo");
    expect(input).toHaveValue("");
  });

  it("does not submit empty todos", () => {
    const mockAddTodo = jest.fn();
    const { container } = render(<TodoForm onCreate={mockAddTodo} />);

    const form = container.querySelector("form");
    expect(form).toBeInTheDocument();
    fireEvent.submit(form!);

    expect(mockAddTodo).not.toHaveBeenCalled();
  });
});
