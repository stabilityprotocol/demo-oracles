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




const columnHelper = createColumnHelper<OracleTransaction>()

function getOracleTitle(oracleKey: string) {
    switch (oracleKey) {
        case "BTC/USD":
            return "BTC/USD";
        case "ETH/USD":
            return "ETH/USD";
        case "LOS_ANGELES":
            return "Los Angeles";
        case "ANDORRA_LA_VELLA":
            return "Andorra La Vella";
        case "MADRID":
            return "Madrid";
        case "NEW_YORK_CITY":
            return "NYC";
        case "TORONTO":
            return "Toronto";
        case "SINGAPORE":
            return "Singapore";
        case "CAD/USD":
            return "CAD/USD";
        case "EUR/USD":
            return "EUR/USD";

        default:
            return "";
    }
}

const columns = [
    columnHelper.accessor("hash", {
        cell: info => {
            const value = info.getValue();
            const displayValue = shortAddress(value);
            const url = `${stbleTestnet.blockExplorers?.default.url}tx/${value}`
            return <TransactionLink href={url} target="_blank">{displayValue}</TransactionLink>;
        },
        header: _ => "Transaction Hash",
    }),
    columnHelper.accessor("oracleKey", {
        cell: info => getOracleTitle(info.getValue()),
        header: _ => "Oracle",
    }),
    columnHelper.accessor("value", {
        cell: info => {
            const value = parseFloat(info.getValue());
            return value.toFixed(2);
        },
        header: _ => "Value",
    }),
    columnHelper.accessor("blockNumber", {
        cell: info => info.getValue(),
        header: _ => "Block",
    }),
    columnHelper.accessor("timestamp", {
        cell: info => {
            const timestamp = info.getValue();
            const date = new Date(timestamp);
            return date.toLocaleString(navigator.language);
        },
        header: _ => "Date",
    }),
]

export const HistoricalTable = () => {
    const [data] = useRecoilState<OracleTransaction[]>(oracleTransactionsAtom);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })



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