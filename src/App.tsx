import { useState, useEffect } from 'react'
import * as C from './App.styles';
import React from 'react'
import * as Photos from './services/photos'
import { Photo } from './types/Photo';

export function App() {

  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);


  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      let photos = await Photos.getAll();
      setPhotos(photos);
      setLoading(false);
    }

    getPhotos();

  }, [])



  return (
    <C.Container>
      <C.Area>
        <C.Header> Galeria de fotos </C.Header>

        {/* área upload */}

        {loading && 
        
        <C.ScreenWarning>
          <div className="emoji">👩‍🌾</div>
          <div>Carregando...</div>
        </C.ScreenWarning>
          
        }

      </C.Area>

    </C.Container>
  )
}

