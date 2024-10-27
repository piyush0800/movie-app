import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';  // Import Provider to wrap the app with Redux store
import { store } from './redux/store';   // Import the Redux store
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>    {/* Wrap the App component with Provider */}
      <App />
    </Provider>
  </StrictMode>
);
