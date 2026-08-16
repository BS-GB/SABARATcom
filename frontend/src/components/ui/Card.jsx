function Card({
    children,
    className = "",
}) {
    return (
        <article
            className={`
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-xl
                ${className}
            `}
        >
            {children}
        </article>
    );
}

export default Card;