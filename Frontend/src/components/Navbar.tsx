// import type React from "react"
// import { useRef, useEffect, useState } from "react"

// interface GooeyNavItem {
//   label: string
//   href: string
//   onClick?: () => void
// }

// export interface GooeyNavProps {
//   items: GooeyNavItem[]
//   animationTime?: number
//   particleCount?: number
//   particleDistances?: [number, number]
//   particleR?: number
//   timeVariance?: number
//   colors?: number[]
//   initialActiveIndex?: number
//   onItemClick?: (index: number, item: GooeyNavItem) => void
// }

// const GooeyNav: React.FC<GooeyNavProps> = ({
//   items,
//   animationTime = 600,
//   particleCount = 15,
//   particleDistances = [90, 10],
//   particleR = 100,
//   timeVariance = 300,
//   colors = [1, 2, 3, 1, 2, 3, 1, 4],
//   initialActiveIndex = 0,
//   onItemClick,
// }) => {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const navRef = useRef<HTMLUListElement>(null)
//   const filterRef = useRef<HTMLSpanElement>(null)
//   const textRef = useRef<HTMLSpanElement>(null)
//   const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex)

//   const noise = (n = 1) => n / 2 - Math.random() * n
//   const getXY = (distance: number, pointIndex: number, totalPoints: number): [number, number] => {
//     const angle = ((360 + noise(8)) / totalPoints) * pointIndex * (Math.PI / 180)
//     return [distance * Math.cos(angle), distance * Math.sin(angle)]
//   }

//   const createParticle = (i: number, t: number, d: [number, number], r: number) => {
//     const rotate = noise(r / 10)
//     return {
//       start: getXY(d[0], particleCount - i, particleCount),
//       end: getXY(d[1] + noise(7), particleCount - i, particleCount),
//       time: t,
//       scale: 1 + noise(0.2),
//       color: colors[Math.floor(Math.random() * colors.length)],
//       rotate: rotate > 0 ? (rotate + r / 20) * 10 : (rotate - r / 20) * 10,
//     }
//   }

//   const makeParticles = (element: HTMLElement) => {
//     const d: [number, number] = particleDistances
//     const r = particleR
//     const bubbleTime = animationTime * 2 + timeVariance
//     element.style.setProperty("--time", `${bubbleTime}ms`)
//     for (let i = 0; i < particleCount; i++) {
//       const t = animationTime * 2 + noise(timeVariance * 2)
//       const p = createParticle(i, t, d, r)
//       element.classList.remove("active")
//       setTimeout(() => {
//         const particle = document.createElement("span")
//         const point = document.createElement("span")
//         particle.classList.add("particle")
//         particle.style.setProperty("--start-x", `${p.start[0]}px`)
//         particle.style.setProperty("--start-y", `${p.start[1]}px`)
//         particle.style.setProperty("--end-x", `${p.end[0]}px`)
//         particle.style.setProperty("--end-y", `${p.end[1]}px`)
//         particle.style.setProperty("--time", `${p.time}ms`)
//         particle.style.setProperty("--scale", `${p.scale}`)
//         particle.style.setProperty("--color", `var(--color-${p.color}, white)`)
//         particle.style.setProperty("--rotate", `${p.rotate}deg`)
//         point.classList.add("point")
//         particle.appendChild(point)
//         element.appendChild(particle)
//         requestAnimationFrame(() => {
//           element.classList.add("active")
//         })
//         setTimeout(() => {
//           try {
//             element.removeChild(particle)
//           } catch {}
//         }, t)
//       }, 30)
//     }
//   }

//   const updateEffectPosition = (element: HTMLElement) => {
//     if (!containerRef.current || !filterRef.current || !textRef.current) return
//     const containerRect = containerRef.current.getBoundingClientRect()
//     const pos = element.getBoundingClientRect()
//     const styles = {
//       left: `${pos.x - containerRect.x}px`,
//       top: `${pos.y - containerRect.y}px`,
//       width: `${pos.width}px`,
//       height: `${pos.height}px`,
//     }
//     Object.assign(filterRef.current.style, styles)
//     Object.assign(textRef.current.style, styles)
//     textRef.current.innerText = element.innerText
//   }

//   const handleClick = (e: React.MouseEvent<HTMLLIElement>, index: number) => {
//     const liEl = e.currentTarget
//     setActiveIndex(index)
//     updateEffectPosition(liEl)

//     if (items[index].onClick) {
//       items[index].onClick!()
//     }

//     if (onItemClick) {
//       onItemClick(index, items[index])
//     }

//     if (!items[index].href || items[index].onClick) {
//       e.preventDefault()
//     }

//     if (filterRef.current) {
//       const particles = filterRef.current.querySelectorAll(".particle")
//       particles.forEach((p) => filterRef.current!.removeChild(p))
//     }
//     if (textRef.current) {
//       textRef.current.classList.remove("active")
//       void textRef.current.offsetWidth
//       textRef.current.classList.add("active")
//     }
//     if (filterRef.current) {
//       makeParticles(filterRef.current)
//     }
//   }

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
//     if (e.key === "Enter" || e.key === " ") {
//       e.preventDefault()
//       const liEl = e.currentTarget.parentElement
//       if (liEl) {
//         handleClick({ currentTarget: liEl } as React.MouseEvent<HTMLLIElement>, index)
//       }
//     }
//   }

