import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Home Page
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome to the BMW Data Grid Application
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button
            component={Link}
            to="/grid"
            variant="contained"
            color="primary"
          >
            Go to Data Grid
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};
export default HomePage;
