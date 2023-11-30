import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import { useEffect, useState } from 'react';
import { HistoricalTableStyled, HistoricalTableWrapper } from './Styles';
import { OracleTransaction, oracleTransactionsAtom } from '../../../../common/State/OracleTransactions';
import { useRecoilState } from 'recoil';




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
            return value.length > 10 ? value.substring(0, 10) + "..." : value;
        }
    }),
    columnHelper.accessor("oracleKey", {
        cell: info => getOracleTitle(info.getValue()),
    }),
    columnHelper.accessor("value", {
        cell: info => {
            const value = parseFloat(info.getValue());
            return value.toFixed(2);
        },
    }),
    columnHelper.accessor("blockNumber", {
        cell: info => info.getValue(),
    }),
    columnHelper.accessor("timestamp", {
        cell: info => {
            const timestamp = info.getValue();
            const date = new Date(timestamp);
            return date.toLocaleString(navigator.language);
        }
    }),
]

export const HistoricalTable = () => {
    const [data] = useRecoilState<OracleTransaction[]>(oracleTransactionsAtom);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
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
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </HistoricalTableStyled>
            </HistoricalTableWrapper>
        </>
    )

}