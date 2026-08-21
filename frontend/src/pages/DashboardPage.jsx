import React, { useMemo, useState, useEffect } from "react";
import {
  Activity,
  AlertTriangle,
  Archive,
  ArrowDownToLine,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Download,
  Edit3,
  Eye,
  FileCheck2,
  FilePlus2,
  FileText,
  Filter,
  FolderKanban,
  Gauge,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Plus,
  RefreshCcw,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  Upload,
  UserCheck,
  UserPlus,
  Users,
  WalletCards,
  X,
  XCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Target,
  Rocket,
  Award,
  Star,
  Zap,
  Layers,
  GitBranch,
  GitPullRequest,
  Briefcase,
  Sparkles,
} from "lucide-react";

// =====================================================
// 01. COLORS (من طلبك)
// =====================================================

const COLORS = {
  primary: "#87BCD8",
  primaryDark: "#5EA8CC",
  primaryLight: "#EAF6FC",
  white: "#FFFFFF",
  background: "#F8FAFC",
  text: "#0F172A",
  textLight: "#64748B",
  border: "#E2E8F0",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
};

// =====================================================
// 02. STORAGE & SEED DATA
// =====================================================

const KEY = "sabarat_admin_dashboard_v3";

const seed = {
  settings: {
    companyName: "SABARAT",
    currency: "USD",
    timezone: "Asia/Aden",
    notifications: true,
    requireFileApproval: true,
    requirePaymentVerification: true,
    autoCreateProjectOnApproval: false,
  },

  sequence: {
    client: 1001,
    project: 2001,
    request: 3001,
    invoice: 4001,
    payment: 5001,
    report: 6001,
    activity: 7001,
    file: 8001,
    employee: 9001,
    notification: 10001,
  },

  user: {
    id: 1,
    name: "أحمد المدير",
    email: "admin@sabarat.example",
    role: "admin",
    permissions: ["*"],
    avatar: "👨‍💼",
  },

  clients: [
    {
      id: 1001,
      code: "CLI-1001",
      name: "شركة الأفق",
      email: "info@horizon.example",
      phone: "+967 700 000 001",
      status: "active",
      industry: "تقنية",
      createdAt: "2026-08-21",
      projects: 3,
      revenue: 4500,
    },
    {
      id: 1002,
      code: "CLI-1002",
      name: "مطعم الذوق",
      email: "hello@taste.example",
      phone: "+967 700 000 002",
      status: "active",
      industry: "مطاعم",
      createdAt: "2026-08-21",
      projects: 1,
      revenue: 1200,
    },
    {
      id: 1003,
      code: "CLI-1003",
      name: "متجر التميز",
      email: "info@excellence.example",
      phone: "+967 700 000 003",
      status: "pending",
      industry: "تجارة إلكترونية",
      createdAt: "2026-08-22",
      projects: 0,
      revenue: 0,
    },
  ],

  projects: [
    {
      id: 2001,
      code: "PRJ-2001",
      name: "الموقع الرسمي لشركة الأفق",
      clientId: 1001,
      service: "تطوير موقع",
      status: "in_progress",
      priority: "high",
      progress: 68,
      deadline: "2026-09-10",
      budget: 1800,
      spent: 1224,
      assignedTo: [2, 3],
      createdAt: "2026-08-21",
      tasks: { total: 24, completed: 16, pending: 8 },
    },
    {
      id: 2002,
      code: "PRJ-2002",
      name: "حملة إعلانية لمطعم الذوق",
      clientId: 1002,
      service: "إدارة إعلانات",
      status: "review",
      priority: "medium",
      progress: 85,
      deadline: "2026-08-30",
      budget: 1200,
      spent: 1020,
      assignedTo: [3],
      createdAt: "2026-08-22",
      tasks: { total: 12, completed: 10, pending: 2 },
    },
  ],

  requests: [
    {
      id: 3001,
      code: "REQ-3001",
      clientId: 1001,
      title: "تطوير نظام جديد",
      service: "تطوير نظام",
      description: "إنشاء نظام إداري متكامل لإدارة الموارد البشرية.",
      status: "pending",
      priority: "high",
      createdAt: "2026-08-21",
      source: "ClientDashboardPage",
    },
    {
      id: 3002,
      code: "REQ-3002",
      clientId: 1002,
      title: "تصميم هوية بصرية جديدة",
      service: "تصميم هوية",
      description: "إعادة تصميم الهوية البصرية بالكامل مع شعار جديد.",
      status: "pending",
      priority: "medium",
      createdAt: "2026-08-22",
      source: "ClientDashboardPage",
    },
  ],

  files: [
    {
      id: 8001,
      code: "FIL-8001",
      name: "design-v2.pdf",
      clientId: 1001,
      projectId: 2001,
      status: "pending",
      version: 2,
      uploadedBy: "أحمد",
      createdAt: "2026-08-21",
      size: "2.4 MB",
      category: "تصميم",
    },
    {
      id: 8002,
      code: "FIL-8002",
      name: "contract-signed.pdf",
      clientId: 1001,
      projectId: 2001,
      status: "approved",
      version: 1,
      uploadedBy: "سارة",
      createdAt: "2026-08-20",
      size: "1.1 MB",
      category: "عقود",
    },
  ],

  invoices: [
    {
      id: 4001,
      code: "INV-4001",
      clientId: 1001,
      projectId: 2001,
      amount: 1800,
      paid: 1250,
      status: "partially_paid",
      dueDate: "2026-09-10",
      createdAt: "2026-08-21",
    },
    {
      id: 4002,
      code: "INV-4002",
      clientId: 1002,
      projectId: 2002,
      amount: 1200,
      paid: 1200,
      status: "paid",
      dueDate: "2026-08-30",
      createdAt: "2026-08-22",
    },
  ],

  payments: [
    {
      id: 5001,
      code: "PAY-5001",
      invoiceId: 4001,
      clientId: 1001,
      amount: 550,
      method: "تحويل بنكي",
      reference: "TRX-928341",
      wallet: "",
      status: "pending",
      createdAt: "2026-08-21",
      note: "دفعة المشروع الأولى",
    },
    {
      id: 5002,
      code: "PAY-5002",
      invoiceId: 4001,
      clientId: 1001,
      amount: 700,
      method: "بطاقة ائتمان",
      reference: "CC-443211",
      wallet: "",
      status: "verified",
      createdAt: "2026-08-20",
      note: "دفعة المشروع الثانية",
    },
  ],

  employees: [
    {
      id: 1,
      code: "EMP-9001",
      name: "أحمد المدير",
      email: "admin@sabarat.example",
      phone: "+967 700 000 000",
      role: "admin",
      status: "active",
      permissions: ["*"],
      avatar: "👨‍💼",
    },
    {
      id: 2,
      code: "EMP-9002",
      name: "أحمد محمد",
      email: "ahmed@sabarat.example",
      phone: "+967 700 000 003",
      role: "manager",
      status: "active",
      permissions: [
        "clients.view", "clients.update", "projects.view", "projects.update",
        "requests.view", "requests.review", "files.view", "files.approve", "reports.view",
      ],
      avatar: "🧑‍💻",
    },
    {
      id: 3,
      code: "EMP-9003",
      name: "سارة علي",
      email: "sara@sabarat.example",
      phone: "+967 700 000 004",
      role: "employee",
      status: "active",
      permissions: ["clients.view", "projects.view", "files.view", "files.upload"],
      avatar: "👩‍🎨",
    },
  ],

  reports: [],
  activity: [],
  notifications: [],
  analytics: {
    revenueByMonth: [3200, 4100, 3800, 5200, 4800, 6200, 5800, 7100, 8400, 9200, 10500, 11800],
    projectsByStatus: { in_progress: 6, review: 3, completed: 4, pending: 2 },
    clientGrowth: [12, 15, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48],
    topServices: [
      { name: "تطوير مواقع", count: 12 },
      { name: "إدارة إعلانات", count: 9 },
      { name: "تصميم هوية", count: 7 },
      { name: "صناعة محتوى", count: 5 },
    ],
  },
};

// =====================================================
// 03. PERMISSION CATALOG
// =====================================================

const permissionCatalog = [
  ["clients.view", "عرض العملاء"],
  ["clients.create", "إنشاء العملاء"],
  ["clients.update", "تعديل العملاء"],
  ["clients.delete", "حذف العملاء"],
  ["projects.view", "عرض المشاريع"],
  ["projects.create", "إنشاء المشاريع"],
  ["projects.update", "تعديل المشاريع"],
  ["projects.delete", "حذف المشاريع"],
  ["projects.team", "إدارة فرق المشاريع"],
  ["requests.view", "عرض طلبات العملاء"],
  ["requests.review", "مراجعة واعتماد الطلبات"],
  ["files.view", "عرض الملفات"],
  ["files.upload", "رفع الملفات"],
  ["files.approve", "اعتماد الملفات"],
  ["files.delete", "حذف الملفات"],
  ["invoices.view", "عرض الفواتير"],
  ["invoices.create", "إنشاء الفواتير"],
  ["invoices.update", "تعديل الفواتير"],
  ["payments.view", "عرض المدفوعات"],
  ["payments.verify", "التحقق من المدفوعات"],
  ["reports.view", "عرض التقارير"],
  ["reports.create", "إنشاء التقارير"],
  ["employees.view", "عرض الموظفين"],
  ["employees.manage", "إدارة الموظفين والصلاحيات"],
  ["settings.manage", "إدارة الإعدادات"],
  ["analytics.view", "عرض التحليلات"],
];

// =====================================================
// 04. STATUS LABELS
// =====================================================

const statusLabels = {
  active: ["نشط", COLORS.success],
  pending: ["قيد المراجعة", COLORS.warning],
  approved: ["معتمد", COLORS.success],
  rejected: ["مرفوض", COLORS.danger],
  needs_changes: ["يحتاج تعديلات", COLORS.warning],
  in_progress: ["قيد التنفيذ", COLORS.primaryDark],
  review: ["بانتظار المراجعة", "#8B5CF6"],
  completed: ["مكتمل", COLORS.success],
  paid: ["مدفوع", COLORS.success],
  partially_paid: ["مدفوع جزئيًا", COLORS.warning],
  verified: ["تم التحقق", COLORS.success],
  inactive: ["غير نشط", COLORS.textLight],
  not_started: ["لم يبدأ", COLORS.textLight],
  cancelled: ["ملغي", COLORS.danger],
};

const roleLabels = {
  admin: "مدير النظام",
  manager: "مدير قسم",
  employee: "موظف",
};

// =====================================================
// 05. HELPERS
// =====================================================

function clone(v) {
  return structuredClone(v);
}

