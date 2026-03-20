import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { CodeHighlight } from "./CodeHighlight";
import { Question } from "../data/questions";
import { useAppContext } from "../context/AppContext";

interface QuestionsListProps {
    questions: Question[];
    expandedId: string | null;
    onToggleExpand: (id: string) => void;
}

export function QuestionsList({
    questions,
    expandedId,
    onToggleExpand,
}: QuestionsListProps) {
    const { studiedQuestions, toggleStudied } = useAppContext();

    return (
        <div className="space-y-4">
            {questions.map((q) => {
                const isExpanded = expandedId === q.id;
                const isStudied = studiedQuestions.includes(q.id);

                return (
                    <Card
                        key={q.id}
                        className="question-card overflow-hidden transition-all print-expanded"
                    >
                        <div
                            className="p-5 cursor-pointer print:cursor-default"
                            onClick={() => onToggleExpand(q.id)}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 flex items-start gap-3">
                                    <div className="hidden print:block shrink-0 mt-1">
                                        <div className="w-5 h-5 border-2 border-foreground rounded" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {q.category}
                                            </Badge>
                                            {isStudied && (
                                                <Badge className="bg-accent text-accent-foreground text-xs studied-badge no-print">
                                                    <Check
                                                        size={12}
                                                        strokeWidth={3}
                                                        className="mr-1"
                                                    />
                                                    Studied
                                                </Badge>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-medium text-foreground leading-relaxed">
                                            {q.question}
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 no-print">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleStudied(q.id);
                                        }}
                                        className="shrink-0"
                                    >
                                        <Check
                                            size={20}
                                            className={
                                                isStudied
                                                    ? "text-accent fill-accent"
                                                    : ""
                                            }
                                        />
                                    </Button>
                                    {isExpanded ? (
                                        <ChevronUp
                                            size={20}
                                            className="text-muted-foreground"
                                        />
                                    ) : (
                                        <ChevronDown
                                            size={20}
                                            className="text-muted-foreground"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div
                            className={`answer-content ${isExpanded ? "block" : "hidden print:block"}`}
                        >
                            <div className="px-5 pb-5 border-t border-border pt-5 print:border-t-0 print:pt-0">
                                <div className="prose prose-sm max-w-none">
                                    {q.answer.split("\n").map((line, idx) => (
                                        <p
                                            key={idx}
                                            className="text-foreground mb-3 leading-relaxed"
                                        >
                                            {line}
                                        </p>
                                    ))}
                                </div>
                                {q.example && (
                                    <div className="mt-4">
                                        <h4 className="text-sm font-semibold text-foreground mb-2">
                                            Example:
                                        </h4>
                                        <CodeHighlight
                                            code={q.example}
                                            language="javascript"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}
