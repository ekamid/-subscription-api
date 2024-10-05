module.exports = {
    apps: [
        {
            name: "subscription-api",
            script: "dist/index.js",
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: "1G",
        }
    ]
};
