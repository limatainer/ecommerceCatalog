import React from 'react'
import './styles.css'
type Props = {
  name: string
}

export default function CategoryBadge({ name }: Props) {
  return (
    <div className='category-badge-container'><p>{name}</p></div>
  )
}
