// <reference types="Cypress" />

describe('Help Page', function () {
	const appId = Cypress.env( 'appId' );
	const pluginId = Cypress.env( 'pluginId' );

	before(() => {
		cy.visit('/wp-admin/admin.php?page=' + pluginId + '#/help');
	});
	
	it('Is Accessible', () => {
		cy.injectAxe();
		cy.wait(1000);
		cy.a11y('.' + appId + '-app-body');
	});

	it('Email Card Exists', () => {
		cy.get('.card-help-ticket').contains('h3', 'Email')
			.scrollIntoView()
			.should('be.visible');
	});

	it('Phone Card Exists', () => {
		cy.get('.card-help-phone').contains('h3', 'Phone')
			.scrollIntoView()
			.should('be.visible');
	});

	it('Chat Card Exists', () => {
		cy.get('.card-help-chat').contains('h3', 'Chat')
			.scrollIntoView()
			.should('be.visible');
	});

	it('Tweet Card Exists', () => {
		cy.get('.card-help-twitter').contains('h3', 'Tweet')
			.scrollIntoView()
			.should('be.visible');
	});

	it('Online Card Exists', () => {
		cy.get('.card-help-help').contains('h3', 'Online')
			.scrollIntoView()
			.should('be.visible');
	});

	it('Academy Card Exists', () => {
		cy.get('.card-help-academy').contains('h3', 'Academy')
			.scrollIntoView()
			.should('be.visible');
	});

	it('Blog Card Exists', () => {
		cy.get('.card-help-blog').contains('h3', 'Blog')
			.scrollIntoView()
			.should('be.visible');
	});

	it('Youtube Card Exists', () => {
		cy.get('.card-help-video').contains('h3', 'Video')
			.scrollIntoView()
			.should('be.visible');
	});

});
