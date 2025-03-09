export const AntiCheating = {
  init(submitQuiz) {
    this.submitQuiz = submitQuiz;
    this.enableFullScreen();
    this.preventTabSwitch();
    this.preventWindowBlur();
    this.disableRightClick();
    this.disableCopyPaste();
    this.preventDevTools();
    this.disableKeyboardShortcuts();
  },

  enableFullScreen() {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Error enabling full screen:", err);
      });
    }
  },

  exitFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error("Error exiting full screen:", err);
      });
    }
  },

  preventTabSwitch() {
    this.handleVisibilityChange = () => {
      if (document.hidden) {
        this.submitQuiz();
      }
    };
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
  },

  preventWindowBlur() {
    this.handleWindowBlur = () => {
      this.submitQuiz();
    };
    window.addEventListener("blur", this.handleWindowBlur);
  },

  disableRightClick() {
    this.handleRightClick = (event) => event.preventDefault();
    document.addEventListener("contextmenu", this.handleRightClick);
  },

  disableCopyPaste() {
    this.handleCopy = (e) => e.preventDefault();
    this.handlePaste = (e) => e.preventDefault();
    document.addEventListener("copy", this.handleCopy);
    document.addEventListener("paste", this.handlePaste);
  },

  preventDevTools() {
    this.devToolsCheck = setInterval(() => {
      const start = performance.now();
      if (performance.now() - start > 100) {
        this.submitQuiz();
      }
    }, 1000);
  },

  disableKeyboardShortcuts() {
    this.handleKeyDown = (event) => {
      const blockedKeys = ["u", "s", "h", "j", "i", "c", "x", "p"];

      if (event.ctrlKey && blockedKeys.includes(event.key.toLowerCase())) {
        event.preventDefault();
      }

      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "i") {
        event.preventDefault();
      }

      if (event.key === "F12") {
        event.preventDefault();
      }

      if (event.key === "Escape") {
        event.preventDefault();
        this.submitQuiz();
      }
    };

    document.addEventListener("keydown", this.handleKeyDown);
  },

  destroy() {
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
    window.removeEventListener("blur", this.handleWindowBlur);
    document.removeEventListener("contextmenu", this.handleRightClick);
    document.removeEventListener("copy", this.handleCopy);
    document.removeEventListener("paste", this.handlePaste);
    document.removeEventListener("keydown", this.handleKeyDown);
    clearInterval(this.devToolsCheck);
  },
};
