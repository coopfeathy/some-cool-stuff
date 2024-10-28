'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { ExternalLink, Instagram, Code, Laugh, DollarSign } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Link from 'next/link'

export default function Component() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState('default')
  const [stars, setStars] = useState<{ top: string; left: string; delay: string }[]>([])

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener("mousemove", mouseMove)

    // Generate stars on the client-side
    setStars(
      [...Array(100)].map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
      }))
    )

    return () => {
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    project: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "white",
      mixBlendMode: "difference" as const
    }
  }

  const projects = [
    { title: "Dad Jokes App", description: "Visit to see a random dad joke.", icon: <Laugh className="w-12 h-12" />, color: "bg-blue-500", live: "https://coopers-dad-jokes.netlify.app" },
    { title: "20 $ Methods", description: "Visit to learn about different money methods.", icon: <DollarSign className="w-12 h-12" />, color: "bg-green-500", live: "https://20moneymethods.netlify.app" },
    { title: "CF LLC", description: "A Company.", icon: <Code className="w-12 h-12" />, color: "bg-purple-500", live: "https://cf-llc.github.io" },
  ]

  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 relative overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full bg-white mix-blend-difference pointer-events-none z-50"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 2,
              delay: parseFloat(star.delay),
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              top: star.top,
              left: star.left,
            }}
          />
        ))}
      </div>
      <header className="text-center mb-12 flex flex-col items-center">
        <motion.div
          className="w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mb-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <span className="text-4xl font-bold">CF</span>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold mb-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Cooper Featherstone
        </motion.h1>
        <motion.p
          className="text-xl mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          @coopfeathy
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <a
            href="https://instagram.com/coopfeathy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            <Instagram className="w-5 h-5 mr-2" />
            Find me on Instagram
          </a>
        </motion.div>
      </header>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.2
            }
          }
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {projects.map((project, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1
              }
            }}
          >
            <Card 
              className="bg-gray-800 border-gray-700 overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              onMouseEnter={() => setCursorVariant("project")}
              onMouseLeave={() => setCursorVariant("default")}
            >
              <CardContent className="p-0">
                <div className="relative group">
                  <div className={`w-full h-48 ${project.color} flex items-center justify-center transition-all duration-300 group-hover:opacity-20`}>
                    {project.icon}
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm mb-4 text-center">{project.description}</p>
                    <div className="flex space-x-4">
                      <Link href={project.live} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-colors duration-300">
                        <ExternalLink className="w-6 h-6" />
                        <span className="sr-only">Live site for {project.title}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}