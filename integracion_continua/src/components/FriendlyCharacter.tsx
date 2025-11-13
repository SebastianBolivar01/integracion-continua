import { useLocation } from 'react-router-dom';

const messages: Record<string, string[]> = {
  '/': [
    '¡Hola! Soy tu guía educativo. Explora las maravillas del aprendizaje con nosotros.',
    '¡Bienvenido! Aquí aprenderás de forma divertida y interactiva.',
    '¡Hola explorador! ¿Listo para un viaje educativo?'
  ],
  '/globe': [
    '¿Sabías que la Tierra tiene más de 7 mil millones de habitantes? ¡Descubre más sobre nuestro planeta!',
    '¡Haz clic en los puntos del globo para conocer países fascinantes!',
    'La Tierra es el único planeta conocido con vida. ¡Explóralo!'
  ],
  '/solar-system': [
    'El Sol es una estrella gigante. ¡Aprende sobre los planetas que orbitan a su alrededor!',
    '¡Haz clic en los planetas para saber más sobre ellos!',
    'Nuestro sistema solar tiene 8 planetas. ¿Cuál es tu favorito?'
  ],
  '/shapes': [
    'Las formas geométricas están en todas partes. ¡Juguemos a identificarlas!',
    '¡Cambia el color y la forma! ¿Qué puedes crear?',
    'Las matemáticas están en las formas. ¡Diviértete explorando!'
  ],
  '/technology-logic': [
    'La lógica es la base de la tecnología. ¡Descubre cómo piensan las máquinas!',
    '¡Interactúa con la lógica tecnológica!',
    'La tecnología nos ayuda a resolver problemas. ¡Aprende cómo!'
  ],
  '/water-cycle': [
    'El agua viaja en un ciclo infinito. ¡Veamos cómo funciona!',
    '¡Observa el ciclo del agua en acción!',
    'El agua es esencial para la vida. ¡Descubre su viaje!'
  ],
};

export default function FriendlyCharacter() {
  const location = useLocation();
  const availableMessages = messages[location.pathname] || ['¡Explora y aprende algo nuevo cada día!'];
  const message = availableMessages[Math.floor(Math.random() * availableMessages.length)];

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-50 border-2 border-blue-200">
      <div className="flex items-center space-x-3">
        <div className="text-4xl">🤖</div>
        <div>
          <p className="text-sm font-sans text-gray-800">{message}</p>
        </div>
      </div>
    </div>
  );
}