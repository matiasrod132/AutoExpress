import React, { useState } from 'react';
import { ScrollReveal } from '../ScrollReveal';

interface Question {
  question: string;
  question_en: string;
  answer: string;
  answer_en: string;
}

const FAQ: React.FC = () => {
  const { ref } = ScrollReveal<HTMLDivElement>('translateX(-800px)');
  
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const questions: Question[] = [
    {
      question: "¿Cuál es el horario de atención?",
      question_en: "What are the hours of operation?",
      answer: "Nuestro horario de atención es de lunes a viernes de 8:00 a.m a 5:30 p.m, sábado de 9:00 a.m a 12:30 p.m.",
      answer_en: "Our hours of operation are Monday to Friday from 8:00 a.m. to 5:30 p.m., and Saturday from 9:00 a.m. to 12:30 p.m.",
    },
    {
      question: "¿Cuánto tiempo tardan en reparar mi vehículo?",
      question_en: "How long does it take to repair my vehicle?",
      answer: "El tiempo de reparación depende del tipo de servicio y la complejidad del problema. Normalmente, los trabajos sencillos como cambios de aceite o alineación de ruedas se realizan en el mismo día. Para reparaciones más complicadas, te mantendremos informado sobre el progreso y el tiempo estimado de entrega.",
      answer_en: "The repair time depends on the type of service and the complexity of the problem. Typically, simple tasks like oil changes or wheel alignments are completed on the same day. For more complex repairs, we will keep you informed about the progress and estimated completion time.",
    },
    {
      question: "¿Ofrecen servicios a domicilio?",
      question_en: "Do you offer home service?",
      answer: "Sí, ofrecemos servicios a domicilio llamado Autoexpress para cualquiera de nuestros servicios puede contactar con el servicio Autoexpress.",
      answer_en: "Yes, we offer a home service called Autoexpress. For any of our services, you can contact the Autoexpress service.",
    },
    {
      question: "¿Cuáles son los métodos de pago aceptados?",
      question_en: "What payment methods are accepted?",
      answer: "Aceptamos pagos con tarjeta de crédito, débito, efectivo y transferencias bancarias.",
      answer_en: "We accept payments by credit card, debit card, cash, and bank transfers.",
    }
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="preguntas-frecuentes">
      <div ref={ref}>
        <h2 className="titulo translatable" data-es="PREGUNTAS FRECUENTES" data-en="FREQUENT QUESTIONS">PREGUNTAS FRECUENTES</h2>
        <div className="header-titulo"></div>
        <div className="faq">
          {questions.map((item, index) => (
            <div className="caja" key={index}>
              <div className="pregunta-wrapper" onClick={() => toggleQuestion(index)}>
                <div className="pregunta translatable" data-es={item.question} data-en={item.question_en}>{item.question}</div>
                <span className={`flecha ${openIndex === index ? 'open' : ''}`}></span>
              </div>
              <div className={`respuesta-wrapper ${openIndex === index ? 'open' : ''}`}>
                <div className="respuesta translatable" data-es={item.answer} data-en={item.answer_en}>{item.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
