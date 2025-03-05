export const AntiCheating = {
  init() {
    this.preventTabSwitch();
    this.preventWindowBlur();
    this.disableRightClick();
    this.disableCopyPaste();
    this.preventDevTools();
    this.disableKeyboardShortcuts();
  },

  preventTabSwitch() {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        alert("Tab switching is not allowed! Your attempt may be invalidated.");
      }
    });
  },

  preventWindowBlur() {
    window.addEventListener("blur", () => {
      alert("You switched windows! This may affect your quiz score.");
    });
  },

  disableRightClick() {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
  },

  disableCopyPaste() {
    document.addEventListener("copy", (e) => e.preventDefault());
    document.addEventListener("paste", (e) => e.preventDefault());
  },

  preventDevTools() {
    setInterval(() => {
      const start = performance.now();
      if (performance.now() - start > 100) {
        alert("DevTools detected! Cheating attempt recorded.");
      }
    }, 1000);
  },

  disableKeyboardShortcuts() {
    document.addEventListener("keydown", (event) => {
      if (
        event.ctrlKey &&
        ["u", "s", "h", "j", "i", "c", "x", "p"].includes(
          event.key.toLowerCase()
        )
      ) {
        event.preventDefault();
        alert("Shortcut disabled for security reasons.");
      }
    });
  },
};
