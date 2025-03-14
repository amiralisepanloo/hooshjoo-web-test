// src/components/Page.js (NEW FILE)
import React from 'react';

function Page({ children }) {
  return (
    <div className="page-content">
      {children}
    </div>
  );
}
export default Page;