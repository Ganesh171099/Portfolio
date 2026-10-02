import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Rocket } from 'lucide-react'
import './Toast.css'

const ToastContext = createContext(null)

const ICONS = {
  hosting: Rocket,
}

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  const showToast = useCallback((message, options = {}) => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    setToast({
      id: Date.now(),
      message,
      icon: options.icon || null,
    })
    timerRef.current = window.setTimeout(
      () => setToast(null),
      options.duration ?? 2800,
    )
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  const Icon = toast?.icon ? ICONS[toast.icon] : null

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast &&
        createPortal(
          <Box className="toast-root" role="status" aria-live="polite">
            <Box key={toast.id} className="toast-item glass">
              {Icon && (
                <Box component="span" className="toast-icon" aria-hidden>
                  <Icon size={20} />
                </Box>
              )}
              <Typography component="span" className="toast-message">
                {toast.message}
              </Typography>
            </Box>
          </Box>,
          document.body,
        )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
