'use client'

import { useEffect, useState } from 'react'
import Nav from '../../components/Nav'

export default function PhotosPage() {
  const [selfies, setSelfies] = useState([])

  useEffect(() => {
    const savedSelfies = JSON.parse(
      localStorage.getItem('selfies') || '[]'
    )

    setSelfies(savedSelfies)
  }, [])

  return (
    <main className="page">
      <Nav />

      <section className="wide">
        <h1 className="title">Photo Wall</h1>

        {selfies.length === 0 ? (
          <div className="empty paper">
            No selfies yet ♡
          </div>
        ) : (
          <div className="photoGrid">
            {selfies.map((photo) => (
              <figure className="polaroid" key={photo.id}>
                <img
                  src={photo.image_url}
                  alt="virtual date selfie"
                />

                <figcaption>
                  {photo.place}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}