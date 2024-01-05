const TextAreaGroup = ({ label, tagFor, cols, rows, placeholder, parentClass, labelClass, inputClass, defaultValue, rest, onChangeEvent }) => {
    return (
        <>
            <div className={parentClass || "flex flex-col gap-2"}>
                <label htmlFor={tagFor} className={labelClass || "text-base font-bold"}>{label}</label>
                <textarea
                    name={tagFor}
                    id={tagFor}
                    cols={cols}
                    rows={rows}
                    className={inputClass || "py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    onChange={onChangeEvent}
                    {...rest}
                ></textarea>
            </div>
        </>
    )
}

export default TextAreaGroup