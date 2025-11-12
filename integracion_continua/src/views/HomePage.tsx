import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const homeItems = [
  { label: "🔷 Explorador de Formas", route: "/shapes", description: "Aprende sobre formas 3D" },
  { label: "🌍 Globo Interactivo", route: "/globe", description: "Explora países del mundo" },
  { label: "🎨 Pintura 3D", route: "/paint", description: "Dibuja en el espacio 3D" },
  { label: "🪐 Sistema Solar", route: "/solarsystem", description: "Descubre los planetas" },
  { label: "💧 Ciclo del Agua", route: "/watercycle", description: "Conoce cómo funciona el agua" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 min-h-full">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-[#15803D]">
          ¡Bienvenido a la Aventura Educativa! 🌟
        </h1>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-700">
          Explora el mundo de las matemáticas, las ciencias sociales y las ciencias naturales de forma divertida y interactiva.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {homeItems.map((item, index) => (
            <motion.div
              key={item.route}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Link
                to={item.route}
                className="block h-48 bg-[#81C784] hover:bg-[#66BB6A] text-[#166534] font-bold py-8 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-3xl mb-4">{item.label.split(' ')[0]}</div>
                <div className="text-xl mb-2">{item.label.substring(2)}</div>
                <p className="text-sm opacity-80">{item.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12"
        >
          <p className="text-gray-600 italic">
            ¡Elige una actividad y comienza tu aventura de aprendizaje!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
