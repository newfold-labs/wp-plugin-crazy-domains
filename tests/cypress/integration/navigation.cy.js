// <reference types="Cypress" />

describe('Navigation', { testIsolation: true }, function () {
	const appClass = '.' + Cypress.env( 'appId' );

	beforeEach( () => {
		cy.wpLogin();
		cy.exec( 'npx wp-env run cli wp transient delete newfold_marketplace' );
		cy.visit( `/wp-admin/admin.php?page=${ Cypress.env( 'pluginId' ) }#/home` );
	});

	it( "Admin submenu shouldn't exist inside app", () => {
		cy.get( `#adminmenu #toplevel_page_${ Cypress.env( 'pluginId' ) } ul.wp-submenu` ).should(
			'not.exist'
		);
	} );

	it('Logo Links to home', () => {
		cy.get('.' + appId + '-logo-wrap').click();
		cy.wait(500);
		cy.hash().should('eq', '#/home');
	});

	// test main nav
	it('Main nav links properly navigates', () => {
		cy
			.get('.' + appId + '-app-navitem-Marketplace').
			should('not.have.class', 'active');
		cy.get('.' + appId + '-app-navitem-Marketplace').click();
		cy.wait(500);
		cy.hash().should('eq', '#/marketplace');
		cy
			.get('.' + appId + '-app-navitem-Marketplace')
			.should('have.class', 'active');

		cy.get('.' + appId + '-app-navitem-Performance').click();
		cy.wait(500);
		cy.hash().should('eq', '#/performance');
		cy
			.get('.' + appId + '-app-navitem-Performance')
			.should('have.class', 'active');
		cy
			.get('.' + appId + '-app-navitem-Marketplace')
			.should('not.have.class', 'active');

		cy.get('.' + appId + '-app-navitem-Settings').click();
		cy.wait(500);
		cy.hash().should('eq', '#/settings');
	});
	
	it('Subnav links properly navigates', () => {
		cy
			.get('.' + appId + '-app-navitem-Marketplace')
			.scrollIntoView()
			.should('not.have.class', 'active');
		cy.get('.' + appId + '-app-navitem-Marketplace').click();

		cy.wait(500);
		cy.hash().should('eq', '#/marketplace');
		cy
			.get('.' + appId + '-app-navitem-Marketplace')
			.should('have.class', 'active');

			cy.get('.' + appId + '-app-subnavitem-Services').click();
			cy.wait(500);
			cy.hash().should('eq', '#/marketplace/services');
			cy
				.get('.' + appId + '-app-subnavitem-Services')
				.should('have.class', 'active');
			cy
				.get('.' + appId + '-app-navitem-Marketplace')
				.should('have.class', 'active');
		

		cy.get('.' + appId + '-app-subnavitem-SEO').click();
		cy.wait(500);
		cy.hash().should('eq', '#/marketplace/seo');
		cy
			.get('.' + appId + '-app-subnavitem-SEO')
			.should('have.class', 'active');
		cy
			.get('.' + appId + '-app-subnavitem-Services')
			.should('not.have.class', 'active');
		cy
			.get('.' + appId + '-app-navitem-Marketplace')
			.should('have.class', 'active');
			
		cy.get('.' + appId + '-app-navitem-Performance').click();
			cy.wait(500);
		cy
			.get('.' + appId + '-app-subnavitem-Services')
			.should('not.have.class', 'active');
		cy
			.get('.' + appId + '-app-subnavitem-SEO')
			.should('not.have.class', 'active');
		cy
			.get('.' + appId + '-app-navitem-Marketplace')
			.should('not.have.class', 'active');
	});

	it( 'Mobile nav links dispaly and link properly on mobile', () => {
		cy.get( '#nfd-app-mobile-nav' ).should( 'not.exist' );
		cy.viewport( 'iphone-x' );
		cy.get( '#nfd-app-mobile-nav' ).should( 'be.visible' );

		cy.get( appClass + '-app-navitem-Home' ).should( 'not.exist' );

		cy.get( '#nfd-app-mobile-nav' ).click();
		cy.wait( 500 );
		cy.get( appClass + '-app-navitem-Home' ).should( 'be.visible' );
		cy.get( 'button.nfd-modal__close-button' ).should( 'be.visible' );
		cy.get( 'button.nfd-modal__close-button' ).click();
		cy.get( appClass + '-app-navitem-Home' ).should( 'not.exist' );
	});
});
