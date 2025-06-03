// <reference types="Cypress" />

describe('Navigation', { testIsolation: true }, function () {
	const appClass = '.' + Cypress.env( 'appId' );

	beforeEach( () => {
		cy.wpLogin();
		cy.visit( `/wp-admin/admin.php?page=${ Cypress.env( 'pluginId' ) }#/home` );
	});

	it('Logo Links to home', () => {
		cy.get( appClass + '-logo-wrap a' ).click();
		cy.wait(500);
		cy.hash().should('eq', '#/home');
	});

	// test main nav
	it( 'Admin submenu exists', () => {
		cy.visit( '/wp-admin/index.php' );
		cy.get( '#adminmenu #toplevel_page_crazy-domains ul.wp-submenu' ).should(
			'exist'
		);
		cy.get(
			'#adminmenu #toplevel_page_crazy-domains ul.wp-submenu li a[href="admin.php?page=crazy-domains#/home"]'
		).should( 'exist' );
		cy.get(
			'#adminmenu #toplevel_page_crazy-domains ul.wp-submenu li a[href="admin.php?page=crazy-domains#/settings"]'
		).should( 'exist' );
		cy.get(
			'#adminmenu #toplevel_page_crazy-domains ul.wp-submenu li a[href="admin.php?page=crazy-domains#/help"]'
		).should( 'exist' );
	} );

	// test main nav
	it( 'Settings link properly navigates', () => {
		cy.visit( '/wp-admin/index.php' );
		cy.get(
			'#adminmenu #toplevel_page_crazy-domains ul.wp-submenu li a[href="admin.php?page=crazy-domains#/settings"]'
		).click( { force: true } );
		cy.wait( 500 );
		cy.hash().should( 'eq', '#/settings' );
	} );

});
