import { Link } from "react-router-dom";
import Button from "../ui/Button";

function NavActions() {
    return (
        <div className="hidden items-center gap-4 md:flex">
            <Link
                to="/login"
                className="font-medium text-slate-700 transition hover:text-blue-600"
            >
                Login
            </Link>

        </div>
    );
}

export default NavActions;