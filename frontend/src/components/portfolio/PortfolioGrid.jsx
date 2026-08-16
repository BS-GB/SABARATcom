import { useState } from "react";

import Container from "../ui/Container";
import { portfolio } from "../../data/portfolio";
import PortfolioFilters from "./PortfolioFilters";
import PortfolioCard from "./PortfolioCard";

function PortfolioGrid() {
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredProjects =
        activeCategory === "all"
            ? portfolio
            : portfolio.filter(
                (project) => project.category === activeCategory
            );

    return (
        <section
            id="portfolio-projects"
            className="bg-slate-50 py-24 lg:py-28"
        >
            <Container>

                {/* =========================
                    Section Header
                ========================= */}
                <div className="mx-auto max-w-3xl text-center">

                    <span
                        className="
                            inline-flex
                            rounded-full
                            bg-[#EAF6FC]
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-[#5EA8CC]
                            animate-[fadeIn_0.6s_ease-out]
                        "
                    >
                        Selected Work
                    </span>

                    <h2
                        className="
                            mt-5
                            text-4xl
                            font-extrabold
                            tracking-tight
                            text-slate-900
                            lg:text-5xl
                            animate-[appear_0.8s_ease-out_forwards]
                        "
                    >
                        Projects We’re Proud Of
                    </h2>

                    <p
                        className="
                            mt-5
                            text-lg
                            leading-8
                            text-slate-600
                            animate-[fadeIn_1s_ease-out]
                        "
                    >
                        Explore some of the projects and campaigns we have
                        created to help businesses build stronger brands and
                        achieve better results.
                    </p>

                </div>


                {/* =========================
                    Filters
                ========================= */}
                <div className="mt-12">
                    <PortfolioFilters
                        onFilterChange={setActiveCategory}
                    />
                </div>


                {/* =========================
                    Projects
                ========================= */}
                {filteredProjects.length > 0 ? (

                    <div
                        key={activeCategory}
                        className="
                            mt-14
                            grid
                            gap-8
                            md:grid-cols-2
                            xl:grid-cols-3
                        "
                    >

                        {filteredProjects.map((project, index) => (

                            <div
                                key={project.id}
                                className="
                                    animate-[portfolioCardIn_0.6s_ease-out_forwards]
                                    opacity-0
                                "
                                style={{
                                    animationDelay: `${index * 100}ms`,
                                }}
                            >
                                <PortfolioCard
                                    project={project}
                                />
                            </div>

                        ))}

                    </div>

                ) : (

                    /* =========================
                        Empty State
                    ========================= */
                    <div
                        className="
                            mx-auto
                            mt-14
                            max-w-2xl
                            rounded-3xl
                            border
                            border-slate-200
                            bg-white
                            p-12
                            text-center
                            shadow-sm
                            animate-[fadeIn_0.5s_ease-out]
                        "
                    >

                        <div
                            className="
                                mx-auto
                                flex
                                h-16
                                w-16
                                items-center
                                justify-center
                                rounded-full
                                bg-[#EAF6FC]
                                text-[#5EA8CC]
                            "
                        >
                            <span className="text-2xl">
                                ✦
                            </span>
                        </div>

                        <h3 className="mt-6 text-2xl font-bold text-slate-900">
                            No projects found
                        </h3>

                        <p className="mx-auto mt-3 max-w-md leading-7 text-slate-600">
                            We are currently preparing projects for this
                            category. Please check back soon.
                        </p>

                        <button
                            type="button"
                            onClick={() => setActiveCategory("all")}
                            className="
                                mt-7
                                rounded-xl
                                bg-[#5EA8CC]
                                px-6
                                py-3
                                font-semibold
                                text-white
                                transition-all
                                duration-300
                                hover:-translate-y-0.5
                                hover:bg-[#4C96BA]
                                hover:shadow-lg
                            "
                        >
                            View All Projects
                        </button>

                    </div>

                )}

            </Container>
        </section>
    );
}

export default PortfolioGrid;