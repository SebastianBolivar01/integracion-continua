import { useLocation } from 'react-router-dom';
import { Bot } from 'lucide-react';

const messages: { [key: string]: string } = {
  '/': '¡Hola! ¡Bienvenido! Elige una actividad para empezar a explorar.',
  '/paint': '¡Usa tu creatividad! Dibuja y colorea lo que imagines.',
  '/globe': 'Explora nuestro planeta. ¿Qué lugar te gustaría visitar?',
  '/solarsystem': '¡Viajemos por el espacio! Conoce los planetas de nuestro sistema solar.',
  '/shapes': '¡Juguemos con las formas! ¿Puedes encontrar el círculo y el cuadrado?',
  'default': '¡Qué divertido es aprender! Sigue explorando.'
};

export default function FriendlyCharacter() {
  const location = useLocation();
  const message = messages[location.pathname] || messages['default'];

  return (
    <div className="absolute bottom-4 right-4 flex items-end space-x-2 z-20" data-testid="friendly-character">
      <div className="relative bg-white p-4 rounded-lg rounded-br-none shadow-lg max-w-xs">
        <p className="text-sm text-gray-800" data-testid="character-message">{message}</p>
        {/* Esto crea la pequeña flecha del globo de diálogo */}
        <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 rotate-45 w-4 h-4 bg-white"></div>
      </div>
      <div className="text-blue-400">
        <Bot size={64} className="transform -scale-x-100" />
      </div>
    </div>
  );
}