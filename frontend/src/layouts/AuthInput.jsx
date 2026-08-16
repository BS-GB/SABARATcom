function AuthInput({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    autoComplete,
    required = true,
    disabled = false,
}) {
    return (
        <div className="space-y-2">

            <label
                htmlFor={name}
                className="block text-sm font-bold text-slate-200"
            >
                {label}
            </label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                required={required}
                disabled={disabled}
                className="
                    w-full
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    px-4
                    py-3.5
                    text-sm
                    text-white
                    outline-none
                    placeholder:text-slate-600
                    transition-all
                    duration-300
                    focus:border-[#5EA8CC]
                    focus:bg-white/[0.06]
                    focus:ring-4
                    focus:ring-[#5EA8CC]/10
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            />

        </div>
    );
}

export default AuthInput;