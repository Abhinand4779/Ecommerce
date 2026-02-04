export const dynamic = 'force-dynamic';

import React, { Suspense } from 'react';
import CheckoutSuccessClient from './CheckoutSuccessClient';

export default function CheckoutSuccess() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutSuccessClient />
    </Suspense>
  );
}
