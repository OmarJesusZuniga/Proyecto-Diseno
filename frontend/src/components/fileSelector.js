import "../components/fileSelector.css"
import { useState } from "react";
import axios from 'axios'

const FileSelector = () => { 
    const [file, setFile] = useState(null); 
    const [previewUrl, setPreviewUrl] = useState(null);

    const cambioArchivo = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    }

    const subirArchivo = () => {
        const formData = new FormData()
        formData.append('file', file)
        axios.post('http://localhost:4000/api/image', formData)
        .then(res => {})
        .catch(e => console.log(e))
    }

    return (
        <div className="File-Selector-ImgPDF">
            <input type="file" onChange={cambioArchivo}/>
            <button onClick={subirArchivo}>Subir</button>
            {previewUrl && <img src={previewUrl} alt="Preview" />}
        </div>
    );
}

export default FileSelector;