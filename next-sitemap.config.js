/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://skibidefense.com',
  generateRobotsTxt: false,
  generateIndexSitemap: false,
  outDir: './public',
};
