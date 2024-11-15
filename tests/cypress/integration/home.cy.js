// <reference types="Cypress" />

describe('Home Page', { testIsolation: true }, function () {
	const appClass = '.' + Cypress.env( 'appId' );

	beforeEach(() => {
		cy.wpLogin();
		cy.visit( `/wp-admin/admin.php?page=${ Cypress.env( 'pluginId' ) }#/home` );
	});

	it('Site Info Exists', () => {
		cy.window().then((win) => {
			const siteTitle = win.NewfoldRuntime.siteTitle;
			cy.get( appClass + '-app-site-info').contains('h3', siteTitle)
			.scrollIntoView()
			.should('be.visible');
		})
	});

	it('Is Accessible', () => {
		cy.injectAxe();
		cy.wait(500);
		cy.checkA11y( appClass + '-app-body');
	});

	it('All Sections Exist', () => {
		cy
			.get( appClass + '-app-home-coming-soon').contains('h3', 'Site Status')
			.scrollIntoView()
			.should('be.visible');

		cy
			.get( appClass + '-app-home-content').contains('h3', 'Website Content')
			.scrollIntoView()
			.should('be.visible');

		cy
			.get( appClass + '-app-home-settings').contains('h3', 'Settings and Performance')
			.scrollIntoView()
			.should('be.visible');

		cy
			.get( appClass + '-app-home-hosting').contains('h3', 'Web Hosting')
			.scrollIntoView()
			.should('be.visible');
	});
});
