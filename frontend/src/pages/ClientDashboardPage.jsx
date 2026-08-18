import { useEffect, useMemo, useState } from "react";
import {
  Activity, AlertCircle, ArrowLeft, Bell, CalendarDays, Check, CheckCircle2,
  ChevronLeft, ClipboardCheck, Clock3, CreditCard, Download, Eye, FileCheck2,
  FileText, FolderOpen, Headphones, LayoutDashboard, Loader2, LogOut, Menu,
  MessageCircle, Paperclip, Plus, Receipt, RefreshCw, Send, Settings, Sparkles,
  TrendingUp, Trash2, UploadCloud, User, Users, WalletCards, Landmark, Wallet, X, Zap
} from "lucide-react";

/* ============================================================================
   SABARAT — ClientDashboardPage
   ---------------------------------------------------------------------------
   Frontend workflow prepared for Laravel API integration.

   Environment:
   VITE_API_BASE_URL=http://127.0.0.1:8000/api

   Expected Laravel endpoints (the UI already knows these paths):
   GET    /client/dashboard
   POST   /client/payment-intents
   POST   /client/payments/{payment}/receipt
   POST   /client/approvals/{approval}/approve
   POST   /client/approvals/{approval}/revision
   POST   /client/messages
   POST   /client/requests
   POST   /client/tickets
   POST   /client/files
   GET    /client/notifications
   POST   /client/notifications/{notification}/read
   GET    /client/meetings
   GET    /client/invoices

   Until Laravel is connected, the component runs safely in localStorage demo mode.
   ============================================================================ */

const STORAGE = {
  discovery: "sabarat_client_discovery_form",
  project: "sabarat_client_project_state_v2",
  token: "sabarat_client_token",
};

const STATUS = {
  approval: "بانتظار اعتماد الشركة",
  payment: "بانتظار الدفع",
  paymentReview: "مراجعة إثبات الدفع",
  ready: "جاهز للبدء",
  planning: "مرحلة التخطيط",
  progress: "قيد التنفيذ",
  review: "مراجعة داخلية",
  clientApproval: "بانتظار موافقة العميل",
  revision: "بحاجة إلى تعديل",
  delivered: "تم التسليم",
  completed: "مكتمل",
};

const NAV = [
  ["overview", "نظرة عامة", LayoutDashboard],
  ["progress", "تقدم المشروع", Activity],
  ["services", "الخدمات المطلوبة", Sparkles],
  ["tasks", "المهام والتسليمات", ClipboardCheck],
  ["approvals", "الموافقات", FileCheck2],
  ["files", "الملفات والمستندات", FolderOpen],
  ["notifications", "الإشعارات", Bell],
  ["messages", "الرسائل", MessageCircle],
  ["meetings", "الاجتماعات", CalendarDays],
  ["invoices", "الفواتير والدفع", WalletCards],
  ["requests", "الطلبات الإضافية", Plus],
  ["support", "الدعم الفني", Headphones],
  ["company", "بيانات الحساب والشركة", Users],
];

const DEMO_DISCOVERY = {
  companyName: "عميل SABARAT",
  contactName: "مسؤول التواصل",
  jobTitle: "",
  phone: "",
  email: "",
  website: "",
  city: "",
  businessField: "غير محدد",
  yearsInBusiness: "",
  productsServices: "",
  competitors: [],
  competitiveAdvantage: "",
  brandStatus: [],
  marketingGoals: [],
  challenges: [],
  services: ["إدارة التسويق الرقمي"],
  audience: {},
  budget: { currency: "USD", from: "", to: "" },
  expectations: "",
  additional: {},
  social: {},
};

function safeRead(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Local demo storage is best-effort. Laravel becomes the source of truth.
  }
}

function discoveryData() {
  const d = { ...DEMO_DISCOVERY, ...safeRead(STORAGE.discovery, {}) };
  return {
    ...DEMO_DISCOVERY,
    ...d,
    audience: { ...DEMO_DISCOVERY.audience, ...(d.audience || {}) },
    budget: { ...DEMO_DISCOVERY.budget, ...(d.budget || {}) },
    additional: { ...(d.additional || {}) },
    social: { ...(d.social || {}) },
  };
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function now() {
  return new Date().toLocaleString("ar-YE", { dateStyle: "medium", timeStyle: "short" });
}

function initialProject(discovery) {
  const serviceNames = discovery.services?.length ? discovery.services : DEMO_DISCOVERY.services;
  return {
    id: "local-demo-project",
    reference: "SAB-PROJ-001",
    companyApproved: false,
    paymentCompleted: false,
    paymentReview: false,
    projectCreated: false,
    status: STATUS.approval,
    currentStage: "اعتماد المشروع",
    nextStage: "الدفع وبدء العمل",
    progress: 0,
    completedTasks: 0,
    totalContract: Number(discovery.budget?.to || 0) || 0,
    currency: discovery.budget?.currency || "USD",
    services: serviceNames.map((name, i) => ({
      id: `service-${i}`,
      name,
      status: STATUS.approval,
      progress: 0,
      owner: "سيتم التعيين بعد الاعتماد",
      updatedAt: "لم يبدأ",
    })),
    tasks: [],
    approvals: [],
    files: [],
    notifications: [{
      id: uid("notification"),
      title: "تم استلام نموذج الاحتياج",
      text: "تم حفظ طلبك وسيقوم فريق SABARAT بمراجعته.",
      type: "info",
      read: false,
      time: "الآن",
    }],
    messages: [],
    meetings: [],
    invoices: [],
    payments: [],
    requests: [],
    tickets: [],
    activity: [{
      id: uid("activity"),
      title: "إرسال نموذج الاحتياج",
      text: "تم إنشاء ملف العميل بنجاح.",
      status: "مكتمل",
      time: now(),
    }],
  };
}

function normalizeProject(saved, discovery) {
  const base = initialProject(discovery);
  if (!saved) return base;
  return {
    ...base,
    ...saved,
    services: saved.services || base.services,
    tasks: saved.tasks || [],
    approvals: saved.approvals || [],
    files: saved.files || [],
    notifications: saved.notifications || base.notifications,
    messages: saved.messages || [],
    meetings: saved.meetings || [],
    invoices: saved.invoices || [],
    payments: saved.payments || [],
    requests: saved.requests || [],
    tickets: saved.tickets || [],
    activity: saved.activity || base.activity,
  };
}

function calculate(project) {
  if (!project.companyApproved) return { progress: 0, status: STATUS.approval, currentStage: "اعتماد المشروع", nextStage: "الدفع وبدء العمل" };
  if (project.paymentReview) return { progress: 0, status: STATUS.paymentReview, currentStage: "مراجعة إثبات الدفع", nextStage: "تفعيل المشروع" };
  if (!project.paymentCompleted) return { progress: 0, status: STATUS.payment, currentStage: "الدفع", nextStage: "بدء التخطيط" };
  if (!project.projectCreated) return { progress: 0, status: STATUS.ready, currentStage: "جاهز للبدء", nextStage: "التخطيط" };
  const tasks = project.tasks || [];
  const done = tasks.filter((t) => t.status === "منجز").length;
  const progress = tasks.length ? Math.round((done / tasks.length) * 100) : Number(project.progress || 0);
  return {
    progress,
    status: project.status || STATUS.progress,
    currentStage: project.currentStage || STATUS.progress,
    nextStage: project.nextStage || "المراجعة",
  };
}

/* ============================================================================
   Laravel-ready API layer
   ============================================================================ */

const API_BASE = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

async function apiRequest(path, options = {}) {
  if (!API_BASE) return { local: true };
  const token = localStorage.getItem(STORAGE.token);
  const headers = { Accept: "application/json", ...(options.headers || {}) };
  if (!(options.body instanceof FormData)) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `HTTP ${response.status}`);
  }
  if (response.status === 204) return null;
  return response.json();
}

async function syncDashboard(setProject, setSyncing) {
  if (!API_BASE) return false;
  setSyncing(true);
  try {
    const data = await apiRequest("/client/dashboard");
    const serverProject = data?.project || data?.data?.project;
    if (serverProject) setProject((p) => normalizeProject(serverProject, discoveryData()));
    return true;
  } catch (error) {
    console.warn("SABARAT dashboard sync:", error);
    return false;
  } finally {
    setSyncing(false);
  }
}

