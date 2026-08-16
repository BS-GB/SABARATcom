import Container from "../ui/Container";

const steps = [
    {
        number: "01",
        title: "Discovery",
        description:
            "We understand your business, audience, goals, and challenges before creating the right strategy.",
    },
    {
        number: "02",
        title: "Strategy",
        description:
            "We build a clear plan focused on your objectives, target audience, positioning, and expected results.",
    },
    {
        number: "03",
        title: "Execution",
        description:
            "Our team turns the strategy into high-quality campaigns, content, designs, or digital solutions.",
    },
    {
        number: "04",
        title: "Results",
        description:
            "We measure performance, analyze the results, and continuously improve the work to maximize growth.",
    },
];

function ServiceProcess() {
    return (
        <section className="bg-white py-24 lg:py-28">
            <Container>

                {/* =========================
                    Header
                ========================== */}
                <div className="mx-auto max-w-3xl text-center">

                    <span className="inline-flex rounded-full bg-[#EAF6FC] px-4 py-2 text-sm font-semibold text-[#5EA8CC]">
                        How We Work
                    </span>

                    <h2 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
                        A Simple Process. Powerful Results.
                    </h2>

                    <p className="mt-5 text-lg leading-8 text-slate-600">
                        From the first conversation to the final result, we
                        follow a clear process designed to keep your project
                        focused, efficient, and successful.
                    </p>

                </div>

                {/* =========================
                    Process
                ========================== */}
                <div className="relative mt-20">

                    {/* Desktop connecting line */}
                    <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-slate-200 lg:block" />

                    <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">

                        {steps.map((step) => (
                            <div
                                key={step.number}
                                className="group relative text-center"
                            >

                                {/* Number */}
                                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#EAF6FC] text-sm font-bold text-[#5EA8CC] shadow-md transition-all duration-300 group-hover:bg-[#5EA8CC] group-hover:text-white group-hover:shadow-lg">
                                    {step.number}
                                </div>

                                {/* Content */}
                                <div className="mt-7">

                                    <h3 className="text-xl font-bold text-slate-900">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-slate-600">
                                        {step.description}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

            </Container>
        </section>
    );
}

export default ServiceProcess;