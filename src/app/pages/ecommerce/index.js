import { Modal } from "@wordpress/components";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useNavigate, useParams } from "react-router-dom";
import AppStore, { selectors } from "../../data/store";
import {
  comingSoonAdminbarToggle,
  crazydomainsSettingsApiFetch,
  dispatchUpdateSnackbar,
} from "../../util/helpers";

import "@newfold-labs/wp-module-ecommerce";
import "@newfold-labs/wp-module-ecommerce/crazydomain.css";
import "@newfold-labs/wp-module-ecommerce/styles.scss";
import "./styles.scss";

const NewfoldECommerce = window.NewfoldECommerce;

function EcommercePage() {
  const { store, setStore } = useContext(AppStore);
  const navigate = useNavigate();
  let { section } = useParams();
  const eCommerceState = {
    wp: {
      comingSoon: store.comingSoon,
      capabilities: selectors.getEcommerceCapabilities(store),
    },
  };
  const eCommerceActions = {
    toggleComingSoon: async () =>
      crazydomainsSettingsApiFetch(
        { comingSoon: !store.comingSoon },
        () => {}, // Stubbed error flow for now
        (response) => {
          setStore({ ...store, comingSoon: response.comingSoon });
          dispatchUpdateSnackbar(
            response.comingSoon
              ? __("Coming soon activated.", "wp-plugin-crazy-domains")
              : __("Coming soon deactivated.", "wp-plugin-crazy-domains")
          );
          comingSoonAdminbarToggle();
        }
      ),
  };
  const wpModules = {
    Modal,
    navigate,
  };
  return (
    <div className="wppcd-section ecommerce-template-common">
      <NewfoldECommerce
        state={eCommerceState}
        actions={eCommerceActions}
        wpModules={wpModules}
        section={section}
      />
    </div>
  );
}

export default EcommercePage;
