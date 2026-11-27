import { useEffect } from "react";
import { m } from "framer-motion";
import { useViewport } from "../../lib/viewport";
import { Icon } from "../common";
import { SHEET_TITLES, useActionSheetForm, type ActionSheetProps } from "./data";
import { SheetBodyContent } from "./desktop";

export function MobileActionSheet(props: ActionSheetProps) {
  const { type, close } = props;
  const { isPreviewFrame } = useViewport();
  const form = useActionSheetForm(props);
  const meta = SHEET_TITLES[type];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <div
      className="fixed inset-0 z-[130] flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={meta.title}
    >
      <m.button
        type="button"
        aria-label="Close sheet"
        onClick={close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/55 backdrop-blur-xs border-0"
      />
      <m.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 380, damping: 36 }}
        className={`relative z-10 w-full ${
          isPreviewFrame ? "max-w-[430px]" : ""
        } rounded-t-[28px] max-h-[86vh] overflow-y-auto bg-[var(--bg-elevated)] border-t border-[var(--border-strong)] px-5 pt-3 pb-7 shadow-2xl`}
      >
        <div className="w-10 h-1.5 rounded-full bg-[var(--border-strong)] mx-auto mb-4" />
        <header className="flex items-start justify-between gap-3 pb-4 mb-4 border-b border-[var(--border-subtle)]">
          <div>
            <span className="ios-eyebrow !text-[10px]">{meta.eyebrow}</span>
            <h2 className="font-bold text-[20px] tracking-[-0.025em] text-[var(--text-primary)] mt-0.5">
              {meta.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="w-8 h-8 rounded-full bg-[var(--bg-subtle)] grid place-items-center text-[var(--text-secondary)] border-0 shrink-0"
          >
            <Icon name="close" size={18} />
          </button>
        </header>

        <SheetBodyContent type={type} form={form} close={close} />
      </m.div>
    </div>
  );
}
