import {
    ArrowLeft,
    ArrowRight,
    Globe,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
} from "lucide-react";

import { Link } from "react-router-dom";
import Container from "../components/ui/Container";

function ContactPage() {
    return (
        <main className="min-h-screen overflow-hidden bg-white text-slate-950">

            {/* =====================================================
                Hero Section
            ===================================================== */}

            <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-32">


                <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#5EA8CC]/10 blur-3xl" />

                <div className="pointer-events-none absolute -bottom-40 -right-20 h-[28rem] w-[28rem] rounded-full bg-[#5EA8CC]/10 blur-3xl" />

                <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-3xl" />

                <Container>

                    <div className="relative mx-auto max-w-4xl text-center">


                        <div className="animate-pulse">
                            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-bold tracking-wide text-[#5EA8CC] backdrop-blur-sm">
                                SABARAT
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Contact Us
                        </h1>

                        {/* Description */}
                        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                            We would love to hear from you.
                            Choose the communication channel that works best
                            for you and our team will get back to you shortly.
                        </p>


                        <div className="mx-auto mt-8 h-1 w-16 rounded-full bg-[#5EA8CC]" />

                    </div>

                </Container>
            </section>


            {/* =====================================================
                Contact Methods
            ===================================================== */}

            <section className="relative py-20 sm:py-24">

                <Container>


                    <div className="mx-auto max-w-3xl text-center">

                        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#5EA8CC]">
                            Contact Methods
                        </p>

                        <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                            We Are Here for You
                        </h2>

                        <p className="mt-4 leading-8 text-slate-500">
                            Choose your preferred communication method and
                            connect with the SABARAT team.
                        </p>

                    </div>



                    <div className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">


                        <ContactCard
                            href="https://wa.me/967XXXXXXXXX"
                            icon={MessageCircle}
                            title="WhatsApp"
                            description="Chat with our team directly through WhatsApp."
                            value="+967 XXX XXX XXX"
                            external
                        />


                        <ContactCard
                            href="https://instagram.com/YOUR_USERNAME"
                            icon={Globe}
                            title="Instagram"
                            description="Follow SABARAT and connect with us on Instagram."
                            value="@YOUR_USERNAME"
                            external
                        />


                        <ContactCard
                            href="tel:+967XXXXXXXXX"
                            icon={Phone}
                            title="Phone"
                            description="Call our team directly for inquiries and support."
                            value="+967 XXX XXX XXX"
                        />


                        <ContactCard
                            href="mailto:hello@sabarat.com"
                            icon={Mail}
                            title="Email"
                            description="Send us your questions, ideas, or project details."
                            value="hello@sabarat.com"
                        />


                        <ContactCard
                            href="https://maps.google.com/?cid=290190376680248368"
                            icon={MapPin}
                            title="Location"
                            description="Visit SABARAT headquarters to explore our services and projects."
                            value="SABARAT, Yemen"
                        />

                        {/* <ContactCard 
                            href="https://linkedin.com/company/YOUR_USERNAME"
                            icon={Globe}
                            title="LinkedIn"
                            description="Connect with SABARAT professionally on LinkedIn."
                            value="SABARAT"
                            external
                        />*/}

                    </div>

                </Container>
            </section>


            {/* =====================================================
                Location Section
            ===================================================== */}

            <section
                id="location"
                className="relative overflow-hidden bg-slate-50 py-20 sm:py-24"
            >

                <Container>

                    <div className="grid items-center gap-10 lg:grid-cols-2">

                        {/* Location Information */}
                        <div>

                            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#5EA8CC]">
                                Our Location
                            </p>

                            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                                Where to Find Us
                            </h2>

                            <p className="mt-5 max-w-xl leading-8 text-slate-500">
                                SABARAT provides marketing, advertising,
                                branding, content creation, and digital
                                solutions for clients inside Yemen and beyond.
                            </p>


                            {/* Location Information Card */}
                            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5EA8CC]/10 text-[#5EA8CC]">
                                    <MapPin size={22} />
                                </div>

                                <div>

                                    <p className="font-black text-slate-900">
                                        SABARAT
                                    </p>

                                    <p className="mt-1 text-sm leading-6 text-slate-500">
                                        Yemen
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Map Placeholder */}
                        <div className="group relative min-h-[350px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-200 shadow-sm transition duration-500 hover:shadow-2xl">

                            {/* Map Background */}
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(94,168,204,0.18),_transparent_60%)]" />

                            {/* Grid */}
                            <div className="absolute inset-0 opacity-30">
                                <div
                                    className="h-full w-full"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
                                        backgroundSize: "40px 40px",
                                    }}
                                />
                            </div>

                            {/* Location Marker */}
                            <div className="absolute inset-0 flex items-center justify-center">

                                <div className="text-center">

                                    <div className="mx-auto flex h-20 w-20 animate-bounce items-center justify-center rounded-3xl bg-white text-[#5EA8CC] shadow-xl transition duration-500 group-hover:scale-110">

                                        <MapPin size={34} />

                                    </div>

                                    <p className="mt-5 font-black text-slate-800">
                                        SABARAT
                                    </p>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Yemen
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </Container>

            </section>


            {/* =====================================================
                Client Discovery CTA
            ===================================================== */}

            <section className="relative overflow-hidden py-20 sm:py-24">

                <Container>

                    <div className="group relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-16 text-center text-white shadow-2xl sm:px-12">

                        {/* Background Glow */}
                        <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#5EA8CC]/10 blur-3xl transition duration-700 group-hover:scale-125" />

                        <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-[#5EA8CC]/10 blur-3xl transition duration-700 group-hover:scale-125" />


                        {/* Content */}
                        <div className="relative z-10 mx-auto max-w-3xl">

                            <span className="inline-flex rounded-full border border-[#5EA8CC]/20 bg-[#5EA8CC]/10 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-[#5EA8CC]">
                                Ready to Start?
                            </span>

                            <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                                Let&apos;s Understand Your Needs
                            </h2>

                            <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
                                Tell us about your business, goals, challenges,
                                and vision. Our discovery form helps us
                                understand your needs and build the right
                                strategy for your project.
                            </p>


                            {/* CTA */}
                            <Link
                                to="/client-discovery"
                                className="mt-8 inline-flex items-center justify-center gap-3 rounded-xl bg-[#5EA8CC] px-7 py-4 font-black text-white shadow-xl shadow-[#5EA8CC]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#4d96ba] hover:shadow-2xl hover:shadow-[#5EA8CC]/30"
                            >

                                Start Your Project

                                <ArrowLeft
                                    size={19}
                                    className="transition duration-300 group-hover:-translate-x-1"
                                />

                            </Link>

                        </div>

                    </div>

                </Container>

            </section>

        </main>
    );
}


