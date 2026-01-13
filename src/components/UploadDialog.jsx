import { useRef } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography
} from "@mui/material";
import { useStories } from "./context/StoriesProvider";

export default function UploadDialog({ open, onClose }) {
    const fileInputRef = useRef(null);
    const { addStory } = useStories();

    const handleFileSelect = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const base64 = await readFileAsBase64(file);
        const resized = await resizeImage(base64, 1080, 1920);

        addStory(resized);
        onClose();
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>Upload Story</DialogTitle>

        <DialogContent>
            <Box sx={{ py: 2 }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
                Select an image to upload as a story.  
                Images will be resized to a maximum of 1080×1920.
            </Typography>

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
            />

            <Button variant="contained" onClick={triggerFileInput}>
                Choose Image
            </Button>
            </Box>
        </DialogContent>

        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
        </Dialog>
    );
}

// ------------------------------------------------------
// Helpers
// ------------------------------------------------------

function readFileAsBase64(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
    });
}

function resizeImage(base64, maxWidth, maxHeight) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
        let { width, height } = img;

        // No resize needed
        if (width <= maxWidth && height <= maxHeight) {
            resolve(base64);
            return;
        }

        // Calculate new size preserving aspect ratio
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        const newWidth = width * ratio;
        const newHeight = height * ratio;

        // Draw on canvas
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        const resizedBase64 = canvas.toDataURL("image/jpeg", 0.9);
        resolve(resizedBase64);
        };

        img.src = base64;
    });
}