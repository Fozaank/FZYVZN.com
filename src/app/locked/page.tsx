import { Suspense } from "react";
import LockedPageContent from "./LockedPageContent"; // We will create this below

// This is the main export for the page. It's now a Server Component
// that sets up the Suspense boundary.
export default function LockedPage() {
  return (
    // The Suspense boundary is required by Next.js when a child component
    // uses hooks like useSearchParams.
    <Suspense>
      <LockedPageContent />
    </Suspense>
  );
}
