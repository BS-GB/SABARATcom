import { Link } from "react-router-dom";
import { ArrowRight } from "../../assets/icons";

function PortfolioCard({ project }) {
    return (
        <Link
            to={`/portfolio/${project.slug}`}
            className="group block"
        >
            <article
                className="
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    border-slate-200
                    bg-white
                    shadow-sm
                    transition-all
                    duration-500
                    hover:-translate-y-2
                    hover:shadow-2xl
                "
            >

                {/* Image */}
                <div className="relative overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="
                            h-72
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            ease-out
                            group-hover:scale-105
                        "
                    />

                    {/* Image Overlay */}
                    <div
                        className="
                            absolute
                            inset-0
                            bg-slate-950/0
                            transition-colors
                            duration-500
                            group-hover:bg-slate-950/20
                        "
                    />

                    {/* Category */}
                    <span
                        className="
                            absolute
                            left-5
                            top-5
                            rounded-full
                            bg-white/90
                            px-4
                            py-2
                            text-xs
                            font-bold
                            text-slate-800
                            shadow-sm
                            backdrop-blur-md
                        "
                    >
                        {project.categoryLabel}
                    </span>

                    {/* Arrow */}
                    <div
                        className="
                            absolute
                            right-3
                            top-5
                            flex
                            h-11
                            w-11
                            translate-y-2
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            text-slate-900
                            opacity-0
                            shadow-lg
                            transition-all
                            duration-500
                            group-hover:translate-y-0
                            group-hover:opacity-100
                        "
                    >
                        <ArrowRight
                            size={18}
                            className="
                            transition-transform
                            duration-300
                            group-hover:translate-x-1
                            "
                        />
                    </div>
                </div>


                {/* Content */}
                <div className="p-7">

                    <div className="flex items-center justify-between gap-4">

                        <h3
                            className="
                                text-2xl
                                font-bold
                                text-slate-900
                                transition-colors
                                duration-300
                                group-hover:text-[#5EA8CC]
                            "
                        >
                            {project.title}
                        </h3>

                        <span className="text-sm font-semibold text-slate-400">
                            {project.year}
                        </span>

                    </div>


                    <p className="mt-4 line-clamp-2 leading-7 text-slate-600">
                        {project.description}
                    </p>


                    {/* Tags */}
                    <div className="mt-6 flex flex-wrap gap-2">

                        {project.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="
                                    rounded-full
                                    bg-slate-100
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    text-slate-600
                                    transition-colors
                                    duration-300
                                    group-hover:bg-[#EAF6FC]
                                    group-hover:text-[#5EA8CC]
                                "
                            >
                                {tag}
                            </span>
                        ))}

                    </div>


                    {/* View Project */}
                    <div
                        className="
                            mt-7
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-bold
                            text-[#5EA8CC]
                        "
                    >
                        View Project

                        <ArrowRight
                            size={17}
                            className="
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </div>

                </div>

            </article>
        </Link>
    );
}

export default PortfolioCard;