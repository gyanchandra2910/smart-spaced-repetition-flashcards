import { useState } from "react";
import { motion } from "framer-motion";
import StatsDashboard from "../components/StatsDashboard";
import CalendarHeatmap from "../components/CalendarHeatmap";
import useSpacedRepetition from "../hooks/useSpacedRepetition";

const DashboardPage = () => {
  const { cards, reviewData, addCard, removeCard, importCards, exportCards } =
    useSpacedRepetition();
  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [importError, setImportError] = useState("");
  const [selectedTab, setSelectedTab] = useState("stats");

  const handleNewCardChange = (e) => {
    const { name, value } = e.target;
    setNewCard((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCard.question.trim() && newCard.answer.trim()) {
      addCard(newCard);
      setNewCard({ question: "", answer: "" });
      setIsAddingCard(false);
    }
  };

  const handleDeleteCard = (cardId) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      removeCard(cardId);
    }
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(exportCards(), null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;

    const exportFileDefaultName = `flashcards-export-${
      new Date().toISOString().split("T")[0]
    }.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        const success = importCards(data);

        if (success) {
          setImportError("");
          alert("Cards imported successfully!");
        } else {
          setImportError("Failed to import cards. Invalid format.");
        }
      } catch (error) {
        setImportError("Failed to parse JSON file.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-6xl mx-auto p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-secondary-800 dark:text-secondary-100 mb-2">
            Dashboard
          </h1>
          <p className="text-secondary-600 dark:text-secondary-300">
            Track your progress and manage your flashcards
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-secondary-200 dark:border-secondary-700 mb-8">
          <div className="flex space-x-8">
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                selectedTab === "stats"
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300"
              }`}
              onClick={() => setSelectedTab("stats")}
            >
              Statistics
            </button>
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                selectedTab === "manage"
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300"
              }`}
              onClick={() => setSelectedTab("manage")}
            >
              Manage Cards
            </button>
            <button
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                selectedTab === "import"
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-secondary-500 hover:text-secondary-700 dark:hover:text-secondary-300"
              }`}
              onClick={() => setSelectedTab("import")}
            >
              Import/Export
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {/* Stats Tab */}
          {selectedTab === "stats" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StatsDashboard reviewData={reviewData} />
              <CalendarHeatmap reviewData={reviewData} />
            </motion.div>
          )}

          {/* Manage Cards Tab */}
          {selectedTab === "manage" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Your Flashcards</h2>
                  <button
                    className="btn-primary"
                    onClick={() => setIsAddingCard(!isAddingCard)}
                  >
                    {isAddingCard ? "Cancel" : "Add New Card"}
                  </button>
                </div>

                {isAddingCard && (
                  <motion.form
                    className="card-glass p-4 mb-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleAddCard}
                  >
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="question"
                      >
                        Question
                      </label>
                      <textarea
                        className="w-full p-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800"
                        id="question"
                        name="question"
                        rows="2"
                        value={newCard.question}
                        onChange={handleNewCardChange}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-sm font-medium mb-2"
                        htmlFor="answer"
                      >
                        Answer
                      </label>
                      <textarea
                        className="w-full p-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-800"
                        id="answer"
                        name="answer"
                        rows="3"
                        value={newCard.answer}
                        onChange={handleNewCardChange}
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button type="submit" className="btn-primary">
                        Add Card
                      </button>
                    </div>
                  </motion.form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cards && cards.length > 0 ? (
                    cards.map((card) => (
                      <div key={card.id} className="card-glass p-4 relative">
                        <button
                          className="absolute top-2 right-2 text-secondary-400 hover:text-secondary-600 dark:hover:text-secondary-200"
                          onClick={() => handleDeleteCard(card.id)}
                          aria-label="Delete card"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <div className="mb-3">
                          <h3 className="font-semibold mb-1">Question</h3>
                          <p className="text-sm">{card.question}</p>
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Answer</h3>
                          <p className="text-sm">{card.answer}</p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-secondary-200 dark:border-secondary-700 text-xs text-secondary-500">
                          Reviews: {card.reviewCount} • Last reviewed:{" "}
                          {card.lastReviewedAt
                            ? new Date(card.lastReviewedAt).toLocaleDateString()
                            : "Never"}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-secondary-500">
                      No flashcards added yet. Click "Add New Card" to create
                      your first flashcard.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Import/Export Tab */}
          {selectedTab === "import" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="card-glass p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Import Cards</h2>
                <p className="mb-4 text-secondary-600 dark:text-secondary-400">
                  Import flashcards from a JSON file. This will add the imported
                  cards to your existing deck.
                </p>

                <div className="flex items-center justify-center w-full">
                  <label className="w-full flex flex-col items-center px-4 py-6 bg-white dark:bg-secondary-800 text-primary rounded-lg shadow-lg tracking-wide border border-primary-200 dark:border-primary-700 cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-900">
                    <svg
                      className="w-8 h-8 text-primary-500"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="mt-2 text-base leading-normal">
                      Select a file
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".json"
                      onChange={handleImport}
                    />
                  </label>
                </div>

                {importError && (
                  <div className="mt-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                    {importError}
                  </div>
                )}
              </div>

              <div className="card-glass p-6">
                <h2 className="text-xl font-semibold mb-4">Export Cards</h2>
                <p className="mb-4 text-secondary-600 dark:text-secondary-400">
                  Export all your flashcards and review history to a JSON file.
                  You can use this file for backup or to transfer your cards to
                  another device.
                </p>

                <button onClick={handleExport} className="btn-primary w-full">
                  Export to JSON
                </button>

                <div className="mt-4 p-3 bg-secondary-100 dark:bg-secondary-800 rounded-lg text-sm">
                  <p className="font-medium mb-1">
                    The exported file will include:
                  </p>
                  <ul className="list-disc list-inside text-secondary-600 dark:text-secondary-400 space-y-1">
                    <li>All flashcards with questions and answers</li>
                    <li>Spaced repetition metadata (scheduling information)</li>
                    <li>Your complete review history</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
