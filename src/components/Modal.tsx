import React from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FC, ReactNode } from 'react'

import './Modal.css'

export const Modal: FC<{
  title: string
  open?: boolean
  children: ReactNode
  onClose?: () => void
  onConfirm?: () => void
}> = ({ title, children, open, onClose, onConfirm }) => {
  return (
    <Dialog open={!!open} onClose={() => onClose?.()} className="modal">
      <div className="modal__content">
        <DialogPanel className="modal__panel">
          <DialogTitle className="modal__title">{title}</DialogTitle>
          {children}
          <div className="modal__actions">
            <button
              className="modal__button modal__button--cancel"
              onClick={() => onClose?.()}
            >
              Cancel
            </button>
            <button
              className="modal__button modal__button--confirm"
              onClick={() => onConfirm?.()}
            >
              Confirm
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}
