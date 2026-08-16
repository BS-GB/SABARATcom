import { useParams, Navigate } from "react-router-dom";

import { portfolio } from "../data/portfolio";

import PortfolioDetailsHero from "../components/portfolio/PortfolioDetailsHero";
import PortfolioOverview from "../components/portfolio/PortfolioOverview";
import PortfolioChallenge from "../components/portfolio/PortfolioChallenge";
import PortfolioApproach from "../components/portfolio/PortfolioApproach";
import PortfolioResults from "../components/portfolio/PortfolioResults";
import PortfolioGallery from "../components/portfolio/PortfolioGallery";
import PortfolioCTA from "../components/portfolio/PortfolioCTA";

function PortfolioDetailsPage() {
    const { slug } = useParams();

    const project = portfolio.find(
        (item) => item.slug === slug
    );

    if (!project) {
        return <Navigate to="/404" replace />;
    }

    return (
        <main>
            <PortfolioDetailsHero project={project} />
            <PortfolioOverview project={project} />
            <PortfolioChallenge project={project} />
            <PortfolioApproach project={project} />
            <PortfolioResults project={project} />
            <PortfolioGallery project={project} />
            <PortfolioCTA project={project} />
        </main>
    );
}

export default PortfolioDetailsPage;