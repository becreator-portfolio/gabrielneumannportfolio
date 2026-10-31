/** Reaplicado a cada navegação: dá uma entrada suave a cada página. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page">{children}</div>;
}
