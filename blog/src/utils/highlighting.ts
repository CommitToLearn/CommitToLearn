// Syntax highlighting utilities
// Migrated and enhanced from script.js highlighting logic

/**
 * Detect if content should be syntax highlighted
 */
export function shouldHighlight(content: string): boolean {
    // Detect common code patterns
    const codePatterns = [
        /\bclass\s+\w+/,           // class declaration
        /\bpublic\s+static\s+void/, // Java main method
        /\bimport\s+[\w.]+/,        // import statements
        /\bfunction\s+\w+/,         // function declaration
        /\bdef\s+\w+/,              // Python function
        /\bpackage\s+\w+/,          // package declaration
        /\bfunc\s+\w+/,             // Go function
        /\breturn\s+\w+/,           // return statement
        /\b(if|for|while)\s*\(/,    // control structures
    ];

    return codePatterns.some(pattern => pattern.test(content));
}

/**
 * Detect Java code
 */
export function isJavaCode(content: string): boolean {
    const javaPatterns = [
        /\bpublic\s+class\s+\w+/,
        /\bpublic\s+static\s+void\s+main/,
        /\bimport\s+java\./,
        /\bSystem\.out\.print/,
        /\bnew\s+\w+\s*\(/,
        /\b(ArrayList|HashMap|String)\s*</,
        /\bpublic\s+\w+\s+\w+\s*\(/,
        /\bprivate\s+\w+\s+\w+/,
        /\b@Override\b/,
        /\bextends\s+\w+/,
        /\bimplements\s+\w+/,
    ];

    return javaPatterns.some(pattern => pattern.test(content));
}

/**
 * Detect Python code
 */
export function isPythonCode(content: string): boolean {
    const pythonPatterns = [
        /\bdef\s+\w+\s*\(/,
        /\bimport\s+\w+/,
        /\bfrom\s+\w+\s+import/,
        /\bclass\s+\w+\s*\(/,
        /\bclass\s+\w+\s*:/,
        /\bif\s+__name__\s*==\s*["']__main__["']:/,
        /\bprint\s*\(/,
        /\bself\./,
        /\brange\s*\(/,
    ];

    return pythonPatterns.some(pattern => pattern.test(content));
}

/**
 * Detect Go code
 */
export function isGoCode(content: string): boolean {
    const goPatterns = [
        /\bpackage\s+\w+/,
        /\bfunc\s+\w+\s*\(/,
        /\bfunc\s+main\s*\(\s*\)/,
        /\bimport\s*\(/,
        /\bvar\s+\w+\s+\w+/,
        /\bfmt\./,
        /\bmake\s*\(/,
        /\btype\s+\w+\s+struct/,
        /\b:=\b/,
        /\bfunc\s*\(/,
    ];

    return goPatterns.some(pattern => pattern.test(content));
}

/**
 * Detect JavaScript/TypeScript code
 */
export function isJavaScriptCode(content: string): boolean {
    const jsPatterns = [
        /\b(const|let|var)\s+\w+/,
        /\bfunction\s+\w+/,
        /\b(async|await)\b/,
        /\bconsole\.(log|error|warn)/,
        /\bexport\s+(default|const|function)/,
        /\bimport\s+.*from/,
        /=>\s*{/,  // Arrow function
        /\b(React|useState|useEffect)\b/,
    ];

    return jsPatterns.some(pattern => pattern.test(content));
}

/**
 * Detect Docker/Dockerfile code
 */
export function isDockerCode(content: string): boolean {
    const dockerPatterns = [
        /^\s*FROM\s+[\w\/\:\.-]+/m,
        /^\s*RUN\s+/m,
        /^\s*COPY\s+/m,
        /^\s*ADD\s+/m,
        /^\s*WORKDIR\s+/m,
        /^\s*EXPOSE\s+\d+/m,
        /^\s*ENV\s+\w+/m,
        /^\s*CMD\s*\[/m,
        /^\s*ENTRYPOINT\s*\[/m,
        /^\s*VOLUME\s+/m,
        /^\s*USER\s+/m,
        /^\s*LABEL\s+/m,
        /^\s*ARG\s+/m,
    ];

    return dockerPatterns.some(pattern => pattern.test(content));
}

/**
 * Detect SQL code
 */
export function isSQLCode(content: string): boolean {
    const sqlPatterns = [
        /\b(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\s+/i,
        /\bFROM\s+\w+/i,
        /\bWHERE\s+/i,
        /\bJOIN\s+/i,
        /\bGROUP\s+BY\b/i,
        /\bORDER\s+BY\b/i,
    ];

    return sqlPatterns.some(pattern => pattern.test(content));
}

/**
 * Auto-detect programming language from content
 */
export function detectLanguage(content: string): string | null {
    if (isDockerCode(content)) return 'dockerfile';
    if (isJavaCode(content)) return 'java';
    if (isPythonCode(content)) return 'python';
    if (isGoCode(content)) return 'go';
    if (isJavaScriptCode(content)) return 'javascript';
    if (isSQLCode(content)) return 'sql';

    return null;
}

/**
 * Get language name for display
 */
export function getLanguageDisplayName(lang: string): string {
    const names: Record<string, string> = {
        'java': 'Java',
        'python': 'Python',
        'go': 'Go',
        'javascript': 'JavaScript',
        'typescript': 'TypeScript',
        'dockerfile': 'Docker',
        'sql': 'SQL',
        'bash': 'Bash',
        'shell': 'Shell',
        'json': 'JSON',
        'yaml': 'YAML',
        'markdown': 'Markdown',
        'html': 'HTML',
        'css': 'CSS',
    };

    return names[lang.toLowerCase()] || lang;
}
