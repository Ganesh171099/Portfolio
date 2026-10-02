import Typography from '@mui/material/Typography'

export default function SectionWatermark({ text }) {
  return (
    <Typography
      component="span"
      className="section-watermark"
      aria-hidden="true"
      sx={{
        fontSize: { md: 'clamp(4.5rem, 10vw, 8.5rem) !important' },
        lineHeight: '0.85 !important',
        fontWeight: '800 !important',
        fontFamily: "var(--font-display) !important",
        letterSpacing: '-0.04em',
      }}
    >
      {text}
    </Typography>
  )
}