function getData() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY));
    if (!saved) return clone(seed);
    return {
      ...clone(seed),
      ...saved,
      settings: { ...seed.settings, ...(saved.settings || {}) },
      sequence: { ...seed.sequence, ...(saved.sequence || {}) },
      analytics: { ...seed.analytics, ...(saved.analytics || {}) },
    };
  } catch {
    return clone(seed);
  }
}

function money(value, currency = "USD") {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function nextId(d, key) {
  const value = Number(d.sequence[key] || 1);
  d.sequence[key] = value + 1;
  return value;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function timeNow() {
  return new Date().toLocaleString("ar-YE");
}

function labelStatus(status) {
  const [text, color] = statusLabels[status] || ["غير معروف", COLORS.textLight];
  return (
    <span
      className="inline-flex rounded-full border px-3 py-1 text-xs font-bold"
      style={{ backgroundColor: `${color}15`, color, borderColor: `${color}30` }}
    >
      {text}
    </span>
  );
}

// =====================================================
// 06. UI COMPONENTS
// =====================================================

function Button({ children, onClick, variant = "default", type = "button", disabled = false }) {
  const variants = {
    default: `border-[${COLORS.border}] bg-white text-[${COLORS.text}] hover:bg-[${COLORS.background}]`,
    primary: `border-[${COLORS.primaryDark}] bg-[${COLORS.primaryDark}] text-white hover:bg-[${COLORS.primary}]`,
    success: `border-[${COLORS.success}] bg-[${COLORS.success}] text-white hover:opacity-90`,
    danger: `border-[${COLORS.danger}] bg-[${COLORS.danger}] text-white hover:opacity-90`,
    warning: `border-[${COLORS.warning}] bg-[${COLORS.warning}] text-white hover:opacity-90`,
    outline: `border-[${COLORS.border}] bg-transparent text-[${COLORS.text}] hover:bg-[${COLORS.background}]`,
    ghost: `border-transparent bg-transparent text-[${COLORS.text}] hover:bg-[${COLORS.background}]`,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

function Badge({ children, tone = "slate" }) {
  const tones = {
    slate: `bg-[${COLORS.background}] text-[${COLORS.textLight}]`,
    primary: `bg-[${COLORS.primaryLight}] text-[${COLORS.primaryDark}]`,
    success: `bg-[${COLORS.success}]20 text-[${COLORS.success}]`,
    warning: `bg-[${COLORS.warning}]20 text-[${COLORS.warning}]`,
    danger: `bg-[${COLORS.danger}]20 text-[${COLORS.danger}]`,
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${tones[tone]}`}>{children}</span>;
}

function Card({ children, className = "", onClick }) {
  return (
    <section
      onClick={onClick}
      className={`rounded-3xl border border-[${COLORS.border}] bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </section>
  );
}

function StatCard({ title, value, icon: Icon, subtitle, trend, trendValue, onClick, color = COLORS.primaryDark }) {
  return (
    <button
      onClick={onClick}
      className="group rounded-3xl border border-[#E2E8F0] bg-white p-5 text-right shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-[#64748B]">{title}</p>
          <b className="mt-2 block text-3xl font-black tracking-tight text-[#0F172A]">{value}</b>
          {subtitle && <p className="mt-2 text-[11px] text-[#64748B]">{subtitle}</p>}
          {trend && (
            <div className="mt-2 flex items-center gap-1">
              {trend === "up" ? (
                <TrendingUp size={14} className="text-[#22C55E]" />
              ) : (
                <TrendingDown size={14} className="text-[#EF4444]" />
              )}
              <span className={`text-xs font-bold ${trend === "up" ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <span
          className="rounded-2xl p-3 text-white transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
          style={{ backgroundColor: color }}
        >
          <Icon size={20} />
        </span>
      </div>
    </button>
  );
}

function PageHeader({ title, description, action, badge }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 animate-[fadeIn_0.5s_ease-out]">
      <div>
        <div className="flex items-center gap-3">
          <p className="text-xs font-black tracking-wider text-[#5EA8CC]">SABARAT / الإدارة</p>
          {badge && <Badge tone="primary">{badge}</Badge>}
        </div>
        <h1 className="mt-1 text-3xl font-black text-[#0F172A]">{title}</h1>
        {description && <p className="mt-2 max-w-3xl text-sm leading-7 text-[#64748B]">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function SearchBar({ search, setSearch, filter, setFilter, placeholder = "ابحث بالاسم أو الرقم أو المرجع..." }) {
  return (
    <div className="mb-5 flex flex-wrap gap-3 rounded-3xl border border-[#E2E8F0] bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="relative min-w-[240px] flex-1">
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 pr-10 text-sm outline-none transition-all duration-300 focus:border-[#5EA8CC] focus:bg-white focus:ring-4 focus:ring-[#5EA8CC]/10"
        />
      </div>

      {filter !== undefined && (
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-bold outline-none transition-all duration-300 focus:border-[#5EA8CC] focus:ring-4 focus:ring-[#5EA8CC]/10"
        >
          <option value="all">كل الحالات</option>
          <option value="pending">قيد المراجعة</option>
          <option value="approved">معتمد</option>
          <option value="needs_changes">يحتاج تعديلات</option>
          <option value="rejected">مرفوض</option>
          <option value="in_progress">قيد التنفيذ</option>
          <option value="completed">مكتمل</option>
          <option value="partially_paid">مدفوع جزئيًا</option>
          <option value="paid">مدفوع</option>
          <option value="verified">تم التحقق</option>
        </select>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required = false, placeholder = "" }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-[#0F172A]">{label}</span>
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-[#5EA8CC] focus:bg-white focus:ring-4 focus:ring-[#5EA8CC]/10"
      />
    </label>
  );
}

function SelectField({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-[#0F172A]">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3 text-sm font-bold outline-none transition-all duration-300 focus:border-[#5EA8CC] focus:ring-4 focus:ring-[#5EA8CC]/10"
      >
        {children}
      </select>
    </label>
  );
}

function Modal({ title, close, children, wide = false }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div
        className={`max-h-[92vh] w-full overflow-y-auto rounded-[2rem] bg-white shadow-2xl animate-[slideUp_0.3s_ease-out] ${wide ? "max-w-4xl" : "max-w-2xl"}`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E2E8F0] bg-white/95 p-5 backdrop-blur">
          <b className="text-lg font-black text-[#0F172A]">{title}</b>
          <button onClick={close} className="rounded-xl p-2 transition hover:bg-[#F8FAFC]">
            <X size={20} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

function Empty({ text = "لا توجد بيانات." }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#E2E8F0] p-10 text-center">
      <div className="flex justify-center mb-3">
        <span className="text-5xl">📭</span>
      </div>
      <p className="text-sm font-bold text-[#64748B]">{text}</p>
    </div>
  );
}

// =====================================================
// 07. PROGRESS BAR COMPONENT
// =====================================================

function ProgressBar({ value, label, color = COLORS.primaryDark }) {
  const percentage = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 flex justify-between text-xs font-bold">
          <span className="text-[#64748B]">{label}</span>
          <span style={{ color }}>{percentage}%</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-[#E2E8F0]">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

// =====================================================
// 08. MAIN DASHBOARD COMPONENT
// =====================================================

export default function DashboardPage() {
  const [data, setData] = useState(getData);
  const [view, setView] = useState("overview");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const save = (next) => {
    setData(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const notify = (message, type = "success") => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2800);
  };

  const can = (permission) =>
    data.user.role === "admin" ||
    data.user.permissions?.includes("*") ||
    data.user.permissions?.includes(permission);

  const clientName = (id) => data.clients.find((x) => x.id === id)?.name || "—";
  const projectName = (id) => data.projects.find((x) => x.id === id)?.name || "—";
  const employeeName = (id) => data.employees.find((x) => x.id === id)?.name || "—";

  const addActivity = (d, text, type = "system") => {
    const id = nextId(d, "activity");
    d.activity.unshift({
      id,
      code: `ACT-${id}`,
      text,
      type,
      actorId: d.user.id,
      actor: d.user.name,
      createdAt: timeNow(),
    });
  };

  const addNotification = (d, title, message, target = "admin") => {
    const id = nextId(d, "notification");
    d.notifications.unshift({
      id,
      title,
      message,
      target,
      read: false,
      createdAt: timeNow(),
    });
  };

  const navigate = (id) => {
    setView(id);
    setSearch("");
    setFilter("all");
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 300);
  };

  const stats = useMemo(() => {
    const outstanding = data.invoices.reduce((sum, x) => sum + Math.max(0, Number(x.amount) - Number(x.paid)), 0);
    const revenue = data.payments
      .filter((x) => x.status === "verified")
      .reduce((sum, x) => sum + Number(x.amount || 0), 0);
    const totalProjects = data.projects.length;
    const completedProjects = data.projects.filter((x) => x.status === "completed").length;
    const inProgressProjects = data.projects.filter((x) => ["in_progress", "review"].includes(x.status)).length;
    const totalClients = data.clients.length;
    const activeClients = data.clients.filter((x) => x.status === "active").length;

    return {
      clients: totalClients,
      activeClients,
      totalProjects,
      completedProjects,
      inProgressProjects,
      pendingRequests: data.requests.filter((x) => x.status === "pending").length,
      pendingFiles: data.files.filter((x) => x.status === "pending").length,
      pendingPayments: data.payments.filter((x) => x.status === "pending").length,
      outstanding,
      revenue,
      notifications: data.notifications.filter((x) => !x.read).length,
      projectCompletionRate: totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0,
    };
  }, [data]);

  // =====================================================
  // 09. BUSINESS LOGIC FUNCTIONS
  // =====================================================

  const approveRequest = (id, status) => {
    if (!can("requests.review")) return notify("لا تملك صلاحية مراجعة الطلبات.", "error");

    const d = clone(data);
    const item = d.requests.find((x) => x.id === id);
    if (!item) return;

    item.status = status;
    item.reviewedAt = timeNow();
    item.reviewedBy = d.user.name;

    if (status === "approved" && d.settings.autoCreateProjectOnApproval) {
      const projectId = nextId(d, "project");
      d.projects.unshift({
        id: projectId,
        code: `PRJ-${projectId}`,
        name: item.title,
        clientId: item.clientId,
        service: item.service,
        status: "in_progress",
        priority: item.priority || "medium",
        progress: 0,
        deadline: "",
        budget: 0,
        spent: 0,
        assignedTo: [],
        createdAt: today(),
        tasks: { total: 0, completed: 0, pending: 0 },
      });
      addActivity(d, `تم اعتماد ${item.code} وإنشاء المشروع PRJ-${projectId}`, "request");
    } else {
      addActivity(d, `تم تحديث ${item.code} إلى ${status}`, "request");
    }

    addNotification(d, "تحديث طلب", `تم اتخاذ قرار على الطلب ${item.code}.`, "client");
    save(d);
    notify("تم تحديث الطلب بنجاح.");
  };

  const approveFile = (id, status) => {
    if (!can("files.approve")) return notify("لا تملك صلاحية اعتماد الملفات.", "error");

    const d = clone(data);
    const item = d.files.find((x) => x.id === id);
    if (!item) return;

    item.status = status;
    item.reviewedAt = timeNow();
    item.reviewedBy = d.user.name;

    addActivity(d, `تم ${status === "approved" ? "اعتماد" : "رفض"} الملف ${item.code}`, "file");
    addNotification(d, "مراجعة ملف", `تم تحديث حالة ${item.code}.`, "client");
    save(d);
    notify("تم تحديث الملف.");
  };

  const verifyPayment = (id, status) => {
    if (!can("payments.verify")) return notify("لا تملك صلاحية التحقق من المدفوعات.", "error");

    const d = clone(data);
    const payment = d.payments.find((x) => x.id === id);
    if (!payment) return;

    if (payment.status === "verified" && status === "verified") return;
    payment.status = status;
    payment.reviewedAt = timeNow();
    payment.reviewedBy = d.user.name;

    const invoice = d.invoices.find((x) => x.id === payment.invoiceId);

    if (status === "verified" && invoice) {
      invoice.paid = Math.min(Number(invoice.amount), Number(invoice.paid) + Number(payment.amount));
      invoice.status = invoice.paid >= invoice.amount ? "paid" : "partially_paid";
    }

    addActivity(d, `تم ${status === "verified" ? "اعتماد" : "رفض"} الدفعة ${payment.code}`, "payment");
    addNotification(d, "تحديث دفعة", `تم تحديث الدفعة ${payment.code}.`, "client");

    save(d);
    notify("تم تحديث الدفعة وربطها بالفاتورة.");
  };

  const createClient = (form) => {
    if (!can("clients.create")) return notify("لا تملك صلاحية إنشاء العملاء.", "error");

    const d = clone(data);
    const id = nextId(d, "client");

    d.clients.unshift({
      id,
      code: `CLI-${id}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      status: "active",
      industry: form.industry || "",
      createdAt: today(),
      projects: 0,
      revenue: 0,
    });

    addActivity(d, `تم إنشاء العميل CLI-${id} — ${form.name}`, "client");
    save(d);
    setModal(null);
    notify(`تم إنشاء العميل CLI-${id}.`);
  };

  const updateClient = (id, form) => {
    if (!can("clients.update")) return notify("لا تملك صلاحية تعديل العملاء.", "error");

    const d = clone(data);
    const item = d.clients.find((x) => x.id === id);
    if (!item) return;

    Object.assign(item, {
      name: form.name,
      email: form.email,
      phone: form.phone,
      status: form.status,
      industry: form.industry || item.industry,
    });

    addActivity(d, `تم تعديل العميل ${item.code}`, "client");
    save(d);
    setModal(null);
    notify("تم حفظ بيانات العميل.");
  };

  const deleteClient = (id) => {
    if (!can("clients.delete")) return notify("لا تملك صلاحية حذف العملاء.", "error");
    const item = data.clients.find((x) => x.id === id);
    if (!item) return;

    if (data.projects.some((x) => x.clientId === id) || data.invoices.some((x) => x.clientId === id)) {
      return notify("لا يمكن حذف العميل لأنه مرتبط بمشاريع أو فواتير.", "error");
    }

    const d = clone(data);
    d.clients = d.clients.filter((x) => x.id !== id);
    addActivity(d, `تم حذف العميل ${item.code}`, "client");
    save(d);
    notify("تم حذف العميل.");
  };

  const createProject = (form) => {
    if (!can("projects.create")) return notify("لا تملك صلاحية إنشاء المشاريع.", "error");

    const d = clone(data);
    const id = nextId(d, "project");

    d.projects.unshift({
      id,
      code: `PRJ-${id}`,
      name: form.name,
      clientId: Number(form.clientId),
      service: form.service,
      status: form.status || "in_progress",
      priority: form.priority,
      progress: Number(form.progress || 0),
      deadline: form.deadline,
      budget: Number(form.budget || 0),
      spent: 0,
      assignedTo: [],
      createdAt: today(),
      tasks: { total: 0, completed: 0, pending: 0 },
    });

    addActivity(d, `تم إنشاء المشروع PRJ-${id}`, "project");
    save(d);
    setModal(null);
    notify(`تم إنشاء PRJ-${id}.`);
  };

  const updateProject = (id, form) => {
    if (!can("projects.update")) return notify("لا تملك صلاحية تعديل المشاريع.", "error");

    const d = clone(data);
    const item = d.projects.find((x) => x.id === id);
    if (!item) return;

    Object.assign(item, {
      name: form.name,
      clientId: Number(form.clientId),
      service: form.service,
      status: form.status,
      priority: form.priority,
      progress: Number(form.progress || 0),
      deadline: form.deadline,
      budget: Number(form.budget || 0),
    });

    addActivity(d, `تم تعديل المشروع ${item.code}`, "project");
    save(d);
    setModal(null);
    notify("تم حفظ المشروع.");
  };

  const createInvoice = (form) => {
    if (!can("invoices.create")) return notify("لا تملك صلاحية إنشاء الفواتير.", "error");

    const d = clone(data);
    const id = nextId(d, "invoice");

    d.invoices.unshift({
      id,
      code: `INV-${id}`,
      clientId: Number(form.clientId),
      projectId: Number(form.projectId),
      amount: Number(form.amount || 0),
      paid: 0,
      status: "pending",
      dueDate: form.dueDate,
      createdAt: today(),
    });

    addActivity(d, `تم إنشاء الفاتورة INV-${id}`, "invoice");
    addNotification(d, "فاتورة جديدة", `تم إنشاء الفاتورة INV-${id}.`, "client");
    save(d);
    setModal(null);
    notify(`تم إنشاء INV-${id}.`);
  };

  const createReport = (form) => {
    if (!can("reports.create")) return notify("لا تملك صلاحية إنشاء التقارير.", "error");

    const d = clone(data);
    const id = nextId(d, "report");

    d.reports.unshift({
      id,
      code: `RPT-${id}`,
      title: form.title,
      type: form.type,
      createdAt: timeNow(),
      createdBy: d.user.name,
      summary: buildReportSummary(d, form.type),
    });

    addActivity(d, `تم إنشاء التقرير RPT-${id}`, "report");
    save(d);
    setModal(null);
    notify(`تم إنشاء التقرير RPT-${id}.`);
  };

  const createEmployee = (form) => {
    if (!can("employees.manage")) return notify("لا تملك صلاحية إدارة الموظفين.", "error");

    const d = clone(data);
    const id = nextId(d, "employee");

    d.employees.unshift({
      id,
      code: `EMP-${id}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      status: "active",
      permissions: form.permissions,
      avatar: "👤",
    });

    addActivity(d, `تم إنشاء الموظف EMP-${id}`, "employee");
    save(d);
    setModal(null);
    notify(`تم إنشاء EMP-${id}.`);
  };

  const updateEmployee = (id, form) => {
    if (!can("employees.manage")) return notify("لا تملك صلاحية إدارة الموظفين.", "error");

    const d = clone(data);
    const item = d.employees.find((x) => x.id === id);
    if (!item) return;

    Object.assign(item, form);
    addActivity(d, `تم تعديل صلاحيات الموظف ${item.code}`, "employee");
    save(d);
    setModal(null);
    notify("تم حفظ الموظف والصلاحيات.");
  };

  const markNotificationRead = (id) => {
    const d = clone(data);
    const n = d.notifications.find((x) => x.id === id);
    if (!n) return;
    n.read = true;
    save(d);
  };

  const filtered = (items) => {
    const q = search.trim().toLowerCase();

    return items.filter((item) => {
      const text = JSON.stringify(item).toLowerCase();
      const searchOk = !q || text.includes(q);
      const filterOk = filter === "all" || item.status === filter;
      return searchOk && filterOk;
    });
  };

  const nav = [
    ["overview", "نظرة عامة", LayoutDashboard, true],
    ["analytics", "التحليلات", BarChart3, can("analytics.view")],
    ["clients", "العملاء", Users, can("clients.view")],
    ["projects", "المشاريع", FolderKanban, can("projects.view")],
    ["requests", "طلبات العملاء", FilePlus2, can("requests.view")],
    ["files", "الملفات والموافقات", FileCheck2, can("files.view")],
    ["payments", "المدفوعات", WalletCards, can("payments.view")],
    ["invoices", "الفواتير", CreditCard, can("invoices.view")],
    ["employees", "الموظفون والصلاحيات", ShieldCheck, can("employees.view")],
    ["reports", "التقارير", BriefcaseBusiness, can("reports.view")],
    ["activity", "سجل التدقيق", Activity, true],
    ["settings", "الإعدادات", Settings, can("settings.manage")],
  ];

  const pageTitle = nav.find((x) => x[0] === view)?.[1] || "لوحة التحكم";

  return (
    <div dir="rtl" className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* =============================================
          NOTICE
      ============================================= */}
      {notice && (
        <div className="fixed left-5 top-5 z-[200] rounded-2xl bg-[#0F172A] px-5 py-3 text-sm font-black text-white shadow-2xl animate-[slideDown_0.3s_ease-out]">
          {notice}
        </div>
      )}

      {/* =============================================
          SIDEBAR
      ============================================= */}
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-72 border-l border-[#E2E8F0] bg-[#0F172A] text-white lg:block">
        <div className="flex h-full flex-col">
          <div className="border-b border-white/10 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#5EA8CC] font-black text-white text-xl">
                S
              </div>
              <div>
                <div className="text-2xl font-black tracking-tight">SABARAT</div>
                <div className="text-[11px] font-bold text-white/50">SaaS Administration</div>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {nav.filter((x) => x[3]).map(([id, label, Icon]) => (
              <button
                key={id}
                onClick={() => navigate(id)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm font-black transition-all duration-300 ${
                  view === id
                    ? "bg-[#5EA8CC] text-white shadow-lg"
                    : "text-white/70 hover:bg-white/10 hover:text-white hover:translate-x-1"
                }`}
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} />
                  {label}
                </span>

                {id === "requests" && stats.pendingRequests > 0 && (
                  <span className="rounded-full bg-[#EF4444] px-2 py-0.5 text-[10px] animate-pulse">
                    {stats.pendingRequests}
                  </span>
                )}
                {id === "files" && stats.pendingFiles > 0 && (
                  <span className="rounded-full bg-[#EF4444] px-2 py-0.5 text-[10px] animate-pulse">
                    {stats.pendingFiles}
                  </span>
                )}
                {id === "payments" && stats.pendingPayments > 0 && (
                  <span className="rounded-full bg-[#EF4444] px-2 py-0.5 text-[10px] animate-pulse">
                    {stats.pendingPayments}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="border-t border-white/10 p-4">
            <div className="rounded-2xl bg-white/10 p-4 transition-all duration-300 hover:bg-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <b className="block text-sm">{data.user.name}</b>
                  <span className="mt-1 block text-[11px] text-white/50">{roleLabels[data.user.role]}</span>
                </div>
                <span className="text-2xl">{data.user.avatar || "👤"}</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* =============================================
          MAIN
      ============================================= */}
      <main className="lg:mr-72">
        <header className="sticky top-0 z-30 border-b border-[#E2E8F0] bg-white/90 backdrop-blur-xl">
          <div className="flex min-h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button className="rounded-xl p-2 transition hover:bg-[#F8FAFC] lg:hidden">
                <Menu size={20} />
              </button>
              <div>
                <p className="text-[10px] font-black tracking-widest text-[#5EA8CC]">SABARAT ADMIN</p>
                <b className="text-sm">{pageTitle}</b>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => navigate("activity")}
                  className="relative rounded-xl border border-[#E2E8F0] bg-white p-3 transition-all duration-300 hover:border-[#5EA8CC] hover:bg-[#EAF6FC] hover:shadow-lg"
                >
                  <Bell size={18} />
                  {stats.notifications > 0 && (
                    <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[10px] font-black text-white animate-pulse">
                      {stats.notifications}
                    </span>
                  )}
                </button>
              </div>
              <button
                onClick={() => navigate("settings")}
                className="rounded-xl border border-[#E2E8F0] bg-white p-3 transition-all duration-300 hover:border-[#5EA8CC] hover:bg-[#EAF6FC] hover:shadow-lg"
              >
                <Settings size={18} />
              </button>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm font-black">{data.user.name}</span>
                <span className="text-2xl">{data.user.avatar || "👤"}</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#5EA8CC] border-t-transparent" />
                <p className="text-sm font-bold text-[#64748B]">جاري التحميل...</p>
              </div>
            </div>
          ) : (
            <>
              {view === "overview" && (
                <Overview
                  data={data}
                  stats={stats}
                  money={money}
                  navigate={navigate}
                  setModal={setModal}
                  approveRequest={approveRequest}
                  verifyPayment={verifyPayment}
                  can={can}
                />
              )}

              {view === "analytics" && can("analytics.view") && (
                <Analytics data={data} money={money} />
              )}

              {view === "clients" && can("clients.view") && (
                <Clients
                  items={filtered(data.clients)}
                  search={search}
                  setSearch={setSearch}
                  filter={filter}
                  setFilter={setFilter}
                  setModal={setModal}
                  setSelected={setSelected}
                  can={can}
                  deleteClient={deleteClient}
                />
              )}

              {view === "projects" && can("projects.view") && (
                <Projects
                  items={filtered(data.projects)}
                  search={search}
                  setSearch={setSearch}
                  filter={filter}
                  setFilter={setFilter}
                  setModal={setModal}
                  setSelected={setSelected}
                  clientName={clientName}
                  employeeName={employeeName}
                  can={can}
                />
              )}

              {view === "requests" && can("requests.view") && (
                <Requests
                  items={filtered(data.requests)}
                  search={search}
                  setSearch={setSearch}
                  filter={filter}
                  setFilter={setFilter}
                  clientName={clientName}
                  act={approveRequest}
                />
              )}

              {view === "files" && can("files.view") && (
                <Files
                  items={filtered(data.files)}
                  search={search}
                  setSearch={setSearch}
                  filter={filter}
                  setFilter={setFilter}
                  clientName={clientName}
                  projectName={projectName}
                  act={approveFile}
                />
              )}

              {view === "payments" && can("payments.view") && (
                <Payments
                  items={filtered(data.payments)}
                  search={search}
                  setSearch={setSearch}
                  filter={filter}
                  setFilter={setFilter}
                  clientName={clientName}
                  money={money}
                  act={verifyPayment}
                />
              )}

              {view === "invoices" && can("invoices.view") && (
                <Invoices
                  data={data}
                  search={search}
                  setSearch={setSearch}
                  clientName={clientName}
                  projectName={projectName}
                  money={money}
                  setModal={setModal}
                  setSelected={setSelected}
                  can={can}
                />
              )}

              {view === "employees" && can("employees.view") && (
                <Employees
                  data={data}
                  setModal={setModal}
                  setSelected={setSelected}
                  can={can}
                />
              )}

              {view === "reports" && can("reports.view") && (
                <Reports
                  data={data}
                  setModal={setModal}
                  money={money}
                />
              )}

              {view === "activity" && (
                <ActivityPage
                  items={filtered(data.activity)}
                  search={search}
                  setSearch={setSearch}
                />
              )}

              {view === "settings" && can("settings.manage") && (
                <SettingsPage
                  data={data}
                  save={save}
                  reset={() => {
                    const fresh = clone(seed);
                    localStorage.setItem(KEY, JSON.stringify(fresh));
                    setData(fresh);
                    notify("تمت إعادة بيانات النظام.");
                  }}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* =============================================
          MODALS
      ============================================= */}

      {modal === "client" && (
        <ClientModal close={() => setModal(null)} submit={createClient} />
      )}

      {modal === "clientEdit" && selected && (
        <ClientModal
          initial={selected}
          close={() => {
            setModal(null);
            setSelected(null);
          }}
          submit={(form) => updateClient(selected.id, form)}
          edit
        />
      )}

      {modal === "project" && (
        <ProjectModal clients={data.clients} close={() => setModal(null)} submit={createProject} />
      )}

      {modal === "projectEdit" && selected && (
        <ProjectModal
          clients={data.clients}
          initial={selected}
          close={() => {
            setModal(null);
            setSelected(null);
          }}
          submit={(form) => updateProject(selected.id, form)}
          edit
        />
      )}

      {modal === "invoice" && (
        <InvoiceModal
          clients={data.clients}
          projects={data.projects}
          close={() => setModal(null)}
          submit={createInvoice}
        />
      )}

      {modal === "employee" && (
        <EmployeeModal close={() => setModal(null)} submit={createEmployee} />
      )}

      {modal === "employeeEdit" && selected && (
        <EmployeeModal
          initial={selected}
          close={() => {
            setModal(null);
            setSelected(null);
          }}
          submit={(form) => updateEmployee(selected.id, form)}
          edit
        />
      )}

      {modal === "report" && (
        <ReportModal close={() => setModal(null)} submit={createReport} />
      )}
    </div>
  );
}

// =====================================================
// 10. OVERVIEW
// =====================================================

function Overview({ data, stats, money, navigate, setModal, approveRequest, verifyPayment, can }) {
  return (
    <div className="space-y-7">
      <PageHeader
        title={`مرحبًا، ${data.user.name}`}
        description="مركز التحكم الداخلي لـ SABARAT. من هنا تتم إدارة العملاء والمشاريع والطلبات والملفات والموافقات والفواتير والمدفوعات والموظفين والتقارير وسجل التدقيق."
        badge="🎯 اليوم"
      />

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        <StatCard
          title="إجمالي العملاء"
          value={stats.clients}
          icon={Users}
          subtitle={`${stats.activeClients} نشط`}
          onClick={() => navigate("clients")}
          color="#5EA8CC"
        />
        <StatCard
          title="المشاريع النشطة"
          value={stats.inProgressProjects}
          icon={FolderKanban}
          subtitle={`${stats.completedProjects} مكتمل`}
          onClick={() => navigate("projects")}
          color="#22C55E"
        />
        <StatCard
          title="طلبات معلقة"
          value={stats.pendingRequests}
          icon={FilePlus2}
          subtitle="بانتظار القرار"
          onClick={() => navigate("requests")}
          color="#F59E0B"
        />
        <StatCard
          title="مدفوعات معلقة"
          value={stats.pendingPayments}
          icon={WalletCards}
          subtitle="بانتظار التحقق"
          onClick={() => navigate("payments")}
          color="#EF4444"
        />
        <StatCard
          title="الإيرادات المحققة"
          value={money(stats.revenue)}
          icon={CircleDollarSign}
          trend="up"
          trendValue="+12%"
          onClick={() => navigate("payments")}
          color="#0F172A"
        />
      </div>

      {/* Decision Center + Outstanding */}
      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="p-6 xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-black text-lg text-[#0F172A] flex items-center gap-2">
                <Zap size={20} className="text-[#5EA8CC]" />
                مركز القرارات
              </h2>
              <p className="mt-1 text-xs text-[#64748B]">كل ما يحتاج تدخل الإدارة يظهر هنا.</p>
            </div>
            <Badge tone="warning">
              {stats.pendingRequests + stats.pendingFiles + stats.pendingPayments} عناصر
            </Badge>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <button
              onClick={() => navigate("requests")}
              className="rounded-2xl border border-[#E2E8F0] p-5 text-right transition-all duration-300 hover:border-[#5EA8CC] hover:bg-[#EAF6FC] hover:-translate-y-1 hover:shadow-lg"
            >
              <FilePlus2 size={22} className="text-[#5EA8CC]" />
              <b className="mt-3 block text-2xl">{stats.pendingRequests}</b>
              <span className="text-xs text-[#64748B]">طلبات بانتظار القرار</span>
            </button>
            <button
              onClick={() => navigate("files")}
              className="rounded-2xl border border-[#E2E8F0] p-5 text-right transition-all duration-300 hover:border-[#5EA8CC] hover:bg-[#EAF6FC] hover:-translate-y-1 hover:shadow-lg"
            >
              <FileCheck2 size={22} className="text-[#5EA8CC]" />
              <b className="mt-3 block text-2xl">{stats.pendingFiles}</b>
              <span className="text-xs text-[#64748B]">ملفات بانتظار الاعتماد</span>
            </button>
            <button
              onClick={() => navigate("payments")}
              className="rounded-2xl border border-[#E2E8F0] p-5 text-right transition-all duration-300 hover:border-[#5EA8CC] hover:bg-[#EAF6FC] hover:-translate-y-1 hover:shadow-lg"
            >
              <WalletCards size={22} className="text-[#5EA8CC]" />
              <b className="mt-3 block text-2xl">{stats.pendingPayments}</b>
              <span className="text-xs text-[#64748B]">مدفوعات بانتظار التحقق</span>
            </button>
          </div>
        </Card>

        <Card className="bg-[#0F172A] p-6 text-white transition-all duration-300 hover:shadow-xl">
          <p className="text-xs font-bold text-white/50">الرصيد المستحق</p>
          <b className="mt-2 block text-3xl">{money(stats.outstanding)}</b>
          <p className="mt-3 text-xs leading-6 text-white/60">إجمالي المبالغ المتبقية على الفواتير الحالية.</p>
          <Button variant="default" onClick={() => navigate("invoices")} className="mt-4 border-white/20 bg-white/10 text-white hover:bg-white/20">
            <CreditCard size={15} /> فتح الفواتير
          </Button>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-black text-lg flex items-center gap-2">
              <Activity size={20} className="text-[#5EA8CC]" />
              طلبات تحتاج قرارًا
            </h2>
            <Button onClick={() => navigate("requests")}>عرض الكل</Button>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {data.requests.filter((x) => x.status === "pending").slice(0, 5).map((x) => (
              <div
                key={x.id}
                className="rounded-2xl border border-[#E2E8F0] p-4 transition-all duration-300 hover:border-[#5EA8CC] hover:bg-[#EAF6FC]/30 hover:shadow-md"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <b className="text-sm">{x.title}</b>
                    <p className="mt-1 text-xs text-[#64748B]">{x.code} • {data.clients.find((c) => c.id === x.clientId)?.name}</p>
                  </div>
                  {labelStatus(x.status)}
                </div>

                {can("requests.review") && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Button variant="success" onClick={() => approveRequest(x.id, "approved")}>
                      <Check size={15} />اعتماد
                    </Button>
                    <Button variant="warning" onClick={() => approveRequest(x.id, "needs_changes")}>
                      <RefreshCcw size={15} />طلب تعديل
                    </Button>
                    <Button variant="danger" onClick={() => approveRequest(x.id, "rejected")}>
                      <XCircle size={15} />رفض
                    </Button>
                  </div>
                )}
              </div>
            ))}
            {!data.requests.some((x) => x.status === "pending") && <Empty text="لا توجد طلبات معلقة." />}
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-black text-lg flex items-center gap-2">
              <WalletCards size={20} className="text-[#5EA8CC]" />
              مدفوعات تحتاج تحققًا
            </h2>
            <Button onClick={() => navigate("payments")}>عرض الكل</Button>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {data.payments.filter((x) => x.status === "pending").slice(0, 5).map((x) => (
              <div
                key={x.id}
                className="rounded-2xl border border-[#E2E8F0] p-4 transition-all duration-300 hover:border-[#5EA8CC] hover:bg-[#EAF6FC]/30 hover:shadow-md"
              >
                <div className="flex justify-between gap-3">
                  <div>
                    <b className="text-sm">{x.code}</b>
                    <p className="mt-1 text-xs text-[#64748B]">{data.clients.find((c) => c.id === x.clientId)?.name} • {x.method}</p>
                  </div>
                  <b className="text-[#5EA8CC]">{money(x.amount)}</b>
                </div>

                {can("payments.verify") && (
                  <div className="mt-3 flex gap-2">
                    <Button variant="success" onClick={() => verifyPayment(x.id, "verified")}>
                      <Check size={15} />اعتماد
                    </Button>
                    <Button variant="danger" onClick={() => verifyPayment(x.id, "rejected")}>
                      <XCircle size={15} />رفض
                    </Button>
                  </div>
                )}
              </div>
            ))}
            {!data.payments.some((x) => x.status === "pending") && <Empty text="لا توجد دفعات معلقة." />}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="mb-4 font-black text-lg flex items-center gap-2">
          <Rocket size={20} className="text-[#5EA8CC]" />
          إجراءات سريعة
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {can("clients.create") && (
            <Button variant="primary" onClick={() => setModal("client")}>
              <UserPlus size={17} /> عميل جديد
            </Button>
          )}
          {can("projects.create") && (
            <Button onClick={() => setModal("project")}>
              <Plus size={17} /> مشروع جديد
            </Button>
          )}
          {can("invoices.create") && (
            <Button onClick={() => setModal("invoice")}>
              <CreditCard size={17} /> فاتورة جديدة
            </Button>
          )}
          {can("reports.create") && (
            <Button onClick={() => setModal("report")}>
              <FileText size={17} /> تقرير جديد
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

// =====================================================
// 11. ANALYTICS
// =====================================================

function Analytics({ data, money }) {
  const [timeRange, setTimeRange] = useState("year");

  const revenueData = data.analytics.revenueByMonth || [];
  const months = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
  const currentMonth = new Date().getMonth();
  const displayedMonths = timeRange === "year" ? months : months.slice(currentMonth - 5, currentMonth + 1);
  const displayedRevenue = timeRange === "year" ? revenueData : revenueData.slice(currentMonth - 5, currentMonth + 1);

  const maxRevenue = Math.max(...displayedRevenue, 1);
  const projectStatuses = data.analytics.projectsByStatus || {};
  const statusColors = {
    in_progress: "#5EA8CC",
    review: "#8B5CF6",
    completed: "#22C55E",
    pending: "#F59E0B",
  };

  const totalProjects = Object.values(projectStatuses).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-7">
      <PageHeader
        title="التحليلات والإحصائيات"
        description="نظرة شاملة على أداء الشركة والمشاريع والعملاء والإيرادات."
        action={
          <div className="flex gap-2">
            <Button
              variant={timeRange === "year" ? "primary" : "default"}
              onClick={() => setTimeRange("year")}
            >
              سنة كاملة
            </Button>
            <Button
              variant={timeRange === "6months" ? "primary" : "default"}
              onClick={() => setTimeRange("6months")}
            >
              ٦ أشهر
            </Button>
          </div>
        }
      />

      {/* Revenue Chart */}
      <Card className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-black text-lg flex items-center gap-2">
              <LineChart size={20} className="text-[#5EA8CC]" />
              الإيرادات الشهرية
            </h2>
            <p className="mt-1 text-xs text-[#64748B]">تطور الإيرادات خلال الفترة المحددة</p>
          </div>
          <Badge tone="primary">المجموع: {money(revenueData.reduce((a, b) => a + b, 0))}</Badge>
        </div>

        <div className="h-64 w-full">
          <div className="flex h-full items-end gap-1">
            {displayedRevenue.map((value, index) => {
              const height = Math.max(5, (value / maxRevenue) * 100);
              const isMax = value === maxRevenue;

              return (
                <div key={index} className="flex flex-1 flex-col items-center gap-2 group">
                  <div
                    className="w-full rounded-t-lg transition-all duration-700 ease-out hover:opacity-80"
                    style={{
                      height: `${height}%`,
                      backgroundColor: isMax ? "#5EA8CC" : "#87BCD8",
                      minHeight: "8px",
                    }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mt-6 text-center text-xs font-black text-[#0F172A]">
                      {money(value)}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#64748B]">{displayedMonths[index]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Project Status + Top Services */}
      <div className="grid gap-6 xl:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-5 font-black text-lg flex items-center gap-2">
            <PieChart size={20} className="text-[#5EA8CC]" />
            توزيع المشاريع حسب الحالة
          </h2>

          <div className="space-y-4">
            {Object.entries(projectStatuses).map(([status, count]) => {
              const percentage = totalProjects > 0 ? Math.round((count / totalProjects) * 100) : 0;
              const label = statusLabels[status]?.[0] || status;

              return (
                <div key={status}>
                  <div className="mb-1 flex justify-between text-sm font-bold">
                    <span className="text-[#64748B]">{label}</span>
                    <span>{count} مشروع ({percentage}%)</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-[#E2E8F0]">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: statusColors[status] || "#5EA8CC",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-5 font-black text-lg flex items-center gap-2">
            <Award size={20} className="text-[#5EA8CC]" />
            أفضل الخدمات
          </h2>

          <div className="space-y-4">
            {(data.analytics.topServices || []).map((service, index) => {
              const total = data.analytics.topServices.reduce((a, b) => a + b.count, 0);
              const percentage = total > 0 ? Math.round((service.count / total) * 100) : 0;

              return (
                <div key={index}>
                  <div className="mb-1 flex justify-between text-sm font-bold">
                    <span className="text-[#64748B]">{service.name}</span>
                    <span>{service.count} طلب</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-[#E2E8F0]">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: [
                          "#5EA8CC", "#22C55E", "#F59E0B", "#8B5CF6", "#EF4444"
                        ][index % 5],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Client Growth */}
      <Card className="p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-black text-lg flex items-center gap-2">
            <Users size={20} className="text-[#5EA8CC]" />
            نمو العملاء
          </h2>
          <Badge tone="success">+{data.analytics.clientGrowth?.slice(-1)[0] || 0} عميل</Badge>
        </div>

        <div className="h-32 w-full">
          <div className="flex h-full items-end gap-1">
            {(data.analytics.clientGrowth || []).map((value, index) => {
              const max = Math.max(...(data.analytics.clientGrowth || [1]), 1);
              const height = Math.max(5, (value / max) * 100);

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg bg-[#22C55E] transition-all duration-700 ease-out hover:opacity-80"
                    style={{ height: `${height}%`, minHeight: "4px" }}
                  />
                  <span className="text-[8px] font-bold text-[#64748B]">{months[index].slice(0, 3)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
}

// =====================================================
// 12. CLIENTS
// =====================================================

function Clients({ items, search, setSearch, filter, setFilter, setModal, setSelected, can, deleteClient }) {
  return (
    <div className="animate-[fadeIn_0.4s_ease-out]">
      <PageHeader
        title="إدارة العملاء"
        description="ملفات العملاء والعلاقات والمشاريع والطلبات المرتبطة بهم."
        action={can("clients.create") && (
          <Button variant="primary" onClick={() => setModal("client")}>
            <UserPlus size={16} /> إضافة عميل
          </Button>
        )}
      />
      <SearchBar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-right">
            <thead className="bg-[#F8FAFC] text-xs text-[#64748B]">
              <tr>
                <th className="p-4">العميل</th>
                <th className="p-4">التواصل</th>
                <th className="p-4">النشاط</th>
                <th className="p-4">المشاريع</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {items.map((x) => (
                <tr key={x.id} className="border-t border-[#E2E8F0] transition hover:bg-[#F8FAFC]">
                  <td className="p-4">
                    <b className="text-[#0F172A]">{x.name}</b>
                    <p className="mt-1 text-xs text-[#64748B]">{x.code}</p>
                  </td>
                  <td className="p-4 text-sm">
                    {x.email}
                    <br />
                    {x.phone}
                  </td>
                  <td className="p-4 text-sm text-[#64748B]">{x.industry || "—"}</td>
                  <td className="p-4 text-sm font-bold">{x.projects || 0}</td>
                  <td className="p-4">{labelStatus(x.status)}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelected(x);
                          setModal("clientEdit");
                        }}
                      >
                        <Eye size={15} /> عرض/تعديل
                      </Button>
                      {can("clients.delete") && (
                        <Button variant="danger" onClick={() => deleteClient(x.id)}>
                          <Trash2 size={15} /> حذف
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!items.length && <div className="p-5"><Empty /></div>}
      </Card>
    </div>
  );
}

// =====================================================
// 13. PROJECTS
// =====================================================

function Projects({ items, search, setSearch, filter, setFilter, setModal, setSelected, clientName, employeeName, can }) {
  return (
    <div className="animate-[fadeIn_0.4s_ease-out]">
      <PageHeader
        title="إدارة المشاريع"
        description="إدارة دورة المشروع والميزانية والأولوية والتقدم والموعد وفريق التنفيذ."
        action={can("projects.create") && (
          <Button variant="primary" onClick={() => setModal("project")}>
            <Plus size={16} /> مشروع جديد
          </Button>
        )}
      />
      <SearchBar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />

      <div className="grid gap-5 lg:grid-cols-2">
        {items.map((x) => (
          <Card key={x.id} className="p-6 transition-all duration-300 hover:shadow-xl">
            <div className="flex justify-between gap-4">
              <div>
                <span className="text-xs font-black text-[#5EA8CC]">{x.code}</span>
                <h2 className="mt-1 font-black text-lg text-[#0F172A]">{x.name}</h2>
                <p className="mt-1 text-xs text-[#64748B]">{clientName(x.clientId)} • {x.service}</p>
              </div>
              {labelStatus(x.status)}
            </div>

            <ProgressBar value={x.progress} color={x.progress > 70 ? "#22C55E" : x.progress > 40 ? "#F59E0B" : "#5EA8CC"} />

            <div className="mt-5 grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-[#F8FAFC] p-3 transition hover:bg-[#EAF6FC]">
                <small className="text-xs text-[#64748B]">الميزانية</small>
                <b className="mt-1 block text-[#0F172A]">{x.budget}</b>
              </div>
              <div className="rounded-2xl bg-[#F8FAFC] p-3 transition hover:bg-[#EAF6FC]">
                <small className="text-xs text-[#64748B]">الأولوية</small>
                <b className="mt-1 block text-[#0F172A]">
                  {x.priority === "high" ? "🔴 عالية" : x.priority === "low" ? "🟢 منخفضة" : "🟡 متوسطة"}
                </b>
              </div>
              <div className="rounded-2xl bg-[#F8FAFC] p-3 transition hover:bg-[#EAF6FC]">
                <small className="text-xs text-[#64748B]">الموعد</small>
                <b className="mt-1 block text-[#0F172A]">{x.deadline || "غير محدد"}</b>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {can("projects.update") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelected(x);
                    setModal("projectEdit");
                  }}
                >
                  <Edit3 size={15} /> تعديل
                </Button>
              )}
              {can("projects.team") && (
                <Button variant="primary">
                  <Users size={15} /> الفريق
                </Button>
              )}
              <Button variant="outline">
                <Eye size={15} /> التفاصيل
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {!items.length && <Empty text="لا توجد مشاريع مطابقة." />}
    </div>
  );
}

// =====================================================
// 14. REQUESTS
// =====================================================

function Requests({ items, search, setSearch, filter, setFilter, clientName, act }) {
  return (
    <div className="animate-[fadeIn_0.4s_ease-out]">
      <PageHeader
        title="طلبات العملاء"
        description="مراجعة كل الطلبات القادمة من ClientDashboardPage واتخاذ القرار الإداري."
        badge={`${items.filter((x) => x.status === "pending").length} معلق`}
      />
      <SearchBar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />

      <div className="space-y-4">
        {items.map((x) => (
          <Card key={x.id} className="p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex flex-wrap justify-between gap-4">
              <div>
                <span className="text-xs font-black text-[#5EA8CC]">{x.code}</span>
                <h2 className="mt-1 font-black text-lg text-[#0F172A]">{x.title}</h2>
                <p className="mt-1 text-xs text-[#64748B]">{clientName(x.clientId)} • {x.service} • {x.createdAt}</p>
              </div>
              {labelStatus(x.status)}
            </div>

            {x.description && (
              <p className="mt-4 rounded-2xl bg-[#F8FAFC] p-4 text-sm leading-7 text-[#64748B]">{x.description}</p>
            )}

            {x.status === "pending" && (
              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="success" onClick={() => act(x.id, "approved")}>
                  <Check size={15} /> اعتماد الطلب
                </Button>
                <Button variant="warning" onClick={() => act(x.id, "needs_changes")}>
                  <RefreshCcw size={15} /> طلب تعديلات
                </Button>
                <Button variant="danger" onClick={() => act(x.id, "rejected")}>
                  <XCircle size={15} /> رفض الطلب
                </Button>
              </div>
            )}
          </Card>
        ))}
        {!items.length && <Empty />}
      </div>
    </div>
  );
}

// =====================================================
// 15. FILES
// =====================================================

function Files({ items, search, setSearch, filter, setFilter, clientName, projectName, act }) {
  return (
    <div className="animate-[fadeIn_0.4s_ease-out]">
      <PageHeader
        title="الملفات والموافقات"
        description="مراجعة الملفات والإصدارات التي يرفعها فريق SABARAT أو العميل."
        badge={`${items.filter((x) => x.status === "pending").length} بانتظار الاعتماد`}
      />
      <SearchBar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />

      <div className="grid gap-5 lg:grid-cols-2">
        {items.map((x) => (
          <Card key={x.id} className="p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex justify-between gap-4">
              <div>
                <span className="text-xs font-black text-[#5EA8CC]">{x.code}</span>
                <h2 className="mt-1 font-black text-[#0F172A]">{x.name}</h2>
                <p className="mt-1 text-xs text-[#64748B]">إصدار {x.version} • {x.category}</p>
              </div>
              {labelStatus(x.status)}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Box label="العميل" value={clientName(x.clientId)} />
              <Box label="المشروع" value={projectName(x.projectId)} />
              <Box label="رفع بواسطة" value={x.uploadedBy} />
              <Box label="الحجم" value={x.size} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline">
                <Eye size={15} /> معاينة
              </Button>
              <Button variant="outline">
                <Download size={15} /> تنزيل
              </Button>
              {x.status === "pending" && (
                <>
                  <Button variant="success" onClick={() => act(x.id, "approved")}>
                    <Check size={15} /> اعتماد
                  </Button>
                  <Button variant="danger" onClick={() => act(x.id, "rejected")}>
                    <XCircle size={15} /> رفض
                  </Button>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
      {!items.length && <Empty />}
    </div>
  );
}

// =====================================================
// 16. PAYMENTS
// =====================================================

function Payments({ items, search, setSearch, filter, setFilter, clientName, money, act }) {
  return (
    <div className="animate-[fadeIn_0.4s_ease-out]">
      <PageHeader
        title="المدفوعات"
        description="مركز التحقق المالي: تحويلات بنكية، محافظ، مراجع العمليات، وربط الدفعة بالفاتورة."
        badge={`${items.filter((x) => x.status === "pending").length} بانتظار التحقق`}
      />
      <SearchBar search={search} setSearch={setSearch} filter={filter} setFilter={setFilter} />

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-right">
            <thead className="bg-[#F8FAFC] text-xs text-[#64748B]">
              <tr>
                <th className="p-4">العملية</th>
                <th className="p-4">العميل</th>
                <th className="p-4">المبلغ</th>
                <th className="p-4">الطريقة</th>
                <th className="p-4">المرجع</th>
                <th className="p-4">الحالة</th>
                <th className="p-4">القرار</th>
              </tr>
            </thead>
            <tbody>
              {items.map((x) => (
                <tr key={x.id} className="border-t border-[#E2E8F0] transition hover:bg-[#F8FAFC]">
                  <td className="p-4 font-black text-[#0F172A]">{x.code}</td>
                  <td className="p-4 text-[#64748B]">{clientName(x.clientId)}</td>
                  <td className="p-4 font-black text-[#5EA8CC]">{money(x.amount)}</td>
                  <td className="p-4 text-sm">
                    {x.method}
                    {x.wallet && <span className="block text-xs text-[#64748B]">{x.wallet}</span>}
                  </td>
                  <td className="p-4 text-xs text-[#64748B]">{x.reference || "—"}</td>
                  <td className="p-4">{labelStatus(x.status)}</td>
                  <td className="p-4">
                    {x.status === "pending" && (
                      <div className="flex gap-2">
                        <Button variant="success" onClick={() => act(x.id, "verified")}>
                          <Check size={14} /> اعتماد
                        </Button>
                        <Button variant="danger" onClick={() => act(x.id, "rejected")}>
                          <XCircle size={14} /> رفض
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!items.length && <div className="p-5"><Empty /></div>}
      </Card>
    </div>
  );
}

// =====================================================
// 17. INVOICES
// =====================================================

function Invoices({ data, search, setSearch, clientName, projectName, money, setModal, setSelected, can }) {
  const items = data.invoices.filter((x) => {
    const q = search.toLowerCase();
    return !q || JSON.stringify(x).toLowerCase().includes(q) || clientName(x.clientId).toLowerCase().includes(q);
  });

  return (
    <div className="animate-[fadeIn_0.4s_ease-out]">
      <PageHeader
        title="الفواتير"
        description="إدارة الفواتير والأرصدة والمدفوعات والاستحقاقات."
        action={can("invoices.create") && (
          <Button variant="primary" onClick={() => setModal("invoice")}>
            <Plus size={16} /> فاتورة جديدة
          </Button>
        )}
      />
      <SearchBar search={search} setSearch={setSearch} filter={undefined} setFilter={() => {}} placeholder="ابحث برقم الفاتورة أو اسم العميل..." />

      <div className="grid gap-5 lg:grid-cols-2">
        {items.map((x) => {
          const remaining = Math.max(0, Number(x.amount) - Number(x.paid));
          const isOverdue = new Date(x.dueDate) < new Date() && remaining > 0;

          return (
            <Card key={x.id} className="p-6 transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-between gap-4">
                <div>
                  <span className="text-xs font-black text-[#5EA8CC]">{x.code}</span>
                  <h2 className="mt-1 font-black text-[#0F172A]">{clientName(x.clientId)}</h2>
                  <p className="mt-1 text-xs text-[#64748B]">
                    {projectName(x.projectId)} • استحقاق {x.dueDate || "—"}
                    {isOverdue && <span className="mr-2 text-[#EF4444]">⏰ متأخر</span>}
                  </p>
                </div>
                {labelStatus(x.status)}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3">
                <Box label="الإجمالي" value={money(x.amount)} />
                <Box label="المدفوع" value={money(x.paid)} />
                <Box label="المتبقي" value={money(remaining)} tone={remaining > 0 ? "warning" : "success"} />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button variant="outline">
                  <Eye size={15} /> التفاصيل
                </Button>
                <Button variant="outline">
                  <Download size={15} /> PDF
                </Button>
                {can("invoices.update") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelected(x);
                      setModal("invoiceEdit");
                    }}
                  >
                    <Edit3 size={15} /> تعديل
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {!items.length && <Empty />}
    </div>
  );
}

// =====================================================
// 18. EMPLOYEES
// =====================================================

function Employees({ data, setModal, setSelected, can }) {
  return (
    <div className="animate-[fadeIn_0.4s_ease-out]">
      <PageHeader
        title="الموظفون والصلاحيات"
        description="إدارة حسابات الفريق وتحديد ما يستطيع كل موظف الوصول إليه أو تنفيذه."
        action={can("employees.manage") && (
          <Button variant="primary" onClick={() => setModal("employee")}>
            <UserPlus size={16} /> موظف جديد
          </Button>
        )}
      />

      <div className="mb-6 rounded-3xl border border-[#5EA8CC]/30 bg-[#EAF6FC] p-5">
        <div className="flex gap-3">
          <ShieldCheck className="mt-1 text-[#5EA8CC]" size={22} />
          <div>
            <b className="text-[#0F172A]">نظام الصلاحيات</b>
            <p className="mt-1 text-sm leading-7 text-[#64748B]">
              المدير يستطيع إدارة النظام، بينما المدير والموظف يحصلان فقط على الصلاحيات التي يتم تحديدها لهما.
              في Laravel يجب إعادة فحص هذه الصلاحيات على الخادم.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {data.employees.map((x) => (
          <Card key={x.id} className="p-6 transition-all duration-300 hover:shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0F172A] text-white text-2xl">
                {x.avatar || "👤"}
              </div>
              <div className="min-w-0">
                <b className="block truncate text-[#0F172A]">{x.name}</b>
                <p className="truncate text-xs text-[#64748B]">{x.email}</p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <Badge tone="primary">{roleLabels[x.role]}</Badge>
              {labelStatus(x.status)}
            </div>

            <div className="mt-4">
              <p className="text-xs font-bold text-[#64748B]">الصلاحيات</p>
              <p className="mt-1 text-sm font-black text-[#0F172A]">
                {x.permissions?.includes("*") ? "كل الصلاحيات" : `${x.permissions?.length || 0} صلاحية`}
              </p>
            </div>

            {can("employees.manage") && (
              <div className="mt-4 flex gap-2">
                <Button
                  variant="primary"
                  onClick={() => {
                    setSelected(x);
                    setModal("employeeEdit");
                  }}
                >
                  <ShieldCheck size={15} /> الصلاحيات
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelected(x);
                    setModal("employeeEdit");
                  }}
                >
                  <Edit3 size={15} /> تعديل
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

// =====================================================
// 19. REPORTS
// =====================================================

function Reports({ data, setModal, money }) {
  const verified = data.payments.filter((x) => x.status === "verified").reduce((a, x) => a + Number(x.amount || 0), 0);
  const outstanding = data.invoices.reduce((a, x) => a + Math.max(0, Number(x.amount) - Number(x.paid)), 0);

  return (
    <div className="animate-[fadeIn_0.4s_ease-out]">
      <PageHeader
        title="التقارير"
        description="مركز التقارير التشغيلية والمالية والإدارية بأرقام متسلسلة."
        action={
          <Button variant="primary" onClick={() => setModal("report")}>
            <FilePlus2 size={16} /> تقرير جديد
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard title="التقارير" value={data.reports.length} icon={FileText} color="#5EA8CC" />
        <StatCard title="الإيرادات المحققة" value={money(verified)} icon={CircleDollarSign} color="#22C55E" />
        <StatCard title="المتبقي" value={money(outstanding)} icon={Clock3} color="#F59E0B" />
        <StatCard title="النشاطات" value={data.activity.length} icon={Activity} color="#0F172A" />
      </div>

      <Card className="mt-6 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-right">
            <thead className="bg-[#F8FAFC] text-xs text-[#64748B]">
              <tr>
                <th className="p-4">رقم التقرير</th>
                <th className="p-4">العنوان</th>
                <th className="p-4">النوع</th>
                <th className="p-4">المنشئ</th>
                <th className="p-4">التاريخ</th>
                <th className="p-4">الإجراء</th>
              </tr>
            </thead>
            <tbody>
              {data.reports.map((x) => (
                <tr key={x.id} className="border-t border-[#E2E8F0] transition hover:bg-[#F8FAFC]">
                  <td className="p-4 font-black text-[#0F172A]">{x.code}</td>
                  <td className="p-4 font-bold text-[#0F172A]">{x.title}</td>
                  <td className="p-4 text-sm text-[#64748B]">{reportTypeLabel(x.type)}</td>
                  <td className="p-4 text-sm text-[#64748B]">{x.createdBy}</td>
                  <td className="p-4 text-xs text-[#64748B]">{x.createdAt}</td>
                  <td className="p-4">
                    <Button variant="outline">
                      <Download size={15} /> تصدير
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!data.reports.length && <div className="p-5"><Empty text="لم يتم إنشاء تقارير بعد." /></div>}
      </Card>
    </div>
  );
}

// =====================================================
// 20. ACTIVITY
// =====================================================

function ActivityPage({ items, search, setSearch }) {
  return (
    <div className="animate-[fadeIn_0.4s_ease-out]">
      <PageHeader
        title="سجل التدقيق والنشاط"
        description="كل عملية إدارية مهمة تحصل على رقم نشاط متسلسل ويمكن مراجعتها لاحقًا."
      />
      <SearchBar search={search} setSearch={setSearch} filter={undefined} setFilter={() => {}} placeholder="ابحث في سجل النشاط..." />

      <Card className="p-5">
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {items.map((x) => (
            <div
              key={x.id}
              className="flex gap-3 rounded-2xl border border-[#E2E8F0] p-4 transition-all duration-300 hover:border-[#5EA8CC] hover:bg-[#EAF6FC]/30 hover:shadow-md"
            >
              <span className="rounded-xl bg-[#EAF6FC] p-3 text-[#5EA8CC]">
                <Activity size={17} />
              </span>
              <div>
                <b className="text-sm text-[#0F172A]">{x.text}</b>
                <p className="mt-1 text-xs text-[#64748B]">{x.code} • {x.actor} • {x.createdAt}</p>
              </div>
            </div>
          ))}
          {!items.length && <Empty />}
        </div>
      </Card>
    </div>
  );
}

// =====================================================
// 21. SETTINGS
// =====================================================

function SettingsPage({ data, save, reset }) {
  const [form, setForm] = useState(data.settings);

  const submit = () => {
    const d = clone(data);
    d.settings = { ...d.settings, ...form };
    d.activity.unshift({
      id: nextId(d, "activity"),
      code: `ACT-${d.sequence.activity - 1}`,
      text: "تم تحديث إعدادات النظام",
      type: "settings",
      actorId: d.user.id,
      actor: d.user.name,
      createdAt: timeNow(),
    });
    save(d);
  };

  return (
    <div className="animate-[fadeIn_0.4s_ease-out]">
      <PageHeader title="إعدادات النظام" description="إعدادات تشغيلية وهوية النظام وقواعد سير العمل." />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-5 font-black text-lg text-[#0F172A]">إعدادات التشغيل</h2>

          <div className="space-y-4">
            <Field
              label="اسم الشركة"
              value={form.companyName}
              onChange={(v) => setForm({ ...form, companyName: v })}
            />
            <SelectField
              label="العملة"
              value={form.currency}
              onChange={(v) => setForm({ ...form, currency: v })}
            >
              <option value="USD">USD — دولار</option>
              <option value="YER">YER — ريال يمني</option>
              <option value="SAR">SAR — ريال سعودي</option>
            </SelectField>
            <Field
              label="المنطقة الزمنية"
              value={form.timezone}
              onChange={(v) => setForm({ ...form, timezone: v })}
            />

            <Toggle
              label="إظهار إشعارات الإدارة"
              value={form.notifications}
              onChange={(v) => setForm({ ...form, notifications: v })}
            />
            <Toggle
              label="طلب اعتماد الملفات قبل التسليم"
              value={form.requireFileApproval}
              onChange={(v) => setForm({ ...form, requireFileApproval: v })}
            />
            <Toggle
              label="طلب التحقق من المدفوعات"
              value={form.requirePaymentVerification}
              onChange={(v) => setForm({ ...form, requirePaymentVerification: v })}
            />
            <Toggle
              label="إنشاء مشروع تلقائيًا عند اعتماد الطلب"
              value={form.autoCreateProjectOnApproval}
              onChange={(v) => setForm({ ...form, autoCreateProjectOnApproval: v })}
            />

            <Button variant="primary" onClick={submit} className="w-full">
              <CheckCircle2 size={16} /> حفظ الإعدادات
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-5 font-black text-lg text-[#0F172A]">الترقيم المتسلسل</h2>

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(data.sequence).map(([key, value]) => (
              <Box key={key} label={sequenceLabel(key)} value={`التالي: ${value}`} />
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-[#EAF6FC] p-4 text-sm leading-7 text-[#64748B]">
            الترقيم هنا محاكاة Frontend. عند ربط Laravel يجب نقل إنشاء الأرقام المتسلسلة إلى قاعدة البيانات باستخدام
            Transactions أو خدمة ترقيم مركزية حتى لا تتكرر الأرقام عند وجود أكثر من موظف.
          </div>

          <Button variant="danger" onClick={reset} className="mt-4">
            <RefreshCcw size={15} /> إعادة البيانات التجريبية
          </Button>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h2 className="font-black text-lg text-[#0F172A] flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#5EA8CC]" />
            ملاحظة هندسية مهمة
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-8 text-[#64748B]">
            هذه الصفحة تعطيك مركز تحكم كامل على مستوى الواجهة، لكن localStorage ليس قاعدة بيانات ولا طبقة أمان.
            عند ربط Laravel يجب نقل الصلاحيات والمصادقة والملفات والمدفوعات وسجل التدقيق إلى الخادم،
            بينما يبقى DashboardPage واجهة الإدارة.
          </p>
        </Card>
      </div>
    </div>
  );
}

// =====================================================
// 22. UI HELPERS
// =====================================================

function Toggle({ label, value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="flex w-full items-center justify-between rounded-2xl border border-[#E2E8F0] p-4 text-right transition-all duration-300 hover:border-[#5EA8CC] hover:bg-[#EAF6FC]/30"
    >
      <span className="text-sm font-bold text-[#0F172A]">{label}</span>
      <span className={`h-6 w-11 rounded-full p-1 transition-all duration-300 ${value ? "bg-[#5EA8CC]" : "bg-[#E2E8F0]"}`}>
        <span className={`block h-4 w-4 rounded-full bg-white transition-all duration-300 ${value ? "translate-x-5" : ""}`} />
      </span>
    </button>
  );
}

function Box({ label, value, tone = "default" }) {
  const tones = {
    default: "bg-[#F8FAFC]",
    success: "bg-[#22C55E]/10",
    warning: "bg-[#F59E0B]/10",
  };

  return (
    <div className={`rounded-2xl p-3 ${tones[tone] || tones.default}`}>
      <small className="block text-xs font-bold text-[#64748B]">{label}</small>
      <b className="mt-1 block text-sm text-[#0F172A]">{value}</b>
    </div>
  );
}

// =====================================================
// 23. MODALS
// =====================================================

function ClientModal({ close, submit, initial, edit = false }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    email: initial?.email || "",
    phone: initial?.phone || "",
    status: initial?.status || "active",
    industry: initial?.industry || "",
  });

  return (
    <Modal title={edit ? `تعديل العميل ${initial.code}` : "إضافة عميل"} close={close}>
      <form onSubmit={(e) => { e.preventDefault(); submit(form); }} className="space-y-4">
        <Field label="اسم العميل" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
        <Field label="البريد الإلكتروني" required type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="رقم الهاتف" required value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <Field label="مجال النشاط" value={form.industry} onChange={(v) => setForm({ ...form, industry: v })} />
        {edit && (
          <SelectField label="الحالة" value={form.status} onChange={(v) => setForm({ ...form, status: v })}>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
          </SelectField>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <Button onClick={close}>إلغاء</Button>
          <Button variant="primary" type="submit">
            <Check size={15} /> {edit ? "حفظ" : "إنشاء العميل"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function ProjectModal({ clients, close, submit, initial, edit = false }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    clientId: initial?.clientId || clients[0]?.id || "",
    service: initial?.service || "",
    priority: initial?.priority || "medium",
    budget: initial?.budget || "",
    deadline: initial?.deadline || "",
    progress: initial?.progress || 0,
    status: initial?.status || "in_progress",
  });

  return (
    <Modal title={edit ? `تعديل ${initial.code}` : "إنشاء مشروع"} close={close}>
      <form onSubmit={(e) => { e.preventDefault(); submit(form); }} className="space-y-4">
        <Field label="اسم المشروع" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />

        <SelectField label="العميل" value={form.clientId} onChange={(v) => setForm({ ...form, clientId: v })}>
          {clients.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
        </SelectField>

        <Field label="الخدمة" required value={form.service} onChange={(v) => setForm({ ...form, service: v })} />

        <div className="grid gap-3 md:grid-cols-2">
          <Field label="الميزانية" type="number" value={form.budget} onChange={(v) => setForm({ ...form, budget: v })} />
          <Field label="الموعد النهائي" type="date" value={form.deadline} onChange={(v) => setForm({ ...form, deadline: v })} />
          <Field label="نسبة الإنجاز" type="number" value={form.progress} onChange={(v) => setForm({ ...form, progress: v })} />
          <SelectField label="الأولوية" value={form.priority} onChange={(v) => setForm({ ...form, priority: v })}>
            <option value="low">منخفضة</option>
            <option value="medium">متوسطة</option>
            <option value="high">عالية</option>
          </SelectField>
          {edit && (
            <SelectField label="حالة المشروع" value={form.status} onChange={(v) => setForm({ ...form, status: v })}>
              <option value="in_progress">قيد التنفيذ</option>
              <option value="review">بانتظار المراجعة</option>
              <option value="completed">مكتمل</option>
            </SelectField>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={close}>إلغاء</Button>
          <Button variant="primary" type="submit">
            <Check size={15} /> {edit ? "حفظ المشروع" : "إنشاء المشروع"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function InvoiceModal({ clients, projects, close, submit }) {
  const [form, setForm] = useState({
    clientId: clients[0]?.id || "",
    projectId: projects[0]?.id || "",
    amount: "",
    dueDate: "",
  });

  const availableProjects = projects.filter((x) => x.clientId === Number(form.clientId));

  return (
    <Modal title="إنشاء فاتورة" close={close}>
      <form onSubmit={(e) => { e.preventDefault(); submit(form); }} className="space-y-4">
        <SelectField label="العميل" value={form.clientId} onChange={(v) => setForm({ ...form, clientId: v, projectId: "" })}>
          {clients.map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}
        </SelectField>

        <SelectField label="المشروع" value={form.projectId} onChange={(v) => setForm({ ...form, projectId: v })}>
          <option value="">اختر المشروع</option>
          {availableProjects.map((x) => <option key={x.id} value={x.id}>{x.code} — {x.name}</option>)}
        </SelectField>

        <Field label="المبلغ" required type="number" value={form.amount} onChange={(v) => setForm({ ...form, amount: v })} />
        <Field label="تاريخ الاستحقاق" type="date" value={form.dueDate} onChange={(v) => setForm({ ...form, dueDate: v })} />

        <div className="flex justify-end gap-2">
          <Button onClick={close}>إلغاء</Button>
          <Button variant="primary" type="submit">
            <CreditCard size={15} /> إنشاء الفاتورة
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function EmployeeModal({ close, submit, initial, edit = false }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    email: initial?.email || "",
    phone: initial?.phone || "",
    role: initial?.role || "employee",
    status: initial?.status || "active",
    permissions: initial?.permissions?.includes("*") ? ["*"] : (initial?.permissions || []),
  });

  const togglePermission = (permission) => {
    if (permission === "*") {
      setForm({ ...form, permissions: form.permissions.includes("*") ? [] : ["*"] });
      return;
    }

    const current = form.permissions.filter((x) => x !== "*");
    const next = current.includes(permission)
      ? current.filter((x) => x !== permission)
      : [...current, permission];

    setForm({ ...form, permissions: next });
  };

  return (
    <Modal title={edit ? `تعديل ${initial.code}` : "إضافة موظف"} close={close} wide>
      <form onSubmit={(e) => { e.preventDefault(); submit(form); }} className="space-y-5">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="اسم الموظف" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          <Field label="البريد" required type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
          <Field label="الهاتف" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
          <SelectField label="الدور" value={form.role} onChange={(v) => setForm({ ...form, role: v })}>
            <option value="admin">مدير النظام</option>
            <option value="manager">مدير قسم</option>
            <option value="employee">موظف</option>
          </SelectField>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <b className="text-[#0F172A]">صلاحيات الحساب</b>
            <Badge>{form.permissions.includes("*") ? "كل الصلاحيات" : `${form.permissions.length} صلاحية`}</Badge>
          </div>

          <button
            type="button"
            onClick={() => togglePermission("*")}
            className={`mb-4 flex w-full items-center justify-between rounded-2xl border p-4 text-right transition-all duration-300 ${
              form.permissions.includes("*")
                ? "border-[#5EA8CC] bg-[#EAF6FC]"
                : "border-[#E2E8F0] hover:border-[#5EA8CC] hover:bg-[#EAF6FC]/30"
            }`}
          >
            <span>
              <b className="block text-[#0F172A]">كل الصلاحيات</b>
              <small className="text-xs text-[#64748B]">صلاحية كاملة للنظام</small>
            </span>
            {form.permissions.includes("*") ? <CheckCircle2 className="text-[#5EA8CC]" /> : <div className="h-5 w-5 rounded-full border" />}
          </button>

          <div className="grid gap-2 md:grid-cols-2">
            {permissionCatalog.map(([permission, label]) => {
              const active = form.permissions.includes("*") || form.permissions.includes(permission);

              return (
                <button
                  type="button"
                  key={permission}
                  disabled={form.permissions.includes("*")}
                  onClick={() => togglePermission(permission)}
                  className={`flex items-center justify-between rounded-2xl border p-3 text-right transition-all duration-300 ${
                    active
                      ? "border-[#22C55E] bg-[#22C55E]/10"
                      : "border-[#E2E8F0] bg-white hover:border-[#5EA8CC] hover:bg-[#EAF6FC]/30"
                  } disabled:opacity-50`}
                >
                  <span>
                    <b className="block text-sm text-[#0F172A]">{label}</b>
                    <small className="text-[10px] text-[#64748B]">{permission}</small>
                  </span>
                  {active ? <CheckCircle2 size={18} className="text-[#22C55E]" /> : <div className="h-5 w-5 rounded-full border" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button onClick={close}>إلغاء</Button>
          <Button variant="primary" type="submit">
            <ShieldCheck size={15} /> {edit ? "حفظ الصلاحيات" : "إنشاء الموظف"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

function ReportModal({ close, submit }) {
  const [form, setForm] = useState({ title: "", type: "financial" });

  return (
    <Modal title="إنشاء تقرير" close={close}>
      <form onSubmit={(e) => { e.preventDefault(); submit(form); }} className="space-y-4">
        <Field label="عنوان التقرير" required value={form.title} onChange={(v) => setForm({ ...form, title: v })} />
        <SelectField label="نوع التقرير" value={form.type} onChange={(v) => setForm({ ...form, type: v })}>
          <option value="financial">مالي</option>
          <option value="clients">العملاء</option>
          <option value="projects">المشاريع</option>
          <option value="payments">المدفوعات</option>
          <option value="activity">النشاط</option>
          <option value="operations">تشغيلي</option>
        </SelectField>

        <div className="flex justify-end gap-2">
          <Button onClick={close}>إلغاء</Button>
          <Button variant="primary" type="submit">
            <FileText size={15} /> إنشاء التقرير
          </Button>
        </div>
      </form>
    </Modal>
  );
}

// =====================================================
// 24. HELPERS (continued)
// =====================================================

function buildReportSummary(data, type) {
  if (type === "financial") {
    const verified = data.payments.filter((x) => x.status === "verified").reduce((a, x) => a + Number(x.amount || 0), 0);
    const outstanding = data.invoices.reduce((a, x) => a + Math.max(0, Number(x.amount) - Number(x.paid)), 0);
    return `إيرادات محققة: ${verified} — متبقي: ${outstanding}`;
  }

  if (type === "clients") return `إجمالي العملاء: ${data.clients.length}`;
  if (type === "projects") return `إجمالي المشاريع: ${data.projects.length}`;
  if (type === "payments") return `إجمالي العمليات: ${data.payments.length}`;
  if (type === "activity") return `إجمالي النشاطات: ${data.activity.length}`;
  return `تشغيل: ${data.projects.length} مشاريع، ${data.requests.length} طلبات، ${data.files.length} ملفات`;
}

function reportTypeLabel(type) {
  return {
    financial: "مالي",
    clients: "العملاء",
    projects: "المشاريع",
    payments: "المدفوعات",
    activity: "النشاط",
    operations: "تشغيلي",
  }[type] || type;
}

function sequenceLabel(key) {
  return {
    client: "العملاء",
    project: "المشاريع",
    request: "الطلبات",
    invoice: "الفواتير",
    payment: "المدفوعات",
    report: "التقارير",
    activity: "النشاط",
    file: "الملفات",
    employee: "الموظفين",
    notification: "الإشعارات",
  }[key] || key;
}