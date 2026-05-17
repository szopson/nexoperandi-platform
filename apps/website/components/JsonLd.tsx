// Server-rendered JSON-LD script tag.
// Content is a controlled JSON object (no user input); `<` is escaped to prevent script termination.
type JsonLdProps = {
  id?: string;
  data: Record<string, unknown> | Record<string, unknown>[];
};

export default function JsonLd({ id, data }: JsonLdProps) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      id={id}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
