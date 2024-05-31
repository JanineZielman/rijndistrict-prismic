"use client";
import { useState, useEffect } from "react";

export const FileUpload = ({idName, addGrid}) => {
  const [file, setFile] = useState();
  const [fileEnter, setFileEnter] = useState(false);

  function resetFile(){
    let ele = document.getElementsByClassName('square');
    for(let i = 0; i < ele.length; i++) {
      ele[i].style.backgroundImage = ""; 
    }
    setFile("")
  }
  

  return (
    <div className="drag-file" id={idName}>
      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setFileEnter(true);
          }}
          onDragLeave={(e) => {
            setFileEnter(false);
          }}
          onDragEnd={(e) => {
            e.preventDefault();
            setFileEnter(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            setFileEnter(false);
            if (e.dataTransfer.items) {
              [...e.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                  const file = item.getAsFile();
                  if (file) {
                    let blobUrl = URL.createObjectURL(file);
                    setFile(blobUrl);
                  }
                  console.log(`items file[${i}].name = ${file?.name}`);
                }
              });
            } else {
              [...e.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
              });
            }
          }}
          className={`${
            fileEnter ? "border-4" : "border-2"
          } mx-auto  bg-white flex flex-col w-full max-w-xs h-72 border-dashed items-center justify-center`}
        >
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={(e) => {
              console.log(e.target.files);
              let files = e.target.files;
              if (files && files[0]) {
                let blobUrl = URL.createObjectURL(files[0]);
                setFile(blobUrl);
                if (addGrid) {addGrid()};
              }
            }}
          />
        </div>
      ) : (
        <>
          <object
            className=""
            data={file}
            type="image/png" //need to be updated based on type of file
          />
          <button
            onClick={() => resetFile()}
            className="reset-button"
          >
            Reset
          </button>
        </>
      )}
    </div>
  );
};