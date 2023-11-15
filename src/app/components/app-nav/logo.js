import { Button } from '@wordpress/components';
import { Heading } from '..';
import { ReactComponent as Brand } from '../../../../assets/svg/crazydomains-logo.svg';
import { delay } from 'lodash';

const Mark = () => {
	const defocus = () => {
		const button = document.querySelector( '.logo-mark' );
		delay( () => {
			if ( null !== button ) {
				button.blur();
			}
		}, 500 );
	};
	return (
		<Button
			icon={ <Brand className="wppcd-logo" /> }
			style={ { width: '190px', height: 'auto' } }
			onMouseUp={ defocus }
			className="logo-mark nfd-p-0"
			href="#/home"
		/>
	);
};

const Logo = () => {
	return (
		<div className="wppcd-logo-wrap">
			<Mark />
			<Heading level="2" className="screen-reader-text">
				{ __( 'Crazy Domains WordPress Plugin', 'wp-plugin-crazy-domains' ) }
			</Heading>
		</div>
	);
};

export default Logo;
