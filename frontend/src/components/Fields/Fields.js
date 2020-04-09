import React, { useState } from 'react'
import edit from 'assets/edit.svg'

import './Fields.scss';
import Button from "../Button/Button";


const TextInput = ({ onKeyDown, placeholder, type, onChange, onFocus, onBlur, name,
                    value }) => {
  return (
    <div className="TextInput" onKeyDown={onKeyDown}>
      <label>
        <span className="TextInput-label-text">{placeholder}</span>
        <input type={type || 'text'} className="TextInput-field" onChange={onChange}
               onFocus={onFocus} onBlur={onBlur} name={name}
               value={value} placeholder={placeholder}/>
      </label>
    </div>
  );
};

const TextArea = ({ onKeyDown, placeholder, rows, onChange, onFocus, onBlur, name,
                    value }) => {
  return (
    <div className="TextArea" onKeyDown={onKeyDown}>
      <label>
        <span className="TextInput-label-text">{placeholder}</span>
        <textarea className="TextInput-field" onChange={onChange}
                  onFocus={onFocus} onBlur={onBlur} name={name} rows={rows || 3}
                  value={value} placeholder={placeholder}/>
      </label>
    </div>
  );
};

const FileUpload = ({ helpText, label, onChange, name, value, editView }) => {
  const [img, setImg] = useState();
  const file = typeof value === 'string' ? value : value && value[0];

  if (typeof value !== 'string') {
    if (file) {
      const reader = new FileReader();
      reader.onload = reader => setImg(reader.target.result);
      reader.readAsDataURL(file);
    }
  } else if (img !== value) {
    setImg(value);
  }

  return (
    <label className={`FileUpload ${editView ? 'FileUpload--editView' : ''}`}>
      {img && file &&
      <div className="FileUpload-preview TextInput-field">
        <img src={img} alt={file.name} className="FileUpload-img" />
        <span>{file.name}</span>
      </div>}
      {editView && <img className="FileUpload-pen" src={edit} alt=""/>}
      <Button secondary label={label} span className="test" />
      <span className="TextInput-helpText">{helpText}</span>
      <input type="file" className="FileUpload-field" onChange={onChange}
             name={name}/>
    </label>
  );
};

export default { TextInput, TextArea, FileUpload }
