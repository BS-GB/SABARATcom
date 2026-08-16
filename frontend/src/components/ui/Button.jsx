function Button({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    className = "",
    onClick,
    disabled = false,
}) {
    const variants = {
        primary:
            "bg-[#5EA8CC] text-white hover:bg-[#4C96BA]",

        secondary:
            "bg-slate-900 text-white hover:bg-slate-800",

        outline:
            "border border-[#5EA8CC] text-[#5EA8CC] hover:bg-[#EAF6FC]",

        ghost:
            "text-slate-700 hover:bg-slate-100",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                rounded-xl
                font-semibold
                transition-all
                duration-300
                disabled:cursor-not-allowed
                disabled:opacity-60
                ${variants[variant]}
                ${sizes[size]}
                ${className}
            `}
        >
            {children}
        </button>
    );
}

export default Button;