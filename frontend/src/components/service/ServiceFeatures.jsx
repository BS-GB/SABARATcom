import Container from "../ui/Container";
import { CheckCircle2 } from "../../assets/icons";

function ServiceFeatures({ service }) {
    return (
        <section className="bg-slate-50 py-24 lg:py-28">
            <Container>

                {/* =========================
                    Section Header
                ========================== */}
                <div className="mx-auto max-w-3xl text-center">

                    <span className="inline-flex rounded-full bg-[#EAF6FC] px-4 py-2 text-sm font-semibold text-[#5EA8CC]">
                        What We Offer
                    </span>

                    <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
                        Everything You Need to Move Forward
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-slate-600">
                        Our {service.title.toLowerCase()} solutions are designed
                        to give your business the right tools, strategy, and
                        execution to achieve real results.
                    </p>

                </div>

                {/* =========================
                    Features Grid
                ========================== */}
                <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                    {service.features.map((feature, index) => (

                        <div
                            key={feature}
                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                                p-6
                                shadow-sm
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-[#5EA8CC]/30
                                hover:shadow-xl
                            "
                        >

                            {/* Number */}
                            <span className="absolute right-5 top-5 text-sm font-bold text-slate-200 transition-colors duration-300 group-hover:text-[#EAF6FC]">
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* Icon */}
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF6FC] transition-all duration-300 group-hover:bg-[#5EA8CC]">
                                <CheckCircle2
                                    size={24}
                                    strokeWidth={2}
                                    className="text-[#5EA8CC] transition-colors duration-300 group-hover:text-white"
                                />
                            </div>

                            {/* Content */}
                            <div className="mt-6 pr-6">

                                <h3 className="text-lg font-bold text-slate-900">
                                    {feature}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Professional solutions delivered with
                                    quality, strategy, and attention to detail.
                                </p>

                            </div>

                            {/* Bottom Accent */}
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#5EA8CC] transition-all duration-300 group-hover:w-full" />

                        </div>

                    ))}

                </div>

            </Container>
        </section>
    );
}

export default ServiceFeatures;