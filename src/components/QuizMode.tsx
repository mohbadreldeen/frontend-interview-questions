import { useState, useMemo, useEffect } from "react";
import { Question } from "../data/questions";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { CodeHighlight } from "./CodeHighlight";
import { useAppContext } from "../context/AppContext";
import {
    Trophy,
    ArrowRight,
    Check,
    X,
    RotateCcw,
    CheckCircle,
    XCircle,
} from "lucide-react";

interface QuizModeProps {
    selectedCategory: string;
    onExit: () => void;
}

interface QuizResult {
    questionId: string;
    correct: boolean;
}

interface QuizHistoryEntry {
    date: number;
    score: number;
    total: number;
    category: string;
}

export function QuizMode({ selectedCategory, onExit }: QuizModeProps) {
    const { questions } = useAppContext();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
    const [isComplete, setIsComplete] = useState(false);
    const [quizHistory, setQuizHistory] = useState<QuizHistoryEntry[]>(() => {
        const stored = localStorage.getItem("quiz-history");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("quiz-history", JSON.stringify(quizHistory));
    }, [quizHistory]);

    const shuffledQuestions = useMemo(() => {
        const filtered =
            selectedCategory === "All"
                ? questions
                : questions.filter((q) => q.category === selectedCategory);
        return [...filtered].sort(() => Math.random() - 0.5);
    }, [questions, selectedCategory]);

    const currentQuestion = shuffledQuestions[currentIndex];
    const totalQuestions = shuffledQuestions.length;
    const progress = ((currentIndex + 1) / totalQuestions) * 100;

    const handleAnswer = (correct: boolean) => {
        setQuizResults((current) => [
            ...current,
            {
                questionId: currentQuestion.id,
                correct,
            },
        ]);
        setShowAnswer(false);

        if (currentIndex + 1 < totalQuestions) {
            setCurrentIndex((current) => current + 1);
        } else {
            setIsComplete(true);
            const correctCount = [
                ...quizResults,
                { questionId: currentQuestion.id, correct },
            ].filter((r) => r.correct).length;

            setQuizHistory((current) => [
                ...current,
                {
                    date: Date.now(),
                    score: correctCount,
                    total: totalQuestions,
                    category: selectedCategory,
                },
            ]);
        }
    };

    const restartQuiz = () => {
        setCurrentIndex(0);
        setShowAnswer(false);
        setQuizResults([]);
        setIsComplete(false);
    };

    const correctCount = quizResults.filter((r) => r.correct).length;
    const incorrectCount = quizResults.filter((r) => !r.correct).length;
    const scorePercentage =
        totalQuestions > 0
            ? Math.round((correctCount / totalQuestions) * 100)
            : 0;

    if (isComplete) {
        return (
            <div className="max-w-3xl mx-auto quiz-complete-enter">
                <Card className="p-8 text-center">
                    <div className="mb-6">
                        <Trophy
                            size={64}
                            className="text-accent mx-auto mb-4"
                        />
                        <h2 className="text-3xl font-bold mb-2">
                            Quiz Complete!
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            {selectedCategory !== "All"
                                ? `${selectedCategory} - `
                                : ""}
                            Your Score
                        </p>
                    </div>

                    <div className="mb-8">
                        <div className="text-6xl font-bold text-primary mb-4">
                            {scorePercentage}%
                        </div>
                        <div className="flex items-center justify-center gap-8 text-lg">
                            <div className="flex items-center gap-2">
                                <CheckCircle
                                    size={24}
                                    className="text-accent fill-accent"
                                />
                                <span>{correctCount} Correct</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <XCircle
                                    size={24}
                                    className="text-destructive fill-destructive"
                                />
                                <span>{incorrectCount} Incorrect</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <Button onClick={restartQuiz} className="gap-2">
                            <RotateCcw size={20} />
                            Retry Quiz
                        </Button>
                        <Button onClick={onExit} variant="outline">
                            Exit Quiz Mode
                        </Button>
                    </div>

                    {quizHistory.length > 1 && (
                        <div className="mt-8 pt-6 border-t border-border">
                            <h3 className="text-lg font-semibold mb-4">
                                Quiz History
                            </h3>
                            <div className="space-y-2">
                                {quizHistory
                                    .slice(-5)
                                    .reverse()
                                    .map((entry, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between p-3 bg-muted rounded-lg"
                                        >
                                            <div className="text-sm">
                                                <span className="font-medium">
                                                    {entry.category}
                                                </span>
                                                <span className="text-muted-foreground ml-2">
                                                    {new Date(
                                                        entry.date
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <Badge variant="secondary">
                                                {Math.round(
                                                    (entry.score /
                                                        entry.total) *
                                                        100
                                                )}
                                                %
                                            </Badge>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        );
    }

    if (!currentQuestion) {
        return (
            <div className="max-w-3xl mx-auto">
                <Card className="p-8 text-center">
                    <p className="text-muted-foreground mb-4">
                        No questions available for this category.
                    </p>
                    <Button onClick={onExit}>Exit Quiz Mode</Button>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto quiz-card-enter">
            <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <Badge variant="outline">
                            Question {currentIndex + 1} of {totalQuestions}
                        </Badge>
                        <Badge variant="secondary">{selectedCategory}</Badge>
                    </div>
                    <Button
                        onClick={onExit}
                        variant="ghost"
                        size="sm"
                        className="rounded-full cursor-pointer"
                    >
                        Exit Quiz
                    </Button>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            <Card className="p-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-foreground leading-relaxed mb-4">
                        {currentQuestion.question}
                    </h2>
                </div>

                {!showAnswer ? (
                    <div className="space-y-4">
                        <p className="text-muted-foreground text-center mb-6">
                            Think about your answer, then reveal it to check
                        </p>
                        <Button
                            onClick={() => setShowAnswer(true)}
                            className="w-full cursor-pointer rounded-full"
                            size="lg"
                        >
                            Show Answer
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-muted rounded-lg p-6">
                            <h3 className="text-sm font-semibold text-foreground mb-3">
                                Answer:
                            </h3>
                            <div className="prose prose-sm max-w-none">
                                {currentQuestion.answer
                                    .split("\n")
                                    .map((line, idx) => (
                                        <p
                                            key={idx}
                                            className="text-foreground mb-2 leading-relaxed"
                                        >
                                            {line}
                                        </p>
                                    ))}
                            </div>
                            {currentQuestion.example && (
                                <div className="mt-4">
                                    <h4 className="text-sm font-semibold text-foreground mb-2">
                                        Example:
                                    </h4>
                                    <CodeHighlight
                                        code={currentQuestion.example}
                                        language="javascript"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="pt-4 border-t border-border">
                            <p className="text-center text-sm text-muted-foreground mb-4">
                                Did you answer correctly?
                            </p>
                            <div className="flex gap-4">
                                <Button
                                    onClick={() => handleAnswer(false)}
                                    variant="outline"
                                    className="flex-1 gap-2 border-destructive/50 hover:bg-destructive/10"
                                    size="lg"
                                >
                                    <X size={20} strokeWidth={3} />
                                    No, I got it wrong
                                </Button>
                                <Button
                                    onClick={() => handleAnswer(true)}
                                    className="flex-1 gap-2 bg-accent hover:bg-accent/90"
                                    size="lg"
                                >
                                    <Check size={20} strokeWidth={3} />
                                    Yes, I got it right
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Card>

            <div className="mt-6 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-sm">
                    <CheckCircle
                        size={20}
                        className="text-accent fill-accent"
                    />
                    <span className="font-medium">{correctCount}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <XCircle
                        size={20}
                        className="text-destructive fill-destructive"
                    />
                    <span className="font-medium">{incorrectCount}</span>
                </div>
            </div>
        </div>
    );
}
