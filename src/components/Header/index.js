import React from 'react'

import './style.css';

const Header = ({ title }) => {
  return (
    <header>
      <h1 className="font-weight-bold">{title ? title : 'Escolha um titulo'}</h1>
    </header>
  )
}

export default Header