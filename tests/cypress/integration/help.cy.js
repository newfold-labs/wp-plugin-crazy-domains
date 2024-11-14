// <reference types="Cypress" />

describe('Help Page', { testIsolation: true }, () => {
	const appClass = '.' + Cypress.env( 'appId' );

	beforeEach(() => {
		cy.wpLogin();
		cy.visit( `/wp-admin/admin.php?page=${ Cypress.env( 'pluginId' ) }#/help` );
	});
	
	it('Is Accessible', () => {
		cy.injectAxe();
		cy.wait(1000);
		cy.a11y( appClass + '-app-body');
	});

	it('Each Card Exists', () => {
		cy.get('.card-help-ticket').contains('h3', 'Email')
			.scrollIntoView()
			.should('be.visible');
	
		cy.get('.card-help-phone').contains('h3', 'Phone')
			.scrollIntoView()
			.should('be.visible');
	
		cy.get('.card-help-chat').contains('h3', 'Chat')
			.scrollIntoView()
			.should('be.visible');
	
		cy.get('.card-help-twitter').contains('h3', 'Tweet')
			.scrollIntoView()
			.should('be.visible');
	
		cy.get('.card-help-help').contains('h3', 'Online')
			.scrollIntoView()
			.should('be.visible');
	
		cy.get('.card-help-academy').contains('h3', 'Academy')
			.scrollIntoView()
			.should('be.visible');
	
		cy.get('.card-help-blog').contains('h3', 'Blog')
			.scrollIntoView()
			.should('be.visible');
	
		cy.get('.card-help-video').contains('h3', 'Video')
			.scrollIntoView()
			.should('be.visible');
	});

});
