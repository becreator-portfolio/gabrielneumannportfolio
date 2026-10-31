type Props = {
  text: string;
  /** "word": cada palavra sobe dentro de uma máscara. "char": letra a letra. */
  by?: "word" | "char";
  /** Atraso inicial, em passos da escala de stagger. */
  offset?: number;
  className?: string;
};

/**
 * Divide um texto em palavras (ou letras) mascaradas para animação.
 * O texto completo fica disponível para leitores de tela; os fragmentos não.
 */
export function Split({ text, by = "word", offset = 0, className }: Props) {
  const words = text.split(" ");
  let i = offset;
  return (
    <span className={["split", className].filter(Boolean).join(" ")}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, wi) => (
          <span key={wi}>
            <span className="split__w">
              {by === "char" ? (
                [...w].map((c, ci) => (
                  <span key={ci} className="split__i" style={{ "--i": i++ } as React.CSSProperties}>
                    {c}
                  </span>
                ))
              ) : (
                <span className="split__i" style={{ "--i": i++ } as React.CSSProperties}>
                  {w}
                </span>
              )}
            </span>
            {wi < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </span>
  );
}
