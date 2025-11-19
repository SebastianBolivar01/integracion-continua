import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shapes, Globe, Palette, Sun, MoonStar, Rocket, Earth, Droplets } from "lucide-react";

const homeItems = [
  { icon: Shapes, label: "Explorador de Formas", route: "/shapes", description: "Aprende sobre formas 3D" },
  { icon: Globe, label: "Globo Interactivo", route: "/globe", description: "Explora países del mundo" },
  { icon: Palette, label: "Pintura 3D", route: "/paint", description: "Dibuja en el espacio 3D" },
  { icon: Sun, label: "Sistema Solar", route: "/solarsystem", description: "Descubre los planetas" },
  { icon: Droplets, label: "Ciclo del Agua", route: "/watercycle", description: "Observa el ciclo del agua" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6 min-h-full">
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-cyan-300 text-center">
          ¡Bienvenido a la Aventura Educativa!
        </h1>
        <div className="text-6xl mb-4 flex justify-center text-cyan-300 space-x-4">
          <MoonStar />
          <Rocket />
          <Earth />
        </div>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-300">
          Explora el mundo de las matemáticas, las ciencias sociales y las ciencias naturales de forma divertida y interactiva.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {homeItems.map((item, index) => (
            <motion.div
              key={item.route}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Link
                to={item.route}
                className="h-48 bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/50 hover:bg-cyan-500/30 text-cyan-100 font-bold py-8 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col justify-center text-center"
              >
                <div className="text-6xl mb-4 flex justify-center"><item.icon /></div>
                <div className="text-xl mb-2">{item.label}</div>
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
