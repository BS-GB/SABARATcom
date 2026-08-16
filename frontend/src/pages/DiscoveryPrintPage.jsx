import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import DiscoveryPrint from "../components/discovery/DiscoveryPrint";

const STORAGE_KEY = "discoveryPrintData";

function DiscoveryPrintPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(null);

    useEffect(() => {
        try {
            const savedData =
                sessionStorage.getItem(
                    STORAGE_KEY
                );

            if (!savedData) {
                return;
            }

            const parsedData =
                JSON.parse(savedData);

            setFormData(parsedData);

        } catch (error) {
            console.error(
                "Failed to load discovery print data:",
                error
            );

            setFormData(null);
        }
    }, []);

    // ============================================
    // No data
    // ============================================

    if (!formData) {
        return (
            <div
                className="
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    bg-slate-50
                    p-6
                    text-center
                "
            >
                <div>
                    <h1
                        className="
                            text-2xl
                            font-black
                            text-slate-900
                        "
                    >
                        لا توجد بيانات للطباعة
                    </h1>

                    <p
                        className="
                            mt-3
                            text-slate-500
                        "
                    >
                        لم يتم العثور على بيانات
                        نموذج العميل.
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/client-discovery"
                            )
                        }
                        className="
                            mt-6
                            rounded-xl
                            bg-[#5EA8CC]
                            px-6
                            py-3
                            font-bold
                            text-white
                            transition
                            hover:bg-[#4d96ba]
                        "
                    >
                        العودة للنموذج
                    </button>
                </div>
            </div>
        );
    }

    // ============================================
    // Print Page
    // ============================================

    return (
        <DiscoveryPrint
            formData={formData}
            onClose={() =>
                navigate(
                    "/client-discovery"
                )
            }
        />
    );
}

export default DiscoveryPrintPage;