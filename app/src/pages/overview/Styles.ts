import styled from "styled-components";
import { mediaSizes } from "../../common/Theme";

export const OverviewWrapper = styled.div`

  padding: ${(props) => props.theme.spacing.medium};

  @media ${mediaSizes.portableQuery} {
    width: 90vw;
    max-width: 90vw;
    min-width: 90vw;
  }
`;


export const OracleValueWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${(props) => props.theme.spacing.medium};
    padding: ${(props) => props.theme.spacing.small};
    justify-items: center;
    @media ${mediaSizes.portableQuery} {
        grid-template-columns: 1fr;
    }
`;