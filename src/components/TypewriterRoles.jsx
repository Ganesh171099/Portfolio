import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ROLES = [
  'Full Stack Developer',
  'UI/UX Designer',
  'Graphic Designer',
]

export default function TypewriterRoles({
  words = ROLES,
  typingMs = 70,
  eraseMs = 45,
  holdMs = 1000,
}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = words[index]
    let timer

    if (!deleting && text === full) {
      timer = setTimeout(() => setDeleting(true), holdMs)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timer = setTimeout(
        () => {
          setText((prev) =>
            deleting ? full.slice(0, prev.length - 1) : full.slice(0, prev.length + 1),
          )
        },
        deleting ? eraseMs : typingMs,
      )
    }

    return () => clearTimeout(timer)
  }, [text, deleting, index, words, typingMs, eraseMs, holdMs])

  return (
    <Typography
      variant="h2"
      className="typewriter-title"
      aria-live="polite"
    >
      <Box component="span">{text}</Box>
      <Box component="span" className="typewriter-caret" aria-hidden />
    </Typography>
  )
}
