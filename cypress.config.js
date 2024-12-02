const {defineConfig} = require('cypress')
const {phpVersion, core} = require('./.wp-env.json')
const wpVersion = /[^/]*$/.exec(core)[0]

module.exports = defineConfig({
    projectId: "bqvwhq",
    env: {
        wpUsername: 'admin',
        wpPassword: 'password',
        wpVersion,
        phpVersion,
        pluginId: 'crazy-domains',
        appId: 'wppcd',
        pluginSlug: 'wp-plugin-crazy-domains',
    },
    downloadsFolder: 'tests/cypress/downloads',
    fixturesFolder: 'tests/cypress/fixtures',
    screenshotsFolder: 'tests/cypress/screenshots',
    video: true,
    videosFolder: 'tests/cypress/videos',
    chromeWebSecurity: false,
    viewportWidth: 1024,
    viewportHeight: 768,
    blockHosts: [
        '*doubleclick.net',
        '*jnn-pa.googleapis.com',
        '*youtube.com',
    ],
    e2e: {
        setupNodeEvents(on, config) {

            const semver = require('semver');

            // Ensure that the base URL is always properly set.
            if (config.env && config.env.baseUrl) {
                config.baseUrl = config.env.baseUrl;
            }

            // Ensure that we have a semantically correct WordPress version number for comparisons.
            if (config.env.wpVersion) {
                if (config.env.wpVersion.split('.').length !== 3) {
                    config.env.wpSemverVersion = `${config.env.wpVersion}.0`;
                } else {
                    config.env.wpSemverVersion = config.env.wpVersion;
                }
            }

            if (config.env.phpVersion) {
                if (config.env.phpVersion.split('.').length !== 3) {
                    config.env.phpSemverVersion = `${config.env.phpVersion}.0`;
                } else {
                    config.env.phpSemverVersion = config.env.phpVersion;
                }
            }

            // Exclude tests for WordPress lower than 6.5 (6.4 or 6.3) or PHP lower than 7.4 (7.1, 7.2 and 7.3)
            //  Since WooCommerce is unsupported, activation/deactivation/installation is going to fail
			if (
				semver.satisfies( config.env.wpSemverVersion, '<6.5.0' ) ||
				semver.satisfies( config.env.phpSemverVersion, '<7.4.0' )
			) {
				config.excludeSpecPattern = config.excludeSpecPattern.concat( [
					'vendor/newfold-labs/wp-module-ecommerce/tests/cypress/integration/Site-Capabilities/**',
					'vendor/newfold-labs/wp-module-ecommerce/tests/cypress/integration/Home/homePageWithWoo.cy.js',
					'vendor/newfold-labs/wp-module-ecommerce/tests/cypress/integration/Home/ecommerce-next-steps.cy.js', // Skip this since Onboarding does not support this version
					'vendor/newfold-labs/wp-module-onboarding/tests/cypress/integration/**', // Onboarding requires WP 6.5 or greater, as it uses the Wonder Theme which has the same requirement
					'vendor/newfold-labs/wp-module-coming-soon/cypress/integration/coming-soon-woo.cy.js', // woo is required and is not supported in older WP or PHP
                    'vendor/newfold-labs/wp-module-ecommerce/tests/cypress/integration/Store/**',
				] );
			}

            on('task', {
                log(message) {
                    console.log(message)

                    return null
                },
                table(message) {
                    console.table(message)

                    return null
                }
            })

            return config;
        },
        baseUrl: 'http://localhost:8884',
        specPattern: [
            'tests/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
            'vendor/newfold-labs/**/tests/cypress/integration/**/*.cy.{js,jsx,ts,tsx}',
        ],
        excludeSpecPattern: [
            "vendor/newfold-labs/wp-module-onboarding/tests/cypress/integration/wp-module-support/",
            'vendor/newfold-labs/wp-module-onboarding/tests/cypress/integration/5-AI-SiteGen-onboarding-flow/*.cy.js', // skip all ai onboarding tests
        ],
        supportFile: 'tests/cypress/support/index.js',
        testIsolation: false,
        experimentalRunAllSpecs: true,
    },
    retries: 1,
    experimentalMemoryManagement: true,
})