/* ============================================================================
   Main Page
   ============================================================================ */

export default function ClientDashboardPage() {
  const discovery = useMemo(discoveryData, []);
  const [section, setSection] = useState("overview");
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState(() => normalizeProject(safeRead(STORAGE.project, null), discovery));
  const [syncing, setSyncing] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => safeWrite(STORAGE.project, project), [project]);
  useEffect(() => {
    syncDashboard(setProject, setSyncing);
  }, []);
  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  const state = calculate(project);
  const unread = project.notifications.filter((n) => !n.read).length;
  const pendingApprovals = project.approvals.filter((a) => a.status === "بانتظار الموافقة").length;

  const select = (id) => {
    setSection(id);
    setOpen(false);
  };

  const pushNotification = (p, title, text, type = "info") => ({
    ...p,
    notifications: [{ id: uid("notification"), title, text, type, read: false, time: "الآن" }, ...(p.notifications || [])],
  });

  const addActivity = (p, title, text, status = "جديد") => ({
    ...p,
    activity: [{ id: uid("activity"), title, text, status, time: now() }, ...(p.activity || [])],
  });

  const submitPaymentReceipt = async ({
    invoiceId, amount, method, reference, file, walletProvider, walletNumber,
    senderName, bankName, transferDate, notes,
  }) => {
    if (!project.companyApproved) {
      setToast({ type: "warning", text: "لا يمكن إرسال إثبات الدفع قبل اعتماد المشروع." });
      return;
    }
    const paymentId = uid("payment");
    const payment = {
      id: paymentId,
      invoiceId,
      amount: Number(amount || 0),
      method,
      reference: reference || "",
      status: "قيد المراجعة",
      submittedAt: now(),
      receipt: file ? { name: file.name, size: file.size, type: file.type } : null,
      walletProvider: walletProvider || "",
      walletNumber: walletNumber || "",
      senderName: senderName || "",
      bankName: bankName || "",
      transferDate: transferDate || "",
      notes: notes || "",
    };

    setProject((p) => {
      let next = { ...p, payments: [payment, ...(p.payments || [])], paymentReview: true, status: STATUS.paymentReview };
      next = pushNotification(next, "تم إرسال إثبات الدفع", `تم استلام إثبات الدفع بمبلغ ${Number(amount || 0).toLocaleString()} ${p.currency} وسيتم مراجعته من الإدارة.`, "payment");
      return addActivity(next, "إرسال إثبات دفع", "تم إرسال العملية للإدارة للمراجعة.", "قيد المراجعة");
    });

    if (API_BASE) {
      try {
        const form = new FormData();
        form.append("invoice_id", invoiceId || "");
        form.append("amount", String(amount || 0));
        form.append("method", method || "");
        form.append("reference", reference || "");
        form.append("wallet_provider", walletProvider || "");
        form.append("wallet_number", walletNumber || "");
        form.append("sender_name", senderName || "");
        form.append("bank_name", bankName || "");
        form.append("transfer_date", transferDate || "");
        form.append("notes", notes || "");
        if (file) form.append("receipt", file);
        await apiRequest("/client/payments/receipt", { method: "POST", body: form });
        setToast({ type: "success", text: "تم إرسال إثبات الدفع إلى إدارة SABARAT بنجاح." });
      } catch (error) {
        setToast({ type: "error", text: "تم حفظ العملية محليًا، لكن تعذر إرسالها للخادم. تحقق من Laravel API." });
        console.error(error);
      }
    } else {
      setToast({ type: "success", text: "تم تسجيل إثبات الدفع في الوضع التجريبي. عند تشغيل Laravel سيصل للإدارة تلقائيًا." });
    }
  };

  const sendMessage = async (text, attachment) => {
    if (!text.trim() && !attachment) return;
    const message = { id: uid("message"), sender: "client", text: text.trim(), time: now(), attachment: attachment ? { name: attachment.name, size: attachment.size } : null };
    setProject((p) => addActivity({ ...p, messages: [...(p.messages || []), message] }, "رسالة جديدة", "تم إرسال رسالة إلى فريق SABARAT.", "مرسل"));
    if (API_BASE) {
      try {
        await apiRequest("/client/messages", { method: "POST", body: JSON.stringify({ text: text.trim() }) });
      } catch (error) {
        console.error(error);
        setToast({ type: "error", text: "تعذر مزامنة الرسالة مع Laravel." });
      }
    }
  };

  const approval = async (id, action, note) => {
    const status = action === "approve" ? "تمت الموافقة" : "يحتاج تعديل";
    setProject((p) => {
      const approvals = p.approvals.map((a) => a.id === id ? { ...a, status, clientNote: note, updatedAt: now() } : a);
      let next = { ...p, approvals };
      next = pushNotification(next, action === "approve" ? "تم اعتماد التسليم" : "تم طلب تعديل", action === "approve" ? "تم إرسال موافقتك للفريق." : "تم إرسال ملاحظات التعديل للفريق.", action === "approve" ? "success" : "warning");
      return addActivity(next, action === "approve" ? "اعتماد تسليم" : "طلب تعديل", note || "تم تحديث حالة التسليم.", status);
    });
    if (API_BASE) {
      try {
        await apiRequest(`/client/approvals/${id}/${action === "approve" ? "approve" : "revision"}`, { method: "POST", body: JSON.stringify({ note }) });
      } catch (error) {
        console.error(error);
        setToast({ type: "error", text: "تعذر مزامنة قرار الموافقة مع الخادم." });
      }
    }
  };

  const createRequest = async ({ title, description, priority }) => {
    const request = { id: uid("request"), title, description, priority, status: "قيد المراجعة", createdAt: now() };
    setProject((p) => pushNotification({ ...p, requests: [request, ...(p.requests || [])] }, "طلب إضافي جديد", title));
    if (API_BASE) await apiRequest("/client/requests", { method: "POST", body: JSON.stringify({ title, description, priority }) }).catch(console.error);
    setToast({ type: "success", text: "تم إرسال الطلب إلى إدارة SABARAT." });
  };

  const createTicket = async ({ subject, description, priority }) => {
    const ticket = { id: uid("ticket"), subject, description, priority, status: "مفتوحة", createdAt: now() };
    setProject((p) => pushNotification({ ...p, tickets: [ticket, ...(p.tickets || [])] }, "تم فتح تذكرة دعم", subject));
    if (API_BASE) await apiRequest("/client/tickets", { method: "POST", body: JSON.stringify({ subject, description, priority }) }).catch(console.error);
    setToast({ type: "success", text: "تم فتح تذكرة الدعم بنجاح." });
  };

  const uploadFile = async (file, category = "client") => {
    if (!file) return;
    const meta = { id: uid("file"), name: file.name, size: formatBytes(file.size), type: file.type || "ملف", category, uploadedAt: now(), status: "تم الرفع" };
    setProject((p) => pushNotification({ ...p, files: [meta, ...(p.files || [])] }, "تم رفع ملف جديد", file.name));
    if (API_BASE) {
      const form = new FormData();
      form.append("file", file);
      form.append("category", category);
      try { await apiRequest("/client/files", { method: "POST", body: form }); }
      catch (error) { console.error(error); setToast({ type: "error", text: "تعذر رفع الملف إلى Laravel." }); }
    }
    setToast({ type: "success", text: `تم رفع ${file.name} بنجاح.` });
  };

  const deleteFile = async (id) => {
    const target = project.files.find((file) => file.id === id);
    if (!target) return;

    setProject((p) => ({
      ...p,
      files: p.files.filter((file) => file.id !== id),
      notifications: [
        {
          id: uid("notification"),
          title: "تم حذف ملف",
          text: `تم حذف الملف ${target.name} من مساحة العميل.`,
          type: "info",
          read: false,
          time: "الآن",
        },
        ...(p.notifications || []),
      ],
      activity: [
        {
          id: uid("activity"),
          title: "حذف ملف",
          text: `تم حذف ${target.name}.`,
          status: "تم الحذف",
          time: now(),
        },
        ...(p.activity || []),
      ],
    }));

    if (API_BASE) {
      try {
        await apiRequest(`/client/files/${id}`, { method: "DELETE" });
      } catch (error) {
        console.error(error);
        setToast({ type: "error", text: "تم الحذف محليًا، لكن تعذر مزامنته مع Laravel." });
        return;
      }
    }

    setToast({ type: "success", text: `تم حذف ${target.name} بنجاح.` });
  };

  const markNotificationRead = async (id) => {
    setProject((p) => ({ ...p, notifications: p.notifications.map((n) => n.id === id ? { ...n, read: true } : n) }));
    if (API_BASE) await apiRequest(`/client/notifications/${id}/read`, { method: "POST" }).catch(console.error);
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 text-slate-900 selection:bg-sky-100">
      <style>{DASHBOARD_STYLES}</style>

      <header className="sticky top-0 z-50 h-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="rounded-xl p-2 hover:bg-sky-50 lg:hidden" aria-label="فتح القائمة"><Menu size={22}/></button>
            <div className="brand-mark">S</div>
            <div><b className="tracking-tight">SABARAT</b><p className="text-xs text-slate-500">بوابة العميل الذكية</p></div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => syncDashboard(setProject, setSyncing)} className="hidden rounded-xl border border-slate-200 bg-white p-2.5 text-slate-500 transition hover:border-sky-300 hover:text-sky-600 sm:block" title="مزامنة البيانات">
              <RefreshCw size={18} className={syncing ? "animate-spin" : ""}/>
            </button>
            <div className="hidden text-left sm:block"><p className="text-sm font-black">{discovery.companyName}</p><p className="text-xs text-slate-500">{discovery.contactName}</p></div>
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-sky-50 text-sky-600"><User size={19}/>{unread > 0 && <span className="notification-dot">{unread > 9 ? "9+" : unread}</span>}</div>
          </div>
        </div>
      </header>

      <div className="flex">
        <Sidebar open={open} onClose={() => setOpen(false)} section={section} select={select} discovery={discovery} unread={unread} pending={pendingApprovals} status={state.status}/>
        {open && <button onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden" aria-label="إغلاق القائمة"/>}

        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-[1600px] p-4 sm:p-6 lg:p-8">
            {section === "overview" && <Overview discovery={discovery} project={project} state={state} pending={pendingApprovals} select={select}/>} 
            {section === "progress" && <Progress project={project} state={state} discovery={discovery}/>} 
            {section === "services" && <Services services={project.services}/>} 
            {section === "tasks" && <Tasks tasks={project.tasks}/>} 
            {section === "approvals" && <Approvals approvals={project.approvals} onApproval={approval}/>} 
            {section === "files" && <Files files={project.files} onUpload={uploadFile} onDelete={deleteFile}/>} 
            {section === "notifications" && <Notifications notifications={project.notifications} onRead={markNotificationRead}/>} 
            {section === "messages" && <Messages messages={project.messages} send={sendMessage}/>} 
            {section === "meetings" && <Meetings meetings={project.meetings}/>} 
            {section === "invoices" && <Payments project={project} discovery={discovery} onSubmitPayment={submitPaymentReceipt}/>} 
            {section === "requests" && <Requests requests={project.requests} onCreate={createRequest}/>} 
            {section === "support" && <Support tickets={project.tickets} onCreate={createTicket}/>} 
            {section === "company" && <Company discovery={discovery}/>} 
          </div>
        </main>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)}/>} 
    </div>
  );
}

