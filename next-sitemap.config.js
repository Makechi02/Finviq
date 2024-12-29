/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: "https://finviq.vercel.app",
    generateRobotsTxt: true,
    exclude: ["/dashboard/*"],
    robotsTxtOptions: {
        policies: [
            {userAgent: "*", allow: "/", disallow: ["/dashboard/", "/api/", "/admin/", "/auth/"]},
        ],
        additionalSitemaps: [
            "https://finviq.vercel.app/sitemap.xml",
        ],
    },
    changefreq: "daily",
    priority: 0.7,
    sitemapSize: 7000,
    additionalPaths: async (config) => [
        {loc: "/403", changefreq: "monthly", priority: 0.3},
        {loc: "/about", changefreq: 'monthly', priority: 0.5,},
        {loc: "/accounts/forgot-password", changefreq: "monthly", priority: 0.5},
        {loc: "/accounts/login", changefreq: "monthly", priority: 0.5},
        {loc: "/info/learn-more", changefreq: "weekly", priority: 0.6},
    ],
    transform: async (config, path) => {
        if (path === "/") {
            return {
                loc: path,
                changefreq: "daily",
                priority: 1.0,
                lastmod: new Date().toISOString(),
            };
        }
        return {
            loc: path,
            changefreq: "daily",
            priority: 0.7,
            lastmod: new Date().toISOString(),
        };
    },
};

module.exports = config;
