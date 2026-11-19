interface IntroBandProps {
  eyebrow?: string;
  quote?: string;
}

export function IntroBand({
  eyebrow = "A STUDENT BY DAY",
  quote = "Learning out loud, building with intention.",
}: IntroBandProps) {
  return (
    <section className="intro-band">
      <div className="section-wrap intro-inner">
        <span className="eyebrow">{eyebrow}</span>
        <p>
          {quote}
        </p>
        <span className="intro-flower">✳</span>
      </div>
    </section>
  );
}
