import jsPDF from "jspdf";

import regularFontUrl from "../../assets/fonts/Amiri-Regular.ttf?url";
import boldFontUrl from "../../assets/fonts/Amiri-Bold.ttf?url";

// =====================================================
// Helpers
// =====================================================

function hasArabic(text) {
    return /[\u0600-\u06FF]/.test(
        String(text ?? "")
    );
}

// -----------------------------------------------------
// Prepare text for jsPDF
// -----------------------------------------------------

function prepareText(pdf, text) {
    const value =
        text === null ||
        text === undefined ||
        String(text).trim() === ""
            ? "—"
            : String(text);

    if (hasArabic(value)) {
        pdf.setR2L(true);

        if (
            typeof pdf.processArabic === "function"
        ) {
            return pdf.processArabic(value);
        }

        return value;
    }

    /*
     * English / numbers / URLs
     */
    pdf.setR2L(false);

    return value;
}

// =====================================================
// Load Font
// =====================================================

async function loadFontAsBase64(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            `Failed to load PDF font: ${url}`
        );
    }

    const buffer =
        await response.arrayBuffer();

    const bytes =
        new Uint8Array(buffer);

    let binary = "";

    const chunkSize = 0x8000;

    for (
        let i = 0;
        i < bytes.length;
        i += chunkSize
    ) {
        const chunk =
            bytes.subarray(
                i,
                Math.min(
                    i + chunkSize,
                    bytes.length
                )
            );

        binary += String.fromCharCode(
            ...chunk
        );
    }

    return btoa(binary);
}

// =====================================================
// Discovery PDF
// =====================================================

