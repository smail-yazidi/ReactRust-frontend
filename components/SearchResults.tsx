"use client"

interface SearchResultsProps {
  searchTerm: string
  searchResults: any[]
  currentLang: "fr" | "en" | "ar"
  themeClasses: any
  mockData: any
}

export default function SearchResults({
  searchTerm,
  searchResults,
  currentLang,
  themeClasses,
  mockData,
}: SearchResultsProps) {
  if (!searchTerm) return null

  return (
    <div
      className="fixed top-40 inset-x-0 z-40 backdrop-blur overflow-auto py-8"
      style={{ maxHeight: "calc(100vh - 4rem)" }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${themeClasses.glassDark} p-8 rounded-3xl shadow-xl`}>
          <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${themeClasses.text}`}>
            {currentLang === "en" ? "Search Results" : currentLang === "fr" ? "Résultats de recherche" : "نتائج البحث"}
          </h2>
          {searchResults.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((result, idx) => (
                <div
                  key={idx}
                  className={`${themeClasses.glassDark} p-6 rounded-2xl ${themeClasses.shadow} transition-all duration-300`}
                >
                  <p className="font-semibold mb-2">{result.type}</p>
                  <h3 className={`${themeClasses.text} font-medium mb-2`}>
                    {result.type === "Skill" && result.item.name?.[currentLang]}
                    {result.type === "Project" && result.item.title?.[currentLang]}
                    {result.type === "Experience" && result.item.title?.[currentLang]}
                    {result.type === "Service" && result.item.title?.[currentLang]}
                    {result.type === "About" && "About Me"}
                    {result.type === "PersonalInfo" && result.item.label?.[currentLang]}
                    {result.type === "Language" && result.item.name?.[currentLang]}
                    {result.type === "Interest" && result.item.name?.[currentLang]}
                    {result.type === "Contact" && result.item.contactTitle?.[currentLang]}
                  </h3>
                  {result.type === "Skill" && result.item.examples?.length > 0 && (
                    <ul className={`${themeClasses.textMuted} text-sm mt-1 list-disc list-inside`}>
                      {result.item.examples.map((ex, i) => (
                        <li key={i}>{ex?.[currentLang]}</li>
                      ))}
                    </ul>
                  )}
                  {result.type === "Project" && result.item.description && (
                    <p className={`${themeClasses.textMuted} text-sm mt-1`}>{result.item.description?.[currentLang]}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className={`text-center ${themeClasses.textMuted}`}>
              {currentLang === "en"
                ? "No results found."
                : currentLang === "fr"
                  ? "Aucun résultat trouvé."
                  : "لم يتم العثور على نتائج."}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
