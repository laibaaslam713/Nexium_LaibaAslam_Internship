"use client";

import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    image: "/speghatti_carbonara.jpg",
    short: "Classic Italian pasta with eggs, pancetta, cheese, and pepper.",
    full: `🍝 Ingredients:
- 200g spaghetti
- 100g pancetta or bacon
- 2 large eggs
- 50g grated parmesan or pecorino cheese
- Salt and black pepper to taste

👩‍🍳 Steps:
1. Cook spaghetti in salted water until al dente.
2. Fry pancetta until crispy.
3. In a bowl, mix eggs and cheese.
4. Drain pasta, saving 2 tbsp water.
5. Quickly mix pasta with egg mixture off heat, adding reserved water.
6. Add pancetta, season, and serve.`,
  },
  {
    id: 2,
    title: "Grilled Chicken Salad",
    image: "/grilled_chicken_salad.jpeg",
    short: "Healthy salad with grilled chicken, greens, and dressing.",
    full: `🥗 Ingredients:
- 1 grilled chicken breast
- 2 cups romaine lettuce
- Cherry tomatoes
- Croutons
- Parmesan cheese
- Caesar dressing

👩‍🍳 Steps:
1. Grill chicken with salt and pepper, then slice.
2. In a bowl, mix lettuce, tomatoes, croutons, and parmesan.
3. Add chicken on top.
4. Drizzle Caesar dressing and serve chilled.`,
  },
  {
    id: 3,
    title: "Veggie Burger",
    image: "/veggie_burger.jpg",
    short: "Delicious plant-based burger with fresh toppings.",
    full: `🍔 Ingredients:
- 1 veggie patty (store-bought or homemade)
- Burger buns
- Lettuce, tomato, onion
- Pickles (optional)
- Vegan mayo or sauce

👩‍🍳 Steps:
1. Cook veggie patty as per instructions.
2. Toast buns on pan.
3. Add lettuce, tomato, onion, and patty.
4. Spread sauce and close the bun.
5. Serve with fries or salad.`,
  },
  {
    id: 4,
    title: "Chicken Biryani",
    image: "/chicken_biryani.jpg",
    short: "Aromatic rice layered with flavorful chicken masala.",
    full: `🍛 Ingredients:
- 500g chicken
- 2 cups basmati rice
- 1 cup yogurt
- Fried onions
- Biryani masala
- Saffron or food color

👩‍🍳 Steps:
1. Marinate chicken with yogurt, spices, and ginger-garlic paste for 30 mins.
2. Cook rice until 80% done and drain.
3. In a pot, cook marinated chicken until tender and slightly thickened.
4. In a large pot, layer rice and chicken, topping with fried onions, mint, coriander, and saffron milk.
5. Cover tightly and cook on low flame (dum) for 15–20 minutes.
6. Gently mix before serving. Enjoy with raita or salad.`,
  },
  {
    id: 5,
    title: "Chocolate Lava Cake",
    image: "/chocolate_lava_cake.webp",
    short: "Rich chocolate cake with a gooey molten center.",
    full: `🍫 Ingredients:
- 100g dark chocolate
- 100g butter
- 2 eggs
- 50g sugar
- 30g flour

👩‍🍳 Steps:
1. Melt chocolate and butter together.
2. Beat eggs and sugar until fluffy.
3. Mix chocolate and egg mixture, then fold in flour.
4. Pour into greased ramekins.
5. Bake at 200°C for 10-12 mins.
6. Serve warm with ice cream.`,
  },
  {
    id: 6,
    title: "Strawberry Smoothie",
    image: "/strawberry_smoothie.jpg",
    short: "Refreshing smoothie made with strawberries and yogurt.",
    full: `🍓 Ingredients:
- 1 cup strawberries (fresh or frozen)
- 1/2 cup yogurt
- 1/2 cup milk or juice
- 1 tbsp honey
- Ice cubes

👩‍🍳 Steps:
1. Add all ingredients to a blender.
2. Blend until smooth.
3. Pour into glass and serve chilled.`,
  },
];

export default function LandingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  // const [selectedRecipe, setSelectedRecipe] = useState(null);

  type RecipeType = {
  id: number;
  title: string;
  image: string;
  short: string;
  full: string;
};

const [selectedRecipe, setSelectedRecipe] = useState<RecipeType | null>(null);


  const handleGetStarted = () => {
    if (session) {
      router.push("/generate");
    } else {
      router.push("/generate");
    }
  };

  return (
    <div className="w-full absolute left-0 top-0 inset-0">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <main
        className="w-full h-screen flex items-center justify-start bg-cover bg-center bg-no-repeat px-10"
        style={{ backgroundImage: "url('/landing_page.png')" }}
      >
        <div className="text-white mt-100 ml-30 max-w-xl">
          <button
            onClick={handleGetStarted}
            className="px-8 py-4 rounded-xl border-2 border-white text-white text-lg font-semibold hover:border-fuchsia-950 hover:text-fuchsia-950 transition-transform duration-300 shadow-md"
          >
            Get Started
          </button>
        </div>
      </main>

      <section className="w-full py-16 px-10 bg-white text-center">
        <h2 className="text-3xl font-bold text-purple-800 mb-10">Popular Recipes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="bg-purple-100 p-5 rounded-xl shadow hover:shadow-xl transition cursor-pointer"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold text-purple-900">{recipe.title}</h3>
              <p className="text-sm text-gray-700 mt-2">{recipe.short}</p>
            </div>
          ))}
        </div>
      </section>

      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-80 backdrop-blur-sm">
          <div className="backdrop-blur-sm bg-black/90 shadow-2xl p-6 rounded-xl  max-w-4xl relative">
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-3 right-3 text-white hover:text-red-600 text-2xl font-bold"
            >
              &times;
            </button>
            <Image
              src={selectedRecipe.image}
              alt={selectedRecipe.title}
              className="w-full h-52 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-purple-800 mb-3">{selectedRecipe.title}</h2>
            <pre className="text-sm text-white whitespace-pre-wrap">{selectedRecipe.full}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
