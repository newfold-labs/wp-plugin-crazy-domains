import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { Page } from '@newfold/ui-component-library';
import { NewfoldRuntime } from "@newfold/wp-module-runtime";
// component sourced from marketplace module
import { default as NewfoldMarketplace } from '@modules/wp-module-marketplace/components/';

const MarketplacePage = () => {
	
    // constants to pass to module
	const moduleConstants = {
		supportsCTB: false,
		text: {
			title: __('Marketplace', 'wp-plugin-crazy-domains'),
			subTitle: __('Explore our featured collection of tools and services.', 'wp-plugin-crazy-domains'),
			error: __('Oops, there was an error loading the marketplace, please try again later.', 'wp-plugin-crazy-domains'),
			noProducts: __('Sorry, no marketplace items. Please, try again later.', 'wp-plugin-crazy-domains'),
			loadMore: __('Load More', 'wp-plugin-crazy-domains'),
			productPage: {
				error: {
					title: __(
						'Oops! Something Went Wrong',
						'wp-plugin-crazy-domains'
					),
					description: __(
						'An error occurred while loading the content. Please try again later.',
						'wp-plugin-crazy-domains'
					),
				},
			},
		}
	};
    // methods to pass to module
    const moduleMethods = {
        apiFetch,
        classNames,
        useState,
        useEffect,
        useLocation,
		useMatch,
		useNavigate,
        NewfoldRuntime,
    };

	return (
        <Page className={"wppcd-app-marketplace-page"}>
			<NewfoldMarketplace 
				methods={moduleMethods}
				constants={moduleConstants}
			/>
		</Page>
	);
};

export default MarketplacePage;
