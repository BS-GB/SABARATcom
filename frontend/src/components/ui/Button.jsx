function Button({ children, type = "button", onClick, className = "" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;