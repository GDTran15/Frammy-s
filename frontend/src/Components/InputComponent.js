export default function InputComponent({labelText,changeHandle, inputType, inputValue,placeholderValue}){
    return (
        <>
            <div className="mb-3">
                <label  className="form-label">{labelText}</label>
                <input onChange={changeHandle}
                 type={inputType}
                 className="form-control bg-body-tertiary" 
                 value={inputValue} 
                 placeholder={placeholderValue}/>
                </div>
        </>
    )
}