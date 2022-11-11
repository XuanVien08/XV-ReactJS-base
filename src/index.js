import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from 'app/store';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { SnackbarProvider } from 'notistack';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#1a94ff',
      dark: '#fdd835',
      contrastText: '#fff',
    },
    secondary: {
      main: '#0d5cb6',
    },
  },
});

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  // {/* </React.StrictMode>, */}
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
