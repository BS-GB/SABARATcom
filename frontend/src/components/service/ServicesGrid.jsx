import Container from "../ui/Container";
import ServiceCard from "../cards/ServiceCard";
import { services } from "../../data/services";

function ServicesGrid() {
    return (
        <section className="bg-slate-50 py-24">
            <Container>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

                    {services.map((service) => (
                        <ServiceCard
                            key={service.id}
                            service={service}
                        />
                    ))}

                </div>

            </Container>
        </section>
    );
}

export default ServicesGrid;