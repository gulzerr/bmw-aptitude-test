import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const FIELDS_TO_SHOW: { key: string; label: string }[] = [
  { key: "brand", label: "Brand" },
  { key: "model", label: "Model" },
  { key: "price", label: "Price (€)" },
  { key: "rangeKm", label: "Range (km)" },
  { key: "accelSec", label: "Acceleration (0-100 km/h)" },
  { key: "topSpeedKmH", label: "Top Speed (km/h)" },
  { key: "efficiencyWhKm", label: "Efficiency (Wh/km)" },
  { key: "fastChargeKmH", label: "Fast Charge (km/h)" },
  { key: "rapidCharge", label: "Rapid Charge" },
  { key: "powerTrain", label: "Power Train" },
  { key: "plugType", label: "Plug Type" },
  { key: "bodyStyle", label: "Body Style" },
  { key: "segment", label: "Segment" },
  { key: "seats", label: "Seats" },
  { key: "priceEuro", label: "Price (€)" },
  { key: "releaseDate", label: "Release Date" },
];

const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const passedData = (location.state as any)?.itemData;

    setItem(passedData);
    setLoading(false);
  }, [id, location.state]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Details
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : item ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            {FIELDS_TO_SHOW.map(
              ({ key, label }) =>
                item[key] !== undefined && (
                  <Box
                    key={key}
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 1,
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, minWidth: 180, textAlign: "left" }}
                    >
                      {label}
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: "right" }}>
                      {key === "releaseDate"
                        ? new Date(item[key]).toLocaleDateString()
                        : String(item[key])}
                    </Typography>
                  </Box>
                )
            )}
          </Box>
        ) : (
          <Typography color="error">Item not found</Typography>
        )}

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default DetailsPage;