/* ============================================================================
   Sidebar
   ============================================================================ */

function Sidebar({ open, onClose, section, select, discovery, unread, pending, status }) {
  return <aside className={`fixed right-0 top-0 z-[60] h-screen w-[292px] border-l border-slate-200 bg-white transition-transform lg:sticky lg:top-20 lg:z-30 lg:h-[calc(100vh-5rem)] lg:translate-x-0 ${open ? "translate-x-0" : "translate-x-full"}`}>
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-200 p-5">
        <div className="flex items-center justify-between"><div><p className="text-xs font-black tracking-[.2em] text-sky-600">SABARAT</p><p className="font-black">مساحة العميل</p></div><button onClick={onClose} className="lg:hidden"><X size={18}/></button></div>
        <div className="mt-5 rounded-2xl bg-slate-50 p-4"><div className="flex items-center gap-3"><div className="avatar"><User size={18}/></div><div className="min-w-0"><p className="truncate text-sm font-black">{discovery.companyName}</p><p className="truncate text-xs text-slate-500">{discovery.contactName}</p></div></div><div className="mt-3 flex items-center gap-2 text-xs font-bold text-slate-500"><span className="h-2 w-2 rounded-full bg-amber-500"/>{status}</div></div>
      </div>
      <nav className="flex-1 overflow-y-auto p-4">{NAV.map(([id,label,Icon]) => { const badge=id==="notifications"?unread:id==="approvals"?pending:0; return <button key={id} onClick={() => select(id)} className={`mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition ${section===id?"bg-sky-50 text-sky-700 shadow-sm":"text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}><Icon size={18}/><span className="flex-1 text-right">{label}</span>{badge>0&&<span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] text-white">{badge}</span>}</button>})}</nav>
      <div className="border-t border-slate-200 p-4"><button className="mb-1 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50"><Settings size={18}/>إعدادات الحساب</button><button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50"><LogOut size={18}/>تسجيل الخروج</button></div>
    </div>
  </aside>;
}

/* ============================================================================
   Overview / Analytics
   ============================================================================ */

function Overview({ discovery, project, state, pending, select }) {
  const done = project.tasks.filter(t=>t.status==="منجز").length;
  const remaining = Math.max(project.tasks.length-done,0);
  const total = project.invoices.reduce((s,i)=>s+Number(i.total||0),0);
  const paid = project.invoices.reduce((s,i)=>s+Number(i.paid||0),0);
  return <div className="space-y-6 animate-enter">
    <div className="hero-card"><div className="relative z-10"><p className="text-xs font-black tracking-[.2em] text-sky-600">لوحة العميل • {project.reference}</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">مرحبًا {discovery.contactName} 👋</h1><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500">من هنا تتابع مشروعك بالكامل: الموافقات، الدفع، المهام، الملفات، الرسائل، الاجتماعات والتسليمات — وكل تحديث يصل إليك ويظهر لفريق SABARAT.</p><div className="mt-6 flex flex-wrap gap-3"><span className="glass-pill"><Zap size={15}/> {state.currentStage}</span><span className="glass-pill"><TrendingUp size={15}/> {state.progress}% إنجاز</span></div></div><div className="hero-orb"><Sparkles size={38}/></div></div>

    {!project.companyApproved && <Gate title="المشروع بانتظار اعتماد SABARAT" text="تم استلام نموذج الاحتياج. بعد اعتماد الإدارة ستظهر الفاتورة وخيارات الدفع ويمكنك إرسال إثبات الدفع من هذه البوابة." tone="warning"/>}
    {project.companyApproved && !project.paymentCompleted && !project.paymentReview && <Gate title="تم اعتماد المشروع — الخطوة التالية الدفع" text="أصبح المشروع جاهزًا للانتقال إلى مرحلة الدفع. بعد إرسال إثبات الدفع تتم مراجعته من الإدارة ثم يتم تفعيل المشروع." tone="primary" action={<button onClick={()=>select("invoices")} className="primary-btn">فتح الدفع والفاتورة <ArrowLeft size={17}/></button>}/>} 
    {project.paymentReview && <Gate title="إثبات الدفع قيد المراجعة" text="تم إرسال العملية بنجاح. لا تحتاج إلى إعادة الإرسال ما لم تطلب الإدارة ذلك." tone="primary" action={<button onClick={()=>select("notifications")} className="secondary-btn">عرض التحديثات</button>}/>} 
    {project.paymentCompleted && <Gate title="المشروع مفعل ✓" text="تم اعتماد الدفع ويمكن لفريق SABARAT متابعة التخطيط والتنفيذ وفق سير العمل." tone="success"/>}

    <div className="grid gap-5 xl:grid-cols-12">
      <div className="xl:col-span-7"><AnalyticsCard project={project} state={state}/></div>
      <div className="xl:col-span-5"><ProgressCard progress={state.progress} status={state.status}/></div>
    </div>

    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      <Stat icon={Sparkles} label="الخدمات المطلوبة" value={project.services.length}/>
      <Stat icon={CheckCircle2} label="المهام المنجزة" value={done}/>
      <Stat icon={Clock3} label="المهام المتبقية" value={remaining}/>
      <Stat icon={CreditCard} label="المدفوع" value={`${paid.toLocaleString()} ${project.currency}`}/>
    </div>

    <div className="grid gap-5 lg:grid-cols-2"><Stages project={project} state={state}/><ActivityFeed activity={project.activity}/></div>

    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-xs font-black text-sky-600">الوصول السريع</p><h3 className="mt-1 text-xl font-black">كل ما تحتاجه في مكان واحد</h3></div><span className="text-xs font-bold text-slate-400">إجمالي العقود: {total.toLocaleString()} {project.currency}</span></div><div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{[["services","الخدمات",Sparkles],["tasks","المهام",ClipboardCheck],["approvals","الموافقات",FileCheck2],["invoices","الدفع والفواتير",WalletCards]].map(([id,label,Icon])=><button key={id} onClick={()=>select(id)} className="quick-btn"><Icon size={18} className="text-sky-600"/>{label}</button>)}</div>{pending>0&&<p className="mt-4 text-xs font-bold text-amber-600">لديك {pending} تسليم يحتاج إلى موافقتك.</p>}</div>
  </div>;
}

function AnalyticsCard({ project }) {
  const values = project.activity.slice(0,7).reverse().map((_,i)=>Math.max(8, Math.round((project.progress||0)*((i+1)/7))));
  while(values.length<7) values.unshift(0);
  return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-start justify-between"><div><p className="text-xs font-black text-sky-600">تحليلات المشروع</p><h3 className="mt-1 text-xl font-black">مؤشر الإنجاز</h3></div><span className="rounded-xl bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700"><TrendingUp size={14} className="inline"/> مباشر</span></div><div className="mt-8 h-52"><MiniLineChart values={values}/></div><div className="mt-5 grid grid-cols-3 gap-3"><Metric label="الإنجاز" value={`${project.progress||0}%`}/><Metric label="الخدمات" value={project.services.length}/><Metric label="التسليمات" value={project.approvals.length}/></div></div>;
}

function MiniLineChart({ values }) {
  const max=Math.max(...values,100), min=Math.min(...values,0); const points=values.map((v,i)=>`${(i/(values.length-1||1))*100},${100-((v-min)/(max-min||1))*82-8}`).join(" ");
  return <div className="relative h-full"><div className="absolute inset-0 flex flex-col justify-between">{[1,2,3,4].map(i=><div key={i} className="border-t border-dashed border-slate-100"/>)}</div><svg viewBox="0 0 100 100" preserveAspectRatio="none" className="relative h-full w-full overflow-visible"><defs><linearGradient id="area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#38bdf8" stopOpacity=".25"/><stop offset="1" stopColor="#38bdf8" stopOpacity="0"/></linearGradient></defs><polygon points={`0,100 ${points} 100,100`} fill="url(#area)"/><polyline points={points} fill="none" stroke="#0284c7" strokeWidth="1.8" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round"/></svg></div>;
}

function ProgressCard({ progress, status }) { return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-xs font-black text-sky-600">الحالة الحالية</p><h3 className="mt-1 text-xl font-black">نسبة الإنجاز</h3></div><Activity size={20} className="text-sky-600"/></div><Ring progress={progress} status={status}/></div>; }

/* ============================================================================
   Sections
   ============================================================================ */

function Progress({ project, state }) { return <div className="space-y-6 animate-enter"><Title eyebrow="تقدم المشروع" title="تقدم مشروعك" text="يتم احتساب الإنجاز من المهام المسجلة واعتمادات الفريق، وليس من إدخال العميل فقط."/><div className="grid gap-5 lg:grid-cols-3"><ProgressCard progress={state.progress} status={state.status}/><div className="lg:col-span-2"><ServiceList services={project.services}/></div></div><Status project={project} state={state}/><ActivityFeed activity={project.activity}/></div>; }

function Services({ services }) { return <div className="space-y-6 animate-enter"><Title eyebrow="الخدمات" title="الخدمات المطلوبة" text="كل خدمة مرتبطة بالمشروع وتظهر حالتها ونسبة إنجازها والمسؤول عنها."/><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{services.map(s=><div key={s.id} className="service-card"><div className="flex gap-4"><div className="icon-box"><Sparkles size={20}/></div><div><h3 className="font-black">{s.name}</h3><p className="mt-1 text-xs text-slate-500">المسؤول: {s.owner}</p></div></div><div className="mt-6 flex justify-between text-xs font-black"><span>الإنجاز</span><span>{s.progress}%</span></div><div className="mt-2"><Bar value={s.progress}/></div><div className="mt-4 flex justify-between"><Badge text={s.status}/><span className="text-xs text-slate-400">{s.updatedAt}</span></div></div>)}</div></div>; }

function Tasks({ tasks }) { const groups=["منجز","قيد التنفيذ","بانتظار العميل"]; return <div className="space-y-6 animate-enter"><Title eyebrow="المهام والتسليمات" title="المهام" text="المهام مصدر أساسي لاحتساب تقدم المشروع. لا يتغير الإنجاز إلا من خلال حالة المهمة."/><div className="grid gap-5 lg:grid-cols-3">{groups.map(g=><div key={g} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex justify-between"><h3 className="font-black">{g}</h3><span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-black">{tasks.filter(t=>t.status===g).length}</span></div><div className="mt-5 space-y-3">{tasks.filter(t=>t.status===g).map(t=><div key={t.id} className="rounded-2xl border border-slate-200 p-4"><div className="flex items-start gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500"/><div><p className="font-bold">{t.title}</p><p className="mt-1 text-xs leading-5 text-slate-500">{t.description}</p>{t.dueDate&&<p className="mt-2 text-[11px] font-bold text-slate-400">التسليم: {t.dueDate}</p>}</div></div></div>)}{!tasks.filter(t=>t.status===g).length&&<Empty title="لا توجد مهام" text="لا توجد عناصر في هذه المرحلة."/>}</div></div>)}</div></div>; }

function Approvals({ approvals, onApproval }) { const [notes,setNotes]=useState({}); return <div className="space-y-6 animate-enter"><Title eyebrow="الموافقات" title="مراجعة التسليمات" text="أي اعتماد أو طلب تعديل ينتقل إلى إدارة SABARAT ويظهر في سجل المشروع."/><div className="space-y-4">{approvals.length?approvals.map(a=><div key={a.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex flex-col gap-3 md:flex-row md:justify-between"><div><h3 className="font-black">{a.title}</h3><p className="mt-2 text-sm leading-7 text-slate-500">{a.description}</p></div><Badge text={a.status}/></div>{a.status==="بانتظار الموافقة"&&<div className="mt-5"><textarea value={notes[a.id]||""} onChange={e=>setNotes({...notes,[a.id]:e.target.value})} rows={3} placeholder="ملاحظات أو تعديلات (اختياري)" className="field"/><div className="mt-3 flex flex-wrap gap-3"><button onClick={()=>onApproval(a.id,"approve",notes[a.id]||"")} className="success-btn"><Check size={17}/> اعتماد التسليم</button><button onClick={()=>onApproval(a.id,"revision",notes[a.id]||"")} className="warning-btn">طلب تعديل</button></div></div>}{a.clientNote&&<div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600"><b>ملاحظتك:</b> {a.clientNote}</div>}</div>):<Empty title="لا توجد موافقات" text="ستظهر التسليمات التي تحتاج موافقتك هنا."/>}</div></div>; }

function Files({ files, onUpload, onDelete }) {
  const inputId = "client-file-upload";
  const [deleting, setDeleting] = useState(null);

  const handleDelete = async (file) => {
    if (!window.confirm(`هل أنت متأكد من حذف الملف "${file.name}"؟`)) return;
    setDeleting(file.id);
    try {
      await onDelete(file.id);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <Title
          eyebrow="الملفات"
          title="الملفات والمستندات"
          text="ارفع الهوية البصرية، المحتوى، المستندات أو أي ملفات يحتاجها فريق المشروع. يمكنك حذف الملفات التي رفعتها من مساحة العميل."
        />
        <label htmlFor={inputId} className="primary-btn cursor-pointer">
          <UploadCloud size={18} />
          رفع ملفات
          <input
            id={inputId}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => {
              Array.from(e.target.files || []).forEach((file) => onUpload(file, "client"));
              e.target.value = "";
            }}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Money label="عدد الملفات" value={files.length} />
        <Money label="ملفات العميل" value={files.filter((file) => file.category === "client").length} />
        <Money label="آخر تحديث" value={files[0]?.uploadedAt || "لا يوجد"} />
      </div>

      <div className="space-y-3">
        {files.length ? files.map((file) => (
          <div key={file.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center">
            <div className="icon-box"><FileText size={19} /></div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-black">{file.name}</p>
              <p className="mt-1 text-xs text-slate-500">
                {file.type} • {file.size} • {file.uploadedAt}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge text={file.status || "تم الرفع"} />
                {file.category && <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500">{file.category}</span>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {file.url && (
                <a href={file.url} target="_blank" rel="noreferrer" className="rounded-xl border border-slate-200 p-3 hover:bg-slate-50" title="فتح الملف">
                  <Eye size={17} />
                </a>
              )}
              <button
                type="button"
                onClick={() => handleDelete(file)}
                disabled={deleting === file.id}
                className="rounded-xl border border-red-100 p-3 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                title="حذف الملف"
              >
                {deleting === file.id ? <Loader2 size={17} className="animate-spin" /> : <Trash2 size={17} />}
              </button>
            </div>
          </div>
        )) : <Empty title="لا توجد ملفات" text="ابدأ برفع أول ملف للمشروع." />}
      </div>
    </div>
  );
}

function Notifications({ notifications, onRead }) { return <div className="space-y-6 animate-enter"><Title eyebrow="الإشعارات" title="مركز الإشعارات" text="كل اعتماد أو دفع أو تحديث من الإدارة يظهر هنا."/><div className="space-y-3">{notifications.map(n=><button key={n.id} onClick={()=>onRead(n.id)} className={`w-full rounded-2xl border bg-white p-5 text-right shadow-sm transition hover:-translate-y-0.5 ${n.read?"border-slate-200":"border-sky-300 bg-sky-50/40"}`}><div className="flex gap-4"><span className={`mt-2 h-2.5 w-2.5 rounded-full ${n.read?"bg-slate-300":"bg-sky-500"}`}/><div className="flex-1"><div className="flex justify-between gap-3"><p className="font-black">{n.title}</p><span className="text-xs text-slate-400">{n.time}</span></div><p className="mt-1 text-sm leading-6 text-slate-500">{n.text}</p></div></div></button>)}</div></div>; }

function Messages({ messages, send }) { const [text,setText]=useState(""); const [file,setFile]=useState(null); const submit=()=>{send(text,file);setText("");setFile(null)}; return <div className="space-y-6 animate-enter"><Title eyebrow="الرسائل" title="التواصل مع الفريق" text="محادثة المشروع مرتبطة مستقبلاً مباشرة بـ Laravel وقاعدة البيانات."/><div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="min-h-[440px] space-y-4 p-5">{messages.length?messages.map(m=><div key={m.id} className={m.sender==="client"?"text-right":"text-left"}><span className={`inline-block max-w-[85%] rounded-2xl px-4 py-3 text-sm ${m.sender==="client"?"bg-sky-50 text-slate-800":"bg-slate-900 text-white"}`}>{m.text}{m.attachment&&<div className="mt-2 rounded-lg bg-black/5 p-2 text-xs"><Paperclip size={13} className="inline"/> {m.attachment.name}</div>}<small className="mt-1 block opacity-50">{m.time}</small></span></div>):<Empty title="لا توجد محادثات" text="ابدأ بإرسال رسالة إلى فريق SABARAT."/>}</div><div className="border-t border-slate-200 p-4"><div className="flex gap-3"><label className="cursor-pointer rounded-xl border border-slate-200 p-3"><Paperclip size={17}/><input type="file" className="hidden" onChange={e=>setFile(e.target.files?.[0]||null)}/></label><input value={text} onChange={e=>setText(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder={file?`مرفق: ${file.name}`:"اكتب رسالتك..."} className="field flex-1"/><button onClick={submit} className="primary-btn px-5"><Send size={18}/></button></div></div></div></div>; }

function Meetings({ meetings }) { return <div className="space-y-6 animate-enter"><Title eyebrow="الاجتماعات" title="اجتماعات المشروع" text="المواعيد وروابط الاجتماعات وملاحظاتها."/><div className="grid gap-5 md:grid-cols-2">{meetings.length?meetings.map(m=><div key={m.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex gap-4"><div className="icon-box"><CalendarDays size={20}/></div><div><h3 className="font-black">{m.title}</h3><p className="mt-1 text-sm text-slate-500">{m.date}</p></div></div>{m.link&&<a href={m.link} target="_blank" rel="noreferrer" className="primary-btn mt-5 inline-flex">دخول الاجتماع</a>}{m.notes&&<p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-500">{m.notes}</p>}</div>):<Empty title="لا توجد اجتماعات" text="سيظهر الاجتماع القادم هنا."/>}</div></div>; }

function Payments({ project, discovery, onSubmitPayment }) {
  const [invoice, setInvoice] = useState(project.invoices[0] || null);
  const [amount, setAmount] = useState(project.invoices[0]?.total || project.totalContract || "");
  const [method, setMethod] = useState("تحويل بنكي");
  const [reference, setReference] = useState("");
  const [file, setFile] = useState(null);
  const [walletProvider, setWalletProvider] = useState("");
  const [walletNumber, setWalletNumber] = useState("");
  const [senderName, setSenderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [transferDate, setTransferDate] = useState("");
  const [notes, setNotes] = useState("");

  const total = project.invoices.reduce((s, i) => s + Number(i.total || 0), 0) || Number(project.totalContract || 0);
  const paid = project.invoices.reduce((s, i) => s + Number(i.paid || 0), 0) + project.payments.filter((p) => p.status === "تم الدفع").reduce((s, p) => s + Number(p.amount || 0), 0);
  const remaining = Math.max(total - paid, 0);

  const paymentPayload = {
    invoiceId: invoice?.id,
    amount,
    method,
    reference,
    file,
    walletProvider,
    walletNumber,
    senderName,
    bankName,
    transferDate,
    notes,
  };

  return (
    <div className="space-y-6 animate-enter">
      <Title
        eyebrow="الفواتير والدفع"
        title="الدفع والفواتير"
        text="أرسل دفعتك من خلال محفظة إلكترونية أو حوالة بنكية أو وسيلة أخرى، وأرفق إثبات الدفع ليتم مراجعته واعتماده من الإدارة."
      />

      {!project.companyApproved && <Gate title="الدفع غير متاح" text="انتظر اعتماد المشروع من إدارة SABARAT." tone="warning" />}
      {project.companyApproved && project.paymentReview && <Gate title="إثبات الدفع قيد المراجعة" text="تم إرسال العملية للإدارة. لا تعِد إرسالها إلا إذا طلبت الإدارة ذلك." tone="primary" />}
      {project.companyApproved && !project.paymentCompleted && !project.paymentReview && (
        <PaymentForm
          invoice={invoice}
          amount={amount}
          setAmount={setAmount}
          method={method}
          setMethod={setMethod}
          reference={reference}
          setReference={setReference}
          file={file}
          setFile={setFile}
          walletProvider={walletProvider}
          setWalletProvider={setWalletProvider}
          walletNumber={walletNumber}
          setWalletNumber={setWalletNumber}
          senderName={senderName}
          setSenderName={setSenderName}
          bankName={bankName}
          setBankName={setBankName}
          transferDate={transferDate}
          setTransferDate={setTransferDate}
          notes={notes}
          setNotes={setNotes}
          maxAmount={remaining}
          onSubmit={() => onSubmitPayment(paymentPayload)}
        />
      )}

      <div className="grid gap-5 md:grid-cols-3">
        <Money label="إجمالي العقد والفواتير" value={`${total.toLocaleString()} ${discovery.budget?.currency || project.currency}`} />
        <Money label="إجمالي المدفوع" value={`${paid.toLocaleString()} ${project.currency}`} />
        <Money label="المبلغ المتبقي" value={`${remaining.toLocaleString()} ${project.currency}`} />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-black">الفواتير</h3>
          <Badge text={project.paymentCompleted ? "تم الدفع" : project.paymentReview ? "قيد المراجعة" : project.companyApproved ? "بانتظار الدفع" : "لم تصدر بعد"} />
        </div>
        {project.invoices.length ? project.invoices.map((item) => (
          <div key={item.id} className="mt-4 flex flex-wrap items-center gap-4 border-b border-slate-100 py-4 last:border-0">
            <div className="flex-1"><b>{item.number}</b><p className="text-xs text-slate-500">{item.date}</p></div>
            <b>{Number(item.total || 0).toLocaleString()} {item.currency || project.currency}</b>
            <Badge text={item.status || "مفتوحة"} />
          </div>
        )) : <div className="mt-5"><Empty title="لا توجد فواتير" text="ستظهر الفواتير بعد اعتماد المشروع من الإدارة." /></div>}
      </div>

      {project.payments.length > 0 && (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="font-black">سجل عمليات الدفع</h3>
          <div className="mt-4 space-y-3">
            {project.payments.map((payment) => (
              <div key={payment.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex flex-wrap items-center gap-3">
                  {payment.method === "محفظة إلكترونية" ? <Wallet size={18} className="text-sky-600" /> : <Landmark size={18} className="text-sky-600" />}
                  <div className="flex-1">
                    <b>{Number(payment.amount || 0).toLocaleString()} {project.currency}</b>
                    <p className="text-xs text-slate-500">{payment.method} • {payment.submittedAt}</p>
                  </div>
                  <Badge text={payment.status} />
                </div>
                <div className="mt-3 grid gap-2 text-xs text-slate-500 sm:grid-cols-2 lg:grid-cols-4">
                  {payment.reference && <span>المرجع: <b>{payment.reference}</b></span>}
                  {payment.walletProvider && <span>المحفظة: <b>{payment.walletProvider}</b></span>}
                  {payment.bankName && <span>البنك: <b>{payment.bankName}</b></span>}
                  {payment.senderName && <span>المحوّل: <b>{payment.senderName}</b></span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function PaymentForm({
  invoice, amount, setAmount, method, setMethod, reference, setReference, file, setFile,
  walletProvider, setWalletProvider, walletNumber, setWalletNumber, senderName, setSenderName,
  bankName, setBankName, transferDate, setTransferDate, notes, setNotes, maxAmount, onSubmit,
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setError("");
    if (!amount || Number(amount) <= 0) { setError("أدخل مبلغ دفع صحيح."); return; }
    if (maxAmount > 0 && Number(amount) > maxAmount) { setError(`المبلغ لا يمكن أن يتجاوز المتبقي: ${maxAmount.toLocaleString()}.`); return; }
    if (!file) { setError("أرفق إثبات الدفع قبل الإرسال."); return; }
    if (method === "محفظة إلكترونية" && !walletProvider.trim()) { setError("اختر أو أدخل اسم المحفظة الإلكترونية."); return; }
    if (method === "تحويل بنكي" && !bankName.trim()) { setError("أدخل اسم البنك."); return; }
    setBusy(true);
    try { await onSubmit(); } finally { setBusy(false); }
  };

  return (
    <div className="payment-panel">
      <div className="flex items-start gap-4">
        <div className="icon-box"><Receipt size={20} /></div>
        <div><h3 className="text-xl font-black">إرسال دفعة وإثبات الدفع</h3><p className="mt-1 text-sm leading-6 text-slate-500">أدخل بيانات العملية بدقة، ثم أرفق الإيصال ليصل إلى إدارة SABARAT للمراجعة.</p></div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="label">الفاتورة<select value={invoice?.id || ""} onChange={() => {}} className="field"><option value={invoice?.id || ""}>{invoice?.number || "الفاتورة الحالية"}</option></select></label>
        <label className="label">المبلغ<input value={amount} onChange={(e) => setAmount(e.target.value)} type="number" min="0.01" step="0.01" className="field" placeholder="0.00" /></label>
        <label className="label">طريقة الدفع<select value={method} onChange={(e) => setMethod(e.target.value)} className="field"><option>تحويل بنكي</option><option>محفظة إلكترونية</option><option>نقدي</option><option>بطاقة</option><option>أخرى</option></select></label>
        <label className="label">رقم العملية / المرجع<input value={reference} onChange={(e) => setReference(e.target.value)} className="field" placeholder="رقم الحوالة أو العملية" /></label>
      </div>

      {method === "محفظة إلكترونية" && (
        <div className="mt-4 grid gap-4 rounded-2xl border border-sky-100 bg-white/70 p-4 md:grid-cols-2">
          <label className="label">اسم المحفظة<input value={walletProvider} onChange={(e) => setWalletProvider(e.target.value)} className="field" placeholder="مثال: جوالي / كاش / محفظة أخرى" /></label>
          <label className="label">رقم المحفظة<input value={walletNumber} onChange={(e) => setWalletNumber(e.target.value)} className="field" placeholder="رقم المحفظة أو الحساب" /></label>
          <label className="label md:col-span-2">اسم صاحب المحفظة / المحوّل<input value={senderName} onChange={(e) => setSenderName(e.target.value)} className="field" placeholder="الاسم كما يظهر في العملية" /></label>
        </div>
      )}

      {method === "تحويل بنكي" && (
        <div className="mt-4 grid gap-4 rounded-2xl border border-sky-100 bg-white/70 p-4 md:grid-cols-2">
          <label className="label">اسم البنك<input value={bankName} onChange={(e) => setBankName(e.target.value)} className="field" placeholder="اسم البنك" /></label>
          <label className="label">تاريخ التحويل<input value={transferDate} onChange={(e) => setTransferDate(e.target.value)} type="date" className="field" /></label>
          <label className="label md:col-span-2">اسم المحوّل<input value={senderName} onChange={(e) => setSenderName(e.target.value)} className="field" placeholder="اسم صاحب الحساب المحوّل" /></label>
        </div>
      )}

      <label className="upload-zone mt-4">
        <UploadCloud size={26} className="text-sky-600" />
        <span className="font-black">{file ? file.name : "ارفع إيصال الدفع"}</span>
        <small className="text-slate-500">PDF, JPG, PNG — الحد الموصى به 10MB</small>
        <input type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        {file && <button type="button" onClick={(e) => { e.preventDefault(); setFile(null); }} className="rounded-lg px-3 py-1.5 text-xs font-black text-red-500 hover:bg-red-50">إزالة الإيصال</button>}
      </label>

      <label className="label mt-4">ملاحظات العملية<textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="field resize-none" placeholder="أي ملاحظات إضافية حول الدفع..." /></label>

      {error && <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700">{error}</div>}

      <button onClick={submit} disabled={busy} className="primary-btn mt-5 w-full justify-center disabled:cursor-not-allowed disabled:opacity-50">
        {busy ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        {busy ? "جاري إرسال العملية..." : "إرسال إثبات الدفع للإدارة"}
      </button>
    </div>
  );
}

function Requests({ requests, onCreate }) { const [title,setTitle]=useState("");const [description,setDescription]=useState("");const [priority,setPriority]=useState("عادي");const submit=()=>{if(!title.trim())return;onCreate({title,description,priority});setTitle("");setDescription("")};return <div className="space-y-6 animate-enter"><Title eyebrow="الطلبات الإضافية" title="طلب جديد" text="أي طلب خارج نطاق المشروع يرسل للإدارة لتحديد النطاق والتكلفة والموعد قبل اعتماده."/><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="grid gap-4 md:grid-cols-2"><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="عنوان الطلب" className="field"/><select value={priority} onChange={e=>setPriority(e.target.value)} className="field"><option>عادي</option><option>مهم</option><option>عاجل</option></select></div><textarea value={description} onChange={e=>setDescription(e.target.value)} rows={4} placeholder="تفاصيل الطلب..." className="field mt-4"/><button onClick={submit} className="primary-btn mt-4"><Plus size={18}/> إرسال الطلب</button></div><div className="space-y-3">{requests.length?requests.map(r=><div key={r.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex justify-between gap-3"><div><b>{r.title}</b><p className="mt-2 text-sm text-slate-500">{r.description}</p><p className="mt-2 text-xs text-slate-400">الأولوية: {r.priority} • {r.createdAt}</p></div><Badge text={r.status}/></div></div>):<Empty title="لا توجد طلبات" text="يمكنك إنشاء طلب جديد من النموذج."/>}</div></div>; }

function Support({ tickets, onCreate }) { const [subject,setSubject]=useState("");const [description,setDescription]=useState("");const [priority,setPriority]=useState("عادي");const submit=()=>{if(!subject.trim())return;onCreate({subject,description,priority});setSubject("");setDescription("")};return <div className="space-y-6 animate-enter"><Title eyebrow="الدعم" title="مركز الدعم الفني" text="افتح تذكرة لأي استفسار أو مشكلة، وتابع حالتها من نفس الصفحة."/><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="grid gap-4 md:grid-cols-2"><input value={subject} onChange={e=>setSubject(e.target.value)} placeholder="موضوع التذكرة" className="field"/><select value={priority} onChange={e=>setPriority(e.target.value)} className="field"><option>عادي</option><option>مهم</option><option>عاجل</option></select></div><textarea value={description} onChange={e=>setDescription(e.target.value)} rows={4} placeholder="وصف المشكلة..." className="field mt-4"/><button onClick={submit} className="primary-btn mt-4"><Headphones size={18}/> فتح تذكرة</button></div><div className="space-y-3">{tickets.length?tickets.map(t=><div key={t.id} className="flex justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div><b>{t.subject}</b><p className="mt-1 text-sm text-slate-500">{t.description}</p><p className="mt-2 text-xs text-slate-400">الأولوية: {t.priority} • {t.createdAt}</p></div><Badge text={t.status}/></div>):<Empty title="لا توجد تذاكر" text="جميع الأمور مستقرة حاليًا."/>}</div></div>; }

function Company({ discovery }) { const card=(title,items)=><div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="font-black">{title}</h3><div className="mt-5 space-y-4">{items.map(([k,v])=><div key={k} className="border-b border-slate-100 pb-3 last:border-0"><p className="text-xs font-bold text-slate-400">{k}</p><p className="mt-1 text-sm font-bold leading-6 text-slate-700">{v||"غير متوفر"}</p></div>)}</div></div>; return <div className="space-y-6 animate-enter"><Title eyebrow="الحساب والشركة" title="بيانات الشركة" text="المعلومات المأخوذة من نموذج الاحتياج ويمكن لاحقًا ربطها بحساب العميل في Laravel."/><div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{card("بيانات العميل",[["الشركة",discovery.companyName],["مسؤول التواصل",discovery.contactName],["المسمى",discovery.jobTitle],["الجوال",discovery.phone],["البريد",discovery.email],["المدينة",discovery.city]])}{card("النشاط",[["المجال",discovery.businessField],["سنوات العمل",discovery.yearsInBusiness],["المنتجات والخدمات",discovery.productsServices],["الميزة التنافسية",discovery.competitiveAdvantage]])}{card("الأهداف والتحديات",[["الأهداف",(discovery.marketingGoals||[]).join("، ")],["التحديات",(discovery.challenges||[]).join("، ")],["حالة العلامة",(discovery.brandStatus||[]).join("، ")]])}{card("الجمهور",[["العمر",discovery.audience.age],["الجنس",discovery.audience.gender],["الموقع",discovery.audience.location],["اللغة",discovery.audience.language],["الاهتمامات",discovery.audience.interests]])}{card("الخدمات والقنوات",[["الخدمات",(discovery.services||[]).join("، ")],["القنوات",discovery.additional?.preferredChannels?.join("، ")],["وسيلة التواصل",discovery.additional?.preferredContact]])}{card("الميزانية والتوقعات",[["العملة",discovery.budget?.currency],["النطاق",`${discovery.budget?.from||"-"} - ${discovery.budget?.to||"-"}`],["التوقعات",discovery.expectations],["موعد البدء",discovery.additional?.startDate]])}</div></div>; }

/* ============================================================================
   Shared UI
   ============================================================================ */

function Title({ eyebrow,title,text }) { return <div><p className="text-xs font-black tracking-[.18em] text-sky-600">{eyebrow}</p><h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">{title}</h1>{text&&<p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500">{text}</p>}</div>; }
function Ring({ progress,status }) { const r=55,c=2*Math.PI*r,o=c-(Math.min(progress,100)/100)*c;return <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="relative mx-auto h-48 w-48"><svg className="-rotate-90" viewBox="0 0 140 140"><circle cx="70" cy="70" r={r} fill="none" stroke="#e0f2fe" strokeWidth="12"/><circle cx="70" cy="70" r={r} fill="none" stroke="#0284c7" strokeWidth="12" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={o} className="ring-animate"/></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><b className="text-4xl">{progress}%</b><span className="mt-1 text-xs text-slate-400">إنجاز</span></div></div><div className="text-center"><Badge text={status}/></div></div>; }
function Stat({ icon:Icon,label,value }) { return <div className="stat-card"><div className="flex items-center justify-between"><span className="icon-box"><Icon size={19}/></span><b className="text-2xl">{value}</b></div><p className="mt-4 text-sm font-bold text-slate-500">{label}</p></div>; }
function Metric({label,value}) { return <div className="rounded-2xl bg-slate-50 p-3"><p className="text-[11px] text-slate-400">{label}</p><b className="mt-1 block">{value}</b></div>; }
function Money({label,value}) { return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><span className="icon-box"><WalletCards size={19}/></span><p className="mt-4 text-sm text-slate-500">{label}</p><b className="mt-1 block text-2xl">{value}</b></div>; }
function Bar({value}) { return <div className="h-2.5 overflow-hidden rounded-full bg-sky-50"><div className="h-full rounded-full bg-sky-600 transition-all duration-700" style={{width:`${Math.max(0,Math.min(100,value))}%`}}/></div>; }
function Badge({text}) { const good=["تمت الموافقة","تم الدفع","مكتمل","تم التسليم","تم الرفع","مرسل"].includes(text);const bad=["مرفوض","يحتاج تعديل"].includes(text);const warn=["بانتظار الموافقة","بانتظار الدفع","قيد التنفيذ","قيد المراجعة","مراجعة إثبات الدفع"].includes(text);return <span className={`inline-flex rounded-full px-3 py-1.5 text-xs font-black ${good?"bg-emerald-50 text-emerald-700":bad?"bg-red-50 text-red-700":warn?"bg-amber-50 text-amber-700":"bg-sky-50 text-sky-700"}`}>{text}</span>; }
function Gate({title,text,tone,action}) { const bg=tone==="warning"?"border-amber-200 bg-amber-50":tone==="success"?"border-emerald-200 bg-emerald-50":"border-sky-200 bg-sky-50";return <div className={`flex flex-col gap-4 rounded-3xl border p-5 sm:flex-row sm:items-center sm:justify-between ${bg}`}><div className="flex gap-3"><div className="mt-0.5 text-sky-600">{tone==="warning"?<AlertCircle size={20}/>:tone==="success"?<CheckCircle2 size={20}/>:<Zap size={20}/>}</div><div><b>{title}</b><p className="mt-1 text-sm leading-6 text-slate-500">{text}</p></div></div>{action}</div>; }
function Empty({title,text}) { return <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center"><FileText className="mx-auto text-sky-500"/><b className="mt-3 block">{title}</b><p className="mt-1 text-sm text-slate-500">{text}</p></div>; }
function ServiceList({services}) { return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><b>تقدم كل خدمة</b><div className="mt-6 space-y-5">{services.map(s=><div key={s.id}><div className="flex justify-between"><div><b>{s.name}</b><p className="text-xs text-slate-500">{s.status}</p></div><b>{s.progress}%</b></div><div className="mt-2"><Bar value={s.progress}/></div></div>)}</div></div>; }
function Stages({project,state}) { const a=[["الاعتماد",project.companyApproved],["الدفع",project.paymentCompleted],["التخطيط",project.projectCreated],["التنفيذ",state.progress>0],["الموافقة",project.approvals.some(x=>x.status==="تمت الموافقة")],["التسليم",[STATUS.delivered,STATUS.completed].includes(project.status)]];return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><b>مراحل المشروع</b><div className="mt-7 space-y-4">{a.map(([x,done],i)=><div key={x} className="flex items-center gap-3"><span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${done?"bg-emerald-500 text-white":"bg-slate-50 text-slate-500"}`}>{done?<Check size={15}/>:i+1}</span><span className="text-sm font-bold">{x}</span><div className={`h-2 flex-1 rounded-full ${done?"bg-emerald-500":"bg-slate-100"}`}/></div>)}</div></div>; }
function ActivityFeed({activity=[]}) { return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><b>آخر النشاطات</b><Activity size={18} className="text-sky-600"/></div><div className="mt-5 space-y-4">{activity.slice(0,6).map(a=><div key={a.id} className="flex gap-3"><span className="mt-1 h-2.5 w-2.5 rounded-full bg-sky-500"/><div className="flex-1"><div className="flex justify-between gap-3"><b className="text-sm">{a.title}</b><span className="text-[11px] text-slate-400">{a.time}</span></div><p className="mt-1 text-xs leading-5 text-slate-500">{a.text}</p></div></div>)}{!activity.length&&<Empty title="لا يوجد نشاط" text="سيظهر سجل النشاط هنا."/>}</div></div>; }
function Status({project,state}) { const steps=[["إرسال النموذج",true],["اعتماد الشركة",project.companyApproved],["الدفع",project.paymentCompleted],["التخطيط",project.projectCreated],["التنفيذ",state.progress>0],["موافقة العميل",project.approvals.some(a=>a.status==="تمت الموافقة")],["التسليم",[STATUS.delivered,STATUS.completed].includes(project.status)]];return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex justify-between gap-4"><div><p className="text-xs font-black text-sky-600">حالة المشروع</p><h2 className="mt-2 text-2xl font-black">{state.currentStage}</h2><p className="mt-1 text-sm text-slate-500">المرحلة القادمة: {state.nextStage}</p></div><Badge text={state.status}/></div><div className="mt-8 overflow-x-auto pb-2"><div className="flex min-w-[800px] items-start">{steps.map(([x,done],i)=><div key={x} className="flex flex-1 items-start"><div className="flex flex-col items-center"><span className={`flex h-9 w-9 items-center justify-center rounded-full ${done?"bg-emerald-500 text-white":"border border-slate-200 text-slate-500"}`}>{done?<Check size={15}/>:i+1}</span><span className="mt-2 max-w-[90px] text-center text-[11px] font-bold text-slate-500">{x}</span></div>{i<steps.length-1&&<div className={`mt-4 h-0.5 flex-1 ${steps[i+1][1]?"bg-emerald-500":"bg-slate-200"}`}/>}</div>)}</div></div></div>; }
function Toast({type="success",text,onClose}) { return <div className={`toast ${type}`}><CheckCircle2 size={18}/><span>{text}</span><button onClick={onClose}><X size={16}/></button></div>; }
function formatBytes(bytes) { if(!bytes)return "0 B"; const units=["B","KB","MB","GB"];const i=Math.floor(Math.log(bytes)/Math.log(1024));return `${(bytes/Math.pow(1024,i)).toFixed(i?1:0)} ${units[i]}`; }

const DASHBOARD_STYLES = `
@keyframes enter{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes ring{from{stroke-dashoffset:345}to{stroke-dashoffset:var(--dash)}}
.animate-enter{animation:enter .45s ease both}.ring-animate{animation:ring 1s ease-out both}
.brand-mark{display:flex;height:44px;width:44px;align-items:center;justify-content:center;border-radius:15px;background:linear-gradient(135deg,#0284c7,#38bdf8);font-weight:900;color:#fff;box-shadow:0 12px 28px rgba(2,132,199,.2)}
.avatar{display:flex;height:42px;width:42px;align-items:center;justify-content:center;border-radius:999px;background:#e0f2fe;color:#0284c7}.notification-dot{position:absolute;right:-4px;top:-4px;min-width:19px;border-radius:999px;background:#ef4444;padding:2px 5px;text-align:center;font-size:9px;font-weight:900;color:#fff}
.hero-card{position:relative;overflow:hidden;border:1px solid #bae6fd;border-radius:30px;background:linear-gradient(135deg,#f0f9ff,#fff 60%,#f0fdf4);padding:28px;box-shadow:0 18px 50px rgba(15,23,42,.06)}.hero-orb{position:absolute;left:6%;top:20%;display:flex;height:120px;width:120px;align-items:center;justify-content:center;border-radius:999px;background:rgba(56,189,248,.13);color:#0284c7;box-shadow:0 0 80px rgba(56,189,248,.18)}.glass-pill{display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(255,255,255,.8);border-radius:999px;background:rgba(255,255,255,.75);padding:8px 12px;font-size:12px;font-weight:800;color:#475569;box-shadow:0 8px 20px rgba(15,23,42,.04)}
.primary-btn{display:inline-flex;align-items:center;gap:8px;border:0;border-radius:12px;background:#0284c7;padding:11px 17px;font-size:13px;font-weight:900;color:#fff;box-shadow:0 8px 20px rgba(2,132,199,.18);transition:.2s}.primary-btn:hover{transform:translateY(-1px);background:#0369a1}.secondary-btn{display:inline-flex;align-items:center;gap:8px;border:1px solid #cbd5e1;border-radius:12px;background:#fff;padding:11px 17px;font-size:13px;font-weight:900;color:#334155}.success-btn{display:inline-flex;align-items:center;gap:8px;border-radius:12px;background:#16a34a;padding:11px 17px;font-size:13px;font-weight:900;color:#fff}.warning-btn{display:inline-flex;align-items:center;gap:8px;border-radius:12px;background:#f59e0b;padding:11px 17px;font-size:13px;font-weight:900;color:#fff}.quick-btn{display:flex;align-items:center;gap:10px;border:1px solid #e2e8f0;border-radius:16px;padding:15px;font-weight:900;transition:.2s}.quick-btn:hover{border-color:#7dd3fc;background:#f0f9ff;transform:translateY(-2px)}
.stat-card,.service-card{border:1px solid #e2e8f0;border-radius:24px;background:#fff;padding:20px;box-shadow:0 8px 30px rgba(15,23,42,.04);transition:.2s}.stat-card:hover,.service-card:hover{transform:translateY(-2px);box-shadow:0 14px 38px rgba(15,23,42,.07)}.icon-box{display:flex;height:44px;width:44px;align-items:center;justify-content:center;border-radius:15px;background:#e0f2fe;color:#0284c7}
.field{width:100%;border:1px solid #e2e8f0;border-radius:13px;background:#f8fafc;padding:12px 14px;outline:0;font-size:13px}.field:focus{border-color:#38bdf8;box-shadow:0 0 0 3px rgba(56,189,248,.12)}.label{display:block;font-size:12px;font-weight:900;color:#475569}.label .field{margin-top:8px;font-weight:600}.payment-panel{border:1px solid #bae6fd;border-radius:30px;background:linear-gradient(135deg,#f0f9ff,#fff);padding:24px;box-shadow:0 12px 40px rgba(2,132,199,.07)}.upload-zone{display:flex;min-height:125px;cursor:pointer;flex-direction:column;align-items:center;justify-content:center;gap:7px;border:2px dashed #bae6fd;border-radius:20px;background:#f8fdff;padding:20px;text-align:center;transition:.2s}.upload-zone:hover{border-color:#38bdf8;background:#f0f9ff}.toast{position:fixed;bottom:24px;left:24px;z-index:100;display:flex;max-width:420px;align-items:center;gap:10px;border:1px solid #e2e8f0;border-radius:16px;background:#fff;padding:14px 16px;box-shadow:0 18px 45px rgba(15,23,42,.15);font-size:13px;font-weight:800;animation:enter .3s ease}.toast.success{color:#15803d}.toast.warning{color:#b45309}.toast.error{color:#dc2626}.toast button{margin-right:auto;color:#94a3b8}
`;