"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRef } from "react";


type Recipe = {
  title: string;
  ingredients: string[];
  steps: string[]; 
  time: string;
};

export default function GenerateRecipePage() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const recipeRef = useRef<HTMLDivElement | null>(null);


  const handleGenerate = async () => {
    if (!ingredients.trim()) {
      alert("Please enter at least one ingredient.");
      return;
    }

    setLoading(true);
    setRecipe(null);

    try {
      const response = await fetch(
        "https://laibaaslam713.app.n8n.cloud/webhook/recipe-generator",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ingredients }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await response.json();
        const recipeData = data.recipe;

        if (!recipeData || typeof recipeData !== "object") {
          throw new Error("Unexpected API response structure");
        }

        setRecipe({
          title: recipeData.title || "Untitled Recipe",
          ingredients: Array.isArray(recipeData.ingredients)
            ? recipeData.ingredients
            : ingredients.split(",").map((i) => i.trim()),
          steps: Array.isArray(recipeData.steps)
            ? recipeData.steps
            : recipeData.steps?.split("\n") || ["No steps provided."], 
          time: recipeData.time || "Unknown",
        });
        setTimeout(() => {
  recipeRef.current?.scrollIntoView({ behavior: "smooth" });
}, 100);

      } else {
        const text = await response.text();

        const sections = text.split(/Steps?:/i);
        const ingredientText = sections[0];
        const stepsText = sections[1] || "";

        const ingredients = ingredientText
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(
            (line) =>
              line &&
              !/^\*+$/.test(line) &&
              !/^[\d\-]+\s*$/.test(line) &&
              !/^Ingredients[:]?$/i.test(line)
          );

        const steps = stepsText
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter((line) => line);

        setRecipe({
          title: "Your AI Recipe",
          ingredients: ingredients,
          steps: steps, 
          time: "Unknown",
        });
        setTimeout(() => {
  recipeRef.current?.scrollIntoView({ behavior: "smooth" });
}, 100); 

      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      alert(
        "Something went wrong while generating the recipe. Please try again."
      );
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="w-screen h-screen bg-[linear-gradient(to_right,_#BB9CBE,_#7D4E69)] py-20 px-6 absolute left-0 top-0">
        <div className="max-w-4xl mx-auto backdrop-blur-sm bg-black/20 p-10 rounded-2xl shadow-2xl mt-10">
          <h1 className="text-4xl font-extrabold mb-6 text-center text-white drop-shadow-md">
            Crave It, Create It!
          </h1>
          <p className="font-bold text-2xl mb-6 text-center text-white drop-shadow-md">
            Tell us what you like or have on hand — we’ll create unique recipes and meal plans that fit your taste and lifestyle.
          </p>

          <textarea
            className="w-full p-5 rounded-xl bg-transparent text-white placeholder-white border border-white focus:outline-none focus:ring-2 focus:ring-white transition duration-300"
            rows={2}
            placeholder="Type your cravings or ingredients…"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />

          <div className="text-center mt-6">
            <button
              onClick={handleGenerate}
              className="bg-fuchsia-950 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md transition duration-300 disabled:opacity-60 w-full"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Recipe"}
            </button>
          </div>
        </div>

        {recipe && (
          <div
    ref={recipeRef}
    className="mt-10 mb-10 max-w-4xl mx-auto overflow-hidden"
  >
          <div className="mt-50 mb-50 max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl border border-gray-300 bg-white">
            <div className="bg-gray-100 px-6 py-4 border-b border-gray-300">
              <h2 className="text-2xl font-bold text-fuchsia-950">
                🍽️ {recipe.title}
              </h2>
            </div>

            <div className="p-8 text-gray-800 text-lg leading-relaxed mb-4">
 
  <div className="mb-4">
    <span className="font-semibold text-gray-700">🧂 Ingredients:</span>
    <div className="mt-2 space-y-1">
      {recipe.ingredients.map((ingredient, index) => (
        <div key={index}>{ingredient}</div>
      ))}
    </div>
  </div>

  <div className="mb-4">
    <span className="font-semibold text-gray-700">👨‍🍳 Steps:</span>
    <div className="mt-2 space-y-1">
      {recipe.steps.map((step, index) => (
        <div key={index}>{step}</div>
      ))}
    </div>
  </div>

  {/* <div className="mb-4">
    <span className="font-semibold text-gray-700">⏱️ Time:</span> {recipe.time}
  </div> */}
</div>
          </div>
          </div>
        )}
      </div>
    </>
  );
}
