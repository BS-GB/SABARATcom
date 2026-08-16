import Container from "../ui/Container";
import Button from "../ui/Button";
import { ArrowRight } from "../../assets/icons";
import { Link } from "react-router-dom";

function ServiceDetailsCTA({ service }) {
    return (
        <section className="bg-slate-950 py-24 lg:py-28">
            <Container>
                <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#5EA8CC]/20 via-slate-900 to-slate-950 px-8 py-14 shadow-2xl sm:px-12 lg:px-16 lg:py-20">

                    {/* Decorative circles */}
                    <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#5EA8CC]/20 blur-3xl" />

                    <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#8CC9E5]/10 blur-3xl" />

                    <div className="relative mx-auto max-w-4xl text-center">

                        {/* Badge */}
                        <span className="inline-flex rounded-full border border-[#8CC9E5]/20 bg-[#8CC9E5]/10 px-4 py-2 text-sm font-semibold text-[#8CC9E5]">
                            Start Your Project
                        </span>

                        {/* Heading */}
                        <h2 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-white lg:text-5xl">
                            Ready to Grow With{" "}
                            <span className="text-[#8CC9E5]">
                                {service.title}?
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                            Tell us about your goals and challenges. Our team
                            will help you find the right strategy and turn your
                            ideas into measurable results.
                        </p>

                        {/* Actions */}
                        <div className="mt-10 flex flex-wrap justify-center gap-4">

                            <Link to="/contact">
                                <Button
                                    variant="primary"
                                    size="lg"
                                >
                                    <span className="flex items-center gap-2">
                                        Request a Quote
                                        <ArrowRight size={18} />
                                    </span>
                                </Button>
                            </Link>

                            <Link to="/services">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-white/30 text-white hover:bg-white hover:text-slate-900"
                                >
                                    Explore Other Services
                                </Button>
                            </Link>

                        </div>

                    </div>
                </div>
            </Container>
        </section>
    );
}

export default ServiceDetailsCTA;