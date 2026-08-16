function Input({
    type = "text",
    placeholder = "",
    value,
    onChange,
    name,
    id,
    disabled = false,
    className = "",
}) {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            id={id}
            disabled={disabled}
            className={`
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                px-4
                py-3
                text-slate-900
                outline-none
                transition-all
                duration-300
                placeholder:text-slate-400
                focus:border-[#5EA8CC]
                focus:ring-4
                focus:ring-[#5EA8CC]/20
                disabled:cursor-not-allowed
                disabled:bg-slate-100
                ${className}
            `}
        />
    );
}

export default Input;