"use client";

type Recipe = {
  title: string;
  ingredients: string;
  steps: string;
  time: string;
};


import { useState } from "react";

export default function GenerateRecipePage() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    });
    const data = await res.json();
    setRecipe(data);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Enter Your Ingredients</h1>
      <textarea
        className="w-full p-4 border rounded mb-4"
        rows={4}
        placeholder="e.g. Eggs, Onion, Tomato, Salt"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded font-medium"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Recipe"}
      </button>

      {recipe && (
        <div className="mt-8 bg-white border p-4 rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
          <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
          <p><strong>Steps:</strong> {recipe.steps}</p>
          <p><strong>Time:</strong> {recipe.time}</p>
        </div>
      )}
    </div>
  );
}
