import {
  HeaderActionsWrapper,
  HeaderLogoWrapper,
  HeaderWrapper,
} from "./Styles";
import logoBlack from "../../assets/stability-black.svg";
import { ButtonSmallNoFill } from "../Button";
import { Link } from "react-router-dom";
import { IoDocumentSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();

  return (
    <>
      <HeaderWrapper>
        <HeaderLogoWrapper>
          <Link to="/">
            <img src={logoBlack} alt="logo" />
          </Link>
        </HeaderLogoWrapper>
        <HeaderActionsWrapper>
          {/* <ButtonSmallAction>
            {t("components.header.upgrade")} <BiSolidPlaneTakeOff />
          </ButtonSmallAction> */}
          <ButtonSmallNoFill onClick={() => window.open(t("links.docs"))}>
            {t("components.header.docs")}
            <IoDocumentSharp />
          </ButtonSmallNoFill>
        </HeaderActionsWrapper>
      </HeaderWrapper>
    </>
  );
};
