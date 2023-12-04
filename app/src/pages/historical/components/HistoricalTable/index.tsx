import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel
  } from '@tanstack/react-table'
import { HistoricalTableStyled, HistoricalTableTBody, HistoricalTableWrapper, PaginationButton, PaginationWrapper, TransactionLink } from './Styles';
import { OracleTransaction, oracleTransactionsAtom } from '../../../../common/State/OracleTransactions';
import { useRecoilState } from 'recoil';
import { stbleTestnet } from '../../../../common/Blockchain';
import { shortAddress } from '../../../../common/ETH';
import { useTranslation } from 'react-i18next';







export const HistoricalTable = () => {
    const [data] = useRecoilState<OracleTransaction[]>(oracleTransactionsAtom);

    const { t } = useTranslation();

    const columnHelper = createColumnHelper<OracleTransaction>()
    const columns = [
        columnHelper.accessor("hash", {
            cell: info => {
                const value = info.getValue();
                const displayValue = shortAddress(value);
                const url = `${stbleTestnet.blockExplorers?.default.url}tx/${value}`
                return <TransactionLink href={url} target="_blank">{displayValue}</TransactionLink>;
            },
            header: _ => t("pages.historical.table.transactionHash"),
        }),
        columnHelper.accessor("oracleKey", {
            cell: info => getOracleTitle(info.getValue()),
            header: _ => t("pages.historical.table.oracle"),
        }),
        columnHelper.accessor("value", {
            cell: info => {
                const value = parseFloat(info.getValue());
                return value.toFixed(2);
            },
            header: _ => t("pages.historical.table.value"),
        }),
        columnHelper.accessor("blockNumber", {
            cell: info => info.getValue(),
            header: _ => t("pages.historical.table.blockNumber"),
        }),
        columnHelper.accessor("timestamp", {
            cell: info => {
                const timestamp = info.getValue();
                const date = new Date(timestamp);
                return date.toLocaleString(navigator.language);
            },
            header: _ => t("pages.historical.table.date"),
        }),
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })


    const getOracleTitle = (oracleKey: string) => {
        switch (oracleKey) {
            case "BTC/USD":
                return t("oracles.BTC/USD")
            case "ETH/USD":
                return t("oracles.ETH/USD");
            case "LOS_ANGELES":
                return t("oracles.LOS_ANGELES");
            case "ANDORRA_LA_VELLA":
                return t("oracles.ANDORRA_LA_VELLA");
            case "MADRID":
                return t("oracles.MADRID");
            case "NEW_YORK_CITY":
                return t("oracles.NEW_YORK_CITY");
            case "TORONTO":
                return t("oracles.TORONTO");
            case "SINGAPORE":
                return t("oracles.SINGAPORE");
            case "CAD/USD":
                return t("oracles.CAD/USD");
            case "EUR/USD":
                return t("oracles.EUR/USD");
            default:
                return "";
        }
    }



    return (
        <>
            <HistoricalTableWrapper>
                <HistoricalTableStyled>
                    <thead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                              )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <HistoricalTableTBody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </HistoricalTableTBody>
                </HistoricalTableStyled>


                <PaginationWrapper>
                    <PaginationButton
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </PaginationButton>
                    <PaginationButton
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </PaginationButton>
                    <PaginationButton
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </PaginationButton>
                    <PaginationButton
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </PaginationButton>
                </PaginationWrapper>
            </HistoricalTableWrapper>
        </>
    )

}