// app/about/page.tsx

export default function AboutPage() {
  return (
    <main className="w-screen min-h-screen bg-[linear-gradient(to_right,_#BB9CBE,_#7D4E67)] py-20 px-6 absolute left-0 bottom-0 inset">
      <div className="max-w-3xl mx-auto bg-black/20 backdrop-blur-md rounded-2xl shadow-xl p-10 border border-white/10">
        <h2 className="text-4xl font-extrabold text-fuchsia-950 mb-6 text-center">
          About <span className="text-white">Spoonify🥄</span>
        </h2>
<p className="text-gray-200 text-lg leading-relaxed text-center">
  Ever stared at your fridge wondering what to cook with half an onion, a few eggs, and some leftover rice?  
  <br /><br />
  <span className="text-fuchsia-950 font-semibold">Spoonify</span> turns that everyday confusion into delicious inspiration.  
  Just tell us what ingredients you have — no matter how random — and let our intelligent recipe generator craft the perfect dish for you.
  <br /><br />
  ✨ Whether you are a beginner, a student living on a budget, or just someone trying to avoid food waste,  
  <span className="text-fuchsia-950 font-semibold">Spoonify</span> is built for **you**.
  <br /><br />
  With <span className="text-fuchsia-950 font-semibold">Spoonify</span>, **you cook smarter, faster, and tastier**.
</p>

      </div>
    </main>
  );
}
