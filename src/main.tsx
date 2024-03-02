import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import { store, persistor } from './Core/Redux/store.ts'
import { PersistGate } from 'redux-persist/integration/react'
import { AppContextProvider } from './Core/Context/AppContextProvider.tsx'
import { router } from './Routes/Router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppContextProvider>        
          <div style={{ border: "1px solid purple", margin: "0px" }}>
            <RouterProvider router={router} />
          </div>
        </AppContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
