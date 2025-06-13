import React, { useEffect, useState } from "react";
import "./kpi1.css";
import "@carbon/styles/css/styles.css";
import {
  Theme,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";

// Define fields to exclude from table
const excludedFields = ["_id", "_rev", "KPI Name", "id"];

function KPI1() {
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/salesforce-data")
      .then((res) => res.json())
      .then((data) => {
        if (!data || data.length === 0) return;

        // Extract dynamic headers from first object
        const dynamicHeaders = Object.keys(data[0])
          .filter((key) => !excludedFields.includes(key))
          .map((key) => ({
            key: key.toLowerCase().replace(/\s+/g, "_"), // normalize
            header: key,
          }));

        // Format row data based on dynamic headers
        const formattedRows = data.map((item, index) => {
          const formatted = {
            id: item._id || item.id || index.toString(),
            serial: (index + 1).toString(),
          };
          dynamicHeaders.forEach((h) => {
            formatted[h.key] = item[h.header] || "-";
          });
          return formatted;
        });

        setHeaders([{ key: "serial", header: "S. No" }, ...dynamicHeaders]);
        setRows(formattedRows);
      })
      .catch((err) => console.error("Error fetching KPI data:", err));
  }, []);

  return (
    <Theme theme="white">
      <div className="custom-table-container">
        {headers.length > 0 && (
          <DataTable rows={rows} headers={headers} isSortable>
            {({ rows, headers, getHeaderProps, getTableProps }) => (
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader
                        key={header.key}
                        {...getHeaderProps({ header })}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataTable>
        )}
      </div>
    </Theme>
  );
}

export default KPI1;
