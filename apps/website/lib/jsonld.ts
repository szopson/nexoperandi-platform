const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nexoperandi.cloud";

interface ServiceSchemaOptions {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  priceCurrency?: string;
  minPrice?: string;
}

export function buildServiceSchema({
  name,
  description,
  path,
  serviceType,
  priceCurrency,
  minPrice,
}: ServiceSchemaOptions) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    serviceType: serviceType || name,
    description,
    url: `${SITE_URL}${path}`,
    provider: {
      "@type": "Organization",
      name: "NexOperandi",
      url: SITE_URL,
    },
    areaServed: ["EU", "PL", "UK", "US"],
  };

  if (minPrice && priceCurrency) {
    schema.offers = {
      "@type": "Offer",
      priceCurrency,
      price: minPrice,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency,
        minPrice,
      },
      availability: "https://schema.org/InStock",
    };
  }

  return schema;
}

interface PricingOffer {
  name: string;
  price: string;
  priceCurrency: string;
  description?: string;
}

export function buildOfferCatalogSchema(
  path: string,
  offers: PricingOffer[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "NexOperandi Pricing",
    url: `${SITE_URL}${path}`,
    itemListElement: offers.map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: o.price,
      priceCurrency: o.priceCurrency,
      availability: "https://schema.org/InStock",
      ...(o.description && { description: o.description }),
    })),
  };
}
