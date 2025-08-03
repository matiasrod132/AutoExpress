import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [language, setLanguage] = useState<string>('en');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // NUEVO

  const translatePage = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);

    const translatableElements = document.querySelectorAll('.translatable');
    translatableElements.forEach(element => {
      const text = element.getAttribute(`data-${selectedLanguage}`);
      if (text) {
        element.textContent = text;
      }
    });

    const selectedLang = document.querySelector(`.options-container .option[data-lang="${selectedLanguage}"]`);
    const dropbtn = document.querySelector('.select-box');

    if (selectedLang && dropbtn) {
      const imagen = selectedLang.querySelector('img')?.src;
      const texti = selectedLang.querySelector('span')?.textContent;
      if (imagen && texti) {
        (dropbtn.querySelector('img') as HTMLImageElement).src = imagen;
        (dropbtn.querySelector('span') as HTMLElement).textContent = texti;
      }

      localStorage.setItem('selectedLanguage', selectedLanguage);
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('selectedLanguage');
    const userLang = navigator.language;
    const defaultLang = savedLang || (userLang.startsWith('en') ? 'en' : (userLang.startsWith('fr') ? 'fr' : 'es'));
    translatePage(defaultLang);

    const handleClickOutside = (event: MouseEvent) => {
      const optionsContainer = document.querySelector('.options-container');
      const selectBox = document.querySelector('.select-box');
      if (optionsContainer && selectBox && !optionsContainer.contains(event.target as Node) && !selectBox.contains(event.target as Node)) {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedLanguage = (e.currentTarget as HTMLElement).getAttribute('data-lang');
    if (selectedLanguage) {
      translatePage(selectedLanguage);
      setIsLanguageMenuOpen(false);
    }
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(prev => !prev);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header>
      <div className="contenedor">
        <div className="logo">
          <img src="./imagenes/generales/logo.webp" alt="Logo" width="100" height="103" />
          <p>Auto Express</p>
        </div>
        <nav>
          {/* Enlaces en modo escritorio */}
          <ul className="nav-links desktop-only">
            <li><a href="#inicio" className="translatable" data-es="Inicio" data-en="Home">Inicio</a></li>
            <li><a href="#servicios" className="translatable" data-es="Servicios" data-en="Services">Servicios</a></li>
            <li><a href="#contacto" className="translatable" data-es="Contacto" data-en="Contact">Contacto</a></li>
          </ul>

          {/* Selector de idioma */}
          <div className="selector-lenguage">
            <div className="select-box" onClick={toggleLanguageMenu}>
              <img src={`./imagenes/banderas/${language}.png`} alt={language} />
              <span>{language === 'en' ? 'English' : 'Español'}</span>
              <div className={`arrow-down ${isLanguageMenuOpen ? 'rotate' : ''}`}></div>
            </div>
            {isLanguageMenuOpen && (
              <div className="options-container">
                <div className="option" data-lang="en" onClick={handleLanguageChange}>
                  <img src="./imagenes/banderas/en.png" alt="English" />
                  <span>English</span>
                </div>
                <div className="option" data-lang="es" onClick={handleLanguageChange}>
                  <img src="./imagenes/banderas/es.png" alt="Spanish" />
                  <span>Español</span>
                </div>
              </div>
            )}
          </div>

          {/* Menú hamburguesa */}
          <div className="menu-toggle" onClick={toggleMobileMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          {/* Menú móvil desplegable */}
          {isMobileMenuOpen && (
            <ul className={`nav-links mobile-only ${isMobileMenuOpen ? 'active' : ''}`}>
              <li><a href="#inicio" onClick={closeMobileMenu}>Inicio</a></li>
              <li><a href="#servicios" onClick={closeMobileMenu}>Servicios</a></li>
              <li><a href="#contacto" onClick={closeMobileMenu}>Contacto</a></li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
