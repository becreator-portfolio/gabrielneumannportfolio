import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notfound">
      <p className="label">Erro 404</p>
      <h1 className="phead__title">Página não encontrada</h1>
      <Link href="/" className="cta">
        <span>Voltar para o início</span>
        <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
