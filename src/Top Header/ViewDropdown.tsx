import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { pageRoutes } from "../pages/routes";

interface ViewDropdownProps {
  value: string;
  onChange: (path: string) => void;
}

export default function ViewDropdown({ value, onChange }: ViewDropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const selectedPage = pageRoutes.find((page) => page.path === value) ?? pageRoutes[0];

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [activeIndex, open]);

  const choose = (path: string) => {
    onChange(path);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        Math.max(
          0,
          pageRoutes.findIndex((page) => page.path === value),
        ),
      );
      setOpen(true);
    }
  };

  const handleOptionKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const direction = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index + direction + pageRoutes.length) % pageRoutes.length);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      setActiveIndex(event.key === "Home" ? 0 : pageRoutes.length - 1);
    }
  };

  return (
    <div className="view-dropdown" ref={rootRef}>
      <span className="view-dropdown-label">VIEW</span>
      <button
        ref={triggerRef}
        type="button"
        className="view-dropdown-trigger"
        aria-label="Navigate to a view"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="view-dropdown-listbox"
        onClick={() => setOpen((isOpen) => !isOpen)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span>{selectedPage.label}</span>
        <ExpandMoreIcon className={open ? "is-open" : ""} sx={{ fontSize: 24 }} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id="view-dropdown-listbox"
            className="view-dropdown-menu"
            role="listbox"
            aria-label="App views"
            initial={reduceMotion ? false : { opacity: 0, y: -6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -4, scale: 0.99 }}
            transition={{ duration: reduceMotion ? 0 : 0.16, ease: "easeOut" }}
          >
            {pageRoutes.map((page, index) => {
              const isSelected = page.path === value;
              return (
                <m.button
                  key={page.path}
                  ref={(element) => {
                    optionRefs.current[index] = element;
                  }}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={isSelected ? "view-dropdown-option selected" : "view-dropdown-option"}
                  onClick={() => choose(page.path)}
                  onKeyDown={(event) => handleOptionKeyDown(event, index)}
                  whileHover={reduceMotion ? undefined : { x: 2 }}
                >
                  <span>{page.label}</span>
                  {isSelected && <CheckIcon sx={{ fontSize: 20 }} aria-hidden="true" />}
                </m.button>
              );
            })}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
