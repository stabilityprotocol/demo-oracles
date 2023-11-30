import styled from "styled-components";

export const HistoricalTableWrapper = styled.div`
    max-width: 100%;
    overflow-x: auto;
    width: 60%;

    
`;

export const HistoricalTableStyled = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid ${(props) => props.theme.colors.dark0};
    margin-top: ${(props) => props.theme.spacing.medium};
    background: ${(props) => props.theme.colors.neutral};
`;

