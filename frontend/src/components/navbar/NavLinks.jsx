import { NavLink } from "react-router-dom";
import { navigation } from "../../data/navigation";

function NavLinks() {
    return (
        <nav className="flex items-center gap-7">
            {navigation.map((item) => {
                const isDiscovery = item.path === "/client-discovery";

                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `
                            group
                            relative
                            inline-flex
                            items-center
                            justify-center
                            whitespace-nowrap
                            transition-all
                            duration-300
                            ease-out

                            ${
                                isDiscovery
                                    ? `
                                        rounded-xl
                                        px-4
                                        py-2.5
                                        text-sm
                                        font-bold
                                        ${
                                            isActive
                                                ? "bg-[#5EA8CC] text-white shadow-lg shadow-[#5EA8CC]/25"
                                                : "bg-[#EAF6FC] text-[#5EA8CC] hover:-translate-y-0.5 hover:bg-[#5EA8CC] hover:text-white hover:shadow-lg hover:shadow-[#5EA8CC]/20"
                                        }
                                    `
                                    : `
                                        py-2
                                        text-sm
                                        font-semibold
                                        ${
                                            isActive
                                                ? "text-[#5EA8CC]"
                                                : "text-slate-700 hover:-translate-y-0.5 hover:text-[#5EA8CC]"
                                        }
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

                                {/* Animated underline */}
                                {!isDiscovery && (
                                    <span
                                        className={`
                                            absolute
                                            -bottom-1
                                            left-0
                                            h-0.5
                                            w-full
                                            origin-left
                                            rounded-full
                                            bg-[#5EA8CC]
                                            transition-transform
                                            duration-300
                                            ease-out
                                            ${
                                                isActive
                                                    ? "scale-x-100"
                                                    : "scale-x-0 group-hover:scale-x-100"
                                            }
                                        `}
                                    />
                                )}

                                {/* Glow */}
                                {!isDiscovery && (
                                    <span
                                        className={`
                                            pointer-events-none
                                            absolute
                                            -bottom-1
                                            left-1/2
                                            h-2
                                            w-10
                                            -translate-x-1/2
                                            rounded-full
                                            bg-[#5EA8CC]/30
                                            blur-md
                                            transition-opacity
                                            duration-300
                                            ${
                                                isActive
                                                    ? "opacity-100"
                                                    : "opacity-0 group-hover:opacity-100"
                                            }
                                        `}
                                    />
                                )}

                                {/* Discovery CTA glow */}
                                {isDiscovery && (
                                    <span
                                        className="
                                            pointer-events-none
                                            absolute
                                            inset-0
                                            rounded-xl
                                            bg-[#5EA8CC]/50
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
    );
}

export default NavLinks;