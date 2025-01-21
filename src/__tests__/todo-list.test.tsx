import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { TodoList } from "../components/todo-list";
import { Todo } from "../types";

describe("TodoList", () => {
  const mockTodos: Todo[] = [
    { id: 1, text: "Test Todo 1", completed: false },
    { id: 2, text: "Test Todo 2", completed: true },
  ];

  const mockToggleTodo = jest.fn();

  beforeEach(() => {
    mockToggleTodo.mockClear();
  });

  it("renders todos correctly", () => {
    render(<TodoList todos={mockTodos} toggleTodo={mockToggleTodo} />);

    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
  });

  it("calls toggleTodo when checkbox is clicked", () => {
    render(<TodoList todos={mockTodos} toggleTodo={mockToggleTodo} />);

    const checkbox = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkbox);

    expect(mockToggleTodo).toHaveBeenCalledWith(1);
  });

  it("renders empty state when no todos", () => {
    render(<TodoList todos={[]} toggleTodo={mockToggleTodo} />);

    expect(screen.getByText(/no items yet/i)).toBeInTheDocument();
  });
});
