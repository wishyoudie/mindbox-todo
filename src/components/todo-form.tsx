import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createRef } from "react";
import { updateURL } from "@/lib/url";
import { getFromSearchParams } from "@/lib/url";

export function TodoForm({ onCreate }: { onCreate: (value: string) => void }) {
  const formRef = createRef<HTMLFormElement>();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateURL("q", value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = getFromSearchParams("q");
    if (q && q.trim()) {
      onCreate(q.trim());
      updateURL("q", "");
      formRef.current?.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 mb-10 flex" ref={formRef}>
      <Input
        type="text"
        defaultValue={getFromSearchParams("q") || ""}
        onChange={handleChange}
        placeholder="what needs to be done?"
        className="rounded-r-none"
      />
      <Button type="submit" className="rounded-l-none">
        add
      </Button>
    </form>
  );
}
