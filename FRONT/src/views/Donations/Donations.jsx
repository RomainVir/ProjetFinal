import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "reference",
    headerName: "Réference",
    width: 130,
    valueGetter: (params) => `${params.row.description || ""}`,
  },
  {
    field: "description",
    headerName: "Description",
    width: 130,
    valueGetter: (params) => `${params.row.description || ""}`,
  },

  {
    field: "quantite",
    headerName: "Quantité disponible",
    type: "number",
    width: 140,
    sortable: true,
    valueGetter: (params) => `${params.row.quantite || ""}`,
  },
  {
    field: "quantitechoisie",
    headerName: "Quantité choisie",
    width: 160,
  },
];

const rows = [
  { id: 1, reference: "b", description: "ROMAIN", quantite: "45" },
  { id: 2, reference: "Beurk", description: "Cersei", quantite: 42 },
  { id: 3, reference: "Lannister", description: "Jaime", quantite: 45 },
  { id: 4, reference: "Stark", description: "Arya", quantite: 16 },
  { id: 5, reference: "Targaryen", description: "Daenerys", quantite: 45 },
  { id: 6, reference: "Melisandre", description: "truc", quantite: 150 },
  { id: 7, reference: "Clifford", description: "Ferrara", quantite: 44 },
  { id: 8, reference: "Frances", description: "Rossini", quantite: 36 },
  { id: 9, reference: "Roxie", description: "Harvey", quantite: 65 },
];

export default function DataTable() {
  return (
    <div style={{ height: 900, width: "80%" }}>
      <DataGrid
        alignI
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
      />
    </div>
  );
}
