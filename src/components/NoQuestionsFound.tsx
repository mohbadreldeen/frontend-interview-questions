import { Card } from "./ui/card";

export function NoQuestionsFound() {
    return (
        <Card className="p-12 text-center">
            <p className="text-muted-foreground">
                No questions found. Try different keywords or category.
            </p>
        </Card>
    );
}