async function DiscoveryPDF({
    formData,
}) {
    if (!formData) {
        throw new Error(
            "No discovery form data was provided."
        );
    }

    // =================================================
    // Create PDF
    // =================================================

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
        compress: true,
    });

    // =================================================
    // Load Arabic Fonts
    // =================================================

    const regularFont =
        await loadFontAsBase64(
            regularFontUrl
        );

    const boldFont =
        await loadFontAsBase64(
            boldFontUrl
        );

    // =================================================
    // Register Regular Font
    // =================================================

    pdf.addFileToVFS(
        "Amiri-Regular.ttf",
        regularFont
    );

    pdf.addFont(
        "Amiri-Regular.ttf",
        "Amiri",
        "normal"
    );

    // =================================================
    // Register Bold Font
    // =================================================

    pdf.addFileToVFS(
        "Amiri-Bold.ttf",
        boldFont
    );

    pdf.addFont(
        "Amiri-Bold.ttf",
        "Amiri",
        "bold"
    );

    // =================================================
    // Default Font
    // =================================================

    pdf.setFont(
        "Amiri",
        "normal"
    );

    pdf.setFontSize(10);

    pdf.setR2L(true);

    // =================================================
    // Page Information
    // =================================================

    const pageWidth =
        pdf.internal.pageSize.getWidth();

    const pageHeight =
        pdf.internal.pageSize.getHeight();

    const margin = 15;

    const contentWidth =
        pageWidth - margin * 2;

    let y = margin;

    // =================================================
    // Add Page If Needed
    // =================================================

    const addPageIfNeeded = (
        height = 10
    ) => {
        if (
            y + height >
            pageHeight - margin - 10
        ) {
            pdf.addPage();

            pdf.setFont(
                "Amiri",
                "normal"
            );

            pdf.setR2L(true);

            y = margin;

            return true;
        }

        return false;
    };

    // =================================================
    // Add Title
    // =================================================

    const addTitle = (
        title,
        size = 20
    ) => {
        addPageIfNeeded(20);

        pdf.setFont(
            "Amiri",
            "bold"
        );

        pdf.setFontSize(size);

        pdf.setTextColor(
            15,
            23,
            42
        );

        pdf.setR2L(true);

        const text =
            prepareText(
                pdf,
                title
            );

        pdf.text(
            text,
            pageWidth / 2,
            y,
            {
                align: "center",
            }
        );

        y += 13;
    };

    // =================================================
    // Add Section Title
    // =================================================

    const addSectionTitle = (
        number,
        title
    ) => {
        addPageIfNeeded(22);

        // -------------------------------------------------
        // Section number
        // -------------------------------------------------

        pdf.setFillColor(
            15,
            23,
            42
        );

        pdf.roundedRect(
            margin,
            y - 6,
            12,
            10,
            2,
            2,
            "F"
        );

        pdf.setFont(
            "Amiri",
            "bold"
        );

        pdf.setFontSize(8);

        pdf.setTextColor(
            255,
            255,
            255
        );

        pdf.setR2L(false);

        pdf.text(
            String(number),
            margin + 6,
            y + 1,
            {
                align: "center",
            }
        );

        // -------------------------------------------------
        // Section title
        // -------------------------------------------------

        pdf.setFont(
            "Amiri",
            "bold"
        );

        pdf.setFontSize(14);

        pdf.setTextColor(
            15,
            23,
            42
        );

        pdf.setR2L(true);

        const preparedTitle =
            prepareText(
                pdf,
                title
            );

        pdf.text(
            preparedTitle,
            pageWidth - margin,
            y + 1,
            {
                align: "right",
            }
        );

        y += 14;
    };

    // =====================================================
    // Add Field
    // =====================================================

    const addField = (
        label,
        value
    ) => {
        const safeValue =
            value === null ||
            value === undefined ||
            String(value).trim() === ""
                ? "—"
                : String(value);

        // -------------------------------------------------
        // Label
        // -------------------------------------------------

        addPageIfNeeded(18);

        pdf.setFont(
            "Amiri",
            "bold"
        );

        pdf.setFontSize(9);

        pdf.setTextColor(
            71,
            85,
            105
        );

        pdf.setR2L(true);

        const preparedLabel =
            prepareText(
                pdf,
                label
            );

        pdf.text(
            preparedLabel,
            pageWidth - margin,
            y,
            {
                align: "right",
            }
        );

        y += 5;

        // -------------------------------------------------
        // Value
        // -------------------------------------------------

        pdf.setFont(
            "Amiri",
            "normal"
        );

        pdf.setFontSize(10);

        pdf.setTextColor(
            15,
            23,
            42
        );

        const preparedValue =
            prepareText(
                pdf,
                safeValue
            );

        const lines =
            pdf.splitTextToSize(
                preparedValue,
                contentWidth
            );

        const requiredHeight =
            Math.max(
                8,
                lines.length * 5
            );

        addPageIfNeeded(
            requiredHeight + 5
        );

        /*
         * مهم:
         *
         * النص العربي:
         * R2L + processArabic
         *
         * النص الإنجليزي:
         * LTR
         */

        pdf.text(
            lines,
            pageWidth - margin,
            y,
            {
                align: hasArabic(
                    safeValue
                )
                    ? "right"
                    : "right",
            }
        );

        y +=
            lines.length * 5 +
            6;
    };

    // =====================================================
    // Add Array Field
    // =====================================================

    const addArrayField = (
        label,
        values
    ) => {
        const list =
            Array.isArray(values)
                ? values.filter(
                    (item) =>
                        item !== null &&
                        item !== undefined &&
                        String(item).trim() !== ""
                )
                : [];

        addField(
            label,
            list.length
                ? list.join("، ")
                : "—"
        );
    };

    // =====================================================
    // Add Nested Field
    // =====================================================

    const addNestedField = (
        label,
        object,
        field
    ) => {
        addField(
            label,
            object?.[field]
        );
    };

    // =====================================================
    // HEADER
    // =====================================================

    pdf.setFillColor(
        15,
        23,
        42
    );

    pdf.rect(
        0,
        0,
        pageWidth,
        25,
        "F"
    );

    // -----------------------------------------------------
    // SABARAT
    // -----------------------------------------------------

    pdf.setFont(
        "Amiri",
        "bold"
    );

    pdf.setFontSize(18);

    pdf.setTextColor(
        255,
        255,
        255
    );

    pdf.setR2L(false);

    pdf.text(
        "SABARAT",
        margin,
        16
    );

    // -----------------------------------------------------
    // English label
    // -----------------------------------------------------

    pdf.setFont(
        "Amiri",
        "normal"
    );

    pdf.setFontSize(8);

    pdf.setR2L(false);

    pdf.text(
        "CLIENT DISCOVERY FORM",
        pageWidth - margin,
        16,
        {
            align: "right",
        }
    );

    y = 40;

    // =====================================================
    // Main Title
    // =====================================================

    addTitle(
        "نموذج اكتشاف احتياجات العميل",
        20
    );

    // -----------------------------------------------------
    // English subtitle
    // -----------------------------------------------------

    pdf.setFont(
        "Amiri",
        "normal"
    );

    pdf.setFontSize(10);

    pdf.setTextColor(
        100,
        116,
        139
    );

    pdf.setR2L(false);

    pdf.text(
        "Client Discovery Form",
        pageWidth / 2,
        y,
        {
            align: "center",
        }
    );

    y += 12;

    // =====================================================
    // Divider
    // =====================================================

    pdf.setDrawColor(
        226,
        232,
        240
    );

    pdf.line(
        margin,
        y,
        pageWidth - margin,
        y
    );

    y += 10;

    // =====================================================
    // Document Information
    // =====================================================

    addField(
        "رقم النموذج",
        "SPT-FRM-001"
    );

    addField(
        "الإصدار",
        "V1.0"
    );

    addField(
        "تاريخ إنشاء المستند",
        new Date().toLocaleDateString(
            "en-CA"
        )
    );

    // =====================================================
    // STEP 01
    // =====================================================

    addSectionTitle(
        "01",
        "بيانات العميل"
    );

    addField(
        "اسم الشركة / المؤسسة",
        formData.companyName
    );

    addField(
        "اسم مسؤول التواصل",
        formData.contactName
    );

    addField(
        "المسمى الوظيفي",
        formData.jobTitle
    );

    addField(
        "رقم الجوال",
        formData.phone
    );

    addField(
        "البريد الإلكتروني",
        formData.email
    );

    addField(
        "الموقع الإلكتروني",
        formData.website
    );

    addField(
        "المدينة",
        formData.city
    );

    addField(
        "تاريخ الاجتماع",
        formData.meetingDate
    );

    // =====================================================
    // Social Media
    // =====================================================

    addSectionTitle(
        "",
        "مواقع التواصل الحالية"
    );

    const social =
        formData.social || {};

    addField(
        "Website",
        social.website
    );

    addField(
        "Instagram",
        social.instagram
    );

    addField(
        "Facebook",
        social.facebook
    );

    addField(
        "X",
        social.x
    );

    addField(
        "TikTok",
        social.tiktok
    );

    addField(
        "YouTube",
        social.youtube
    );

    addField(
        "LinkedIn",
        social.linkedin
    );

    // =====================================================
    // STEP 02
    // =====================================================

    addSectionTitle(
        "02",
        "نبذة عن النشاط التجاري"
    );

    addField(
        "مجال النشاط",
        formData.businessField
    );

    addField(
        "سنوات العمل",
        formData.yearsInBusiness
    );

    addField(
        "أهم المنتجات أو الخدمات",
        formData.productsServices
    );

    addArrayField(
        "المنافسون الرئيسيون",
        formData.competitors
    );

    addField(
        "الميزة التنافسية",
        formData.competitiveAdvantage
    );

    // =====================================================
    // STEP 03
    // =====================================================

    addSectionTitle(
        "03",
        "الوضع الحالي للعلامة التجارية"
    );

    addArrayField(
        "الحالات المختارة",
        formData.brandStatus
    );

    // =====================================================
    // STEP 04
    // =====================================================

    addSectionTitle(
        "04",
        "الأهداف التسويقية للمشروع"
    );

    addArrayField(
        "الأهداف المختارة",
        formData.marketingGoals
    );

    // =====================================================
    // STEP 05
    // =====================================================

    addSectionTitle(
        "05",
        "الجمهور المستهدف"
    );

    const audience =
        formData.audience || {};

    addNestedField(
        "العمر",
        audience,
        "age"
    );

    addNestedField(
        "الجنس",
        audience,
        "gender"
    );

    addNestedField(
        "المدينة / الدولة",
        audience,
        "location"
    );

    addNestedField(
        "اللغة",
        audience,
        "language"
    );

    addNestedField(
        "الاهتمامات",
        audience,
        "interests"
    );

    addNestedField(
        "القدرة الشرائية",
        audience,
        "purchasingPower"
    );

    // =====================================================
    // STEP 06
    // =====================================================

    addSectionTitle(
        "06",
        "التعاونات السابقة"
    );

    const collaboration =
        formData.previousCollaboration ||
        {};

    addNestedField(
        "هل سبق لكم التعاون مع وكالة تسويق؟",
        collaboration,
        "workedBefore"
    );

    addNestedField(
        "اسم الوكالة",
        collaboration,
        "agencyName"
    );

    addNestedField(
        "سبب انتهاء التعاون",
        collaboration,
        "reason"
    );

    addNestedField(
        "نتيجة التعاون",
        collaboration,
        "result"
    );

    addNestedField(
        "ما الذي ترغبون في تحسينه؟",
        collaboration,
        "improvement"
    );

    // =====================================================
    // STEP 07
    // =====================================================

    addSectionTitle(
        "07",
        "التحديات الحالية"
    );

    addArrayField(
        "التحديات المختارة",
        formData.challenges
    );

    // =====================================================
    // STEP 08
    // =====================================================

    addSectionTitle(
        "08",
        "الخدمات المطلوبة"
    );

    addArrayField(
        "الخدمات المختارة",
        formData.services
    );

    // =====================================================
    // STEP 09
    // =====================================================

    addSectionTitle(
        "09",
        "الميزانية المتوقعة"
    );

    const budget =
        formData.budget || {};

    addNestedField(
        "نوع الميزانية",
        budget,
        "type"
    );

    addNestedField(
        "من",
        budget,
        "from"
    );

    addNestedField(
        "إلى",
        budget,
        "to"
    );

    addNestedField(
        "العملة",
        budget,
        "currency"
    );

    // =====================================================
    // STEP 10
    // =====================================================

    addSectionTitle(
        "10",
        "توقعات المشروع"
    );

    addField(
        "التوقعات",
        formData.expectations
    );

    // =====================================================
    // STEP 11
    // =====================================================

    addSectionTitle(
        "11",
        "معلومات إضافية"
    );

    const additional =
        formData.additional || {};

    addArrayField(
        "القنوات التسويقية المفضلة",
        additional.preferredChannels
    );

    addNestedField(
        "وسيلة التواصل المفضلة",
        additional,
        "preferredContact"
    );

    addNestedField(
        "الموعد المتوقع لبدء المشروع",
        additional,
        "startDate"
    );

    addNestedField(
        "كيف عرفتم عن SABARAT؟",
        additional,
        "source"
    );

    addNestedField(
        "ملاحظات إضافية",
        additional,
        "notes"
    );

    // =====================================================
    // Footer
    // =====================================================

    const pageCount =
        pdf.internal.getNumberOfPages();

    for (
        let page = 1;
        page <= pageCount;
        page++
    ) {
        pdf.setPage(page);

        // -------------------------------------------------
        // Footer text
        // -------------------------------------------------

        pdf.setFont(
            "Amiri",
            "normal"
        );

        pdf.setFontSize(8);

        pdf.setTextColor(
            148,
            163,
            184
        );

        // English footer
        pdf.setR2L(false);

        pdf.text(
            "SABARAT • Client Discovery Form",
            margin,
            pageHeight - 7
        );

        // Page number
        pdf.setR2L(false);

        pdf.text(
            `${page} / ${pageCount}`,
            pageWidth - margin,
            pageHeight - 7,
            {
                align: "right",
            }
        );
    }

    // =====================================================
    // File Name
    // =====================================================

    const companyName =
        String(
            formData?.companyName ||
            "client"
        )
            .trim()
            .replace(
                /[<>:"/\\|?*]+/g,
                "-"
            )
            .replace(
                /\s+/g,
                "-"
            )
            .slice(
                0,
                80
            );

    const date =
        new Date()
            .toISOString()
            .slice(
                0,
                10
            );

    const fileName =
        `SABARAT-Discovery-${companyName}-${date}.pdf`;

    // =====================================================
    // Download
    // =====================================================

    pdf.save(fileName);

    return true;
}

export default DiscoveryPDF;