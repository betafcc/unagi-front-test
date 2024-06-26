import React, { FC } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

import './Actions.css'
import { Order, orders } from '../lib/useCollection'

export const Actions: FC<{
  orderBy: (order: Order) => void
  openCreate: () => void
}> = ({ orderBy, openCreate }) => {
  return (
    <div className="actions">
      <button onClick={() => openCreate()}>+ New Card</button>
      <Menu>
        <MenuButton>Order ↓</MenuButton>
        <MenuItems anchor="bottom">
          {orders.map((order) => (
            <MenuItem key={order}>
              <button
                className="actions__option"
                onClick={() => orderBy(order)}
              >
                {order}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  )
}
