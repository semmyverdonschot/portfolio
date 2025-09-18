"use client";

import useTextReveal from "@/hooks/useTextReveal";

export default function WorkPage() {
  // Animate <h1> and <p>

  useTextReveal("h1, p");

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">testing animations</h1>
      <p className="mt-4 text-lg">Here’s a list of my projects.</p>
    </div>
  );
}
