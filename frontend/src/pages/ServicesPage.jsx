import ServicesHero from "../components/service/ServicesHero";
import ServicesGrid from "../components/service/ServicesGrid";
import ProcessSection from "../components/service/ProcessSection";
import ServicesCTA from "../components/service/ServicesCTA";
function ServicesPage() {
    return (
        <>
            <ServicesHero />
            <ServicesGrid />
            <ProcessSection />
            <ServicesCTA />
        </>
    );
}

export default ServicesPage;
