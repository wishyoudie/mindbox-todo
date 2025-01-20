export type Filter = "all" | "completed" | "uncompleted";

export function isFilter(value: string): value is Filter {
  return value === "all" || value === "completed" || value === "uncompleted";
}
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};
