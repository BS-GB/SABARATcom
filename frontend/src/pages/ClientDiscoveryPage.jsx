import ClientDiscoveryForm from "../components/discovery/ClientDiscoveryForm";

function ClientDiscoveryPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <section className="relative overflow-hidden">

                {/* Background */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#5EA8CC]/10 blur-3xl" />
                    <div className="absolute -right-40 top-96 h-96 w-96 rounded-full bg-[#8ED4F5]/10 blur-3xl" />
                </div>

                <div className="relative">
                    <ClientDiscoveryForm />
                </div>

            </section>
        </main>
    );
}

export default ClientDiscoveryPage;