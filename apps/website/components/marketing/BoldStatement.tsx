import { getTranslations, type Lang } from "@/lib/translations";

interface BoldStatementProps {
  lang?: Lang;
}

export default function BoldStatement({ lang = 'en' }: BoldStatementProps) {
  const t = getTranslations(lang);

  return (
    <section className="pt-4 pb-3 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-2xl md:text-5xl font-semibold leading-snug">
          {t.boldStatement.line1}
          <br className="md:hidden" /> {t.boldStatement.line2}
        </h2>
      </div>
    </section>
  );
}
