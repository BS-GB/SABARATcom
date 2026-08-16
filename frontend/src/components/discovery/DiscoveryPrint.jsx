import {
    useEffect,
} from "react";

function DiscoveryPrint({
    formData,
    onClose,
}) {
    useEffect(() => {
        const timer = setTimeout(() => {
            window.print();
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const text = (value) => {
        if (
            value === null ||
            value === undefined ||
            value === ""
        ) {
            return "—";
        }

        if (Array.isArray(value)) {
            return value.length
                ? value.join("، ")
                : "—";
        }

        return String(value);
    };

    const row = (label, value) => (
        <div className="print-row">
            <div className="print-label">
                {label}
            </div>

            <div className="print-value">
                {text(value)}
            </div>
        </div>
    );

    const section = (
        number,
        title,
        children
    ) => (
        <section className="print-section">

            <div className="print-section-title">

                <span className="print-number">
                    {number}
                </span>

                <h2>
                    {title}
                </h2>

            </div>

            <div className="print-section-content">
                {children}
            </div>

        </section>
    );

    return (
        <div
            className="
                fixed
                inset-0
                z-[9999]
                overflow-auto
                bg-white
                p-8
            "
            dir="rtl"
        >

            {/* Print buttons */}

            <div className="print-controls">
                <button
                    type="button"
                    onClick={() =>
                        window.print()
                    }
                >
                    طباعة
                </button>

                <button
                    type="button"
                    onClick={onClose}
                >
                    إغلاق
                </button>
            </div>


            {/* Printable document */}

            <div
                id="sabarat-print-document"
                className="print-document"
            >

                <header className="print-header">

                    <div className="print-brand">
                        SABARAT
                    </div>

                    <h1>
                        Client Discovery Form
                    </h1>

                    <p>
                        نموذج اكتشاف احتياجات العميل
                    </p>

                </header>


                {section(
                    "01",
                    "بيانات العميل",
                    <>
                        {row(
                            "اسم الشركة / المؤسسة",
                            formData.companyName
                        )}

                        {row(
                            "اسم مسؤول التواصل",
                            formData.contactName
                        )}

                        {row(
                            "المسمى الوظيفي",
                            formData.jobTitle
                        )}

                        {row(
                            "رقم الجوال",
                            formData.phone
                        )}

                        {row(
                            "البريد الإلكتروني",
                            formData.email
                        )}

                        {row(
                            "الموقع الإلكتروني",
                            formData.website
                        )}

                        {row(
                            "المدينة",
                            formData.city
                        )}

                        {row(
                            "تاريخ الاجتماع",
                            formData.meetingDate
                        )}

                        <h3>
                            مواقع التواصل الحالية
                        </h3>

                        {Object.entries(
                            formData.social || {}
                        ).map(
                            ([key, value]) =>
                                row(
                                    key,
                                    value
                                )
                        )}
                    </>
                )}


                {section(
                    "02",
                    "النشاط التجاري",
                    <>
                        {row(
                            "مجال النشاط",
                            formData.businessField
                        )}

                        {row(
                            "سنوات العمل",
                            formData.yearsInBusiness
                        )}

                        {row(
                            "أهم المنتجات أو الخدمات",
                            formData.productsServices
                        )}

                        {row(
                            "المنافسون",
                            formData.competitors
                        )}

                        {row(
                            "الميزة التنافسية",
                            formData.competitiveAdvantage
                        )}
                    </>
                )}


                {section(
                    "03",
                    "العلامة التجارية",
                    <>
                        {row(
                            "الوضع الحالي للعلامة",
                            formData.brandStatus
                        )}
                    </>
                )}


                {section(
                    "04",
                    "الأهداف التسويقية",
                    <>
                        {row(
                            "الأهداف",
                            formData.marketingGoals
                        )}
                    </>
                )}


                {section(
                    "05",
                    "الجمهور المستهدف",
                    <>
                        {row(
                            "العمر",
                            formData.audience?.age
                        )}

                        {row(
                            "الجنس",
                            formData.audience?.gender
                        )}

                        {row(
                            "المدينة / الدولة",
                            formData.audience?.location
                        )}

                        {row(
                            "اللغة",
                            formData.audience?.language
                        )}

                        {row(
                            "الاهتمامات",
                            formData.audience?.interests
                        )}

                        {row(
                            "القدرة الشرائية",
                            formData.audience?.purchasingPower
                        )}
                    </>
                )}


                {section(
                    "06",
                    "التعاونات السابقة",
                    <>
                        {row(
                            "سبق التعاون مع وكالة تسويق؟",
                            formData.previousCollaboration
                                ?.workedBefore
                        )}

                        {row(
                            "اسم الوكالة",
                            formData.previousCollaboration
                                ?.agencyName
                        )}

                        {row(
                            "سبب انتهاء التعاون",
                            formData.previousCollaboration
                                ?.reason
                        )}

                        {row(
                            "نتيجة التعاون",
                            formData.previousCollaboration
                                ?.result
                        )}

                        {row(
                            "ما الذي ترغبون في تحسينه؟",
                            formData.previousCollaboration
                                ?.improvement
                        )}
                    </>
                )}


                {section(
                    "07",
                    "التحديات الحالية",
                    <>
                        {row(
                            "التحديات",
                            formData.challenges
                        )}
                    </>
                )}


                {section(
                    "08",
                    "الخدمات المطلوبة",
                    <>
                        {row(
                            "الخدمات",
                            formData.services
                        )}
                    </>
                )}


                {section(
                    "09",
                    "الميزانية",
                    <>
                        {row(
                            "نوع الميزانية",
                            formData.budget?.type
                        )}

                        {row(
                            "من",
                            formData.budget?.from
                        )}

                        {row(
                            "إلى",
                            formData.budget?.to
                        )}

                        {row(
                            "العملة",
                            formData.budget?.currency
                        )}
                    </>
                )}


                {section(
                    "10",
                    "توقعات المشروع",
                    <>
                        {row(
                            "التوقعات",
                            formData.expectations
                        )}
                    </>
                )}


                {section(
                    "11",
                    "معلومات إضافية",
                    <>
                        {row(
                            "القنوات التسويقية المفضلة",
                            formData.additional
                                ?.preferredChannels
                        )}

                        {row(
                            "وسيلة التواصل المفضلة",
                            formData.additional
                                ?.preferredContact
                        )}

                        {row(
                            "الموعد المتوقع لبدء المشروع",
                            formData.additional
                                ?.startDate
                        )}

                        {row(
                            "كيف عرفتم عن SABARAT؟",
                            formData.additional
                                ?.source
                        )}

                        {row(
                            "ملاحظات إضافية",
                            formData.additional
                                ?.notes
                        )}
                    </>
                )}


                <footer className="print-footer">
                    SABARAT • Client Discovery Form
                </footer>

            </div>

        </div>
    );
}

export default DiscoveryPrint;