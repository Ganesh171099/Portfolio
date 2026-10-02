import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import {
  SiReact,
  SiNodedotjs,
  SiPhp,
  SiFigma,
  SiHtml5,
  SiCss,
} from 'react-icons/si'
import { TbBrandAdobePhotoshop, TbBrandAdobeIllustrator } from 'react-icons/tb'
import { Sparkles, Smartphone } from 'lucide-react'
import { tools } from '../data/content'
import SectionWatermark from './SectionWatermark'
import { MotionBox, MotionTypography } from './motion'
import { asset } from '../utils/asset'

const iconMap = {
  html: { Icon: SiHtml5, color: '#E34F26' },
  css: { Icon: SiCss, color: '#1572B6' },
  react: { Icon: SiReact, color: '#61DAFB' },
  node: { Icon: SiNodedotjs, color: '#339933' },
  php: { Icon: SiPhp, color: '#777BB4' },
  reactnative: { Icon: Smartphone, color: '#61DAFB' },
  ai: { Icon: Sparkles, color: '#4B006E' },
  photoshop: { Icon: TbBrandAdobePhotoshop, color: '#31A8FF' },
  illustrator: { Icon: TbBrandAdobeIllustrator, color: '#FF9A00' },
  figma: { Icon: SiFigma, color: '#A259FF' },
}

const DEV_ROWS = [
  ['html', 'css'],
  ['react', 'reactnative'],
  ['php', 'node'],
  ['ai'],
]

function ToolCard({ tool, index, fullWidth = false }) {
  const meta = iconMap[tool.icon] || iconMap.react
  const Icon = meta.Icon

  return (
    <MotionBox
      className={`tool-icon-card glass ${fullWidth ? 'is-full' : ''}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.05, duration: 0.45 }}
    >
      <Box className="tool-icon-wrap" sx={{ color: meta.color }}>
        <Icon size={36} aria-hidden />
      </Box>
      <Typography component="strong" fontWeight={700}>
        {tool.name}
      </Typography>
      <Typography component="span">{tool.category}</Typography>
    </MotionBox>
  )
}

function getTool(iconKey) {
  return tools.development.find((t) => t.icon === iconKey)
}

export default function Tools() {
  return (
    <Box id="tools" className="section" component="section">
      <Box className="section-label-row">
        <MotionTypography
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          Stack
        </MotionTypography>
        <SectionWatermark text="Tools" />
      </Box>
      <MotionTypography
        variant="h2"
        className="section-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Tools
      </MotionTypography>
      <Typography className="section-sub">
        Development tools first, design tools second — each skill backed by the
        platforms I use every day.
      </Typography>

      <Box className="tools-groups">
        <Box className="tools-group tools-group--dev">
          <Typography variant="h3">Development</Typography>

          <Box className="tools-dev-layout">
            <Box className="tools-dev-left">
              <Box className="tools-dev-intro">
                <Typography className="tools-dev-line">
                  Expert{' '}
                  <Box component="span" className="tools-dev-highlight">
                    Website, Web &amp; Mobile Applications
                  </Box>{' '}
                  Development Services engineered to upgrade and scale your
                  business
                </Typography>
              </Box>
              <MotionBox
                className="tools-dev-img-card glass"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  component="img"
                  className="tools-dev-img"
                  src={asset('dev-workflow-banner.jpg')}
                  alt="From concept to reality — idea, design, code, deploy"
                />
              </MotionBox>
            </Box>

            <Box className="tools-dev-right">
              {DEV_ROWS.map((row, rowIndex) => (
                <Box
                  key={row.join('-')}
                  className={`tools-dev-row ${row.length === 1 ? 'is-full-row' : ''}`}
                >
                  {row.map((iconKey, i) => {
                    const tool = getTool(iconKey)
                    if (!tool) return null
                    return (
                      <ToolCard
                        key={tool.name}
                        tool={tool}
                        index={rowIndex * 2 + i}
                        fullWidth={row.length === 1}
                      />
                    )
                  })}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className="tools-group">
          <Typography variant="h3">Design</Typography>
          <Box className="tools-icon-grid">
            {tools.design.map((t, i) => (
              <ToolCard key={t.name} tool={t} index={i} />
            ))}
          </Box>
          <MotionBox
            className="tools-banner-card glass"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <Box
              className="tools-banner-bg"
              sx={{ backgroundImage: `url(${asset('design-tools-banner.jpg')})` }}
            >
              <Box className="tools-banner-copy">
                <Typography className="tools-banner-line">
                  Expert Graphic Design
                </Typography>
                <Typography className="tools-banner-line">
                  Services to elevate your brand
                </Typography>
              </Box>
            </Box>
          </MotionBox>
          <Box className="tools-banner-mobile">
            <Box
              component="img"
              className="tools-banner-mobile-img"
              src={asset('design-tools-banner-mobile.jpg')}
              alt="Design tools — Photoshop, Illustrator, Figma"
            />
            <Typography className="tools-banner-caption-mobile">
              Expert Graphic Design Services to elevate your brand
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