/* =========================================================
   Contact Card Component
========================================================= */

function ContactCard({
    href,
    icon: Icon,
    title,
    description,
    value,
    external = false,
}) {
    return (
        <a
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="
                group
                relative
                overflow-hidden
                rounded-[1.5rem]
                border
                border-slate-200
                bg-white
                p-6
                shadow-sm
                transition
                duration-500
                hover:-translate-y-2
                hover:border-[#5EA8CC]/40
                hover:shadow-2xl
                hover:shadow-slate-900/10
            "
        >

            {/* Hover Background */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5EA8CC]/0 via-[#5EA8CC]/0 to-[#5EA8CC]/10 opacity-0 transition duration-500 group-hover:opacity-100" />


            {/* Card Header */}
            <div className="relative z-10 flex items-start justify-between">

                {/* Icon */}
                <div
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#5EA8CC]/10
                        text-[#5EA8CC]
                        transition
                        duration-500
                        group-hover:scale-110
                        group-hover:rotate-3
                        group-hover:bg-[#5EA8CC]
                        group-hover:text-white
                    "
                >
                    <Icon size={25} />
                </div>


                {/* Arrow */}
                <ArrowRight
                    size={18}
                    className="
                        text-slate-300
                        transition
                        duration-500
                        group-hover:-translate-x-1
                        group-hover:text-[#5EA8CC]
                    "
                />

            </div>


            {/* Title */}
            <h3 className="relative z-10 mt-6 text-lg font-black text-slate-950">
                {title}
            </h3>


            {/* Description */}
            <p className="relative z-10 mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                {description}
            </p>


            {/* Value */}
            <p className="relative z-10 mt-4 break-words text-sm font-black text-[#5EA8CC]">
                {value}
            </p>

        </a>
    );
}

export default ContactPage;

