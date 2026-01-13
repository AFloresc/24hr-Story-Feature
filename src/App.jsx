import { useState } from "react";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { StoriesProvider, useStories } from "./components/context/StoriesProvider";
import StoryBar from "./components/StoryBar/StoryBar";
import UploadDialog from "./components/UploadDialog";
import StoryViewer from "./components/StoryViewer/StoryViewer";

export default function App() {
  return (
    <StoriesProvider>
      <AppContent />
    </StoriesProvider>
  );
}

function AppContent() {
  const [openUpload, setOpenUpload] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(null);

  const { stories } = useStories();

  const openViewer = (index) => {
    setViewerIndex(index);
  };

  const closeViewer = () => {
    setViewerIndex(null);
  };

  return (
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
        <StoryBar
          onAdd={() => setOpenUpload(true)}
          onSelect={(index) => openViewer(index)}
        />

        {/* Upload dialog */}
        <UploadDialog
          open={openUpload}
          onClose={() => setOpenUpload(false)}
        />

        {/* Story viewer */}
        {viewerIndex !== null && (
          <StoryViewer
            stories={stories}
            initialIndex={viewerIndex}
            onClose={closeViewer}
          />
        )}
      </Container>
    </Box>
  );
}