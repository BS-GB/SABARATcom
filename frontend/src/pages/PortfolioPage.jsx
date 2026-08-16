import PortfolioHero from "../components/portfolio/PortfolioHero";
import PortfolioGrid from "../components/portfolio/PortfolioGrid";
import PortfolioCTA from "../components/portfolio/PortfolioCTA";

function PortfolioPage() {
    return (
        <main>
            <PortfolioHero />

            <PortfolioGrid />

            <PortfolioCTA />
        </main>
    );
}

export default PortfolioPage;