import React from 'react';
import { ScrollReveal } from '../ScrollReveal';

const ContactUs: React.FC = () => {
  const { ref } = ScrollReveal<HTMLDivElement>(
    'translateX(80%)',
    'translateX(50%)'
  );

  return (
    <section id="contactus">
      <div ref={ref} style={{ overflow: "hidden" }}>
        <div className='contactus'>
          <h2 className="translatable" data-es="CONTACTANOS ¡AHORA!" data-en="CONTACT US NOW!">CONTACTANOS ¡AHORA!</h2>
          <a href="#contacto" className="boton translatable" type="button" data-es="CONTACTANOS AQUÍ" data-en="CONTACT US HERE">CONTACTANOS AQUÍ</a>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
