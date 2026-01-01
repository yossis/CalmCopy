"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface SettingsContextType {
    apiKey: string;
    setApiKey: (key: string) => void;
    isMockMode: boolean;
    setIsMockMode: (isMock: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [apiKey, setApiKey] = useState("");
    const [isMockMode, setIsMockMode] = useState(true);

    // Load from localStorage on mount
    useEffect(() => {
        const storedKey = localStorage.getItem("lemonade_api_key");
        const storedMock = localStorage.getItem("lemonade_mock_mode");

        if (storedKey) setApiKey(storedKey);
        if (storedMock) setIsMockMode(storedMock === "true");
    }, []);

    // Save to localStorage when changed
    useEffect(() => {
        localStorage.setItem("lemonade_api_key", apiKey);
    }, [apiKey]);

    useEffect(() => {
        localStorage.setItem("lemonade_mock_mode", String(isMockMode));
    }, [isMockMode]);

    return (
        <SettingsContext.Provider value={{ apiKey, setApiKey, isMockMode, setIsMockMode }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
