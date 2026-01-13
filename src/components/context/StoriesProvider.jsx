import { createContext, useContext, useEffect, useState } from "react";

const StoriesContext = createContext();

export function StoriesProvider({ children }) {
  const [stories, setStories] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("stories");
    if (saved) {
      try {
        setStories(JSON.parse(saved));
      } catch (err) {
        console.error("Error parsing stories:", err);
      }
    }
  }, []);

  const saveStories = (updated) => {
    setStories(updated);
    localStorage.setItem("stories", JSON.stringify(updated));
  };

  // Add a new story
  const addStory = (imageData) => {
    const newStory = {
      id: crypto.randomUUID(),
      imageData,
      createdAt: Date.now(),
      seen: false // 🔥 nuevo
    };

    const updated = [...stories, newStory];
    saveStories(updated);
  };

  // Mark story as seen
  const markAsSeen = (id) => {
    const updated = stories.map((s) =>
      s.id === id ? { ...s, seen: true } : s
    );

    saveStories(updated);
  };

  return (
    <StoriesContext.Provider
      value={{
        stories,
        addStory,
        markAsSeen
      }}
    >
      {children}
    </StoriesContext.Provider>
  );
}

export const useStories = () => useContext(StoriesContext);