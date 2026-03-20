import { Highlight, themes } from "prism-react-renderer";

interface CodeHighlightProps {
    code: string;
    language?: string;
}

export function CodeHighlight({
    code,
    language = "javascript",
}: CodeHighlightProps) {
    return (
        <Highlight theme={themes.vsDark} code={code} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                    className={className}
                    style={{
                        ...style,
                        padding: "20px",
                    }}
                >
                    {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line, key: i })}>
                            {line.map((token, key) => (
                                <span
                                    key={key}
                                    {...getTokenProps({ token, key })}
                                />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
}
