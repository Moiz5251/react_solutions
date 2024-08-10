import React, { useState } from 'react';

function FileUpload({ onFileLoaded }) {
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;
            const skus = content.split(/\r?\n/).filter(Boolean); // Split by new lines and filter out empty lines
            onFileLoaded(skus);
        };
        reader.readAsText(file);
    };

    return (
        <div>
            <input type="file" accept=".txt" onChange={handleFileChange} />
            {fileName && <p>File loaded: {fileName}</p>}
        </div>
    );
}

export default FileUpload;
