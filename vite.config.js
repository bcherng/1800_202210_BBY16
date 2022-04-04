// vite.config.js
const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "home.html"),
        leaderboard: resolve(__dirname, "leaderboard.html"),
        profile: resolve(__dirname, "profile.html"),
        ["redeem-store"]: resolve(__dirname, "redeem-store.html"),
        search: resolve(__dirname, "search.html"),
        sports: resolve(__dirname, "sports.html"),
        friend: resolve(__dirname, "friend.html"),
      },
    },
  },
});
