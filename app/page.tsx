
import { Button } from "@/components/ui/button";

export default async function Home() { 
  return (
    <main className="flex flex-col align-center justify-center gap-4 px-2 py-2">
      <h1>Home Page</h1>
      <Button>Hello</Button>
    </main>
  );
}
