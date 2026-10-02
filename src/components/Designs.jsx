import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {
  Award,
  Image,
  BookOpen,
  Share2,
  LayoutTemplate,
} from 'lucide-react'
import { designs } from '../data/content'
import SectionWatermark from './SectionWatermark'
import { MotionBox, MotionTypography } from './motion'

const iconMap = {
  brand: Award,
  banner: Image,
  brochure: BookOpen,
  social: Share2,
  wireframe: LayoutTemplate,
}

export default function Designs() {
  return (
    <Box id="designs" className="section" component="section">
      <Box className="section-label-row">
        <MotionTypography
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          Visual work
        </MotionTypography>
        <SectionWatermark text="Designs" />
      </Box>
      <MotionTypography
        variant="h2"
        className="section-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Designs
      </MotionTypography>
      <Typography className="section-sub">
        Brand systems, campaigns, print, social, and wireframes — visual craft
        that supports the products I build.
      </Typography>

      <Box className="designs-layout">
        <MotionBox
          className="designs-visual-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Box
            component="img"
            className="designs-visual-img"
            src="/designs-banner.jpg"
            alt="Graphic designing service — creative visuals for modern brands"
          />
        </MotionBox>

        <Box className="designs-grid">
          {designs.map((d, i) => {
            const Icon = iconMap[d.icon] || Award
            return (
              <MotionBox
                key={d.id}
                className="design-icon-card glass"
                component="article"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: i * 0.05, duration: 0.45 }}
              >
                <Box className="design-icon-left">
                  <Icon size={28} aria-hidden />
                </Box>
                <Box className="design-icon-right">
                  <Typography variant="h3" component="h3">
                    {d.title}
                  </Typography>
                  <Typography component="span">{d.type}</Typography>
                </Box>
              </MotionBox>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}
