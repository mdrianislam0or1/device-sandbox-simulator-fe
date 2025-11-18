import { Check } from 'lucide-react'
import { useEffect } from 'react'
import './Toast.css'

interface ToastProps {
  message: string
  isVisible: boolean
  onClose: () => void
  duration?: number
}

export const Toast = ({ message, isVisible, onClose, duration = 3000 }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose])

  if (!isVisible) return null

  return (
    <div className="toast-container">
      <div className="toast">
        <div className="toast__icon-wrapper">
          <div className="toast__icon-circle">
            <Check size={24} strokeWidth={3} color="#FFFFFF" />
          </div>
        </div>

        <p className="toast__message">{message}</p>
      </div>
    </div>
  )
}
