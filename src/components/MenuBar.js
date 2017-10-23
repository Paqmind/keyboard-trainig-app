import React from 'react'

const MenuBar = () => {
  return <div>
    <input type="radio" id="beginner-mode" name="mode" value="beginner"/>
    <label htmlFor="beginner-mode">beginner</label>
    <input type="radio" id="advanced-mode" name="mode" value="advanced"/>
    <label htmlFor="advanced-mode">advanced</label>
  </div>
}

export default MenuBar