import { useEffect } from "react";

function DiscoveryPrint({ formData, onClose }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            window.print();
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const text = (value) => {
        if (value === null || value === undefined || value === "") return "—";
        if (Array.isArray(value)) return value.length ? value.join("، ") : "—";
        return String(value);
    };

    const row = (label, value) => (
        <div className="print-row">
            <div className="print-label">{label}</div>
            <div className="print-value">{text(value)}</div>
        </div>
    );

    const section = (number, title, children) => (
        <section className="print-section">

            <div className="print-section-title">
                <span className="print-number">{number}</span>
                <h2>{title}</h2>
            </div>

            <div className="print-section-content">
                {children}
            </div>

        </section>
    );

    return (
        <div className="fixed inset-0 z-[9999] overflow-auto bg-white p-8" dir="rtl">

            {/* Print buttons */}
            <div className="print-controls">
                <button type="button" onClick={() => window.print()}>طباعة</button>
                <button type="button" onClick={onClose}>إغلاق</button>
            </div>

            {/* Printable document */}
            <div id="sabarat-print-document" className="print-document">

                <header className="print-header">

                    <div className="print-brand">SABARAT</div>

                    <h1>Client Discovery Form</h1>

                    <p>نموذج اكتشاف احتياجات العميل</p>

                </header>

                {section("01", "بيانات العميل", <>
                    {row("اسم الشركة / المؤسسة", formData.companyName)}
                    {row("اسم مسؤول التواصل", formData.contactName)}
                    {row("المسمى الوظيفي", formData.jobTitle)}
                    {row("رقم الجوال", formData.phone)}
                    {row("البريد الإلكتروني", formData.email)}
                    {row("الموقع الإلكتروني", formData.website)}
                    {row("المدينة", formData.city)}
                    {row("تاريخ الاجتماع", formData.meetingDate)}

                    <h3>مواقع التواصل الحالية</h3>

                    {Object.entries(formData.social || {}).map(([key, value]) =>
                        row(key, value)
                    )}
                </>)}

                {section("02", "النشاط التجاري", <>
                    {row("مجال النشاط", formData.businessField)}
                    {row("سنوات العمل", formData.yearsInBusiness)}
                    {row("أهم المنتجات أو الخدمات", formData.productsServices)}
                    {row("المنافسون", formData.competitors)}
                    {row("الميزة التنافسية", formData.competitiveAdvantage)}
                </>)}

                {section("03", "العلامة التجارية", <>
                    {row("الوضع الحالي للعلامة", formData.brandStatus)}
                </>)}

                {section("04", "الأهداف التسويقية", <>
                    {row("الأهداف", formData.marketingGoals)}
                </>)}

                {section("05", "الجمهور المستهدف", <>
                    {row("العمر", formData.audience?.age)}
                    {row("الجنس", formData.audience?.gender)}
                    {row("المدينة / الدولة", formData.audience?.location)}
                    {row("اللغة", formData.audience?.language)}
                    {row("الاهتمامات", formData.audience?.interests)}
                    {row("القدرة الشرائية", formData.audience?.purchasingPower)}
                </>)}

                {section("06", "التعاونات السابقة", <>
                    {row("سبق التعاون مع وكالة تسويق؟", formData.previousCollaboration?.workedBefore)}
                    {row("اسم الوكالة", formData.previousCollaboration?.agencyName)}
                    {row("سبب انتهاء التعاون", formData.previousCollaboration?.reason)}
                    {row("نتيجة التعاون", formData.previousCollaboration?.result)}
                    {row("ما الذي ترغبون في تحسينه؟", formData.previousCollaboration?.improvement)}
                </>)}

                {section("07", "التحديات الحالية", <>
                    {row("التحديات", formData.challenges)}
                </>)}

                {section("08", "الخدمات المطلوبة", <>
                    {row("الخدمات", formData.services)}
                </>)}

                {section("09", "الميزانية", <>
                    {row("نوع الميزانية", formData.budget?.type)}
                    {row("من", formData.budget?.from)}
                    {row("إلى", formData.budget?.to)}
                    {row("العملة", formData.budget?.currency)}
                </>)}

                {section("10", "توقعات المشروع", <>
                    {row("التوقعات", formData.expectations)}
                </>)}

                {section("11", "معلومات إضافية", <>
                    {row("القنوات التسويقية المفضلة", formData.additional?.preferredChannels)}
                    {row("وسيلة التواصل المفضلة", formData.additional?.preferredContact)}
                    {row("الموعد المتوقع لبدء المشروع", formData.additional?.startDate)}
                    {row("كيف عرفتم عن SABARAT؟", formData.additional?.source)}
                    {row("ملاحظات إضافية", formData.additional?.notes)}
                </>)}

                <footer className="print-footer">
                    SABARAT • Client Discovery Form
                </footer>

            </div>

            <style>
                {`
                    @media print {
                        .print-controls { display: none !important; }
                        body { background: white !important; padding: 0 !important; }
                        #sabarat-print-document { margin: 0 !important; padding: 20px !important; }
                    }

                    .print-controls {
                        display: flex;
                        gap: 12px;
                        margin-bottom: 24px;
                        justify-content: center;
                    }

                    .print-controls button {
                        padding: 10px 24px;
                        border-radius: 12px;
                        border: 1px solid #E2E8F0;
                        background: white;
                        font-weight: bold;
                        cursor: pointer;
                        transition: all 0.2s;
                    }

                    .print-controls button:hover {
                        background: #F8FAFC;
                        border-color: #5EA8CC;
                    }

                    .print-document {
                        max-width: 794px;
                        margin: 0 auto;
                        font-family: Arial, Tahoma, sans-serif;
                        direction: rtl;
                    }

                    .print-header {
                        text-align: center;
                        padding: 24px 0 32px;
                        border-bottom: 2px solid #E2E8F0;
                        margin-bottom: 24px;
                    }

                    .print-brand {
                        font-size: 24px;
                        font-weight: 900;
                        color: #5EA8CC;
                    }

                    .print-header h1 {
                        font-size: 28px;
                        font-weight: 900;
                        margin: 8px 0;
                    }

                    .print-header p {
                        color: #64748B;
                        font-size: 16px;
                    }

                    .print-section {
                        margin-bottom: 24px;
                        border: 1px solid #E2E8F0;
                        border-radius: 16px;
                        overflow: hidden;
                    }

                    .print-section-title {
                        background: #0F172A;
                        color: white;
                        padding: 12px 16px;
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }

                    .print-number {
                        background: #5EA8CC;
                        padding: 4px 12px;
                        border-radius: 8px;
                        font-size: 14px;
                        font-weight: 900;
                    }

                    .print-section-title h2 {
                        font-size: 18px;
                        font-weight: 900;
                        margin: 0;
                    }

                    .print-section-content {
                        padding: 12px 16px;
                    }

                    .print-row {
                        display: flex;
                        justify-content: space-between;
                        padding: 8px 0;
                        border-bottom: 1px solid #F1F5F9;
                    }

                    .print-row:last-child {
                        border-bottom: none;
                    }

                    .print-label {
                        font-weight: 700;
                        color: #64748B;
                        font-size: 14px;
                    }

                    .print-value {
                        font-weight: 700;
                        color: #0F172A;
                        font-size: 14px;
                        max-width: 60%;
                        text-align: left;
                        word-break: break-word;
                    }

                    .print-section-content h3 {
                        font-size: 16px;
                        font-weight: 900;
                        color: #0F172A;
                        margin: 16px 0 8px;
                    }

                    .print-footer {
                        text-align: center;
                        padding: 16px 0;
                        border-top: 2px solid #E2E8F0;
                        margin-top: 16px;
                        color: #94A3B8;
                        font-size: 14px;
                    }
                `}
            </style>

        </div>
    );
}

export default DiscoveryPrint;