import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navigation } from "../../data/navigation";
import Button from "../ui/Button";

function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative md:hidden">

            {/* Menu Button */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                className="
                    relative
                    z-50
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    text-slate-700
                    shadow-sm
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-[#5EA8CC]/40
                    hover:text-[#5EA8CC]
                    hover:shadow-md
                "
            >
                <span
                    className={`
                        absolute
                        h-0.5
                        w-5
                        rounded-full
                        bg-current
                        transition-all
                        duration-300
                        ${
                            isOpen
                                ? "rotate-45"
                                : "-translate-y-1.5"
                        }
                    `}
                />

                <span
                    className={`
                        absolute
                        h-0.5
                        w-5
                        rounded-full
                        bg-current
                        transition-all
                        duration-300
                        ${
                            isOpen
                                ? "-rotate-45"
                                : "translate-y-1.5"
                        }
                    `}
                />
            </button>


            {/* Mobile Menu */}
            <div
                className={`
                    absolute
                    right-0
                    top-14
                    z-40
                    w-[min(92vw,380px)]
                    origin-top-right
                    transition-all
                    duration-300
                    ease-out

                    ${
                        isOpen
                            ? "visible translate-y-0 scale-100 opacity-100"
                            : "invisible -translate-y-3 scale-95 opacity-0"
                    }
                `}
            >
                <div
                    className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                        shadow-2xl
                        shadow-slate-900/10
                    "
                >

                    {/* Header */}
                    <div className="mb-3 border-b border-slate-100 pb-3">
                        <p className="px-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                            Navigation
                        </p>
                    </div>


                    {/* Navigation */}
                    <nav className="flex flex-col gap-1">

                        {navigation.map((item) => {
                            const isDiscovery =
                                item.path === "/client-discovery";

                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={closeMenu}
                                    className={({ isActive }) =>
                                        `
                                        group
                                        relative
                                        flex
                                        items-center
                                        rounded-xl
                                        px-4
                                        py-3
                                        font-semibold
                                        transition-all
                                        duration-300

                                        ${
                                            isDiscovery
                                                ? `
                                                    mt-2
                                                    justify-center
                                                    ${
                                                        isActive
                                                            ? "bg-[#5EA8CC] text-white shadow-lg shadow-[#5EA8CC]/20"
                                                            : "bg-[#EAF6FC] text-[#5EA8CC] hover:bg-[#5EA8CC] hover:text-white hover:shadow-lg hover:shadow-[#5EA8CC]/20"
                                                    }
                                                `
                                                : `
                                                    ${
                                                        isActive
                                                            ? "bg-[#EAF6FC] text-[#5EA8CC]"
                                                            : "text-slate-700 hover:bg-slate-50 hover:text-[#5EA8CC]"
                                                    }
                                                    hover:translate-x-1
                                                `
                                        }
                                        `
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <span className="relative z-10">
                                                {item.name}
                                            </span>

                                            {/* Active indicator */}
                                            {!isDiscovery && isActive && (
                                                <span
                                                    className="
                                                        absolute
                                                        right-3
                                                        h-2
                                                        w-2
                                                        rounded-full
                                                        bg-[#5EA8CC]
                                                        shadow-[0_0_10px_rgba(94,168,204,0.7)]
                                                    "
                                                />
                                            )}

                                            {/* Discovery glow */}
                                            {isDiscovery && (
                                                <span
                                                    className="
                                                        pointer-events-none
                                                        absolute
                                                        inset-0
                                                        rounded-xl
                                                        bg-[#5EA8CC]/20
                                                        opacity-0
                                                        blur-xl
                                                        transition-opacity
                                                        duration-300
                                                        group-hover:opacity-100
                                                    "
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}

                    </nav>


                    {/* Divider */}
                    <div className="my-4 h-px bg-slate-100" />


                    {/* Login */}
                    <NavLink
                        to="/login"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `
                            flex
                            items-center
                            rounded-xl
                            px-4
                            py-3
                            font-semibold
                            transition-all
                            duration-300

                            ${
                                isActive
                                    ? "bg-slate-100 text-[#5EA8CC]"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-[#5EA8CC]"
                            }
                            `
                        }
                    >
                        Login
                    </NavLink>


                    {/* Request Quote */}
                    <div className="mt-3">
                        <Button
                            className="w-full"
                            onClick={closeMenu}
                        >
                            Request Quote
                        </Button>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default MobileMenu;