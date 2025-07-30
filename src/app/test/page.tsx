'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function TestPage() {
  const [url, setUrl] = useState(
    'https://res.cloudinary.com/djzxhtqfj/image/upload/e_gen_remove:tree/w2wnfpdizc6vw7hfelpb.png'
  )

  return (
    <div style={{ padding: '40px' }}>
      <h2>Test Image Render</h2>
      <Image
        src={url}
        alt="Test"
        width={500}
        height={500}
        style={{ objectFit: 'contain' }}
      />
    </div>
  )
}
