// <reference types="Cypress" />

describe('Home Page', { testIsolation: true }, function () {
	const appClass = '.' + Cypress.env( 'appId' );

	beforeEach(() => {
		cy.wpLogin();
		cy.visit( `/wp-admin/admin.php?page=${ Cypress.env( 'pluginId' ) }#/home` );
	});

	it('Is Accessible and All Sections Exist', () => {
		cy.injectAxe();
		cy.get( appClass + '-app-home-page', { timeout: 2000 } ).should( 'exist' );
		cy.a11y( appClass + '-app-body');

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
