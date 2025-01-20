import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Filter = "all" | "completed" | "uncompleted";

export function FilterSwitch({
  filter,
  setFilter,
}: {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}) {
  return (
    <div className="mb-4">
      <ToggleGroup
        type="single"
        value={filter}
        onValueChange={(value) => setFilter(value as Filter)}
      >
        <ToggleGroupItem value="all">all</ToggleGroupItem>
        <ToggleGroupItem value="completed">completed</ToggleGroupItem>
        <ToggleGroupItem value="uncompleted">uncompleted</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
