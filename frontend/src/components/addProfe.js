// AddProfe.js
import React, { useEffect, useState } from 'react';
import FileSelector from "../components/fileSelector";
import ProfessorFacade from '../PatronFacade/ProfeFacade';

const AddProfe = ({ campus, setCambios }) => {
    const [file, setFile] = useState();
    const [officePhone, setOfficePhone] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [nombre, setNombre] = useState('');
    const [segundoNombre, setSegunNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [segundoApellido, setSegunAPellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContra] = useState('');
    const [actualImage, setActualImage] = useState('');
    const [previewURL, setPreviewUrl] = useState('');
    const [path, setPath] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const path = await ProfessorFacade.getPath();
                setPath(path);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (actualImage) {
            setPreviewUrl(path + actualImage.img);
        }
    }, [actualImage, path]);

    const handleNombre = (e) => setNombre(e.target.value);
    const handleSegunNombre = (e) => setSegunNombre(e.target.value);
    const handleApellido = (e) => setApellido(e.target.value);
    const handleSegunApellido = (e) => setSegunAPellido(e.target.value);
    const handleCorreo = (e) => setCorreo(e.target.value);
    
    const handleChange = (e) => setFile(URL.createObjectURL(e.target.files[0]));

    const handleOfficePhoneChange = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        let formattedInput = '';
        if (input.length <= 4) {
            formattedInput = input;
        } else if (input.length <= 8) {
            formattedInput = `${input.slice(0, 4)}-${input.slice(4)}`;
        } else {
            formattedInput = `${input.slice(0, 4)}-${input.slice(4, 8)} [extensión ${input.slice(8)}]`;
        }
        setOfficePhone(formattedInput);
        e.target.value = formattedInput;
    };

    const handlePhoneChange = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        let formattedInput = '';
        if (input.length <= 4) {
            formattedInput = input;
        } else if (input.length <= 8) {
            formattedInput = `${input.slice(0, 4)}-${input.slice(4)}`;
        } else {
            formattedInput = `${input.slice(0, 4)}-${input.slice(4, 8)} [extensión ${input.slice(8)}]`;
        }
        setPhoneNum(formattedInput);
        e.target.value = formattedInput;
    };

    const handleContraseña = (e) => {
        const input = e.target.value.replace(/\D/g, '');
        setContra(input);
        e.target.value = input;
    };

    const addProfe = async () => {
        try {
            const code = await ProfessorFacade.getLastProfessorCode(campus);

            const hyphenIndex = code.indexOf("-");
            const extractedCode = hyphenIndex !== -1 ? code.substring(0, hyphenIndex) : code;
            const extractedNumber = hyphenIndex !== -1 ? parseInt(code.substring(hyphenIndex + 1)) : null;
            const newNumber = extractedNumber + 1;
            const newCode = `${extractedCode}-${newNumber}`;

            const numOficina = parseInt(officePhone.replace(/\D/g, ''));
            const numTel = parseInt(phoneNum.replace(/\D/g, ''));

            const professorData = {
                code: newCode,
                firstLastname: apellido,
                secondLastname: segundoApellido,
                firstname: nombre,
                middlename: segundoNombre,
                email: correo,
                officeNumber: numOficina,
                phoneNumber: numTel,
                campus: campus,
                password: contraseña,
                ...(actualImage && { image: actualImage._id })
            };

            await ProfessorFacade.addProfessor(professorData);
            setCambios('cambio');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="principal">
            <h2>Información profesor</h2>
            <h4>Escriba el nombre</h4>
            <div className="input-box">
                <input onChange={handleNombre} type="text" placeholder='Nombre' required />
            </div>
            <h4>Escriba el segundo nombre </h4>
            <div className="input-box">
                <input onChange={handleSegunNombre} type="text" placeholder='Segundo Nombre' required />
            </div>
            <h4>Escriba el apellido</h4>
            <div className="input-box">
                <input onChange={handleApellido} type="text" placeholder='Primer Apellido' required />
            </div>
            <h4>Escriba el segundo apellido</h4>
            <div className="input-box">
                <input onChange={handleSegunApellido} type="text" placeholder='Segundo Apellido' required />
            </div>
            <h4>Escriba el correo</h4>
            <div className="input-box">
                <input onChange={handleCorreo} type="text" placeholder='Correo' required />
            </div>
            <h4>Escriba el teléfono celular</h4>
            <div className="input-box">
                <input type="text" onChange={handlePhoneChange} placeholder='Teléfono celular' required />
            </div>
            <h4>Escriba el teléfono oficina</h4>
            <div className="input-box">
                <input type="text" onChange={handleOfficePhoneChange} placeholder='Teléfono oficina' required />
            </div>
            <h4>Escriba la contraseña</h4>
            <div className="input-box">
                <input type="text" onChange={handleContraseña} placeholder='Contraseña' required />
            </div>
            <h4>Añada imagen (opcional)</h4>
            <div className="input-box">
                <FileSelector fileIncluded={setActualImage} />
                {previewURL === '' ? <img src={previewURL} alt="Preview" /> : <p>Loading image...</p>}
            </div>
            <div className="input-box"></div>
            <button onClick={addProfe}>Agregar Profesor</button>
        </div>
    );
};

export default AddProfe;
