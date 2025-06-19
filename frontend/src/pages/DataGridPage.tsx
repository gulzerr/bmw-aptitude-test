import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Button,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "../App.css";

const API_BASE_URL = "http://127.0.0.1:3000";
type FilterType =
  | "contains"
  | "equals"
  | "starts_with"
  | "ends_with"
  | "is_empty";

const GridPage = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rowData, setRowData] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [columnDefs, setColumnDefs] = useState<any[]>([]); // Set manual columns by default
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("contains");
  const [filterValue, setFilterValue] = useState("");

  const fetchCarData = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (searchParams?: any) => {
      try {
        setLoading(true);

        let url = `${API_BASE_URL}/api/electric-cars/search`;
        if (searchParams) {
          url += "?" + new URLSearchParams(searchParams).toString();
        }

        console.log("Fetching data from:", url);
        const response = await axios.get(url);
        console.log("API response:", response.data);

        const manualColumnDefs = [
          {
            field: "brand",
            headerName: "Brand",
            sortable: true,
            filter: true,
            resizable: true,
            width: 120,
          },
          {
            field: "model",
            headerName: "Model",
            sortable: true,
            filter: true,
            resizable: true,
          },
          {
            field: "rangeKm",
            headerName: "Range (km)",
            sortable: true,
            filter: true,
            resizable: true,
            width: 150,
          },
          {
            field: "priceEuro",
            headerName: "Price (€)",
            sortable: true,
            filter: true,
            resizable: true,
          },
          {
            field: "accelSec",
            headerName: "0-100 (s)",
            sortable: true,
            filter: true,
            resizable: true,
            width: 120,
          },
          {
            field: "topSpeedKmH",
            headerName: "Top Speed (km/h)",
            sortable: true,
            filter: true,
            resizable: true,
          },
          {
            headerName: "Actions",
            field: "actions",
            sortable: false,
            filter: false,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            cellRenderer: (params: any) => {
              return (
                <div style={{ display: "flex", gap: 8 }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                      navigate(`/details/${params.data.id}`, {
                        state: { itemData: params.data },
                      })
                    }
                  >
                    Details
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={async () => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete "${params.data.brand} ${params.data.model}"?`
                        )
                      ) {
                        try {
                          await axios.delete(
                            `${API_BASE_URL}/api/electric-cars/delete/${params.data.id}`
                          );
                          fetchCarData();
                        } catch (err) {
                          alert(`Failed to delete the car.${err}`);
                        }
                      }
                    }}
                  >
                    Delete
                  </Button>
                </div>
              );
            },
          },
        ];
        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          setRowData(response.data.data);
          setColumnDefs(manualColumnDefs);
        } else {
          setError("Invalid data format received from API");
          console.error(
            "API response format is not as expected:",
            response.data
          );
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data from API");
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const fetchFilteredData = useCallback(async () => {
    try {
      setLoading(true);

      const filterParams = {
        column: filterField,
        criteria: filterType,
        ...(filterType !== "is_empty" && { value: filterValue }),
      };

      const url = `${API_BASE_URL}/api/electric-cars/filter`;
      console.log("Filtering data with params:", filterParams);

      const response = await axios.get(url, { params: filterParams });
      console.log("Filter API response:", response.data);

      if (
        response.data &&
        response.data.data &&
        Array.isArray(response.data.data)
      ) {
        setRowData(response.data.data);
      } else {
        setError("Invalid data format received from filter API");
        console.error(
          "Filter API response format is not as expected:",
          response.data
        );
      }
    } catch (err) {
      console.error("Error filtering data:", err);
      setError("Failed to filter data from API");
    } finally {
      setLoading(false);
    }
  }, [filterField, filterType, filterValue]);

  useEffect(() => {
    console.log("GridPage mounted, fetching initial data...");
    fetchCarData();
  }, []);

  const handleSearch = () => {
    fetchCarData({ keyword: searchTerm });
  };

  const handleFilter = () => {
    if (!filterField || !filterType) {
      setError("Please select a field and filter type");
      return;
    }

    if (filterType !== "is_empty" && !filterValue.trim()) {
      setError("Please enter a filter value");
      return;
    }

    setError(null);
    fetchFilteredData();
  };

  // Clear filters
  const clearFilters = () => {
    setSearchTerm("");
    setFilterField("");
    setFilterType("contains");
    setFilterValue("");
    setError(null);
    fetchCarData();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Data Grid
        </Typography>
        <Box sx={{ display: "flex", mb: 2, gap: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Box>

        {/* Filter */}
        <Box
          sx={{
            display: "flex",
            mb: 5,
            gap: 2,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Field</InputLabel>
            <Select
              value={filterField}
              label="Field"
              onChange={(e) => setFilterField(e.target.value)}
            >
              {columnDefs
                .filter((col) => col.field !== "actions")
                .map((col) => (
                  <MenuItem key={col.field} value={col.field}>
                    {col.headerName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Filter Type</InputLabel>
            <Select
              value={filterType}
              label="Filter Type"
              onChange={(e) => setFilterType(e.target.value as FilterType)}
            >
              <MenuItem value="contains">Contains</MenuItem>
              <MenuItem value="equals">Equals</MenuItem>
              <MenuItem value="starts_with">Starts With</MenuItem>
              <MenuItem value="ends_with">Ends With</MenuItem>
              <MenuItem value="is_empty">Is Empty</MenuItem>
            </Select>
          </FormControl>

          {filterType !== "is_empty" && (
            <TextField
              label="Value"
              variant="outlined"
              size="small"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
          )}

          <Button variant="contained" color="primary" onClick={handleFilter}>
            Apply Filter
          </Button>

          <Button variant="outlined" onClick={clearFilters}>
            Clear
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      ) : rowData.length === 0 ? (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" align="center">
            No data available. Please check the API connection.
          </Typography>
        </Paper>
      ) : (
        <div
          className="ag-theme-material"
          style={{ height: 500, width: "100%" }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            headerHeight={45}
            pagination={true}
            paginationPageSize={10}
            animateRows={true}
            rowSelection="single"
            domLayout="autoHeight"
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
              headerClass: "ag-header-cell-label",
              cellStyle: {
                textAlign: "center",
                // justifyContent: "center",
                alignItems: "center",
                display: "flex",
              },
            }}
            rowHeight={45}
            onGridReady={(params) => {
              console.log("Grid is ready");
              params.api.sizeColumnsToFit();
            }}
          />
        </div>
      )}
    </Container>
  );
};

export default GridPage;
