const FormInputGroup = ({ label, tagFor, type, placeholder, parentClass, labelClass, inputClass, onchangeEvent, defaultValue, rest }) => {
    return (
        <>
            <div className={parentClass || "flex flex-row gap-2 items-center"}>
                <label htmlFor={tagFor} className={labelClass || "text-base font-bold"}>{label}</label>
                <input
                    type={type}
                    name={tagFor}
                    id={tagFor}
                    className={inputClass || "py-3 px-4 ml-auto block w-3/4 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"}
                    placeholder={placeholder}
                    onChange={onchangeEvent}
                    defaultValue={defaultValue}
                    {...rest}
                />
            </div>
        </>
    )
}

export default FormInputGroup