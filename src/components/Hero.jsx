import { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { aboutText } from '../data/content'
import TypewriterRoles from './TypewriterRoles'

gsap.registerPlugin(ScrollTrigger)

const HERO_IMGS = ['/hero-banner-1.jpg', '/hero-banner-2.jpg']
const GLITCH_INTERVAL_MS = 5000
const GLITCH_DURATION_MS = 420

const SPARK_COLORS = ['#4B006E', '#9b4dca', '#c9a0e0', '#ffffff', '#e8b4ff', '#ffd6a5']

const ABOUT_CHIPS = [
  'Web Applications',
  'Full Stack',
  'AI Prompt Eng.',
  'UI / UX',
  'Graphic Designing',
  'Wireframe',
]

function createSpark(x, y, burst = false) {
  const angle = burst
    ? Math.random() * Math.PI * 2
    : -Math.PI * 0.15 - Math.random() * Math.PI * 0.7
  const speed = burst ? 1.2 + Math.random() * 3.2 : 0.8 + Math.random() * 2.4
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1,
    decay: 0.018 + Math.random() * 0.03,
    size: 1.2 + Math.random() * 2.4,
    color: SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0],
    gravity: 0.04 + Math.random() * 0.05,
  }
}

export default function Hero() {
  const pinRef = useRef(null)
  const trackRef = useRef(null)
  const imgRef = useRef(null)
  const fillRef = useRef(null)
  const canvasRef = useRef(null)
  const barWrapRef = useRef(null)
  const [activeImg, setActiveImg] = useState(0)
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    let swapTimer
    let endTimer
    const intervalId = window.setInterval(() => {
      setGlitching(true)
      swapTimer = window.setTimeout(() => {
        setActiveImg((prev) => (prev + 1) % HERO_IMGS.length)
      }, Math.floor(GLITCH_DURATION_MS * 0.45))
      endTimer = window.setTimeout(() => {
        setGlitching(false)
      }, GLITCH_DURATION_MS)
    }, GLITCH_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
      window.clearTimeout(swapTimer)
      window.clearTimeout(endTimer)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = barWrapRef.current
    if (!canvas || !wrap) return undefined

    const ctx2d = canvas.getContext('2d')
    const sparks = []
    let lastProgress = 0
    let rafId = 0
    let running = true

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const extra = 80
      const cssW = rect.width + extra
      const cssH = rect.height
      canvas.width = Math.ceil(cssW * dpr)
      canvas.height = Math.ceil(cssH * dpr)
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`
      ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const tipXY = (progress) => {
      const offsetX = 40
      const barW = 120
      const x = offsetX + barW * Math.min(Math.max(progress, 0), 1)
      const y = wrap.clientHeight * 0.5
      return { x, y }
    }

    const spawn = (progress, velocity) => {
      const { x, y } = tipXY(progress)
      const mobile = window.matchMedia('(max-width: 768px)').matches
      const count = Math.min(
        mobile ? 6 : 14,
        1 + Math.floor(Math.abs(velocity) * (mobile ? 40 : 80)),
      )
      for (let i = 0; i < count; i += 1) {
        sparks.push(createSpark(x, y, Math.abs(velocity) > 0.012))
      }
      if (!mobile && Math.abs(velocity) > 0.02) {
        for (let i = 0; i < 4; i += 1) {
          sparks.push(createSpark(x, y, true))
        }
      }
    }

    const draw = () => {
      if (!running) return
      const w = canvas.width / Math.min(window.devicePixelRatio || 1, 2)
      const h = wrap.clientHeight
      ctx2d.clearRect(0, 0, w + 1, h + 1)

      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const s = sparks[i]
        s.vy += s.gravity
        s.x += s.vx
        s.y += s.vy
        s.vx *= 0.98
        s.life -= s.decay

        if (s.life <= 0) {
          sparks.splice(i, 1)
          continue
        }

        ctx2d.globalAlpha = Math.max(s.life, 0)
        ctx2d.fillStyle = s.color
        ctx2d.shadowBlur = 8
        ctx2d.shadowColor = s.color
        ctx2d.beginPath()
        ctx2d.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2)
        ctx2d.fill()

        ctx2d.strokeStyle = s.color
        ctx2d.lineWidth = Math.max(0.6, s.size * 0.45)
        ctx2d.beginPath()
        ctx2d.moveTo(s.x, s.y)
        ctx2d.lineTo(s.x - s.vx * 2.5, s.y - s.vy * 2.5)
        ctx2d.stroke()
      }

      ctx2d.globalAlpha = 1
      ctx2d.shadowBlur = 0
      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const pinEnd = isMobile ? '+=180%' : '+=220%'
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const gsapCtx = gsap.context(() => {
      const track = trackRef.current
      const slides = track ? Array.from(track.children) : []
      const homeSlide = slides[0]
      const aboutSlide = slides[1]

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: pinEnd,
          pin: true,
          scrub: isMobile ? 0.45 : true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (reduceMotion) return
            const progress = self.progress
            const velocity = progress - lastProgress
            const threshold = isMobile ? 0.0012 : 0.0004
            if (Math.abs(velocity) > threshold) {
              spawn(progress, velocity)
            }
            lastProgress = progress
          },
        },
      })

      tl.to(track, { xPercent: -50, ease: 'none' }, 0)
      tl.to(
        imgRef.current,
        { xPercent: isMobile ? 0 : -55, ease: 'none' },
        0,
      )
      tl.to(fillRef.current, { width: '100%', ease: 'none' }, 0)

      if (isMobile && homeSlide && aboutSlide) {
        gsap.set(homeSlide, { opacity: 1 })
        gsap.set(aboutSlide, { opacity: 0 })
        tl.to(homeSlide, { opacity: 0, ease: 'none' }, 0)
        tl.to(aboutSlide, { opacity: 1, ease: 'none' }, 0)
      }
    }, pinRef)

    return () => {
      running = false
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      gsapCtx.revert()
    }
  }, [])

  return (
    <Box id="top" className="hero-pin" ref={pinRef} component="section">
      <Box className="hero-track" ref={trackRef}>
        <Box className="hero-slide">
          <Box className="hero-copy">
            <Typography className="hero-kicker">Vinoth Sankar @</Typography>
            <Typography variant="h1" className="hero-name">
              Ganesh
            </Typography>
            <Typography className="hero-tagline">
              Designer & full-stack builder crafting futuristic brands, web apps,
              and mobile experiences.
            </Typography>
          </Box>
          <Box className="hero-visual">
            <Box className="hero-img-glow" aria-hidden />
            <Box
              className={`hero-img-wrap ${glitching ? 'is-glitching' : ''}`}
              ref={imgRef}
              style={{
                ['--hero-glitch-bg']: `url(${HERO_IMGS[activeImg]})`,
              }}
            >
              {HERO_IMGS.map((src, i) => (
                <Box
                  key={src}
                  component="img"
                  className={`hero-glitch-img ${i === activeImg ? 'is-active' : ''}`}
                  src={src}
                  alt={
                    i === 0
                      ? 'Creative graphical UI/UX designer and full stack developer'
                      : 'Creative graphical designer and developer portfolio banner'
                  }
                  aria-hidden={i !== activeImg}
                />
              ))}
              <Box className="hero-glitch-slice hero-glitch-slice--a" aria-hidden />
              <Box className="hero-glitch-slice hero-glitch-slice--b" aria-hidden />
              <Box className="hero-glitch-scan" aria-hidden />
            </Box>
          </Box>
        </Box>

        <Box className="hero-slide about-slide">
          <Box className="about-panel">
            <Typography className="section-label" sx={{ color: '#c9a0e0' }}>
              About me
            </Typography>
            <TypewriterRoles />
            <Typography className="lead">{aboutText.lead}</Typography>
            <Typography>{aboutText.body}</Typography>
            <Box className="about-chips">
              {ABOUT_CHIPS.map((chip) => (
                <Typography component="span" key={chip}>
                  {chip}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className="hero-progress">
        <Typography component="span">Scroll</Typography>
        <Box className="hero-progress-wrap" ref={barWrapRef}>
          <Box className="hero-progress-bar">
            <Box className="hero-progress-fill" ref={fillRef} />
          </Box>
          <Box
            component="canvas"
            className="hero-spark-canvas"
            ref={canvasRef}
            aria-hidden
          />
        </Box>
        <Typography component="span">About</Typography>
      </Box>
    </Box>
  )
}
