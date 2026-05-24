/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { Mail, Twitter, Linkedin } from 'lucide-react';

const principles = [
  {
    id: '01',
    title: 'I\'m Fast',
    description: 'Lightning speed delivery without compromising on the quality of the architecture.'
  },
  {
    id: '02',
    title: 'I\'m Reliable',
    description: 'You can count on me. I build rock-solid systems that simply do not break.'
  },
  {
    id: '03',
    title: 'I\'m Precise',
    description: 'Every line of code and every pixel is placed with absolute intent and perfection.'
  }
];

const BG_COLOR = '#050505';
const FG_COLOR = '#F3F3F0';

// Format time in Lagos
const getLagosTime = () => {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Lagos',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date());
};

export default function App() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 35, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [time, setTime] = useState(getLagosTime());

  useEffect(() => {
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      setIsDesktop(false);
    }

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const timer = setInterval(() => setTime(getLagosTime()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { scrollYProgress } = useScroll();
  const marqueeX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  
  return (
    <div 
      style={{ backgroundColor: BG_COLOR, color: FG_COLOR }} 
      className={`relative min-h-screen font-sans selection:bg-[#F3F3F0] selection:text-[#050505] overflow-hidden ${isDesktop ? 'cursor-none' : ''}`}
    >
      
      {/* Live Ambient Loop Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* SVG Noise Texture for Premium Feel */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-screen" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")', 
            backgroundRepeat: 'repeat', 
            backgroundSize: '150px' 
          }} 
        />
        {/* Soft Looping Orbs */}
        <motion.div
           className="absolute w-[80vw] h-[80vw] rounded-full blur-[100px] md:blur-[140px]"
           style={{ backgroundColor: FG_COLOR, opacity: 0.04, top: '-20%', left: '-10%' }}
           animate={{ 
             x: [0, 100, 0],
             y: [0, 50, 0],
             scale: [1, 1.15, 1]
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
           className="absolute w-[90vw] h-[90vw] rounded-full blur-[120px] md:blur-[160px]"
           style={{ backgroundColor: FG_COLOR, opacity: 0.03, bottom: '-20%', right: '-10%' }}
           animate={{ 
             x: [0, -80, 0],
             y: [0, -90, 0],
             scale: [1, 1.25, 1]
           }}
           transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
        <motion.div
           className="absolute w-[60vw] h-[60vw] rounded-full blur-[100px] md:blur-[150px]"
           style={{ backgroundColor: FG_COLOR, opacity: 0.03, top: '40%', right: '20%' }}
           animate={{ 
             x: [0, 40, 0],
             y: [0, 80, 0],
             scale: [1, 1.2, 1]
           }}
           transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </div>

      {/* Custom Global Cursor */}
      {isDesktop && (
        <motion.div
          className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[100] flex items-center justify-center mix-blend-difference"
          style={{ x: cursorXSpring, y: cursorYSpring, backgroundColor: '#FFFFFF' }}
          animate={{ scale: isHovered ? 4 : 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      {/* Cute Floating Mini-Soul Character */}
      <motion.div
        className="fixed z-[80] top-0 left-0 pointer-events-none drop-shadow-xl w-[64px] h-[64px]"
        style={{ 
          x: useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["85vw", "15vw", "75vw", "20vw", "50vw"]),
          y: useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ["85vh", "20vh", "70vh", "30vh", "85vh"]),
          rotate: useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-15, 25, -20, 20, -5])
        }}
      >
        <motion.div
          animate={{
            y: ["-8%", "8%"],
          }}
          transition={{
             y: { duration: 2.5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
          }}
        >
          <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
            {/* Soft Glow behind it */}
            <circle cx="50" cy="50" r="30" fill={FG_COLOR} opacity="0.3" filter="blur(15px)" />
            
            {/* Blob Body */}
            <motion.path 
              fill={FG_COLOR}
              animate={{ 
                 d: [
                   "M 50 15 C 75 15 85 35 85 55 C 85 85 70 85 50 85 C 30 85 15 85 15 55 C 15 35 25 15 50 15 Z",
                   "M 50 20 C 70 25 80 40 80 60 C 80 80 65 90 50 90 C 35 90 20 80 20 60 C 20 40 30 25 50 20 Z",
                   "M 50 15 C 75 15 85 35 85 55 C 85 85 70 85 50 85 C 30 85 15 85 15 55 C 15 35 25 15 50 15 Z"
                 ]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Blinking Eyes */}
            <motion.ellipse cx="38" cy="48" rx="5" ry="7" fill={BG_COLOR} 
               style={{ scaleY: useTransform(scrollYProgress, [0, 0.2, 0.22, 0.25, 0.5, 0.52, 0.55, 0.8, 0.82, 0.85, 1], [1, 1, 0.1, 1, 1, 1, 0.1, 1, 1, 0.1, 1]) }} 
            />
            <motion.ellipse cx="62" cy="48" rx="5" ry="7" fill={BG_COLOR} 
               style={{ scaleY: useTransform(scrollYProgress, [0, 0.2, 0.22, 0.25, 0.5, 0.52, 0.55, 0.8, 0.82, 0.85, 1], [1, 1, 0.1, 1, 1, 1, 0.1, 1, 1, 0.1, 1]) }} 
            />
            {/* Cute Little Mouth */}
            <motion.path 
              d="M45 62 Q 50 67 55 62" 
              stroke={BG_COLOR} 
              strokeWidth="4" 
              strokeLinecap="round" 
              fill="none"
            />
            
            {/* Little Cheek Blushes */}
            <ellipse cx="25" cy="55" rx="4" ry="2" fill={BG_COLOR} opacity="0.3" />
            <ellipse cx="75" cy="55" rx="4" ry="2" fill={BG_COLOR} opacity="0.3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Nav / Header */}
      <nav className="fixed top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-start z-50 mix-blend-difference text-white pointer-events-none">
        <div className="text-xs uppercase tracking-widest font-mono font-medium opacity-90">Ezenna Eronini M.</div>
        <div className="text-xs uppercase tracking-widest font-mono text-right flex flex-col gap-1 opacity-90">
          <span>Lagos, NG</span>
          <span className="opacity-60">{time} WAT</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 pt-20 pb-8 md:pt-48 md:pb-32">
        
        {/* Refined Hero */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-40"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
             <div className="col-span-1 md:col-span-8 lg:col-span-9">
               <h1 className="text-[15vw] md:text-[10vw] lg:text-[11vw] font-medium tracking-tighter font-display uppercase leading-[0.85] indent-[-0.03em] m-0 p-0 break-words">
                 Software <br/> 
                 <span className="text-transparent relative inline-block transition-colors duration-500 hover:text-[#050505]" style={{ WebkitTextStroke: `1px ${FG_COLOR}`}}>Architect</span> <br/>
                 & Designer.
               </h1>
             </div>
             <div className="col-span-1 md:col-span-4 lg:col-span-3 pb-2 md:pb-6 relative z-10">
                <div className="text-xl md:text-2xl font-mono tracking-tighter flex flex-wrap pt-4 md:pt-0" style={{ opacity: 0.85 }}>
                  {"TESTED, TRUSTED, AND APPROVED.".split('').map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.03 + 0.5,
                        ease: "easeOut"
                      }}
                      className={char === " " ? "w-3 md:w-4" : "inline-block"}
                    >
                      {char}
                    </motion.span>
                  ))}
                </div>
             </div>
          </div>
        </motion.header>
      </div>

      {/* Elegant Marquee (Outlined) */}
      <section className="py-10 md:py-20 flex flex-col justify-center border-y relative z-10 overflow-hidden" style={{ borderColor: `${FG_COLOR}15` }}>
        <motion.div style={{ x: marqueeX1 }} className="flex w-max items-center">
          {[...Array(6)].map((_, i) => (
            <h2 key={i} className="text-[8vw] md:text-[5vw] leading-none font-display font-medium tracking-tighter uppercase px-8 whitespace-nowrap flex items-center gap-8 md:gap-16">
              <span>Clean Architecture</span>
              <span className="w-2 h-2 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: FG_COLOR }} />
              <span>Fluid Interactions</span>
              <span className="w-2 h-2 md:w-3 md:h-3 rounded-full" style={{ backgroundColor: FG_COLOR }} />
            </h2>
          ))}
        </motion.div>
      </section>

      <div className="max-w-[1400px] mx-auto px-5 md:px-8 lg:px-12 py-12 md:py-32 relative z-10">
        {/* Core Principles */}
        <section className="mb-16 md:mb-40">
          
          <div className="flex flex-col border-t" style={{ borderColor: `${FG_COLOR}20` }}>
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                className="group relative border-b py-10 md:py-20 flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-8 overflow-hidden"
                style={{ borderColor: `${FG_COLOR}20` }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* ID & Title */}
                <div className="flex items-start md:items-center gap-6 md:gap-16 lg:gap-32 w-full md:w-1/2">
                   <span className="text-xs font-mono opacity-40 mt-2 md:mt-0 pt-1 group-hover:opacity-100 transition-opacity">
                     {principle.id}
                   </span>
                   <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-display uppercase tracking-tight group-hover:translate-x-4 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                     {principle.title}
                   </h3>
                </div>
                
                {/* Description */}
                <div className="w-full md:w-1/2 md:pl-12 lg:pl-16 pt-2 border-t md:border-t-0 mt-4 md:mt-0 md:border-l border-[rgba(243,243,240,0.1)] flex items-center">
                  <p className="text-lg md:text-xl font-light tracking-wide opacity-70 leading-relaxed max-w-xl">
                    {principle.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Huge Call to Action Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="pt-8 pb-8 md:pt-32 md:pb-16 flex flex-col items-center"
        >
          <div 
            className="w-full text-center overflow-hidden mb-8 md:mb-32 relative px-4" 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}
          >
              <a href="https://wa.me/2348144559203" target="_blank" rel="noopener noreferrer" className="group inline-block w-full">
               <h3 className="text-[17vw] md:text-[18vw] font-display uppercase font-medium tracking-tighter leading-none transition-colors duration-700 w-full text-transparent" style={{ WebkitTextStroke: `1px ${FG_COLOR}`}}>
                  <span className="group-hover:text-[#050505] transition-colors duration-700">Let's </span> 
                  <span className="group-hover:text-[#050505] transition-colors duration-700 delay-75">Talk</span>
               </h3>
             </a>
          </div>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 border-t pt-6 md:pt-8" style={{ borderColor: `${FG_COLOR}20` }}>
            <div className="flex gap-8 text-xs font-mono uppercase tracking-widest text-[#F3F3F0]">
              {[
                { name: 'Email', icon: Mail, url: 'mailto:ezennaeronini@gmail.com' }, 
                { name: 'Twitter', icon: Twitter, url: '#' }, 
                { name: 'LinkedIn', icon: Linkedin, url: '#' }
              ].map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  className="relative overflow-hidden group py-1"
                  onMouseEnter={() => setIsHovered(true)} 
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="inline-block transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:-translate-y-[150%]">
                    <link.icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1} />
                  </span>
                  <span className="absolute left-0 top-1 translate-y-[150%] transition-transform duration-500 ease-[0.16,1,0.3,1] group-hover:translate-y-0">
                    <link.icon className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1} />
                  </span>
                </a>
              ))}
            </div>
            <p className="text-xs font-mono uppercase tracking-widest opacity-40">
              © {new Date().getFullYear()} Ezenna Eronini M.
            </p>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}
