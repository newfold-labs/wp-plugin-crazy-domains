import { OnboardingScreen } from "@newfold-labs/wp-module-ecommerce";
import { useUpdateEffect } from 'react-use';

import { useNotification } from "../../components/notifications";
import AppStore from "../../data/store";
import { useContext } from "@wordpress/element";
import { crazydomainsSettingsApiFetch } from "../../util/helpers";
import { comingSoonAdminbarToggle } from "../../util/helpers";

const WelcomeSection = () => {
    const {store, setStore} = useContext(AppStore)
    const notify= useNotification();
    const toggleComingSoon = () => 
        crazydomainsSettingsApiFetch(
            { comingSoon: !store.comingSoon },
            console.error,
            () => setStore({ ...store, comingSoon: !store.comingSoon })
    );

    useUpdateEffect( () => {
		comingSoonAdminbarToggle( store.comingSoon );
	}, [ store.comingSoon ] );

    return (
        <OnboardingScreen
            comingSoon={store.comingSoon}
            toggleComingSoon={toggleComingSoon}
            notify={notify}
            showShadowBox={false} 
        />
    );
}

export default WelcomeSection;
