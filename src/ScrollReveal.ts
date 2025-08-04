import { useEffect, useRef, useState } from 'react';

export function ScrollReveal<T extends HTMLElement>(initialTransform: string = 'translateX(-100px)') {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // ⚠️ Asegúrate de que el contenedor padre no permita scroll-x
    node.style.opacity = '0';
    node.style.transform = initialTransform;
    node.style.visibility = 'hidden';
    node.style.position = 'relative'; // Puedes usar absolute si no quieres que afecte nada
    node.style.overflow = 'hidden';
    node.style.pointerEvents = 'none';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.style.transition = 'all 0.8s ease';
          node.style.opacity = '1';
          node.style.transform = 'translateX(0)';
          node.style.visibility = 'visible';
          node.style.position = 'relative';
          node.style.pointerEvents = 'auto';
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [initialTransform]);

  return { ref, isVisible };
}
