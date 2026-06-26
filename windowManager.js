// windowManager.js — tiny retro-OS window manager.
// Handles: opening/closing/focusing windows, dragging by title bar, z-index stacking.
export class WindowManager {
    constructor(desktopSelector) {
        this.zCounter = 10;
        this.openIds = new Set();
        const el = document.querySelector(desktopSelector);
        if (!el)
            throw new Error(`WindowManager: desktop "${desktopSelector}" not found`);
        this.desktop = el;
    }
    isOpen(id) {
        return this.openIds.has(id);
    }
    /** Opens a window if not already open, otherwise just focuses it. */
    open(opts, bodyHtml, onMount) {
        const existing = document.getElementById(`win-${opts.id}`);
        if (existing) {
            this.focus(existing);
            this.pop(existing);
            return;
        }
        const win = document.createElement("div");
        win.className = "window";
        win.id = `win-${opts.id}`;
        win.style.setProperty("--accent", opts.accent);
        win.style.width = `${opts.width}px`;
        // Stagger position a bit so multiple windows don't perfectly overlap.
        const offset = this.openIds.size * 26;
        const baseLeft = Math.min(60 + offset, window.innerWidth - opts.width - 24);
        const baseTop = Math.min(90 + offset, window.innerHeight - 200);
        win.style.left = `${Math.max(16, baseLeft)}px`;
        win.style.top = `${Math.max(64, baseTop)}px`;
        win.innerHTML = `
      <div class="window-titlebar" data-drag-handle>
        <div class="window-dots">
          <span class="dot dot-close" data-action="close" title="Close"></span>
          <span class="dot dot-min" data-action="minimize" title="Minimize"></span>
          <span class="dot dot-max" data-action="maximize" title="Maximize"></span>
        </div>
        <div class="window-title"><span class="window-icon">${opts.icon}</span>${opts.title}</div>
      </div>
      <div class="window-body">${bodyHtml}</div>
    `;
        this.desktop.appendChild(win);
        this.openIds.add(opts.id);
        this.makeDraggable(win);
        this.focus(win);
        this.pop(win);
        const titlebar = win.querySelector(".window-titlebar");
        titlebar?.addEventListener("mousedown", () => this.focus(win));
        win.addEventListener("mousedown", () => this.focus(win));
        win.querySelector('[data-action="close"]')?.addEventListener("click", (e) => {
            e.stopPropagation();
            this.close(opts.id);
        });
        win.querySelector('[data-action="minimize"]')?.addEventListener("click", (e) => {
            e.stopPropagation();
            win.classList.toggle("minimized");
        });
        win.querySelector('[data-action="maximize"]')?.addEventListener("click", (e) => {
            e.stopPropagation();
            win.classList.toggle("maximized");
        });
        onMount?.(win);
    }
    close(id) {
        const el = document.getElementById(`win-${id}`);
        if (!el)
            return;
        el.classList.add("closing");
        setTimeout(() => {
            el.remove();
            this.openIds.delete(id);
        }, 160);
    }
    closeAll() {
        this.openIds.forEach((id) => this.close(id));
    }
    focus(win) {
        this.zCounter += 1;
        win.style.zIndex = String(this.zCounter);
        document.querySelectorAll(".window").forEach((w) => w.classList.remove("active"));
        win.classList.add("active");
    }
    /** A tiny "pop" entrance animation. */
    pop(win) {
        win.classList.remove("pop");
        // restart animation
        void win.offsetWidth;
        win.classList.add("pop");
    }
    makeDraggable(win) {
        const handle = win.querySelector("[data-drag-handle]");
        if (!handle)
            return;
        let startX = 0;
        let startY = 0;
        let originLeft = 0;
        let originTop = 0;
        let dragging = false;
        const onPointerDown = (e) => {
            if (e.target.closest(".dot"))
                return; // don't drag from buttons
            dragging = true;
            win.classList.add("dragging");
            startX = e.clientX;
            startY = e.clientY;
            const rect = win.getBoundingClientRect();
            originLeft = rect.left;
            originTop = rect.top;
            handle.setPointerCapture(e.pointerId);
        };
        const onPointerMove = (e) => {
            if (!dragging)
                return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const newLeft = Math.max(4, Math.min(window.innerWidth - 60, originLeft + dx));
            const newTop = Math.max(48, Math.min(window.innerHeight - 40, originTop + dy));
            win.style.left = `${newLeft}px`;
            win.style.top = `${newTop}px`;
        };
        const onPointerUp = (e) => {
            if (!dragging)
                return;
            dragging = false;
            win.classList.remove("dragging");
            try {
                handle.releasePointerCapture(e.pointerId);
            }
            catch {
                /* no-op */
            }
        };
        handle.addEventListener("pointerdown", onPointerDown);
        handle.addEventListener("pointermove", onPointerMove);
        handle.addEventListener("pointerup", onPointerUp);
        handle.addEventListener("pointercancel", onPointerUp);
    }
}