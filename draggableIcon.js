// draggableIcon.js — makes a desktop icon draggable with a little spring "wobble" on drop.
// Click (no drag) still fires the provided onActivate callback (double-click semantics
// are overkill for a portfolio toy — single click opens, matching user expectation).
export function makeIconDraggable(el, onActivate) {
    let startX = 0;
    let startY = 0;
    let originLeft = 0;
    let originTop = 0;
    let dragging = false;
    let moved = false;
    // Icons are absolutely positioned within the desktop once dragged.
    const ensureAbsolute = () => {
        if (el.style.position === "absolute")
            return;
        const rect = el.getBoundingClientRect();
        const parentRect = el.parentElement.getBoundingClientRect();
        el.style.position = "absolute";
        el.style.left = `${rect.left - parentRect.left}px`;
        el.style.top = `${rect.top - parentRect.top}px`;
        el.style.margin = "0";
    };
    el.addEventListener("pointerdown", (e) => {
        dragging = true;
        moved = false;
        startX = e.clientX;
        startY = e.clientY;
        const rect = el.getBoundingClientRect();
        const parentRect = el.parentElement.getBoundingClientRect();
        originLeft = rect.left - parentRect.left;
        originTop = rect.top - parentRect.top;
        el.setPointerCapture(e.pointerId);
        el.classList.add("icon-grabbed");
    });
    el.addEventListener("pointermove", (e) => {
        if (!dragging)
            return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
            moved = true;
            ensureAbsolute();
            el.style.left = `${originLeft + dx}px`;
            el.style.top = `${originTop + dy}px`;
        }
    });
    const endDrag = (e) => {
        if (!dragging)
            return;
        dragging = false;
        el.classList.remove("icon-grabbed");
        try {
            el.releasePointerCapture(e.pointerId);
        }
        catch {
            /* no-op */
        }
        if (moved) {
            el.classList.add("icon-wobble");
            setTimeout(() => el.classList.remove("icon-wobble"), 420);
        }
        else {
            onActivate();
        }
    };
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
}