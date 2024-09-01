import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRCode from './Component/AddRestaurant/QRCodePage.jsx'
import AddRestaurant from './Component/AddRestaurant/AddRestaurant.jsx';
import HomePage from './Component/HomePage.jsx';


const theme = createTheme(); // Customize your theme if needed

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/qrcode" element={<QRCode/>} />
          <Route path="/add-restaurant" element={<AddRestaurant/>} />

        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
