import { useState, useEffect, FormEvent } from 'react'
import * as C from './App.styles';
import React from 'react'
import * as Photos from './services/photos'
import { Photo } from './types/Photo';
import { PhotoItem } from './components/PhotoItem'

export function App() {

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
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

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const formdata = new FormData(e.currentTarget);
    const file = formdata.get('image') as File;

    if (file && file.size > 0) {
      setUploading(true);
      //faz envio do arquivo
      let result = await Photos.insert(file)
      setUploading(false);

      if (result instanceof Error) {
        alert(`${result.name} - ${result.message}`)
      } else {
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList)
      }

    }

  }



  return (
    <C.Container>
      <C.Area>
        <C.Header> Galería de fotos </C.Header>

        <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" />
          {uploading && "Enviando..."}
        </C.UploadForm>

        {loading &&

          <C.ScreenWarning>
            <div className="emoji">👩‍🌾</div>
            <div>Cargando.... </div>
          </C.ScreenWarning>

        }

        {!loading && photos.length > 0 &&

          <C.PhotoList>
            {photos.map((item, index) => (
              <PhotoItem key={index} url={item.url} name={item.name} />
            ))}
          </C.PhotoList>
        }

        {!loading && photos.length === 0 &&
          <C.ScreenWarning>
            <div className="emoji">😔</div>
            <div>El album de fotos esta vacio</div>
          </C.ScreenWarning>
        }

      </C.Area>

    </C.Container>
  )
}

