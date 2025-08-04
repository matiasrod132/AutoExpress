import React, { useState, useEffect, useRef } from 'react';
import { ScrollReveal } from '../ScrollReveal';

interface Testimonial {
  id: number;
  text: string;
  name: string;
  text_en: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    text: "Valoro la transparencia en la comunicación y el orden con el que trabajan. Todo quedo tal y como lo encontraron",
    name: "Claudia Mora",
    text_en: "I value transparency in communication and the order in which they work. Everything was left just as they found it.",
  },
  {
    id: 2,
    text: "Solucionaron mi problema en el mismo día. Muy satisfecha con el servicio.",
    name: "Ana Gomez",
    text_en: "They solved my problem on the same day. Very satisfied with the service."
  },
  {
    id: 3,
    text: "Profesionales y confiables. El mejor taller al que he ido.",
    name: "Carlos Rodriguez",
    text_en: "Professional and reliable. The best workshop I’ve been to."
  },
];

const Testimonials: React.FC = () => {
  const { ref } = ScrollReveal<HTMLDivElement>(
    'translateX(80%)',
    'translateX(50%)'
  );

  const [currentSlide, setCurrentSlide] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [deltaX, setDeltaX] = useState(0);
  const carouselSlideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(showNextSlide, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const showNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % testimonialsData.length);
  };

  const showPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + testimonialsData.length) % testimonialsData.length
    );
  };

  const startDragging = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const whileDragging = (e: React.MouseEvent) => {
    if (isDragging) {
      setDeltaX(e.clientX - startX);
    }
  };

  const endDragging = () => {
    if (deltaX > 50) {
      showPrevSlide();
    } else if (deltaX < -50) {
      showNextSlide();
    }
    setIsDragging(false);
    setDeltaX(0);
  };

  return (
    <section id="testimonios">
      <div ref={ref} style={{ overflow: "hidden" }}>
        <h2 className="titulo translatable" data-es="TESTIMONIOS" data-en="TESTIMONIALS">TESTIMONIOS</h2>
        <div className="header-titulo"></div>
        <div className="carrusel" onMouseDown={startDragging} onMouseMove={whileDragging} onMouseUp={endDragging}>
          <div
            className="carrusel-slide"
            ref={carouselSlideRef}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonialsData.map((testimonial, index) => (
              <div className="testimonios" key={index}>
                <svg
                  className="svg-testimonio"
                  xmlns="http://www.w3.org/2000/svg"
                  width="75px"
                  height="75px"
                  viewBox="0 0 48 48"
                  style={{ fill: "#fff" }}
                >
                  <path d="M18.686,6.513H0.001v16.35h10.628c-0.098,10.181-9.584,12.104-9.584,12.104s-0.05,0.341,0,6.521   c15.815-3.034,17.499-14.931,17.636-18.625h0.004v-0.102c0.021-0.632,0-1.028,0-1.028V6.513z" />
                  <path d="M47.99,21.732V6.513H29.306v16.35h10.629c-0.098,10.181-9.584,12.104-9.584,12.104s-0.05,0.341,0,6.521   c15.815-3.034,17.499-14.931,17.636-18.625h0.004v-0.102C48.011,22.129,47.99,21.732,47.99,21.732z" />
                </svg>
                <p className="texto-testimonio translatable" data-es={testimonial.text} data-en={testimonial.text_en}>{testimonial.text}</p>
                <h2 className="header-titulo"></h2>
                <p className="nombre-testimonio">{testimonial.name}</p>
              </div>
            ))}
          </div>
          <span className="prev" onClick={showPrevSlide}>&lt;</span>
          <span className="next" onClick={showNextSlide}>&gt;</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