//   useEffect(() => {
//     if (!navRef.current || !containerRef.current || !filterRef.current || !textRef.current) return

//     const activeLi = navRef.current.querySelectorAll("li")[activeIndex] as HTMLElement
//     if (!activeLi) return

//     navRef.current.querySelectorAll("li").forEach((li, idx) => {
//       li.classList.toggle("active", idx === activeIndex)
//     })

//     updateEffectPosition(activeLi)
//     textRef.current.classList.add("active")

//     const particles = filterRef.current.querySelectorAll(".particle")
//     particles.forEach((p) => p.remove())

//     makeParticles(filterRef.current)

//     const resizeObserver = new ResizeObserver((entries) => {
//       if (!entries[0]) return
//       const currentActiveLi = navRef.current?.querySelectorAll("li")[activeIndex] as HTMLElement
//       if (currentActiveLi) {
//         updateEffectPosition(currentActiveLi)
//       }
//     })

//     resizeObserver.observe(containerRef.current)

//     return () => {
//       resizeObserver.disconnect()
//       textRef.current?.classList.remove("active")
//     }
//   }, [activeIndex])

//   useEffect(() => {
//     if (!navRef.current || !filterRef.current) return
//     const activeLi = navRef.current.querySelectorAll("li")[activeIndex] as HTMLElement
//     if (activeLi) {
//       updateEffectPosition(activeLi)
//       const particles = filterRef.current.querySelectorAll(".particle")
//       particles.forEach((p) => filterRef.current!.removeChild(p))
//       makeParticles(filterRef.current)
//       textRef.current?.classList.add("active")
//     }
//   }, [])

//   return (
//     <>
//       <style>
//         {`
//           :root {
//             --linear-ease: linear(0, 0.068, 0.19 2.7%, 0.804 8.1%, 1.037, 1.199 13.2%, 1.245, 1.27 15.8%, 1.274, 1.272 17.4%, 1.249 19.1%, 0.996 28%, 0.949, 0.928 33.3%, 0.926, 0.933 36.8%, 1.001 45.6%, 1.013, 1.019 50.8%, 1.018 54.4%, 1 63.1%, 0.995 68%, 1.001 85%, 1);
//             --color-1: #ec4899;
//             --color-2: #f43f5e;
//             --color-3: #e11d48;
//             --color-4: #be185d;
//           }
//           .gooey-nav-container {
//             backdrop-filter: blur(20px);
//             background: rgba(0, 0, 0, 0.3);
//             border: 1px solid rgba(255, 255, 255, 0.1);
//             border-radius: 50px;
//             padding: 6px 12px;
//             box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
//           }
          
//           @media (min-width: 640px) {
//             .gooey-nav-container {
//               padding: 8px 16px;
//             }
//           }
          
//           .effect {
//             position: absolute;
//             opacity: 1;
//             pointer-events: none;
//             display: grid;
//             place-items: center;
//             z-index: 1;
//           }
//           .effect.text {
//             color: white;
//             transition: color 0.3s ease;
//             font-weight: 500;
//             font-size: 0.875rem;
//           }
          
//           @media (min-width: 640px) {
//             .effect.text {
//               font-size: 1rem;
//             }
//           }
          
