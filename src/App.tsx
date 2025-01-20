import { useState } from "react";
import { TodoForm } from "./components/todo-form";
import { TodoList } from "./components/todo-list";
import { FilterSwitch } from "./components/filter-switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Button } from "./components/ui/button";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type Filter = "all" | "completed" | "uncompleted";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const hasCompleted = todos.some((todo) => todo.completed);

  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case "completed":
        return todo.completed;
      case "uncompleted":
        return !todo.completed;
      default:
        return true;
    }
  });

  return (
    <>
      <Card className="max-w-md mx-auto mt-10 min-h-96">
        <CardHeader>
          <CardTitle>todo app</CardTitle>
        </CardHeader>
        <CardDescription className="px-4">
          <FilterSwitch filter={filter} setFilter={setFilter} />
        </CardDescription>
        <CardContent>
          <TodoList todos={filteredTodos} toggleTodo={toggleTodo} />
          {hasCompleted && (
            <Button
              variant="secondary"
              className="w-full mt-4"
              onClick={clearCompleted}
            >
              clear completed
            </Button>
          )}
        </CardContent>
      </Card>
      <TodoForm onCreate={addTodo} />
    </>
  );
}
