export default function InputComponent({labelText,changeHandle, inputType, inputValue,placeholderValue,validationError}){
    return (
        <>
            <div className="mb-3">
                <div className="d-flex justify-content-between">
                <label  className="form-label">{labelText}</label>
                {validationError && <p className="mb-0 text-danger">*{validationError}</p>}
                </div>
                <input onChange={changeHandle}
                 type={inputType}
                 className="form-control bg-body-tertiary" 
                 value={inputValue} 
                 
                 placeholder={placeholderValue}/>
                </div>
        </>
    )
}