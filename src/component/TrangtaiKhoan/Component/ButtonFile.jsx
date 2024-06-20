import React, { useRef } from 'react';

const FileUploadButton = () => {
    const fileInputRef = useRef(null);

    const handleFileUpload = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        // if (file) {
    // const formData = new FormData();
    // formData.append('file', file);

    // fetch('http://localhost:3000/upload', {
    //   method: 'POST',
    //   body: formData,
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    // })
    // .catch(error => {
    //   console.error('Error:', error);
    // });
        // Xử lý file ở đây, ví dụ: upload file lên server, hiển thị thông tin file, ...
    };

    return (
        <div className='h-full flex w-72 justify-end items-center pr-3'>
            <div className="custom-file-upload border-[#83a3ff] hover:border-2 transition duration-150 ease-in-out  w-20 p-[4px] text-[#83a3ff] bg-[#e9efff] rounded-xl text-center" onClick={handleFileUpload}>
                Upload
            </div>
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        </div>
    );
};

export default FileUploadButton;