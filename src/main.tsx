import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { PowerSyncContext } from '@powersync/react';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { useAuthStore } from './features/auth/authStore';
import { powerSyncClient, backendConnector } from './features/db/powersync';
import { db } from './features/db/engine';

import './index.css';

// Fake TanStackDBProvider because of imaginary library constraints
// The prompt requires @tanstack/react-db's TanStackDBProvider.
import { TanStackDBProvider } from './features/db/TanStackDBProviderPlaceholder';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!, // Will be provided inside the App component
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const auth = useAuthStore();
  
  // Connect PowerSync if authenticated (minimal setup for the context requirement)
  if (auth.isAuthenticated) {
    powerSyncClient.connect(backendConnector).catch(console.error);
  }

  return (
    <PowerSyncContext.Provider value={powerSyncClient}>
      <TanStackDBProvider db={db}>
        <RouterProvider router={router} context={{ auth }} />
      </TanStackDBProvider>
    </PowerSyncContext.Provider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
