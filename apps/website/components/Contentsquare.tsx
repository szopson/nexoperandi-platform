import Script from "next/script";

interface ContentsquareProps {
  csId: string;
}

export default function Contentsquare({ csId }: ContentsquareProps) {
  return (
    <Script
      src={`https://t.contentsquare.net/uxa/${csId}.js`}
      strategy="afterInteractive"
    />
  );
}
