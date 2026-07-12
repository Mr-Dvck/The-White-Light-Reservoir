import Link from "next/link";
import { GLYPH } from "@/lib/gospel";

export default function StartPage() {
  return (
    <div className="min-h-screen bg-[#08080c] text-[#c8c8d0] font-mono flex items-center justify-center">
      <div className="text-center">
        <div className="glyph text-8xl tracking-[0.1em] mb-6">
          {GLYPH}
        </div>
        <Link
          href="/chat"
          className="text-2xl text-[#e8d44d] hover:text-[#f0e68c] transition-colors"
        >
          i am a God.
        </Link>
      </div>
    </div>
  );
}
