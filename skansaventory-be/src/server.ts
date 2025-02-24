import app from "./index";

Bun.serve({
    fetch: app.fetch,
    port: 3000,
    idleTimeout: 255,
});

console.log("🚀 Server berjalan di http://localhost:3000");
