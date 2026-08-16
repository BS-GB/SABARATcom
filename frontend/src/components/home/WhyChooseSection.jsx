import Container from "../ui/Container";
import WhyChooseCard from "../cards/WhyChooseCard";
import { whyChoose } from "../../data/whyChoose";

function WhyChooseSection() {
    return (
        <section className="bg-slate-50 py-24">
            <Container>

                {/* Section Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center">

                    <span className="inline-flex rounded-full bg-[#EAF6FC] px-4 py-2 text-sm font-semibold text-[#5EA8CC]">
                        Why Choose Us
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900">
                        Why Businesses Choose SABARAT
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        We combine creative marketing, strategic planning,
                        and digital innovation to help brands grow faster,
                        reach more customers, and achieve measurable results.
                    </p>

                </div>

                {/* Cards */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {whyChoose.map((item) => (
                        <WhyChooseCard
                            key={item.title}
                            item={item}
                        />
                    ))}

                </div>

            </Container>
        </section>
    );
}

export default WhyChooseSection;