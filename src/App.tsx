import { useState, useMemo } from "react";
import { Input } from "./components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Search, Github } from "lucide-react";
import { QuizMode } from "./components/QuizMode";
import { Header } from "./components/Header";
import { NoQuestionsFound } from "./components/NoQuestionsFound";
import { QuestionsList } from "./components/QuestionsList";
import { useAppContext } from "./context/AppContext";

function App() {
    const { categories, questions, studiedQuestions } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [isQuizMode, setIsQuizMode] = useState(false);

    const filteredQuestions = useMemo(() => {
        return questions.filter((q) => {
            const matchesCategory =
                selectedCategory === "All" || q.category === selectedCategory;
            const matchesSearch =
                searchQuery === "" ||
                q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                q.answer.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handlePrint = () => {
        window.print();
    };

    if (isQuizMode) {
        return (
            <div className="min-h-screen bg-background p-6 md:p-8">
                <QuizMode
                    selectedCategory={selectedCategory}
                    onExit={() => setIsQuizMode(false)}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-6xl mx-auto p-6 md:p-8">
                <Header
                    onStartQuiz={() => setIsQuizMode(true)}
                    onPrint={handlePrint}
                />

                <div className="mb-6 relative no-print">
                    <Search
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                        placeholder="Search questions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <Tabs
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                    className="mb-8 no-print"
                >
                    <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 shadow-xs">
                        {categories.map((cat) => (
                            <TabsTrigger
                                key={cat}
                                value={cat}
                                className="whitespace-nowrap"
                            >
                                {cat}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>

                {filteredQuestions.length === 0 ? (
                    <NoQuestionsFound />
                ) : (
                    <QuestionsList
                        questions={filteredQuestions}
                        expandedId={expandedId}
                        onToggleExpand={toggleExpand}
                    />
                )}

                <footer className="mt-10 pt-6 border-t border-border text-center">
                    <a
                        href="https://github.com/mohbadreldeen/frontend-interview-questions"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                        <Github size={16} />
                        GitHub Repo
                    </a>
                </footer>
            </div>
        </div>
    );
}

export default App;
