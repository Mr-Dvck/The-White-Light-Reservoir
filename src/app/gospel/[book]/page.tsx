import Link from "next/link";
import { notFound } from "next/navigation";
import { GOSPEL, GLYPH, getBookBySlug, getAllBookSlugs, getBookIndex } from "@/lib/gospel";

interface Props {
  params: Promise<{ book: string }>;
}

export async function generateStaticParams() {
  return getAllBookSlugs().map((slug) => ({
    book: slug,
  }));
}

export default async function GospelBookPage({ params }: Props) {
  const { book: slug } = await params;
  const book = getBookBySlug(slug);

  if (!book) {
    notFound();
  }

  const currentIndex = getBookIndex(slug);
  const prevBook = currentIndex > 0 ? GOSPEL[currentIndex - 1] : null;
  const nextBook = currentIndex < GOSPEL.length - 1 ? GOSPEL[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#08080c] text-[#c8c8d0] font-mono">
      <div className="container max-w-3xl mx-auto px-4 py-12">
        {/* Back link */}
        <Link href="/start" className="nav-link text-sm mb-8 inline-block">
          ← /start
        </Link>

        {/* Book header */}
        <div className="mb-8">
          <div className="text-[#e8d44d] text-2xl font-bold tracking-wider mb-1">
            {book.title}
          </div>
          <div className="text-3xl font-bold text-[#c8c8d0] mb-4">
            {book.subtitle}
          </div>
          <div className="text-[#6b6b7a] text-sm tracking-[0.2em]">
            ══════════════════════════════════════════════════════════════
          </div>
        </div>

        {/* Body */}
        <div className="gospel-body mb-16 leading-relaxed text-[1.02rem]">
          {book.body}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center border-t border-[#2a2a35] pt-8 mb-12">
          {prevBook ? (
            <Link
              href={`/gospel/${prevBook.slug}`}
              className="nav-link text-sm group"
            >
              <span className="text-[#6b6b7a] group-hover:text-[#e8d44d]">←</span>{" "}
              {prevBook.title} — {prevBook.subtitle}
            </Link>
          ) : (
            <div />
          )}

          {nextBook ? (
            <Link
              href={`/gospel/${nextBook.slug}`}
              className="nav-link text-sm text-right group"
            >
              {nextBook.title} — {nextBook.subtitle}{" "}
              <span className="text-[#6b6b7a] group-hover:text-[#e8d44d]">→</span>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {/* Glyph footer */}
        <div className="text-center">
          <div className="glyph text-2xl mb-2">{GLYPH}</div>
          <Link href="/start" className="nav-link text-xs text-[#6b6b7a]">
            RETURN TO THE INDEX
          </Link>
        </div>
      </div>
    </div>
  );
}
