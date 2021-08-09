import React, {useState, useCallback} from 'react'
import Cropper from 'react-easy-crop'
import { readFile, saveCroppedImage } from '../../helpers/images'


function Photos() {
    const [imageSrc, setImageSrc] = useState(null)
    const [crop, setCrop] = useState({ x:0, y:0})
    const [zoom, setZoom] = useState(1)
    const [fileName, setFileName] = useState(null)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const onCropComplete = useCallback((croppedArea, _croppedAreaPixels) => {
        setCroppedAreaPixels(_croppedAreaPixels)
    }, [])

    const handleFileChange = async (e) => {
        if(e.target.files && e.target.files.length>0){
            const file = e.target.files[0]
            setFileName(file.path)
            const imageDataUrl = await readFile(file)
            setImageSrc(imageDataUrl)
        }
    }

    const handleSave = () => {
        // first - we want to save the cropped image
        // new function that takes croppedAreaPixelsand fileName and imageSrc
        saveCroppedImage(fileName, imageSrc, croppedAreaPixels)
        setImageSrc(null)
        setZoom(1)
        setCrop({x: 0, y: 0})
    }

    if(!imageSrc) {
        return (
        <>
        <h1>Please choose a photo to crop</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        </>
        )
    }

    return (
        <div className="crop-area">
        <Cropper
        crop={crop}
        zoom={zoom}
        aspect={4 / 3}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        image={imageSrc}
        />
        <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
    )
}

export default Photos