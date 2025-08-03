// PorqueNosotros.tsx
import React from 'react';
import { ScrollReveal } from '../ScrollReveal';

const PorqueNosotros: React.FC = () => {
  const { ref, isVisible } = ScrollReveal<HTMLDivElement>();

  return (
    <section id="porque-nosotros">
      <div ref={ref} className={`scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="card-img"></div>
        <div className="card-content"></div>
        <h2 className="titulo translatable" data-es="¿POR QUÉ NOSOTROS?" data-en="WHY US">¿POR QUÉ NOSOTROS?</h2>
        <h2 className="header-titulo"></h2>
        <p
          className="texto translatable"
          data-es="En Weser, estamos comprometidos a proporcionar un servicio excepcional con más de 26 años de experiencia en el ramo automotriz y por la segunda generación, que se destaca por su calidad y profesionalismo. Aquí hay algunas razones por las que debería elegirnos como su taller mecánico de confianza."
          data-en="At Weser, we are committed to providing exceptional service with over 26 years of experience in the automotive industry and for the second generation, distinguished by our quality and professionalism. Here are some reasons why you should choose us as your trusted auto repair shop."
        >
          En Weser, estamos comprometidos a proporcionar un servicio excepcional con más de 26 años de experiencia en el ramo automotriz y por la segunda generación, que se destaca por su calidad y profesionalismo. Aquí hay algunas razones por las que debería elegirnos como su taller mecánico de confianza.
        </p>
      </div>
    </section>
  );
};

export default PorqueNosotros;