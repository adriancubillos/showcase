import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { CodeBracketIcon, PaintBrushIcon, DevicePhoneMobileIcon, SparklesIcon } from '@heroicons/react/24/outline'
import SkillCard from './components/SkillCard'
import ProjectCard from './components/ProjectCard'
import ContactForm from './components/ContactForm'
import DarkModeToggle from './components/DarkModeToggle'
import Navigation from './components/Navigation'
import InteractionsShowcase from './components/InteractionsShowcase'
import TechnicalShowcase from './components/TechnicalShowcase'
import scrollTo from './components/ScrollTo'
import Footer from './components/Footer'
import './App.css'

const skills = [
  {
    icon: SparklesIcon,
    title: 'Interactive UI',
    description: 'Creating engaging user interfaces with smooth animations and interactions.'
  },
  {
    icon: CodeBracketIcon,
    title: 'Frontend Development',
    description: 'Building responsive and performant web applications using modern frameworks and tools.'
  },
  {
    icon: PaintBrushIcon,
    title: 'UI/UX Design',
    description: 'Creating intuitive and beautiful user interfaces with a focus on user experience.'
  },
  {
    icon: DevicePhoneMobileIcon,
    title: 'Responsive Design',
    description: 'Ensuring applications work flawlessly across all devices and screen sizes.'
  }
]

const projects = [
  {
    title: 'Movie Catalog',
    description: 'This Movie Catalog App lets users browse trending movies, search titles, and explore content using the TMDB API. It features a responsive layout and a sleek, modern design.',
    image: '/movieCatalog.png',
    tags: ['React', 'Vite', 'Appwrite', 'Tailwind CSS'],
    link: 'https://movie-catalog-nine-eta.vercel.app/'
  },
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio website showcasing projects and skills',
    image: '/portfolio.png', // Add a screenshot of your portfolio to public/portfolio.png
    tags: ['Next.js', 'React', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
    link: 'https://portfolio-snowy-seven-70.vercel.app/'
  }
]

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const savedMode = localStorage.getItem('darkMode');
      if (savedMode === null) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [])
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section id="hero" className="section-container min-h-screen flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Frontend Developer & UI/UX Designer
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Crafting beautiful and functional web experiences
            </p>
            <button
              className="btn btn-primary"
              onClick={() => scrollTo('technical')}
            >
              Technical Showcase
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => scrollTo('interactions')}
            >
              Interactive Elements
            </button>
            <button
              className="btn btn-primary"
              onClick={() => scrollTo('projects')}
            >
              View My Work
            </button>
          </motion.div>
          <ChevronDownIcon
            className="w-8 h-8 text-gray-400 animate-bounce mt-16 cursor-pointer"
            onClick={() => scrollTo('skills')}
          />
        </section>

        {/* Skills Section */}
        <section id="skills" ref={ref} className="section-container rounded-2xl my-8 mx-4 sm:mx-8 p-8 bg-white dark:bg-gray-800">
          <h2 className="text-4xl font-bold text-center mb-12">Skills & Expertise</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Expertise in creating responsive, accessible, and performant web applications
            with a focus on user experience and modern development practices.
          </p>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <SkillCard key={index} {...skill} />
              ))}
            </div>
          </div>
        </section>

        {/* Technical Section */}
        <section id="technical" className="section-container rounded-2xl my-8 mx-4 sm:mx-8 p-8 bg-white dark:bg-gray-800">
          <h2 className="text-4xl font-bold text-center mb-12">Technical Showcase</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Explore technical implementations and best practices in modern web development.
            Each component demonstrates robust functionality and clean code architecture.
          </p>
          <div className="max-w-5xl mx-auto">
            <TechnicalShowcase />
          </div>
        </section>

        {/* Interactions Section */}
        <section id="interactions" className="section-container rounded-2xl my-8 mx-4 sm:mx-8 p-8 bg-white dark:bg-gray-800">
          <h2 className="text-4xl font-bold text-center mb-12">Interactive Elements</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Explore various interactive elements and animations that enhance the user experience.
            Each component is designed to provide meaningful feedback and engagement.
          </p>
          <div className="max-w-5xl mx-auto">
            <InteractionsShowcase />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section-container rounded-2xl my-8 mx-4 sm:mx-8 p-8 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-4xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section-container rounded-2xl my-8 mx-4 sm:mx-8 p-8 bg-white dark:bg-gray-800">
          <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </section>
        <Footer />
      </div>
    </div>
  )
}

export default App
