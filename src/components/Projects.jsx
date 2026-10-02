import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import { ExternalLink, Rocket } from 'lucide-react'
import { SiGoogleplay } from 'react-icons/si'
import { projects } from '../data/content'
import { useToast } from './Toast'
import SectionWatermark from './SectionWatermark'
import { MotionBox, MotionTypography } from './motion'

const STATUS_BADGE = {
  live: { label: 'Live Website', className: 'badge-live' },
  app: { label: 'Live App', className: 'badge-live' },
  demo: { label: 'Demo Site', className: 'badge-demo' },
  inprogress: { label: 'Hosting Soon', className: 'badge-soon' },
  building: { label: 'In Motion', className: 'badge-building' },
}

function normalizeUrl(url) {
  if (!url) return null
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return `https://${url}`
}

export default function Projects() {
  const { showToast } = useToast()

  const openProject = (project) => {
    if (project.cta === 'playstore') {
      if (project.url) {
        window.open(normalizeUrl(project.url), '_blank', 'noopener,noreferrer')
      } else {
        showToast('Available on Play Store', { icon: 'hosting' })
      }
      return
    }
    if (!project.url) {
      const msg =
        project.status === 'building' ? 'Under Development' : 'Hosting Soon'
      showToast(msg, { icon: 'hosting' })
      return
    }
    window.open(normalizeUrl(project.url), '_blank', 'noopener,noreferrer')
  }

  return (
    <Box id="projects" className="section" component="section">
      <Box className="section-label-row">
        <MotionTypography
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          Build work
        </MotionTypography>
        <SectionWatermark text="Projects" />
      </Box>
      <MotionTypography
        variant="h2"
        className="section-title"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Projects
      </MotionTypography>
      <Typography className="section-sub">
        Live products, completed demos, and client systems — click a card to
        open the site, or see status when hosting is not available yet.
      </Typography>

      <Box className="projects-grid">
        {projects.map((p, i) => {
          const badge = STATUS_BADGE[p.status] || STATUS_BADGE.inprogress
          const isPlayStore = p.cta === 'playstore'
          const hasLink = Boolean(p.url) || isPlayStore

          return (
            <MotionBox
              key={p.id}
              className={`project-card glass ${hasLink ? 'is-clickable' : 'is-pending'}`}
              component="article"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: Math.min(i * 0.05, 0.3), duration: 0.45 }}
              onClick={() => openProject(p)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  openProject(p)
                }
              }}
              role="link"
              tabIndex={0}
              aria-label={
                isPlayStore
                  ? `${p.title} — Available on Play Store`
                  : `${p.title} — ${p.url ? 'Open website' : 'Hosting soon'}`
              }
            >
              <Box className="project-body">
                <Box className="project-meta-row">
                  <Typography
                    component="span"
                    className={`project-badge ${badge.className}`}
                  >
                    {badge.label}
                  </Typography>
                  {p.tag && (
                    <Typography component="span" className="project-category">
                      {p.tag}
                    </Typography>
                  )}
                </Box>
                <Typography variant="h3" component="h3">
                  {p.title}
                </Typography>
                <Typography
                  className={
                    p.descHighlight ? 'project-desc project-desc--split' : undefined
                  }
                >
                  {p.descHighlight ? (
                    <>
                      {p.desc}{' '}
                      <Box component="span" className="project-desc-accent">
                        ({p.descHighlight})
                      </Box>
                      .
                    </>
                  ) : (
                    p.desc
                  )}
                </Typography>
                {isPlayStore ? (
                  <Typography
                    component="span"
                    className="project-link project-link--store"
                  >
                    <SiGoogleplay size={16} aria-hidden />
                    Available at Play Store
                  </Typography>
                ) : p.url ? (
                  <Stack
                    direction="row"
                    className="project-links"
                    useFlexGap
                    flexWrap="wrap"
                  >
                    <Typography component="span" className="project-link">
                      Visit site <ExternalLink size={15} />
                    </Typography>
                    {p.adminUrl && (
                      <Link
                        className="project-link project-link--secondary"
                        href={normalizeUrl(p.adminUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Admin panel <ExternalLink size={15} />
                      </Link>
                    )}
                  </Stack>
                ) : (
                  <Typography
                    component="span"
                    className="project-link project-link--muted"
                  >
                    <Rocket size={14} />{' '}
                    {p.status === 'building'
                      ? 'Under Development'
                      : 'Hosting Soon'}
                  </Typography>
                )}
              </Box>
            </MotionBox>
          )
        })}
      </Box>
    </Box>
  )
}
