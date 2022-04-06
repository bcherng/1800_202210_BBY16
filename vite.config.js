// vite.config.js
const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "pages/home.html"),
        leaderboard: resolve(__dirname, "pages/leaderboard.html"),
        profile: resolve(__dirname, "pages/profile.html"),
        redeem_store: resolve(__dirname, "pages/redeem_store.html"),
        search: resolve(__dirname, "pages/search.html"),
        sports: resolve(__dirname, "pages/sports.html"),
        friend: resolve(__dirname, "pages/friend.html"),
      },
    },
  },
});
