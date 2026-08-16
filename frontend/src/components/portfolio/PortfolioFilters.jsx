import { useState } from "react";
import { portfolioCategories } from "../../data/portfolio";

function PortfolioFilters({ onFilterChange }) {
    const [activeCategory, setActiveCategory] = useState("all");

    const handleFilterChange = (category) => {
        setActiveCategory(category);
        onFilterChange(category);
    };

    return (
        <div className="mt-16 flex justify-center">
            <div
                className="
                    flex
                    max-w-full
                    flex-wrap
                    justify-center
                    gap-2
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-2
                    shadow-sm
                "
            >
                {portfolioCategories.map((category) => {
                    const isActive =
                        activeCategory === category.id;

                    return (
                        <button
                            key={category.id}
                            type="button"
                            onClick={() =>
                                handleFilterChange(category.id)
                            }
                            className={`
                                relative
                                overflow-hidden
                                rounded-xl
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                transition-all
                                duration-300
                                ease-out
                                focus:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-[#5EA8CC]
                                focus-visible:ring-offset-2
                                ${
                                    isActive
                                        ? `
                                            bg-[#5EA8CC]
                                            text-white
                                            shadow-md
                                            shadow-[#5EA8CC]/20
                                            -translate-y-0.5
                                        `
                                        : `
                                            text-slate-600
                                            hover:bg-[#EAF6FC]
                                            hover:text-[#5EA8CC]
                                            hover:-translate-y-0.5
                                        `
                                }
                            `}
                        >
                            {/* Active shine */}
                            {isActive && (
                                <span
                                    className="
                                        pointer-events-none
                                        absolute
                                        inset-0
                                        bg-gradient-to-r
                                        from-transparent
                                        via-white/20
                                        to-transparent
                                        -translate-x-full
                                        animate-[filterShine_2s_ease-in-out_infinite]
                                    "
                                />
                            )}

                            <span className="relative z-10">
                                {category.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default PortfolioFilters;