import styled from "styled-components";
import { mediaSizes } from "../../../../common/Theme";

export const HistoricalTableWrapper = styled.div`
    max-width: 100%;
    overflow-x: auto;
    margin: auto;
    width: 70%;

    @media ${mediaSizes.portableQuery} {
        width: 80%;
    }
`;

export const HistoricalTableStyled = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: ${(props) => props.theme.spacing.medium};
    background: ${(props) => props.theme.colors.neutral};
    border-radius: 0.3rem;
    overflow: hidden;

    th, td {
        padding: ${(props) => props.theme.spacing.small};
        text-align: left;
        border-bottom: 1px solid ${(props) => props.theme.colors.bgBlue};
        >a{
            color: ${(props) => props.theme.colors.blueLink};
        }
    }

    tr:last-child td {
        border-bottom: none;
    }

    th {
        background: ${(props) => props.theme.colors.bgBlue};
        color: ${(props) => props.theme.colors.neutral};
    }
`;

export const HistoricalTableTBody = styled.tbody`
    font-family: ${(props) => props.theme.font.secondary};
    font-size: 0.9rem;
`;

export const TransactionLink = styled.a`
    color: ${(props) => props.theme.colors.blueLink};
    text-decoration: none;
`;


export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;
`;

export const PaginationButton = styled.button`
    border: 1px solid ${(props) => props.theme.colors.bgBlue};
    border-radius: 0.25rem;
    padding: 0.5rem;
    background: ${(props) => props.theme.colors.bgBlue};
    color: ${(props) => props.theme.colors.neutral};
    cursor: pointer;
    min-width: 2rem;
    &:disabled {
        cursor: not-allowed;
    }
`;