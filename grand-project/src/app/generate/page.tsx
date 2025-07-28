"use client";

import { useState } from "react";

type Recipe = {
  title: string;
  ingredients: string[];
  steps: string;
  time: string;
};

export default function GenerateRecipePage() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);

const handleGenerate = async () => {
  setLoading(true);
  setRecipe(null);

  try {
    const response = await fetch("http://localhost:5678/webhook/generate-recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { recipe: text }; 
    }

    console.log("API Response:", data);

    const parsed = data.recipe || data.result || "";

   const recipeData = data.recipe;

setRecipe({
  title: recipeData.title || "Recipe",
  ingredients: recipeData.ingredients || [],
  steps: recipeData.steps || "No steps found",
  time: recipeData.time || "Unknown",
});

  } catch (error) {
    console.error("Error generating recipe:", error);
    alert("Something went wrong while generating recipe. Check console for details.");
  }

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
          <p><strong>Ingredients:</strong> {recipe.ingredients.join(", ")}</p>
          <p><strong>Steps:</strong> {recipe.steps}</p>
          <p><strong>Time:</strong> {recipe.time}</p>
        </div>
      )}
    </div>
  );
}
