import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Instagram,
  Facebook,
  Twitter,
  Camera,
  Heart,
  Sparkles,
  Star,
} from "lucide-react"

interface ContactFormData {
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  message: string
}

const eventTypes = [
  "Wedding Photography",
  "Portrait Session",
  "Fashion Shoot",
  "Commercial Project",
  "Event Coverage",
  "Maternity Shoot",
  "Family Portrait",
  "Other",
]

// Define the size types
type ParticleSize = "small" | "medium" | "large"

interface CinematicParticleProps {
  delay?: number
  duration?: number
  size?: ParticleSize
}

// Cinematic floating particles
const CinematicParticle = ({
  delay = 0,
  duration = 8,
  size = "small",
}: CinematicParticleProps) => {
  const sizeClasses: Record<ParticleSize, string> = {
    small: "w-1 h-1",
    medium: "w-2 h-2",
    large: "w-3 h-3",
  }

  return (
    <motion.div
      className={`absolute ${sizeClasses[size]} bg-gradient-to-r from-pink-400 to-rose-400 rounded-full`}
      initial={{
        x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
        y: typeof window !== "undefined" ? window.innerHeight + 100 : 1000,
        opacity: 0,
        scale: 0,
      }}
      animate={{
        y: -100,
        opacity: [0, 0.8, 0.4, 0],
        scale: [0, 1, 1.2, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeOut",
      }}
    />
  )
}

interface ConstellationDotProps {
  x: number;
  y: number;
  delay?: number;
}

const ConstellationDot = ({ x, y, delay = 0 }: ConstellationDotProps) => (
  <motion.div
    className="absolute w-1 h-1 bg-pink-300/30 rounded-full"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{
      opacity: [0.3, 1, 0.3],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  />
)

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

  const heroRef = useRef(null)
  const formRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" })

  useEffect(() => { }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowSuccess(true)

    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false)
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        message: "",
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Cinematic Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <CinematicParticle
            key={i}
            delay={i * 0.3}
            duration={6 + Math.random() * 4}
            size={Math.random() > 0.7 ? "medium" : "small"}
          />
        ))}

        {/* Constellation Effect */}
        {[...Array(25)].map((_, i) => (
          <ConstellationDot key={i} x={Math.random() * 100} y={Math.random() * 100} delay={Math.random() * 5} />
        ))}
      </div>

      {/* Dynamic Mouse-Following Gradient */}
      <div className="absolute inset-0 opacity-[0.15] bg-gradient-to-br from-pink-500/20 via-rose-500/10 to-transparent" />

      {/* Film Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cinematic Hero Section */}
      <div ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1920&h=1080&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{
            scale: isHeroInView ? 1.05 : 1.1,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/90" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
            animate={
              isHeroInView
                ? {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                }
                : {}
            }
            transition={{
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {/* Animated Icon */}
            <motion.div
              className="mb-8"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <div className="relative inline-block">
                <Camera className="w-20 h-20 text-pink-400 mx-auto" />
                <motion.div
                  className="absolute -inset-4 border border-pink-400/30 rounded-full"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />
              </div>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl font-thin tracking-[-0.02em] leading-none mb-8"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #fdf2f8 25%, #fce7f3 50%, #f3e8ff 75%, #ffffff 100%)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                textShadow: "0 0 40px rgba(236, 72, 153, 0.3)",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              Let's Create Magic
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-2xl md:text-3xl text-gray-300 font-light tracking-wide mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 1.2,
                delay: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              Together We'll Capture Your Story
            </motion.p>

            {/* Decorative Elements */}
            <motion.div
              className="flex justify-center items-center gap-8 mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 1,
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Star className="w-6 h-6 text-pink-400" />
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
              <Heart className="w-6 h-6 text-rose-400" />
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
              <Sparkles className="w-6 h-6 text-pink-400" />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
            animate={{
              borderColor: ["rgba(255,255,255,0.3)", "rgba(236,72,153,0.6)", "rgba(255,255,255,0.3)"],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Content */}
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Contact Info Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {[
              {
                icon: MapPin,
                title: "Visit Our Studio",
                content: "Near Ashoka Plaza\nCircular Road, Rohtak\nHaryana 124001",
                color: "from-pink-500 to-rose-500",
              },
              {
                icon: Phone,
                title: "Call Us",
                content: "+91 90052 34215\n+91 92921 23738\nWhatsApp Available",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Mail,
                title: "Email Us",
                content: "studiortk@gmail.com",
                color: "from-rose-500 to-orange-500",
              },
              {
                icon: Clock,
                title: "Studio Hours",
                content: "Mon - Sat: 9:00 AM-8:00 PM\nSun: 10:00 AM - 6:00 PM\nBy Appointment Only",
                color: "from-pink-500 to-purple-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative group cursor-hover"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setActiveSection(index)}
              >
                <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl h-full overflow-hidden">
                  {/* Gradient Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 border-2 border-transparent group-hover:border-pink-400/30 rounded-2xl"
                    animate={
                      activeSection === index
                        ? {
                          borderColor: [
                            "rgba(236, 72, 153, 0.3)",
                            "rgba(244, 63, 94, 0.5)",
                            "rgba(236, 72, 153, 0.3)",
                          ],
                        }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />

                  {/* Icon */}
                  <div className="relative z-10">
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                      animate={
                        activeSection === index
                          ? {
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1],
                          }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <item.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed whitespace-pre-line">{item.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 rounded-3xl"
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(236, 72, 153, 0.05), rgba(147, 51, 234, 0.05))",
                      "linear-gradient(135deg, rgba(244, 63, 94, 0.05), rgba(236, 72, 153, 0.05))",
                      "linear-gradient(135deg, rgba(236, 72, 153, 0.05), rgba(147, 51, 234, 0.05))",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      <Heart className="w-6 h-6 text-pink-400" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white">Start Your Journey</h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        className="relative cursor-hover"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300"
                          placeholder="Your Name"
                        />
                        <motion.div
                          className="absolute inset-0 border border-pink-400/50 rounded-xl opacity-0 pointer-events-none"
                          whileFocus={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </motion.div>

                      <motion.div
                        className="relative cursor-hover"
                        whileFocus={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300"
                          placeholder="Email Address"
                        />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300 cursor-hover"
                          placeholder="Phone Number"
                        />
                      </div>

                      <div className="relative">
                        <select
                          name="eventType"
                          value={formData.eventType}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300 cursor-hover"
                        >
                          <option value="" className="bg-gray-900">
                            Select Event Type
                          </option>
                          {eventTypes.map((type) => (
                            <option key={type} value={type} className="bg-gray-900">
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="relative">
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300 cursor-hover"
                      />
                    </div>

                    <div className="relative">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        required
                        className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:bg-white/15 transition-all duration-300 resize-none cursor-hover"
                        placeholder="Tell us about your vision, special requirements, or any questions you have..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 cursor-hover disabled:opacity-50 relative overflow-hidden"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Button Background Animation */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />

                      <div className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
                          </>
                        )}
                      </div>
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* Map and Social */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Google Maps */}
              <div className="relative overflow-hidden rounded-3xl group">
                <motion.div
                  className="aspect-video bg-gray-900 relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3493.123456789!2d76.6054321!3d28.8956789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85000000000%3A0x123456789abcde!2sMeenakshi%20Studio%2C%20Rohtak!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-3xl" />

                  {/* Map Overlay Effect */}
                  <motion.div className="absolute inset-0 border-2 border-pink-400/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </div>

              {/* Social Media */}
              <div className="relative p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl"
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05))",
                      "linear-gradient(135deg, rgba(236, 72, 153, 0.05), rgba(244, 63, 94, 0.05))",
                      "linear-gradient(135deg, rgba(147, 51, 234, 0.05), rgba(236, 72, 153, 0.05))",
                    ],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-pink-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white">Follow Our Journey</h3>
                  </div>

                  <p className="text-gray-400 mb-8 leading-relaxed">
                    Stay connected with us on social media to see our latest work, behind-the-scenes moments, and client
                    stories.
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      {
                        icon: Instagram,
                        name: "Instagram",
                        handle: "@meenakshistudio",
                        color: "from-pink-500 to-purple-500",
                      },
                      {
                        icon: Facebook,
                        name: "Facebook",
                        handle: "meenakshiStudio",
                        color: "from-blue-500 to-purple-500",
                      },
                      {
                        icon: Twitter,
                        name: "Twitter",
                        handle: "@meenakshistudio",
                        color: "from-blue-400 to-blue-600",
                      },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        className="group relative p-4 bg-white/10 rounded-2xl hover:bg-white/15 transition-all duration-300 cursor-hover overflow-hidden"
                        whileHover={{ y: -5, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Hover Background Effect */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        />

                        <div className="relative z-10">
                          <motion.div
                            className={`w-12 h-12 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                            whileHover={{
                              rotate: [0, -10, 10, 0],
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            <social.icon className="w-6 h-6 text-white" />
                          </motion.div>
                          <p className="text-white font-medium text-sm">{social.name}</p>
                          <p className="text-gray-400 text-xs">{social.handle}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative p-8 bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-400/30 rounded-3xl text-center max-w-md overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Success Animation Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="w-8 h-8 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                <p className="text-gray-300 leading-relaxed">
                  Thank you for reaching out! We'll get back to you within 24 hours to discuss your photography needs.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}