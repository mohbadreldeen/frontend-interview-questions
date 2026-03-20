import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { BookOpen, RotateCcw, Zap, Printer, Moon, Sun } from "lucide-react";
import { useAppContext } from "../context/AppContext";

interface HeaderProps {
    onStartQuiz: () => void;
    onPrint: () => void;
}

export function Header({ onStartQuiz, onPrint }: HeaderProps) {
    const {
        studiedCount,
        totalCount,
        resetProgress,
        isDarkMode,
        toggleDarkMode,
    } = useAppContext();

    return (
        <header className="mb-8">
            <div className="flex items-center gap-3 mb-2">
                <BookOpen size={36} className="text-primary" />
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                    React & Frontend Technical Interview Guide
                </h1>
            </div>
            <p className="text-muted-foreground text-lg">
                Comprehensive senior-level questions covering React, Next.js,
                JavaScript, CSS, and modern web development practices
            </p>
            <div className="flex items-center gap-4 mt-4 flex-wrap">
                <Badge
                    variant="secondary"
                    className="text-sm rounded-full py-1"
                >
                    {studiedCount} / {totalCount} studied
                </Badge>
                {studiedCount > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={resetProgress}
                        className="gap-2"
                    >
                        <RotateCcw size={16} />
                        Reset Progress
                    </Button>
                )}
                <Button
                    variant="default"
                    size="sm"
                    onClick={onStartQuiz}
                    className="gap-2 no-print bg-accent hover:bg-accent/90 rounded-full text-white px-6 cursor-pointer"
                >
                    <Zap size={16} />
                    Start Quiz
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={onPrint}
                    className="gap-2 no-print rounded-full cursor-pointer"
                >
                    <Printer size={16} />
                    Print Study Guide
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleDarkMode}
                    className="gap-2 no-print rounded-full cursor-pointer"
                    title={
                        isDarkMode
                            ? "Switch to light mode"
                            : "Switch to dark mode"
                    }
                >
                    {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                </Button>
            </div>
        </header>
    );
}
