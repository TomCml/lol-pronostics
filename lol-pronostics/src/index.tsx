import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import { UserProvider } from './context/UserContext';
import './styles/global.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff3f09',
    },
    secondary: {
      main: '#1b1b1b',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: '#1b1b1b',
      paper: '#1b1b1b',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
