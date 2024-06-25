import { createContext, useMemo } from '@wordpress/element';

import apiFetch from '@wordpress/api-fetch';

const DEFAULT = {
	store: {},
	setStore: () => {},
};

const AppStore = createContext( DEFAULT );

export const crazydomainsApiFetchSettings = async ( options = {} ) => {
	return await apiFetch( {
		url: window.WPPCD.resturl + '/crazy-domains/v1/settings',
		...options,
	} );
};

export const reformStore = ( store, endpoint, response ) => {
	return {
		...store,
		[ _camelCase( endpoint ) ]: response,
	};
};

export const selectors = {
	getEcommerceCapabilities(store) {
		let capabilities = new Set();
		if (store.isWooActive) {
			capabilities.add('standard');
			capabilities.add('experience');
		} else {
			capabilities.add('upgrade');
		}
		return capabilities;
	},
};

export const AppStoreProvider = ( { children } ) => {
	const [ booted, setBooted ] = useState( false );
	const [ hasError, setError ] = useState( false );
	const [ store, setStore ] = useState( {} );

	const contextStore = useMemo(
		() => ( { store, setStore, booted, setBooted, hasError, setError } ),
		[ store, booted, hasError ]
	);

	useEffect( () => {
		if ( false === booted ) {
			crazydomainsApiFetchSettings()
				.then( ( settings ) => {
					setStore( { 
						...store,
						...window.WPPCD,
						...settings,
						features: window.NewfoldFeatures.features,
						toggleableFeatures: window.NewfoldFeatures.togglable,
					} );
					window.WPPCD.migrated = true;
					setBooted( true );
				} )
				.catch( ( error ) => {
					setError( error );
				} );
		}
	}, [] );

	return (
		<AppStore.Provider value={ contextStore }>
			{ ' ' }
			{ children }{ ' ' }
		</AppStore.Provider>
	);
};

export default AppStore;
