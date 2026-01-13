import { useState } from "react";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { StoriesProvider } from "./context/StoriesProvider";
import StoryBar from "./components/StoryBar/StoryBar";
import UploadDialog from "./components/UploadDialog";

export default function App() {
  const [openUpload, setOpenUpload] = useState(false);

  return (
    <StoriesProvider>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          py: 4
        }}
      >
        <Container maxWidth="sm" sx={{ width: "100%" }}>
          {/* Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 3 }}
          >
            <Typography variant="h5" fontWeight="bold">
              Story Feature 24h
            </Typography>

            <IconButton onClick={() => setOpenUpload(true)} color="primary">
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Stack>

          {/* Story bar */}
          <StoryBar onAdd={() => setOpenUpload(true)} />

          {/* Upload dialog */}
          <UploadDialog open={openUpload} onClose={() => setOpenUpload(false)} />
        </Container>
      </Box>
    </StoriesProvider>
  );
}