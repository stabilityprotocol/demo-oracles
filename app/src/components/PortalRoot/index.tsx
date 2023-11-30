import { Outlet, useNavigate } from "react-router-dom";
import {
  NavigationToggleWrapper,
  OutletWrapper,
  PortalRootWrapper,
} from "./Styles";
import { Footer } from "../Footer";
import { Header } from "../Header";
import { HeaderMobile } from "../HeaderMobile";
import { usePortableDevice } from "../../common/hooks/usePortableDevice";
import { Toggle } from "../Toggle";
import { useCallback } from "react";

const toggleOptions = ["Overview", "Historical"] as const;

export const PortalRoot = () => {
  const { isPortable } = usePortableDevice();
  const navigate = useNavigate();

  const onChangeTab = useCallback(
    (option: React.ReactNode) => {
      const opt = option as (typeof toggleOptions)[number];
      navigate(opt === "Overview" ? "/overview" : "/historical");
    },
    [navigate]
  );

  return (
    <PortalRootWrapper>
      {isPortable ? (
        <HeaderMobile whiteBg>
          <Header />
        </HeaderMobile>
      ) : (
        <Header />
      )}
      <OutletWrapper>
        <NavigationToggleWrapper>
          <Toggle options={toggleOptions} onSelection={onChangeTab} />
        </NavigationToggleWrapper>
        <Outlet />
      </OutletWrapper>
      {!isPortable && <Footer />}
    </PortalRootWrapper>
  );
};
