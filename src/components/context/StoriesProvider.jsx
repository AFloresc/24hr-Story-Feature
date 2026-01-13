import { createContext, useContext, useEffect, useState } from "react";

const StoriesContext = createContext(null);

export function StoriesProvider({ children }) {
    const logic = useStoriesLogic();
    return (
        <StoriesContext.Provider value={logic}>
        {children}
        </StoriesContext.Provider>
    );
}

export const useStories = () => useContext(StoriesContext);

// ------------------------------------------------------
// Internal logic hook
// ------------------------------------------------------

function useStoriesLogic() {
    const [stories, setStories] = useState([]);

    // Load stories on mount
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("stories") || "[]");
        const cleaned = removeExpired(stored);
        setStories(cleaned);
        localStorage.setItem("stories", JSON.stringify(cleaned));
    }, []);

    // Persist on change
    useEffect(() => {
        localStorage.setItem("stories", JSON.stringify(stories));
    }, [stories]);

    // Add new story (base64 image)
    const addStory = (imageData) => {
        const newStory = {
        id: crypto.randomUUID(),
        imageData,
        createdAt: Date.now()
        };
        setStories((prev) => [...prev, newStory]);
    };

    // Remove a story manually (optional)
    const removeStory = (id) => {
        setStories((prev) => prev.filter((s) => s.id !== id));
    };

    // Clean expired stories (24h)
    const refreshStories = () => {
        setStories((prev) => removeExpired(prev));
    };

    return {
        stories,
        addStory,
        removeStory,
        refreshStories
    };
}

// ------------------------------------------------------
// Helpers
// ------------------------------------------------------

function removeExpired(stories) {
    const DAY = 24 * 60 * 60 * 1000;
    const now = Date.now();
    return stories.filter((s) => now - s.createdAt < DAY);
}