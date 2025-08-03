import React, { useState, useEffect, useRef } from 'react';
import { ScrollReveal } from '../ScrollReveal';

const AppointmentScheduler: React.FC = () => {
  const { ref, isVisible } = ScrollReveal<HTMLDivElement>();

  const [selectedBrand, setSelectedBrand] = useState('audi');
  const [selectedVehicleType, setSelectedVehicleType] = useState('sedan');
  const [carYear, setCarYear] = useState(2024);
  const [model, setModel] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isVehicleTypeOpen, setIsVehicleTypeOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  // Referencias para los selectores personalizados
  const brandRef = useRef<HTMLDivElement>(null);
  const vehicleTypeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Maneja el clic fuera de los menús desplegables
    const handleClickOutside = (event: MouseEvent) => {
      if (
        brandRef.current && !brandRef.current.contains(event.target as Node) &&
        vehicleTypeRef.current && !vehicleTypeRef.current.contains(event.target as Node)
      ) {
        setIsBrandOpen(false);
        setIsVehicleTypeOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const brands = ['Audi', 'BMW', 'Chevrolet', 'Citroen', 'Ford', 'Mazda', 'Hyundai', 'KIA', 'Mercedes', 'Nissan', 'Toyota', 'Volkswagen', 'Jeep', 'Suzuki', 'OTRO'];
  const vehicleTypes = ['Sedan', 'Trailer', 'Camion', 'Camioneta', 'SUV'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones simples
    if (!selectedBrand || !selectedVehicleType || !model || !firstName || !lastName || !email || !phone || !address) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const formData = {
      'tipo-marca': selectedBrand,
      'tipo-vehiculo': selectedVehicleType,
      'Año': carYear,
      'Modelo': model,
      'Nombre': firstName,
      'Apellido': lastName,
      'Email': email,
      'Numero': phone,
      'Direccion': address,
    };

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbwYxJ-MAv78xfls09dRAE5Lwyj9df-sUxUmIpg54vR5qAWeRgWiJ94kVoLQjzjBa615Eg/exec', {
        redirect: "follow",
        method: "POST",
        body: new URLSearchParams(formData as any).toString(),
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        throw new Error(`Error al enviar el formulario: ${response.status} ${errorResponse}`);
      }

      const contentType = response.headers.get('content-type');
      let result;

      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
      } else {
        result = await response.text();
        console.warn("Response was not JSON, received text instead:", result);
      }

      console.log(result);
      setIsSubmitted(true);
      setSubmissionError(''); // Resetea el error
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error("Error:", error);
      setSubmissionError("Hubo un error al enviar el formulario.");
      alert("Hubo un error al enviar el formulario.");
    }
  };

  return (
    <section id="agenda-cita">
      <div ref={ref} className={`scroll-reveal ${isVisible ? 'visible' : ''}`}>
        <div className="cita">
          <h2 className="titulo translatable" data-es="AGENDA TU CITA" data-en="SCHEDULE YOUR APPOINTMENT">AGENDA TU CITA</h2>
          <div className="header-titulo"></div>
          {isSubmitted && <p className="success-message">Formulario enviado correctamente.</p>}
          <form id="form" onSubmit={handleSubmit}>
            <div className="cita-header">
              <h2 className="titulo translatable" data-es="Información del Vehículo" data-en="Vehicle Information">Información del Vehículo</h2>
              <div className="linea"></div>
            </div>

            <div className="selectores">
              <div className="container" id="custom-tipo-marca" ref={brandRef}>
                <label className="translatable" data-es="Tipo de Marca" data-en="Brand Type">Tipo de Marca</label>
                <div className="custom-select" onClick={() => setIsBrandOpen(!isBrandOpen)}>
                  <select
                    id="tipo-marca"
                    name="tipo-marca"
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Evitar que el clic en select cierre el custom select
                    style={{ display: 'none' }} // Ocultar el select original
                  >
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                  <div className={`select-box ${isBrandOpen ? 'open' : ''}`}>
                    <img id="selected-img-tipo-marca" src={`./imagenes/marcas/${selectedBrand.toLowerCase()}.png`} alt="Seleccionado" />
                    <span id="selected-text-tipo-marca">{selectedBrand}</span>
                    <div className={`arrow-down ${isBrandOpen ? 'rotated' : ''}`}></div>
                  </div>
                  {isBrandOpen && (
                    <div className="options-container">
                      {brands.map((brand) => (
                        <div className="option"
                          key={brand} 
                          onClick={() => {
                            setSelectedBrand(brand);
                            setIsBrandOpen(false);
                          }}
                        >
                          <img src={`./imagenes/marcas/${brand.toLowerCase()}.png`} alt={brand} />
                          <span>{brand}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="container" id="custom-tipo-vehiculo" ref={vehicleTypeRef}>
                <label className="translatable" data-es="Tipo de Vehículo" data-en="Vehicle Type">Tipo de Vehículo</label>
                <div className="custom-select" onClick={() => setIsVehicleTypeOpen(!isVehicleTypeOpen)}>
                <select
                    id="tipo-vehiculo"
                    name="tipo-vehiculo"
                    value={selectedVehicleType}
                    onChange={(e) => setSelectedVehicleType(e.target.value)}
                    onClick={(e) => e.stopPropagation()} // Evitar que el clic en select cierre el custom select
                    style={{ display: 'none' }} // Ocultar el select original
                  >
                    {vehicleTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <div className={`select-box ${isVehicleTypeOpen ? 'open' : ''}`}>
                    <img id="selected-img-tipo-vehiculo" src={`./imagenes/vehiculos/${selectedVehicleType.toLowerCase()}.png`} alt="Seleccionado" />
                    <span id="selected-text-tipo-vehiculo">{selectedVehicleType}</span>
                    <div className={`arrow-down ${isVehicleTypeOpen ? 'rotated' : ''}`}></div>
                  </div>
                  {isVehicleTypeOpen && (
                    <div className="options-container">
                      {vehicleTypes.map((type) => (
                        <div className="option"
                          key={type} 
                          onClick={() => {
                            setSelectedVehicleType(type);
                            setIsVehicleTypeOpen(false);
                          }}
                        >
                          <img src={`./imagenes/vehiculos/${type.toLowerCase()}.png`} alt={type} />
                          <span>{type}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="range-model-container">
              <div className="container">
                <label>Año del Carro</label>
                <input
                  type="range"
                  id="Año"
                  name="Año"
                  min="1980"
                  max="2024"
                  value={carYear}
                  onChange={(e) => setCarYear(parseFloat(e.target.value))}
                />
                <span>{carYear}</span>
              </div>
              <div className="container">
                <label htmlFor="modelo">Modelo de Vehículo</label>
                <input
                  type="text"
                  id="modelo"
                  name="Modelo"
                  placeholder="Ingresa el modelo del vehículo"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
            </div>

            <div className="cita-header">
              <h2 className="titulo translatable" data-es="Información Personal" data-en="Personal Information">Información Personal</h2>
              <div className="linea"></div>
            </div>

            <div className="personal-info-container">
              <input
                type="text"
                id="nombre"
                name="Nombre"
                placeholder="Ingrese su nombre"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                id="apellido"
                name="Apellido"
                placeholder="Ingrese su apellido"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="email"
                id="email"
                name="Email"
                placeholder="Ingrese su email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="number"
                id="numero"
                name="Numero"
                placeholder="Ingrese su número"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                id="direccion"
                name="Direccion"
                placeholder="Ingrese su dirección"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button className="boton translatable" type="submit" data-es="Enviar" data-en="Send">Enviar</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AppointmentScheduler;
