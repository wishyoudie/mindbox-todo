import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TodoForm({ onCreate }: { onCreate: (value: string) => void }) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onCreate(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 mb-10 flex">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="what needs to be done?"
        className="rounded-r-none"
      />
      <Button type="submit" className="rounded-l-none">
        add
      </Button>
    </form>
  );
}
