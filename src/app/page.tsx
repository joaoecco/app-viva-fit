  {
    id: 60,
    name: "Muffin de Banana e Aveia",
    ingredients: ["2 bananas", "1 xícara de aveia", "1 ovo", "Canela", "Nozes"],
    instructions: ["Amasse bananas", "Misture com aveia e ovo", "Adicione canela e nozes", "Asse em forminhas por 20 min", "Sirva morno"],
    calories: 180,
    servings: 4,
    prepTime: "25 min",
    tip: "Perfeito para levar na bolsa!",
    category: "dessert",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop"
  }
];

export default function VivaFitApp() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: "all", name: "Todas", color: "bg-gray-100", icon: "🍽️" },
    { id: "breakfast", name: "Café da Manhã", color: "bg-orange-100", icon: "🌅" },
    { id: "snack", name: "Lanches", color: "bg-green-100", icon: "🥜" },
    { id: "lunch", name: "Almoços", color: "bg-blue-100", icon: "🍲" },
    { id: "dinner", name: "Jantares", color: "bg-purple-100", icon: "🌙" },
    { id: "dessert", name: "Sobremesas", color: "bg-pink-100", icon: "🍰" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Viva + Fit</h1>
          <p className="text-lg text-gray-600 mb-4">60 receitas fitness deliciosas e saudáveis</p>
          <p className="text-sm text-gray-500">Emagreça com sabor, energia e bem-estar!</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Buscar receitas ou ingredientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? "bg-green-500 text-white"
                    : `${category.color} text-gray-700 hover:bg-opacity-75`
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{recipe.name}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>🍽️ {recipe.servings} porções</span>
                  <span>⚡ {recipe.calories} cal</span>
                  <span>⏱️ {recipe.prepTime}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">{recipe.tip}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recipe Modal */}
        {selectedRecipe && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedRecipe.name}</h2>
                  <button
                    onClick={() => setSelectedRecipe(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ingredientes</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {selectedRecipe.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Modo de Preparo</h3>
                    <ol className="list-decimal list-inside text-gray-700">
                      {selectedRecipe.instructions.map((instruction, index) => (
                        <li key={index} className="mb-1">{instruction}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <p className="text-green-800 font-medium">💡 Dica Nutricional:</p>
                  <p className="text-green-700">{selectedRecipe.tip}</p>
                  <div className="flex items-center justify-between mt-2 text-sm text-green-600">
                    <span>🍽️ {selectedRecipe.servings} porções</span>
                    <span>⚡ {selectedRecipe.calories} calorias por porção</span>
                    <span>⏱️ Tempo: {selectedRecipe.prepTime}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}