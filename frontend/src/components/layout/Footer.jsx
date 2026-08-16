import {
    ArrowRight,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
} from "lucide-react";

import { Link } from "react-router-dom";
import Container from "../ui/Container";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden bg-slate-950 text-white">

            {/* =====================================================
                Background Effects
            ===================================================== */}

            <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#5EA8CC]/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-48 -right-32 h-[32rem] w-[32rem] rounded-full bg-[#5EA8CC]/10 blur-3xl" />

            {/* =====================================================
                Main Footer
            ===================================================== */}

            <div className="relative">

                <Container>

                    <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">

                        {/* =================================================
                            Brand
                        ================================================= */}

                        <div className="max-w-sm">

                            <Link
                                to="/"
                                className="group inline-flex items-center"
                            >

                                <span className="text-3xl font-black tracking-tight transition duration-300 group-hover:text-[#5EA8CC]">
                                    SABARAT
                                </span>

                            </Link>

                            <p className="mt-5 text-sm leading-7 text-slate-400">
                                We build brands, digital experiences, and
                                creative solutions that help businesses move
                                forward.
                            </p>

                            {/* Social */}

                            <div className="mt-7 flex items-center gap-3">
{/*
                                <SocialLink
                                    href="https://instagram.com/YOUR_USERNAME"
                                    label="Instagram"
                                    external
                                >
                                    <In size={18} />
                                </SocialLink>

                                <SocialLink
                                    href="https://linkedin.com/company/YOUR_USERNAME"
                                    label="LinkedIn"
                                    external
                                >
                                    <Linkedin size={18} />
                                </SocialLink>
*/}
                                <SocialLink
                                    href="https://wa.me/967XXXXXXXXX"
                                    label="WhatsApp"
                                    external
                                >
                                    <MessageCircle size={18} />
                                </SocialLink>

                            </div>

                        </div>


                        {/* =================================================
                            Company
                        ================================================= */}

                        <div>

                            <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white">
                                Company
                            </h3>

                            <ul className="mt-5 space-y-3">

                                <FooterLink
                                    to="/"
                                    label="Home"
                                />

                                <FooterLink
                                    to="/about"
                                    label="About"
                                />

                                <FooterLink
                                    to="/services"
                                    label="Services"
                                />

                                <FooterLink
                                    to="/portfolio"
                                    label="Portfolio"
                                />

                                <FooterLink
                                    to="/contact"
                                    label="Contact"
                                />

                            </ul>

                        </div>


                        {/* =================================================
                            Services
                        ================================================= */}

                        <div>

                            <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white">
                                Explore
                            </h3>

                            <ul className="mt-5 space-y-3">

                                <FooterLink
                                    to="/services"
                                    label="Our Services"
                                />

                                <FooterLink
                                    to="/portfolio"
                                    label="Our Work"
                                />

                                <FooterLink
                                    to="/client-discovery"
                                    label="Client Discovery"
                                />

                                <FooterLink
                                    to="/contact"
                                    label="Get in Touch"
                                />

                            </ul>

                        </div>


                        {/* =================================================
                            Contact
                        ================================================= */}

                        <div>

                            <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white">
                                Get in Touch
                            </h3>

                            <div className="mt-5 space-y-4">

                                {/* Phone */}

                                <ContactLink
                                    href="tel:+967XXXXXXXXX"
                                    icon={Phone}
                                    text="+967 XXX XXX XXX"
                                />

                                {/* Email */}

                                <ContactLink
                                    href="mailto:hello@sabarat.com"
                                    icon={Mail}
                                    text="hello@sabarat.com"
                                />

                                {/* Location */}

                                <div className="flex items-start gap-3">

                                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#5EA8CC]">

                                        <MapPin size={17} />

                                    </div>

                                    <div>

                                        <p className="text-sm font-bold text-slate-300">
                                            Yemen
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            Serving clients locally and beyond
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </Container>

            </div>


            {/* =====================================================
                Discovery CTA
            ===================================================== */}

            <div className="relative border-y border-white/10 bg-white/[0.02]">

                <Container>

                    <div className="flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <p className="text-lg font-black text-white">
                                Have an idea in mind?
                            </p>

                            <p className="mt-1 text-sm text-slate-400">
                                Tell us what you are building and let&apos;s
                                explore it together.
                            </p>

                        </div>


                        <Link
                            to="/client-discovery"
                            className="group inline-flex w-fit items-center justify-center gap-3 rounded-xl bg-[#5EA8CC] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#5EA8CC]/20 transition duration-300 hover:-translate-y-1 hover:bg-[#4d96ba] hover:shadow-xl"
                        >

                            Start a Conversation

                            <ArrowRight
                                size={17}
                                className="transition duration-300 group-hover:translate-x-1"
                            />

                        </Link>

                    </div>

                </Container>

            </div>


            {/* =====================================================
                Bottom Bar
            ===================================================== */}

            <Container>

                <div className="flex flex-col gap-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">

                    <p>
                        © {currentYear} SABARAT. All rights reserved.
                    </p>

                    <div className="flex items-center gap-5">

                        <Link
                            to="/"
                            className="transition hover:text-[#5EA8CC]"
                        >
                            Privacy
                        </Link>

                        <Link
                            to="/"
                            className="transition hover:text-[#5EA8CC]"
                        >
                            Terms
                        </Link>

                    </div>

                </div>

            </Container>

        </footer>
    );
}


/* =========================================================
   Footer Link
========================================================= */

function FooterLink({
    to,
    label,
}) {
    return (
        <li>

            <Link
                to={to}
                className="group inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition duration-300 hover:translate-x-1 hover:text-[#5EA8CC]"
            >

                <span className="h-1 w-1 rounded-full bg-slate-700 transition duration-300 group-hover:bg-[#5EA8CC]" />

                {label}

            </Link>

        </li>
    );
}


/* =========================================================
   Social Link
========================================================= */

function SocialLink({
    href,
    children,
    label,
    external = false,
}) {
    return (
        <a
            href={href}
            aria-label={label}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition duration-300 hover:-translate-y-1 hover:border-[#5EA8CC]/40 hover:bg-[#5EA8CC] hover:text-white"
        >
            {children}
        </a>
    );
}


/* =========================================================
   Contact Link
========================================================= */

function ContactLink({
    href,
    icon: Icon,
    text,
}) {
    return (
        <a
            href={href}
            className="group flex items-center gap-3"
        >

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/5 text-[#5EA8CC] transition duration-300 group-hover:bg-[#5EA8CC] group-hover:text-white">

                <Icon size={17} />

            </div>

            <span className="text-sm font-medium text-slate-400 transition duration-300 group-hover:text-white">
                {text}
            </span>

        </a>
    );
}


export default Footer;