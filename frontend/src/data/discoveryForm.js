export const initialDiscoveryData = {
    companyName: "",
    contactName: "",
    jobTitle: "",
    phone: "",
    email: "",
    website: "",
    city: "",
    meetingDate: "",
    accountManager: "",

    social: {
        website: "",
        instagram: "",
        facebook: "",
        x: "",
        tiktok: "",
        youtube: "",
        linkedin: "",
    },

    businessField: "",
    yearsInBusiness: "",
    productsServices: "",
    competitors: ["", "", ""],
    competitiveAdvantage: "",

    brandStatus: [],

    marketingGoals: [],

    audience: {
        age: "",
        gender: "",
        location: "",
        language: "",
        interests: "",
        purchasingPower: "",
    },

    previousCollaboration: {
        workedBefore: "",
        agencyName: "",
        reason: "",
        result: "",
        improvement: "",
    },

    challenges: [],

    services: [],

    budget: {
        type: "",
        from: "",
        to: "",
        currency: "USD",
    },

    expectations: "",

    additional: {
        preferredChannels: [],
        preferredContact: "",
        startDate: "",
        source: "",
        notes: "",
    },

    privacyAccepted: false,
};

export const discoverySteps = [
    {
        id: 1,
        title: "بيانات العميل",
        subtitle: "المعلومات الأساسية وبيانات التواصل",
    },
    {
        id: 2,
        title: "النشاط التجاري",
        subtitle: "فهم طبيعة النشاط والسوق",
    },
    {
        id: 3,
        title: "العلامة التجارية",
        subtitle: "الوضع الحالي للعلامة",
    },
    {
        id: 4,
        title: "الأهداف التسويقية",
        subtitle: "ما الذي تريد تحقيقه؟",
    },
    {
        id: 5,
        title: "الجمهور المستهدف",
        subtitle: "من تريد الوصول إليه؟",
    },
    {
        id: 6,
        title: "التعاونات السابقة",
        subtitle: "خبرات وتجارب سابقة",
    },
    {
        id: 7,
        title: "التحديات",
        subtitle: "أهم المشاكل الحالية",
    },
    {
        id: 8,
        title: "الخدمات المطلوبة",
        subtitle: "حدد ما تحتاجه",
    },
    {
        id: 9,
        title: "الميزانية",
        subtitle: "النطاق الاستثماري المتوقع",
    },
    {
        id: 10,
        title: "توقعات المشروع",
        subtitle: "النتيجة التي تتطلع إليها",
    },
    {
        id: 11,
        title: "معلومات إضافية",
        subtitle: "تفاصيل ومتطلبات أخرى",
    },
];