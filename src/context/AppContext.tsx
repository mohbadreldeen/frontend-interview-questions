import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { categories, questions } from "../data/questions";

interface AppContextValue {
    categories: string[];
    questions: typeof questions;
    studiedQuestions: string[];
    studiedCount: number;
    totalCount: number;
    isDarkMode: boolean;
    toggleStudied: (id: string) => void;
    resetProgress: () => void;
    toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const applyTheme = (darkMode: boolean) => {
    const html = document.documentElement;
    html.classList.add("theme-switching");

    if (darkMode) {
        html.setAttribute("data-appearance", "dark");
        html.classList.add("dark");
    } else {
        html.removeAttribute("data-appearance");
        html.classList.remove("dark");
    }

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            html.classList.remove("theme-switching");
        });
    });
};

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [studiedQuestions, setStudiedQuestions] = useState<string[]>(() => {
        const stored = localStorage.getItem("studied-questions");
        return stored ? JSON.parse(stored) : [];
    });

    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const stored = localStorage.getItem("dark-mode");
        return stored !== null ? JSON.parse(stored) : true;
    });

    useEffect(() => {
        localStorage.setItem(
            "studied-questions",
            JSON.stringify(studiedQuestions)
        );
    }, [studiedQuestions]);

    useEffect(() => {
        localStorage.setItem("dark-mode", JSON.stringify(isDarkMode));
    }, [isDarkMode]);

    const toggleStudied = (id: string) => {
        setStudiedQuestions((current) => {
            if (current.includes(id)) {
                return current.filter((qid) => qid !== id);
            }
            return [...current, id];
        });
    };

    const resetProgress = () => {
        setStudiedQuestions([]);
    };

    const toggleDarkMode = () => {
        const next = !isDarkMode;
        applyTheme(next);
        setIsDarkMode(next);
    };

    const value = useMemo(
        () => ({
            categories,
            questions,
            studiedQuestions,
            studiedCount: studiedQuestions.length,
            totalCount: questions.length,
            isDarkMode,
            toggleStudied,
            resetProgress,
            toggleDarkMode,
        }),
        [studiedQuestions, isDarkMode]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within AppProvider");
    }
    return context;
}
