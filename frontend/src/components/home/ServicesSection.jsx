import Container from "../ui/Container";
import ServiceCard from "../cards/ServiceCard";
import { services } from "../../data/services";
import Button from "../ui/Button";
import { Link } from "react-router-dom";


function ServicesSection() {
    return (
        <section className="bg-white py-24">
            <Container>
                {/* Section Header */}
                <div className="mx-auto max-w-3xl text-center">

                    <span className="inline-flex rounded-full bg-[#EAF6FC] px-4 py-2 text-sm font-semibold text-[#5EA8CC]">
                        Our Services
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-slate-900">
                        Marketing & Digital Solutions
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-slate-600">
                        We help businesses grow through strategic marketing,
                        creative branding, engaging content, and modern web
                        solutions tailored to achieve real business results.
                    </p>

                </div>

                {/* Services Grid */}
                <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                    {services.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                        />
                    ))}

                </div>

                {/* Bottom CTA */}
                <div className="mt-20 text-center">

                    <h3 className="text-3xl font-bold text-slate-900">
                        Looking for a custom solution?
                    </h3>

                    <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                        Whether you need a marketing campaign, a complete brand
                        identity, or a custom website, our team is ready to
                        bring your ideas to life.
                    </p>


                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Button
                            variant="primary"
                            size="lg"
                        >
                            Request a Free Consultation
                        </Button>
                        <Link to="/services">
                            <Button
                                variant="outline"
                                size="lg"
                            >
                                View All Services
                            </Button>
                        </Link>     
                    </div>




                </div>

            </Container>
        </section>
    );
}

export default ServicesSection;