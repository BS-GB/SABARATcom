import Container from "../ui/Container";
import ProcessCard from "../cards/ProcessCard";
import { process } from "../../data/process";

function ProcessSection() {
    return (
        <section className="bg-white py-24">
            <Container>

                {/* Section Header */}
                <div className="mx-auto max-w-3xl text-center">

                    <span className="inline-flex rounded-full bg-[#EAF6FC] px-4 py-2 text-sm font-semibold text-[#5EA8CC]">
                        Our Process
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900 lg:text-5xl">
                        How We Bring Your Ideas to Life
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        We follow a clear and structured process to transform
                        your ideas into effective marketing campaigns and
                        digital solutions.
                    </p>

                </div>

                {/* Process Grid */}
                <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                    {process.map((step) => (
                        <ProcessCard
                            key={step.id}
                            step={step}
                        />
                    ))}

                </div>

            </Container>
        </section>
    );
}

export default ProcessSection;