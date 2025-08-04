import React from 'react';
import { ScrollReveal } from '../ScrollReveal';
import emailjs from '@emailjs/browser';

const Contacto: React.FC = () => {
  const { ref: refDerecha } = ScrollReveal<HTMLDivElement>('translateX(100%)');
  const { ref: refIzquierda } = ScrollReveal<HTMLDivElement>('translateX(-100%)');

  const sendMail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nombre = formData.get('nombre') as string;
    const email = formData.get('email') as string;
    const numero = formData.get('numero') as string;
    const mensaje = formData.get('mensaje') as string;

    const mensajeFinal = `Numero de telefono: ${numero}\nMensaje: ${mensaje}`;

    emailjs.send('service_v5h1vqc', 'template_uh9uuid', {
        name: nombre,
        email: email,
        message: mensajeFinal,
    }, 'iWs_kueFa7_z5S6mG')      
    .then(
      (result) => {
        console.log('Email enviado:', result.text);
      },
      (error) => {
        console.log('Error al enviar el email:', error.text);
      }
    );
  };

  return (
    <section id="contacto">
      <div className="caja">
        <div ref={refIzquierda} style={{ overflow: "hidden" }} className="informacion">
          <div className="info-header">
            <h2 className="titulo translatable" data-es="CONTACTANOS" data-en="CONTACT US">CONTACTANOS</h2>
            <div className="header-titulo"></div>
            <p className="desc-contacto translatable" data-es="Si tienes alguna consulta o necesitas nuestros servicios, no dudes en ponerte en contacto con nosotros." data-en="If you have any questions or need our services, feel free to contact us.">Si tienes alguna consulta o necesitas nuestros servicios, no dudes en ponerte en contacto con nosotros.</p>
          </div>
          <div className="info">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 5.5C21 14.0604 14.0604 21 5.5 21C5.11378 21 4.73086 20.9859 4.35172 20.9581C3.91662 20.9262 3.69906 20.9103 3.50103 20.7963C3.33701 20.7019 3.18146 20.5345 3.09925 20.364C3 20.1582 3 19.9181 3 19.438V16.6207C3 16.2169 3 16.015 3.06645 15.842C3.12515 15.6891 3.22049 15.553 3.3441 15.4456C3.48403 15.324 3.67376 15.255 4.05321 15.117L7.26005 13.9509C7.70153 13.7904 7.92227 13.7101 8.1317 13.7237C8.31637 13.7357 8.49408 13.7988 8.64506 13.9058C8.81628 14.0271 8.93713 14.2285 9.17882 14.6314L10 16C12.6499 14.7999 14.7981 12.6489 16 10L14.6314 9.17882C14.2285 8.93713 14.0271 8.81628 13.9058 8.64506C13.7988 8.49408 13.7357 8.31637 13.7237 8.1317C13.7101 7.92227 13.7904 7.70153 13.9509 7.26005L13.9509 7.26005L15.117 4.05321C15.255 3.67376 15.324 3.48403 15.4456 3.3441C15.553 3.22049 15.6891 3.12515 15.842 3.06645C16.015 3 16.2169 3 16.6207 3H19.438C19.9181 3 20.1582 3 20.364 3.09925C20.5345 3.18146 20.7019 3.33701 20.7963 3.50103C20.9103 3.69907 20.9262 3.91662 20.9581 4.35173C20.9859 4.73086 21 5.11378 21 5.5Z"/></svg>
            <p className="copy-text">+593 99 760 5743</p>
          </div>
          <div className="info">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4 18L9 12M20 18L15 12M3 8L10.225 12.8166C10.8665 13.2443 11.1872 13.4582 11.5339 13.5412C11.8403 13.6147 12.1597 13.6147 12.4661 13.5412C12.8128 13.4582 13.1335 13.2443 13.775 12.8166L21 8M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z"/></svg>
            <p className="copy-text">1800inyectores@gmail.com</p>
          </div>
          <div className="info">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 32"><path d="M16.114-0.011c-6.559 0-12.114 5.587-12.114 12.204 0 6.93 6.439 14.017 10.77 18.998 0.017 0.020 0.717 0.797 1.579 0.797h0.076c0.863 0 1.558-0.777 1.575-0.797 4.064-4.672 10-12.377 10-18.998 0-6.618-4.333-12.204-11.886-12.204zM16.515 29.849c-0.035 0.035-0.086 0.074-0.131 0.107-0.046-0.032-0.096-0.072-0.133-0.107l-0.523-0.602c-4.106-4.71-9.729-11.161-9.729-17.055 0-5.532 4.632-10.205 10.114-10.205 6.829 0 9.886 5.125 9.886 10.205 0 4.474-3.192 10.416-9.485 17.657zM16.035 6.044c-3.313 0-6 2.686-6 6s2.687 6 6 6 6-2.687 6-6-2.686-6-6-6zM16.035 16.044c-2.206 0-4.046-1.838-4.046-4.044s1.794-4 4-4c2.207 0 4 1.794 4 4 0.001 2.206-1.747 4.044-3.954 4.044z"/></svg>
            <p className="copy-text">Av. Gral. Ángel Flores Montúfar, Guayaquil</p>
          </div>
        </div>

        <div ref={refDerecha} className="contacto">
          <h2 className="titulo translatable" data-es="CONTACTO" data-en="CONTACT">CONTACTO</h2>
          <form onSubmit={sendMail}>
            <div className="content">
                <input type="email" name="email" id="email" pattern="^[a-zA-Z0-9]+@gmail\.com$" placeholder="" required />
                <label>Email</label>
            </div>
            <div className="content">
                <input type="text" name="nombre" id="nombre" placeholder="" required />
                <label className="translatable" data-es="Nombre" data-en="Name">Nombre</label>
            </div>
            <div className="content">
                <input type="number" name="numero" id="numero" pattern="[0-9]" maxLength={10} placeholder="" required />
                <label className="translatable" data-es="Numero" data-en="Number">Numero</label>
            </div>
            <div className="content">
                <textarea id="mensaje" name="mensaje" cols={30} rows={4}  autoComplete="off" required></textarea>
                <label className="translatable" data-es="Mensaje" data-en="Message">Mensaje</label>
            </div>
            <div className="btn">
              <button type="submit" className="translatable" data-es="Enviar" data-en="Send">Enviar</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacto;