//           .effect.text.active {
//             color: black;
//           }
//           .effect.filter {
//             filter: blur(7px) contrast(100) blur(0);
//             mix-blend-mode: lighten;
//           }
//           .effect.filter::before {
//             content: "";
//             position: absolute;
//             inset: -75px;
//             z-index: -2;
//             background: transparent;
//           }
//           .effect.filter::after {
//             content: "";
//             position: absolute;
//             inset: 0;
//             background: linear-gradient(135deg, #ec4899, #f43f5e);
//             transform: scale(0);
//             opacity: 0;
//             z-index: -1;
//             border-radius: 25px;
//           }
//           .effect.active::after {
//             animation: pill 0.3s ease both;
//           }
//           @keyframes pill {
//             to {
//               transform: scale(1);
//               opacity: 1;
//             }
//           }
//           .particle,
//           .point {
//             display: block;
//             opacity: 0;
//             width: 20px;
//             height: 20px;
//             border-radius: 9999px;
//             transform-origin: center;
//           }
//           .particle {
//             --time: 5s;
//             position: absolute;
//             top: calc(50% - 8px);
//             left: calc(50% - 8px);
//             animation: particle calc(var(--time)) ease 1 -350ms;
//           }
//           .point {
//             background: var(--color);
//             opacity: 1;
//             animation: point calc(var(--time)) ease 1 -350ms;
//           }
//           @keyframes particle {
//             0% {
//               transform: rotate(0deg) translate(calc(var(--start-x)), calc(var(--start-y)));
//               opacity: 1;
//               animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
//             }
//             70% {
//               transform: rotate(calc(var(--rotate) * 0.5)) translate(calc(var(--end-x) * 1.2), calc(var(--end-y) * 1.2));
//               opacity: 1;
//               animation-timing-function: ease;
//             }
//             85% {
//               transform: rotate(calc(var(--rotate) * 0.66)) translate(calc(var(--end-x)), calc(var(--end-y)));
//               opacity: 1;
//             }
//             100% {
//               transform: rotate(calc(var(--rotate) * 1.2)) translate(calc(var(--end-x) * 0.5), calc(var(--end-y) * 0.5));
//               opacity: 1;
//             }
//           }
//           @keyframes point {
//             0% {
//               transform: scale(0);
//               opacity: 0;
//               animation-timing-function: cubic-bezier(0.55, 0, 1, 0.45);
//             }
//             25% {
//               transform: scale(calc(var(--scale) * 0.25));
//             }
//             38% {
//               opacity: 1;
//             }
//             65% {
//               transform: scale(var(--scale));
//               opacity: 1;
//               animation-timing-function: ease;
//             }
//             85% {
//               transform: scale(var(--scale));
//               opacity: 1;
//             }
//             100% {
//               transform: scale(0);
//               opacity: 0;
//             }
//           }
//           li.active {
//             color: black;
//             text-shadow: none;
//           }
//           li.active::after {
//             opacity: 1;
//             transform: scale(1);
//           }
//           li::after {
//             content: "";
//             position: absolute;
//             inset: 0;
//             border-radius: 25px;
//             background: linear-gradient(135deg, #ec4899, #f43f5e);
//             opacity: 0;
//             transform: scale(0);
//             transition: all 0.3s ease;
//             z-index: -1;
//           }
//           li:hover {
//             color: rgba(255, 255, 255, 0.9);
//           }
          
//           .nav-item {
//             padding: 8px 12px;
//             font-size: 0.875rem;
//           }
          
//           @media (min-width: 640px) {
//             .nav-item {
//               padding: 12px 20px;
//               font-size: 1rem;
//             }
//           }
          
//           @media (min-width: 768px) {
//             .nav-item {
//               padding: 12px 24px;
//             }
//           }
//         `}
//       </style>
//       <div className="gooey-nav-container" ref={containerRef}>
//         <nav className="flex relative" style={{ transform: "translate3d(0,0,0.01px)" }}>
//           <ul
//             ref={navRef}
//             className="flex gap-2 sm:gap-4 md:gap-6 list-none p-0 px-1 sm:px-2 m-0 relative z-[3] cursor-hover"
//             style={{
//               color: "white",
//               textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
//             }}
//           >
//             {items.map((item, index) => (
//               <li
//                 key={index}
//                 className={`nav-item rounded-full relative cursor-pointer transition-all duration-300 ease font-medium tracking-wide cursor-hover ${
//                   activeIndex === index ? "active" : ""
//                 }`}
//                 onClick={(e) => handleClick(e, index)}
//               >
//                 <a
//                   href={item.href}
//                   onKeyDown={(e) => handleKeyDown(e, index)}
//                   className="outline-none cursor-hover block"
//                   onClick={(e) => {
//                     if (item.onClick) {
//                       e.preventDefault()
//                       item.onClick()
//                     }
//                   }}
//                   tabIndex={0}
//                 >
//                   {item.label}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </nav>
//         <span className="effect filter" ref={filterRef} />
//         <span className="effect text" ref={textRef} />
//       </div>
//     </>
//   )
// }

// export default GooeyNav


import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

interface GooeyNavItem {
  label: string
  href: string
  onClick?: () => void
}

export interface GooeyNavProps {
  items: GooeyNavItem[]
  initialActiveIndex?: number
  onItemClick?: (index: number, item: GooeyNavItem) => void
}

const GooeyNav: React.FC<GooeyNavProps> = ({
  items,
  initialActiveIndex = 0,
  onItemClick,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(initialActiveIndex)

  const handleClick = (index: number, item: GooeyNavItem) => {
    setActiveIndex(index)

    if (item.onClick) {
      item.onClick()
    }

    if (onItemClick) {
      onItemClick(index, item)
    }
  }

  return (
    <div className="gooey-nav-container backdrop-blur-xl bg-black/30 border border-white/10 rounded-full shadow-lg shadow-black/30 p-1.5 sm:p-2">
      <nav className="relative">
        <ul className="flex gap-1 sm:gap-2 md:gap-3 list-none p-0 m-0 relative">
          {items.map((item, index) => (
            <li key={index} className="relative">
              <motion.a
                href={item.href}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-medium rounded-full relative z-10 transition-colors duration-300 block ${
                  activeIndex === index 
                    ? "text-white" 
                    : "text-white/80 hover:text-white"
                }`}
                onClick={(e) => {
                  if (item.onClick) {
                    e.preventDefault()
                  }
                  handleClick(index, item)
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
              
              {activeIndex === index && (
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full z-0"
                  layoutId="activeNavItem"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default GooeyNav