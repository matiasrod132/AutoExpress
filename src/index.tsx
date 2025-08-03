import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Slide from './components/Slide';
import ContactUs from './components/ContactUs';
import Servicios from './components/Servicios';
import Testimonios from './components/Testimonios';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PreguntasFrecuentes from './components/PreguntasFrecuentes';
import PorqueNosotros from './components/PorqueNosotros';
import Contacto from './components/Contacto';
import AgendaCita from './components/AgendarCita';
import Footer from './components/Footer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Header />
      <Slide />
      <ContactUs />
      <PorqueNosotros />
      <Servicios />
      <Testimonios />
      <PreguntasFrecuentes />
      <Contacto />
      <AgendaCita />
      <Footer />
  </React.StrictMode>
);

reportWebVitals();