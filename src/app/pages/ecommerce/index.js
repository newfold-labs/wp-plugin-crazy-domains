import { Page } from "@newfold/ui-component-library";
import { NewfoldECommerce } from "@newfold-labs/wp-module-ecommerce";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useNotification } from "../../components/notifications/feed";
import AppStore from "../../data/store";
import { useContext } from "@wordpress/element";
import { crazydomainsSettingsApiFetch } from "../../util/helpers";
import "@newfold-labs/wp-module-ecommerce/crazydomain.css";

const EcomerceStore = () => {
    const {store, setStore} = useContext(AppStore)
    const location  = useLocation();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const notify = useNotification();

    const wpModules = {
        navigate,
        notify
    }

    const state = {
        wp: {comingSoon: store?.comingSoon},
        location: location.pathname,
        params
    }

    const actions = {
        toggleComingSoon : () => crazydomainsSettingsApiFetch(
            { comingSoon: !store.comingSoon },
            console.error,
            (response) => setStore({...store, comingSoon: !store.comingSoon})
        )
    }
    return (
        <Page>
            <NewfoldECommerce actions={actions} state={state} wpModules={wpModules} />
        </Page>
    )
}

export default EcomerceStore;
