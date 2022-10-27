import { Photo } from '../types/Photo'
import { storage } from '../libs/firebase'
import { ref, listAll, getDownloadURL, uploadBytes } from 'firebase/storage';
import { v4 as createId } from 'uuid'

export const getAll = async () => {

    let list: Photo[] = [];

    //locating imagesFolder in myFirebase
    const imagesFolder = ref(storage, "images");
    //read files in folder
    const photoList = await listAll(imagesFolder);

    for (let i in photoList.items) {
        let photoUrl = await getDownloadURL(photoList.items[i]);


        list.push({
            name: photoList.items[i].name,
            url: photoUrl

        })
    }

    return list;
}

export const insert = async (file: File) => {
    //includes returns true if fileType includes any of this types from this array.
    if (['image/jpeg', 'image/jpg', 'image/png', 'image/jfif'].includes(file.type)) {

        let randomName = createId();
        let newFile = ref(storage, `images/${randomName}`);

        let upload = await uploadBytes(newFile, file);
        let photoUrl = await getDownloadURL(upload.ref)

        return {
            name: upload.ref.name,
            url: photoUrl
        } as Photo


    } else {
        return new Error('Tipo de arquivo não permitido')
    }

}