import styled from "styled-components";


export const OracleValueWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: ${(props) => props.theme.spacing.small};
    background: ${(props) => props.theme.colors.neutral};
    border: 1px solid ${(props) => props.theme.colors.dark0};
    width: 25rem;
`;

export const OracleValueIcon = styled.img`
    height: 3.5rem;
    width: 3.5rem;
    margin-right: ${(props) => props.theme.spacing.small};
`;

export const OracleTitle = styled.div`
    font-size: 1.5rem;
    font-weight: 600;
    color: ${(props) => props.theme.colors.dark0};
`;

export const OracleTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;


export const OracleNumberWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const OracleNumber = styled.div`
    color: ${(props) => props.theme.colors.dark0};
`;

export const OracleNumberUnit = styled.div`
    color: ${(props) => props.theme.colors.dark0};
    margin-left: ${(props) => props.theme.spacing.small};
`;

export const OracleLinkToBlock = styled.a`
    font-size: 0.7rem;
    font-weight: 600;
    margin-left: ${(props) => props.theme.spacing.small};
    text-decoration: none;
    color: ${(props) => props.theme.colors.dark0};
`;


export const OracleValueUnitWrapper = styled.div`
    font-size: 1.3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
`