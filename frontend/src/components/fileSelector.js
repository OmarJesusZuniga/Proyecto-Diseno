import "../components/fileSelector.css"
import { useState } from "react";
import axios from 'axios'

const FileSelector = ({ fileIncluded }) => { 
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
        axios.post('https://proyecto-diseno-ol06.onrender.com/api/image', formData)
        .then(res => { fileIncluded(res.data) })
        .catch(e => console.log(e))
    }

    const eliminarImagen = () => {
        URL.revokeObjectURL(previewUrl); // Release the object URL
        setFile(null);
        setPreviewUrl(null);
    };

    return (
        <div className="File-Selector-ImgPDF">
            <input type="file" onChange={cambioArchivo}/>
            <button onClick={subirArchivo}>Subir</button>
            {previewUrl && <img src={previewUrl} alt="Preview" />}
        </div>
    );
}

export default FileSelector;