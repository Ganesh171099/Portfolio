import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { skills } from '../data/content'
import SectionWatermark from './SectionWatermark'
import { MotionBox, MotionTypography } from './motion'
import { asset } from '../utils/asset'

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
}

const DEV_IMAGES = [
  {
    src: asset('skills-dev-1.jpg'),
    alt: 'Fullstack web development — Think. Code. Innovate.',
    span: 2,
  },
  {
    src: asset('skills-dev-2.png'),
    alt: 'Breaking Code',
    span: 1,
  },
  {
    src: asset('skills-dev-3.jpg'),
    alt: 'Vibe Coding — Build apps by talking, fast',
    span: 1,
  },
]

export default function Skills() {
  return (
    <Box id="skills" className="section" component="section">
      <Box className="section-label-row">
        <MotionTypography
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          What I do
        </MotionTypography>
        <SectionWatermark text="Skills" />
      </Box>
      <MotionTypography
        variant="h2"
        className="section-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Skills
      </MotionTypography>
      <Typography className="section-sub">
        Development-first craft, backed by design thinking — from interfaces and
        applications to visual systems that move brands.
      </Typography>

      <Box className="skills-grid">
        <Box className="skills-group skills-group--dev">
          <Typography variant="h3">Development</Typography>

          <Box className="skills-media-row">
            {DEV_IMAGES.map((img, i) => (
              <MotionBox
                key={img.src}
                className={`skills-media-card ${img.span === 2 ? 'is-wide' : ''}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.45 }}
              >
                <Box
                  component="img"
                  className="skills-media-img"
                  src={img.src}
                  alt={img.alt}
                />
              </MotionBox>
            ))}
          </Box>

          <Box className="skills-cards">
            {skills.development.map((s, i) => (
              <MotionBox
                key={s.title}
                className="skill-card glass"
                component="article"
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                <Typography variant="h4" component="h4">
                  {s.title}
                </Typography>
                <Typography>{s.desc}</Typography>
              </MotionBox>
            ))}
          </Box>
        </Box>

        <Box className="skills-group skills-group--design">
          <Typography variant="h3">Design</Typography>

          <Box className="skills-design-layout">
            <MotionBox
              className="skills-design-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Box className="skills-design-visual">
                <Box
                  component="img"
                  className="skills-media-img"
                  src={asset('skills-design-graphic.png')}
                  alt="Graphic Designing"
                />
              </Box>
              <Box className="skills-design-copy glass">
                <Typography variant="h4" component="h4">
                  {skills.design[0].title}
                </Typography>
                <Typography>{skills.design[0].desc}</Typography>
              </Box>
            </MotionBox>

            <MotionBox
              className="skills-design-col"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
            >
              <Box className="skills-design-visual">
                <Box
                  component="img"
                  className="skills-media-img"
                  src={asset(skills.design[1].image)}
                  alt="UI / UX Designing"
                />
              </Box>
              <Box className="skills-design-copy glass">
                <Typography variant="h4" component="h4">
                  {skills.design[1].title}
                </Typography>
                <Typography>{skills.design[1].desc}</Typography>
              </Box>
            </MotionBox>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
