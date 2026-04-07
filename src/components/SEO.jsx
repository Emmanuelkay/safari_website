import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SEO = ({ title, description, url, isArticle = false, type = "website", schemaData = null }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content="https://savannabeyond.co.ke/og-image.jpg" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://savannabeyond.co.ke/og-image.jpg" />

      {/* Canonical and Hreflang */}
      <link rel="canonical" href={url} />
      <link rel="alternate" hreflang="en" href={`${url}?lang=en`} />
      <link rel="alternate" hreflang="de" href={`${url}?lang=de`} />
      <link rel="alternate" hreflang="es" href={`${url}?lang=es`} />
      <link rel="alternate" hreflang="fr" href={`${url}?lang=fr`} />
      <link rel="alternate" hreflang="zh" href={`${url}?lang=zh`} />
      <link rel="alternate" hreflang="x-default" href={url} />

      {/* Schema.org */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};
