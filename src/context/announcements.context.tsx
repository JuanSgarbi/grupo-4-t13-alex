import React from "react";
import { useState, createContext, useCallback, useMemo, ReactNode } from "react";
import { useToast } from "@chakra-ui/react";
import { api } from "../services/axios";

interface iImg {
    id: string;
    img: string;
}

interface iAnnouncement {
    id?: string;
    brand: string;
    model: string;
    year: string;
    fuel: string;
    odometer: string;
    color: string;
    fipe: string;
    price: string;
    description: string;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    images: iImg[];
}

interface iAnnouncementsContext {
    announcements: iAnnouncement[];
    getAnnouncements: () => Promise<void>;
    createAnnouncements: (data: iAnnouncement) => Promise<void>;
    updateAnnouncements: (id: string, data: iAnnouncement) => Promise<void>;
    deleteAnnouncements: (id: string) => Promise<void>;
    displayAnnouncement: (id: string) => Promise<void>;
    targetAd: iAnnouncement;
}

export const AdContext = createContext({
    announcements: [] as iAnnouncement[],
    getAnnouncements: () => Promise.resolve(),
    createAnnouncements: (data: iAnnouncement) => Promise.resolve(),
    updateAnnouncements: (id: string, data: iAnnouncement) => Promise.resolve(),
    deleteAnnouncements: (id: string) => Promise.resolve(),
    displayAnnouncement: (id: string) => Promise.resolve(),
    targetAd: {} as iAnnouncement,
} as iAnnouncementsContext);

export default function AnnouncementsProvider({ children }: { children: ReactNode }): JSX.Element {
    const toast = useToast();
    const [announcements, setAnnouncements] = useState<iAnnouncement[]>([]);
    const [targetAd, setTargetAd] = useState<iAnnouncement>({} as iAnnouncement);
    const token: string = "alterar qdo fizer o contexto de usuário";

    //Já passa o Token automaticamente nas requisições.
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const getAnnouncements = useCallback(async () => {
        try {
            const { data } = await api.get("/announcements");
            setAnnouncements(data);
        } catch (err) {
            toast({
                title: "Erro",
                description: "Não foi possível carregar os anúncios",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }, []);

    const createAnnouncements = useCallback(async (data: iAnnouncement) => {
        try {
            const { data: response } = await api.post("/announcements", data)
            setAnnouncements([...announcements, response]);
        } catch (err) {
            toast({
                title: "Erro",
                description: "Não foi possível criar o anúncio",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }, []);

    const updateAnnouncements = useCallback(async (id: string, data: iAnnouncement) => {
        try {
            const { data: response } = await api.put(`/announcements/${id}`, data);
            setAnnouncements(announcements.map(announcement => announcement.id === id ? response : announcement));
        } catch (err) {
            toast({
                title: "Erro",
                description: "Não foi possível atualizar o anúncio",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }, []);

    const deleteAnnouncements = useCallback(async (id: string) => {
        try {
            await api.delete(`/announcements/${id}`);
            setAnnouncements(announcements.filter(announcement => announcement.id !== id));
        } catch (err) {
            toast({
                title: "Erro",
                description: "Não foi possível deletar o anúncio",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }, []);

    const displayAnnouncement = useCallback(async (id: string) => {
        try {
            const { data } = await api.get(`/announcements/${id}`);
            setTargetAd(data);
        } catch (err) {
            toast({
                title: "Erro",
                description: "Não foi possível carregar o anúncio",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }, []);

    const value = useMemo(() => {
        return {
            announcements,
            getAnnouncements,
            createAnnouncements,
            updateAnnouncements,
            deleteAnnouncements,
            displayAnnouncement,
            targetAd,
        };
    }, [announcements, targetAd]);

    return <AdContext.Provider value={value}>{children}</AdContext.Provider>
};