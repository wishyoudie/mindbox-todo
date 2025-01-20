import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { getInitialFilter } from "@/get-initial-filter";
import { updateURL } from "@/lib/url";
import { isFilter, type Filter } from "@/types";

export function FilterSwitch({
  setFilter,
}: {
  setFilter: (filter: Filter) => void;
}) {
  const handleChange = (value: string) => {
    if (isFilter(value)) {
      updateURL("filter", value);
      setFilter(value);
    } else {
      console.error("trying to set wrong filter type: ", value);
    }
  };

  return (
    <div className="mb-4">
      <ToggleGroup
        defaultValue={getInitialFilter()}
        type="single"
        onValueChange={handleChange}
      >
        <ToggleGroupItem value="all">all</ToggleGroupItem>
        <ToggleGroupItem value="completed">completed</ToggleGroupItem>
        <ToggleGroupItem value="uncompleted">uncompleted</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
