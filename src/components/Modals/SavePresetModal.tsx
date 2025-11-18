import { X } from 'lucide-react'
import { useState } from 'react'
import './SavePresetModal.css'

interface SavePresetModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string) => void
}

export const SavePresetModal = ({ isOpen, onClose, onSave }: SavePresetModalProps) => {
  const [name, setName] = useState('')

  if (!isOpen) return null

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim())
      setName('')
      onClose()
    }
  }

  return (
    <div className="save-preset-modal__overlay">
      <div className="save-preset-modal">
        <div className="save-preset-modal__header">
          <h3 className="save-preset-modal__title">Give me a name</h3>
          <button onClick={onClose} className="save-preset-modal__close">
            <X size={24} />
          </button>
        </div>

        <div className="save-preset-modal__content">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Name it"
            autoFocus
            onKeyPress={e => e.key === 'Enter' && handleSave()}
            className="save-preset-modal__input"
          />

          <p className="save-preset-modal__description">
            By adding this effect as a present you can reuse this anytime.
          </p>

          <div className="save-preset-modal__buttons">
            <button
              onClick={onClose}
              className="save-preset-modal__btn save-preset-modal__btn--cancel"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!name.trim()}
              className={`save-preset-modal__btn save-preset-modal__btn--save ${
                !name.trim() ? 'save-preset-modal__btn--disabled' : ''
              }`}
            >
              Save Preset
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
