import { Link } from "react-router-dom";

function Logo() {
    return (
        <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold"
        >
            <span className="text-blue-600">Sabarat</span>
            <span className="text-slate-900">SMM</span>
        </Link>
    );
}

export default Logo;