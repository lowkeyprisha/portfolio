// main.js — prisha-OS: a tiny toy desktop that boots into a portfolio.
import { WindowManager } from "./windowManager.js";
import { makeIconDraggable } from "./draggableIcon.js";
import { profile, skillGroups, projects, oss, dsaStats, achievements, activities, bootLines, } from "./data.js";
const wm = new WindowManager("#desktop");
// ---------- Boot sequence ----------
function runBootSequence(onDone) {
    const screen = document.getElementById("boot-screen");
    const log = document.getElementById("boot-log");
    if (!screen || !log) {
        onDone();
        return;
    }
    let i = 0;
    const typeNext = () => {
        if (i >= bootLines.length) {
            const ready = document.createElement("div");
            ready.className = "boot-line boot-ready";
            ready.textContent = "$ launch prisha-os --portfolio  ✓ ready";
            log.appendChild(ready);
            setTimeout(() => {
                screen.classList.add("boot-fade");
                setTimeout(() => {
                    screen.remove();
                    onDone();
                }, 480);
            }, 420);
            return;
        }
        const line = document.createElement("div");
        line.className = "boot-line";
        line.textContent = bootLines[i];
        log.appendChild(line);
        log.scrollTop = log.scrollHeight;
        i += 1;
        setTimeout(typeNext, i % 2 === 1 ? 170 : 230);
    };
    setTimeout(typeNext, 260);
}
// ---------- Confetti easter egg ----------
function burstConfetti(x, y) {
    if (typeof confetti === "function") {
        confetti({
            particleCount: 60,
            spread: 70,
            startVelocity: 28,
            origin: {
                x: x / window.innerWidth,
                y: y / window.innerHeight,
            },
            colors: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#1A1A2E"],
            scalar: 0.9,
        });
    }
}
// ---------- Window content builders ----------
function projectWindowBody(p) {
    const metrics = p.metrics
        .map((m) => `
      <div class="metric-chip">
        <span class="metric-value">${escapeHtml(m.value)}</span>
        <span class="metric-label">${escapeHtml(m.label)}</span>
      </div>`)
        .join("");
    const stack = p.stack.map((s) => `<span class="pill">${escapeHtml(s)}</span>`).join("");
    const bullets = p.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("");
    return `
    <div class="proj-head">
      <div class="proj-icon-big">${p.icon}</div>
      <div>
        <div class="proj-name">${escapeHtml(p.name)}</div>
        <div class="proj-tagline">${escapeHtml(p.tagline)} · ${escapeHtml(p.period)}</div>
      </div>
      <span class="status-tag status-${p.status}">${statusLabel(p.status)}</span>
    </div>
    <div class="metric-row">${metrics}</div>
    <ul class="proj-bullets">${bullets}</ul>
    <div class="pill-row">${stack}</div>
    <div class="lang-row">
      <span class="lang-dot" style="background:${p.langColor}"></span>
      ${escapeHtml(p.lang)}
    </div>
    <div class="window-actions">
      <a href="${p.repoUrl}" target="_blank" rel="noopener" class="btn btn-primary">view code →</a>
    </div>
  `;
}
function statusLabel(status) {
    switch (status) {
        case "shipped":
            return "● shipped";
        case "deployed":
            return "● live";
        case "competition":
            return "● submitted";
    }
}
function aboutWindowBody() {
    return `
    <div class="about-grid">
      <div class="about-avatar" aria-hidden="true">👩‍💻</div>
      <div>
        <div class="proj-name">${escapeHtml(profile.name)}</div>
        <div class="proj-tagline">${escapeHtml(profile.role)}</div>
        <p class="about-line">${escapeHtml(profile.institution)} · CGPA ${escapeHtml(profile.cgpa)}</p>
      </div>
    </div>
    <p class="about-blurb">
      Builds real, working things — collaborative apps, full-stack systems, ML pipelines —
      and ships them. Currently collecting GitHub commits like Pokémon cards.
    </p>
    <div class="window-actions">
      <a href="mailto:${profile.email}" class="btn btn-ghost">✉ email</a>
      <a href="${profile.linkedin}" target="_blank" rel="noopener" class="btn btn-ghost">in linkedin</a>
      <a href="${profile.github}" target="_blank" rel="noopener" class="btn btn-primary">github →</a>
    </div>
  `;
}
function skillsWindowBody() {
    const groups = skillGroups
        .map((g) => `
      <div class="skill-group">
        <div class="skill-group-label">${escapeHtml(g.label)}</div>
        <div class="sticker-row">
          ${g.items.map((item) => `<span class="sticker">${escapeHtml(item)}</span>`).join("")}
        </div>
      </div>`)
        .join("");
    return `<div class="skills-wrap">${groups}</div>`;
}
function ossWindowBody() {
    const bullets = oss.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("");
    return `
    <div class="proj-head">
      <div class="proj-icon-big">🌱</div>
      <div>
        <div class="proj-name">${escapeHtml(oss.org)}</div>
        <div class="proj-tagline">${escapeHtml(oss.project)} · ${escapeHtml(oss.year)}</div>
      </div>
    </div>
    <ul class="proj-bullets">${bullets}</ul>

    <div class="dsa-block">
      <div class="skill-group-label">DSA &amp; Competitive Programming</div>
      <div class="metric-row">
        <div class="metric-chip"><span class="metric-value">${escapeHtml(dsaStats.solved)}</span><span class="metric-label">problems solved</span></div>
      </div>
      <p class="about-line">${escapeHtml(dsaStats.plan)} · ${escapeHtml(dsaStats.extra)}</p>
      <div class="window-actions">
        <a href="${dsaStats.repoUrl}" target="_blank" rel="noopener" class="btn btn-primary">leetcode repo →</a>
      </div>
    </div>

    <div class="dsa-block">
      <div class="skill-group-label">Achievements</div>
      <ul class="proj-bullets">${achievements.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>
      <div class="skill-group-label" style="margin-top:14px;">Leadership &amp; Activities</div>
      <ul class="proj-bullets">${activities.map((a) => `<li>${escapeHtml(a)}</li>`).join("")}</ul>
    </div>
  `;
}
function contactWindowBody() {
    return `
    <p class="about-blurb">Got a project, a hackathon team slot, or just want to talk DSA patterns?</p>
    <div class="contact-list">
      <a class="contact-row" href="mailto:${profile.email}"><span>✉</span>${escapeHtml(profile.email)}</a>
      <a class="contact-row" href="tel:${profile.phone.replace(/\s/g, "")}"><span>☎</span>${escapeHtml(profile.phone)}</a>
      <a class="contact-row" href="${profile.github}" target="_blank" rel="noopener"><span>🐙</span>github.com/lowkeyprisha</a>
      <a class="contact-row" href="${profile.linkedin}" target="_blank" rel="noopener"><span>in</span>linkedin.com/in/prisha-raj</a>
    </div>
  `;
}
function escapeHtml(s) {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
}
// ---------- Wiring up the desktop ----------
function initDesktop() {
    const clock = document.getElementById("clock");
    if (clock) {
        const tick = () => {
            const now = new Date();
            clock.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        };
        tick();
        setInterval(tick, 1000 * 30);
    }
    // Project icons
    document.querySelectorAll("[data-icon-project]").forEach((iconEl) => {
        const id = iconEl.dataset.iconProject;
        const project = projects.find((p) => p.id === id);
        if (!project)
            return;
        makeIconDraggable(iconEl, () => {
            wm.open({ id: project.id, title: project.name, icon: project.icon, accent: project.accent, width: 420 }, projectWindowBody(project));
        });
    });
    // Static icons (about, skills, oss, contact)
    const staticOpeners = {
        about: () => wm.open({ id: "about", title: "about-me.txt", icon: "🙋‍♀️", accent: "#FF6B6B", width: 380 }, aboutWindowBody()),
        skills: () => wm.open({ id: "skills", title: "skills.json", icon: "🧩", accent: "#4ECDC4", width: 440 }, skillsWindowBody()),
        oss: () => wm.open({ id: "oss", title: "open-source.log", icon: "🌱", accent: "#FFE66D", width: 440 }, ossWindowBody()),
        contact: () => wm.open({ id: "contact", title: "contact.app", icon: "📮", accent: "#FF6B6B", width: 380 }, contactWindowBody()),
    };
    document.querySelectorAll("[data-icon-static]").forEach((iconEl) => {
        const key = iconEl.dataset.iconStatic;
        const opener = staticOpeners[key];
        if (!opener)
            return;
        makeIconDraggable(iconEl, opener);
    });
    // Dock shortcuts (same openers, no drag needed)
    document.querySelectorAll("[data-dock]").forEach((dockEl) => {
        dockEl.addEventListener("click", () => {
            const key = dockEl.dataset.dock;
            if (key in staticOpeners) {
                staticOpeners[key]?.();
            }
            else {
                const project = projects.find((p) => p.id === key);
                if (project) {
                    wm.open({ id: project.id, title: project.name, icon: project.icon, accent: project.accent, width: 420 }, projectWindowBody(project));
                }
            }
        });
    });
    // Easter egg: click the desktop background wallpaper logo for confetti.
    const badge = document.getElementById("wallpaper-badge");
    badge?.addEventListener("click", (e) => {
        burstConfetti(e.clientX, e.clientY);
        badge.classList.remove("badge-pulse");
        void badge.offsetWidth;
        badge.classList.add("badge-pulse");
    });
    // Open "about" by default so the desktop doesn't feel empty on first load.
    setTimeout(() => staticOpeners.about?.(), 240);
}
document.addEventListener("DOMContentLoaded", () => {
    runBootSequence(initDesktop);
});