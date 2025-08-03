import React, { useState, useEffect, useCallback } from 'react';

type Slide = {
  src: string;
  alt: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
};

const slides: Slide[] = [
  {
    src: './imagenes/generales/carrusel1.webp',
    alt: 'slide1',
    title: 'MANTENIMIENTO PREVENTIVO',
    description: 'Mantén tu vehiculo en óptimas condiciones con nuestro servicio de mantenimiento preventivo. Realizamos revisiones exhaustivas para detectar problemas antes de que se conviertan en costosas reparaciones.',
    title_en: 'PREVENTIVE MAINTENANCE',
    description_en: 'Keep your vehicle in top condition with our preventive maintenance service. We conduct thorough inspections to detect issues before they become costly repairs.',
  },
  {
    src: './imagenes/generales/video1.mp4',
    alt: 'slide2',
    title: 'SERVICIO AUTOEXPRESS',
    description: 'Resolvemos tus problemas automotrices sin que salgas de casa. Con nuestro servicio puerta a puerta gratuito, su vehículo recibe la atención adecuada mientras usted atiende sus prioridades. ¡Ahorra tiempo y disfruta de la comodidad!',
    title_en: 'AUTOEXPRESS SERVICE',
    description_en: 'We solve your automotive problems without you leaving home. With our free door-to-door service, your vehicle receives the proper care while you attend to your priorities. Save time and enjoy convenience!',
  },
  {
    src: './imagenes/generales/carrusel3.webp',
    alt: 'slide3',
    title: 'REPARACIONES ESPECIALIZADAS',
    description: 'Nuestro equipo cuenta con la experiencia y herramientas necesarias para realizar reparaciones de alta calidad en motores, transmisiones y más. ¡Devuélvele la vida a tu vehículo con nosotros!',
    title_en: 'SPECIALIZED REPAIRS',
    description_en: 'Our team has the experience and tools needed to perform high-quality repairs on engines, transmissions, and more. Give your vehicle new life with us!',
  },
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideCount = slides.length;
  const intervalTime = 5000;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
  }, [slideCount]);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slideCount - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, intervalTime);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div id="slide">
      <ul style={{ transform: `translateX(-${currentIndex * 25}%)`, transition: '0.7s ease-in-out' }}>
        {slides.map((slide, index) => (
          <li key={index}>
            {slide.src.endsWith('.mp4') ? (
              <video
                src={slide.src}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            ) : (
              <img
                src={slide.src}
                alt={slide.alt}
                draggable="false"
                loading="lazy"
              />
            )}
            <div className="texto-slide-container">
              <div className="texto-slide">
                <h1 className="titulo-h1 translatable" data-es={slide.title} data-en={slide.title_en}>{slide.title}</h1>
                <h3 className="descripcion-h3 translatable" data-es={slide.description} data-en={slide.description_en}>{slide.description}</h3>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <ol id="paginacion">
        {slides.map((_, index) => (
          <li
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{ opacity: currentIndex === index ? 1 : 0.5 }}
          >
            <span className="circle"></span>
          </li>
        ))}
      </ol>

      <div>
        <span className="flechas" id="retroceder" onClick={prevSlide}>&lt;</span>
        <span className="flechas" id="avanzar" onClick={nextSlide}>&gt;</span>
      </div>
    </div>
  );
};

export default Carousel;
