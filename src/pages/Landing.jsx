// src/pages/Landing.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'
import { Bot, Mail } from 'lucide-react'
import { useState } from 'react'

function FloatingCubes() {
  const cubes = Array.from({ length: 30 })
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      {cubes.map((_, i) => (
        <Float key={i} speed={1.5 + Math.random()} rotationIntensity={1} floatIntensity={2}>
          <mesh position={[
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15,
            (Math.random() - 0.5) * 15
          ]}>
            <boxGeometry args={[1 + Math.random() * 1.5, 1 + Math.random() * 1.5, 1 + Math.random() * 1.5]} />
            <MeshDistortMaterial
              color={i % 3 === 0 ? '#a855f7' : i % 2 === 0 ? '#3b82f6' : '#10b981'}
              attach="material"
              distort={0.5}
              speed={2}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
        </Float>
      ))}
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export default function Landing({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-black to-blue-900 overflow-hidden">
      {/* 3D Кубики Botpress-style */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10] }}>
          <FloatingCubes />
        </Canvas>
      </div>

      {/* Затемнение + стекло */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xl" />

      <div className="relative h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Стеклянная карточка */}
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-2xl">
            <div className="text-center mb-8">
              <motion.h1
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="text-5xl font-black text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400"
              >
                MMRLS AI
              </motion.h1>
              <p className="text-gray-300 text-lg">Твой ИИ-помощник нового поколения</p>
            </div>

            {/* Вход через Telegram — как у Botpress */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onLogin({ method: 'telegram' })}
              className="w-full bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-4 text-xl mb-6 transition mb-4"
            >
              <Bot className="w-8 h-8" />
              Войти через Telegram @mmrls_bot
            </motion.button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-black/50 text-gray-400">или</span>
              </div>
            </div>

           

            {/* Email вход */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLogin(!isLogin)}
              className="w-full border-2 border-gray-500 hover:border-gray-300 text-white py-5 rounded-2xl flex items-center justify-center gap-3 text-lg transition"
            >
              <Mail className="w-6 h-6" />
              {isLogin ? 'Вход по email' : 'Регистрация'}
            </motion.button>

            <p className="text-center text-gray-400 mt-8 text-sm">
              Используя сервис, ты соглашаешься с <a href="#" className="text-purple-400 hover:underline">условиями</a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
