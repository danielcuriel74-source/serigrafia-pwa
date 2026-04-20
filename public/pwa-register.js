if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('/service-worker.js', { scope: '/' });
    } catch (_error) {
      // Registro PWA opcional
    }
  });
}
