// src/components/MetaTags.js
import React from 'react';
import { Helmet } from 'react-helmet';

function MetaTags({ title, description, image, type = "website", url }) {
  const defaultTitle = "هوشجو - یادگیری هوشمند";
  const defaultDescription = "اپلیکیشن هوشجو به شما کمک می‌کند تا درس‌های خود را به روشی هوشمندانه یاد بگیرید.";
  const defaultImage = "/logo512.png"; //  مسیر پیش‌فرض لوگو
  const siteUrl = "https://hooshjoo-test.web.app/"; //  آدرس واقعی سایت

  const fullTitle = title ? `${title} - ${defaultTitle}` : defaultTitle;
  const fullDescription = description || defaultDescription;
  const fullImage = image || defaultImage;
  const fullUrl = url || `${siteUrl}${window.location.pathname}`;


  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="fa_IR" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="description" content={fullDescription} />
    </Helmet>
  );
}

export default MetaTags;