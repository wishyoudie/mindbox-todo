import { Checkbox } from "@/components/ui/checkbox";
import type { Todo } from "@/types";
import { CheckCircle2Icon } from "lucide-react";

function Placeholder() {
  return (
    <div className="flex items-center justify-center h-24 w-full text-muted-foreground">
      <div className="flex flex-col items-center space-y-2">
        <CheckCircle2Icon />
        <span className="text-sm text-muted-foreground">no items yet</span>
      </div>
    </div>
  );
}

export function TodoList({
  todos,
  toggleTodo,
}: {
  todos: Todo[];
  toggleTodo: (id: number) => void;
}) {
  const handleCheckedChange = (id: number) => () => {
    toggleTodo(id);
  };

  return (
    <ul className="space-y-2">
      {todos.length > 0 ? (
        <>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center py-1 [&:not(:last-child)]:border-b-[1px] border-border"
            >
              <Checkbox
                id={`todo-${todo.id}`}
                checked={todo.completed}
                onCheckedChange={handleCheckedChange(todo.id)}
                className="mr-2"
              />
              <label
                htmlFor={`todo-${todo.id}`}
                className={`flex-grow ${
                  todo.completed ? "line-through text-muted-foreground" : ""
                }`}
              >
                {todo.text}
              </label>
            </li>
          ))}
        </>
      ) : (
        <li key={-1}>
          <Placeholder />
        </li>
      )}
    </ul>
  );
}
