"use client";

import React, { createContext, useContext, useState } from "react";

export interface SessionContextType {
    segment: string;
    setSegment: (s: string) => void;
    tone: string;
    setTone: (t: string) => void;
    audience: string;
    setAudience: (a: string) => void;
    resetSession: () => void;
    isComplete: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
    const [segment, setSegment] = useState("");
    const [tone, setTone] = useState("");
    const [audience, setAudience] = useState("");

    const resetSession = () => {
        setSegment("");
        setTone("");
        setAudience("");
    };

    const isComplete = Boolean(segment && tone && audience);

    return (
        <SessionContext.Provider
            value={{
                segment,
                setSegment,
                tone,
                setTone,
                audience,
                setAudience,
                resetSession,
                isComplete,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error("useSession must be used within a SessionProvider");
    }
    return context;
}
