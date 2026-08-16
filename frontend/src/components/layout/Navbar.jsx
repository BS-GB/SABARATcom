import Container from "../ui/Container";
import Logo from "../navbar/Logo";
import NavLinks from "../navbar/NavLinks";
import NavActions from "../navbar/NavActions";
import MobileMenu from "../navbar/MobileMenu";

function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
            <Container>
                <div className="flex h-20 items-center justify-between gap-4">


                    <div className="shrink-0">
                        <Logo />
                    </div>



                    <div className="hidden items-center gap-8 md:flex">
                        <NavLinks />
                        <NavActions />
                    </div>



                    <div className="shrink-0 md:hidden">
                        <MobileMenu />
                    </div>

                </div>
            </Container>
        </header>
    );
}

export default Navbar;