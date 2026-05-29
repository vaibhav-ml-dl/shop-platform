import { motion } from "framer-motion";
import React from "react";

const variants = {
  primary: "bg-brand-500 text-white shadow-lg shadow-brand-500/25 hover:bg-brand-600",
  secondary: "border border-slate-200 bg-white text-slate-950 hover:border-brand-500 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-white",
  ghost: "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
};

export function AuthButton({ children, className = "", variant = "primary", type = "button", ...props }) {
  return (
    <motion.button
      className={`h-12 w-full rounded-lg px-4 text-sm font-black transition ${variants[variant]} ${className}`}
      type={type}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
