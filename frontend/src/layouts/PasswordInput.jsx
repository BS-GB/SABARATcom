import { useState } from "react";
import {
    Eye,
    EyeOff,
} from "lucide-react";

function PasswordInput({
    label,
    name,
    value,
    onChange,
    placeholder,
    autoComplete,
    disabled = false,
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-2">

            <label
                htmlFor={name}
                className="block text-sm font-bold text-slate-200"
            >
                {label}
            </label>

            <div className="relative">

                <input
                    id={name}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required
                    disabled={disabled}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-white/10
                        bg-white/[0.04]
                        px-4
                        py-3.5
                        pe-12
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-slate-600
                        transition-all
                        duration-300
                        focus:border-[#5EA8CC]
                        focus:bg-white/[0.06]
                        focus:ring-4
                        focus:ring-[#5EA8CC]/10
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                    "
                />

                <button
                    type="button"
                    disabled={disabled}
                    onClick={() =>
                        setShowPassword((current) => !current)
                    }
                    aria-label={
                        showPassword
                            ? "Hide password"
                            : "Show password"
                    }
                    className="
                        absolute
                        end-3
                        top-1/2
                        flex
                        -translate-y-1/2
                        items-center
                        justify-center
                        rounded-lg
                        p-2
                        text-slate-500
                        transition
                        hover:bg-white/5
                        hover:text-white
                        disabled:cursor-not-allowed
                    "
                >
                    {showPassword ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                </button>

            </div>

        </div>
    );
}

export default PasswordInput;