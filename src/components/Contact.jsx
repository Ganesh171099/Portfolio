import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import { Mail, ArrowUpRight } from 'lucide-react'
import { MotionBox } from './motion'
import { asset } from '../utils/asset'

const GMAIL_URL = 'mailto:gd17designer@gmail.com'

export default function Contact() {
  return (
    <Box id="contact" className="section contact-section" component="section">
      <MotionBox
        className="contact-card glass"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
      >
        <Box>
          <Typography className="section-label">
            Let&apos;s collaborate
          </Typography>
          <Typography variant="h2" component="h2">
            Ready to build something extraordinary?
          </Typography>
          <Typography>
            Whether you need a brand system, a multi-login web app, or a mobile
            product — let&apos;s turn the idea into a polished experience.
          </Typography>
          <Stack
            className="contact-actions"
            direction={{ xs: 'column', sm: 'row' }}
            useFlexGap
          >
            <Link
              className="btn-primary"
              href={GMAIL_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail size={18} /> Email me
            </Link>
            <Link className="btn-ghost" href="#projects">
              View projects <ArrowUpRight size={18} />
            </Link>
          </Stack>
        </Box>
        <Box className="contact-aside">
          <Typography className="small-name">Vinoth Sankar @</Typography>
          <Box
            component="img"
            className="contact-logo"
            src={asset('logo-ganesh-contact.png?v=3')}
            alt="Ganesh"
          />
        </Box>
      </MotionBox>

      <Typography className="footer-note">
        © {new Date().getFullYear()}· Designed & developed by Vinoth Sankar @
        Ganesh
      </Typography>
    </Box>
  )
}
