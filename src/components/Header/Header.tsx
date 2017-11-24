import * as React from 'react'
import Menu from '../Menu/Menu'
import User from '../User/User'
require('./styles.css')
import { IMenuProps } from '../Menu/Menu'
import { IUserProps } from '../User/User'

interface IHeaderProps extends IMenuProps, IUserProps {
  brand: string,
  actions: any
}

export function Header (props: IHeaderProps) {
  return (
    <header className="ts-header" role="banner">
      <button className="ts-header--btn">
        <span className="ts-flex-wrapper">
          <span className="ts-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M3.53 8H13a2.5 2.5 0 0 0 4.9 0h2.57a.5.5 0 1 0 0-1H17.9A2.5 2.5 0 0 0 13 7H3.53a.5.5 0 1 0 0 1zm11.92-2a1.5 1.5 0 0 1 1.41 1 1.434 1.434 0 0 1 0 1 1.494 1.494 0 0 1-2.82 0 1.434 1.434 0 0 1 0-1 1.5 1.5 0 0 1 1.41-1zM3 16.5a.515.515 0 0 0 .53.5H6.1a2.5 2.5 0 0 0 4.9 0h9.47a.5.5 0 1 0 0-1H11a2.5 2.5 0 0 0-4.9 0H3.53a.515.515 0 0 0-.53.5zm4.14.5a1.434 1.434 0 0 1 0-1 1.494 1.494 0 0 1 2.82 0 1.434 1.434 0 0 1 0 1 1.494 1.494 0 0 1-2.82 0z" fill="#37454d"></path>
            </svg>
          </span> Filters
        </span>
      </button>
      <a href="http://www.wedjago.com" className="ts-logo">
        wedjago
      </a>
      <button className="ts-header--btn ts-header--btn__right">
        <span className="ts-flex-wrapper">
          <span className="ts-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M20.47 12H3.53a.5.5 0 1 0 0 1h16.94a.5.5 0 1 0 0-1zM20.47 18H3.53a.5.5 0 1 0 0 1h16.94a.5.5 0 1 0 0-1zM3.53 7h16.94a.5.5 0 1 0 0-1H3.53a.5.5 0 1 0 0 1z" fill="#37454d"></path>
            </svg>
          </span>
          Menu
        </span>
      </button>
    </header>
  )
}