import React, { createContext, useContext, useCallback, useEffect, ReactNode } from "react";
import { api } from "../services/axios";
import { useToast } from "@chakra-ui/react";

interface iImage {
    img: string;
}

export interface iAnnouncement {
    id?: string;
    brand: string,
    model: string,
    year: string,
    fuel: string,
    odometer: string,
    color: string,
    fipe: number,
    price: number,
    description: string,
    isPublished: boolean,
    images: iImage[],
    createdAt: Date,
    updatedAt: Date
}

interface iContext {
    announcements: iAnnouncement[];
    getAnnouncements: () => Promise<void>;
    createAnnouncement: (payload: iAnnouncement) => Promise<void>;
    editAnnouncement: (id: string, payload: iAnnouncement) => Promise<void>;
    deleteAnnouncement: (id: string) => Promise<void>;
    listAnnouncement: (id: string) => Promise<iAnnouncement | void>
}

export const AdContext = createContext({} as iContext);

export const AdProvider = ({ children }: { children: ReactNode }): JSX.Element => {

    const toast = useToast();
    const [announcements, setAnnouncements] = React.useState<iAnnouncement[]>([]);
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        getAnnouncements();
    }, [])

    const getAnnouncements = useCallback(async () => {
        try {
            const { data } = await api.get(`/advertise?page=${page}`);
            setAnnouncements(Object.values(data.announcement));
            setPage(data.page)
        } catch (error) {
            console.log(error)
            toast({
                title: "Erro ao carregar anúncios",
                description: "Tente novamente mais tarde",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }, [])

    const createAnnouncement = useCallback(async (payload: iAnnouncement) => {
        try {
            const { data } = await api.post('/advertise', payload);
            const { announcement } = data as { announcement: iAnnouncement };
            setAnnouncements([...announcements, announcement]);
        } catch (err) {
            toast({
                title: "Erro ao carregar anúncios",
                description: "Verifique os campos inseridos e tente novamente!",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
    }, [])

    const editAnnouncement = useCallback(async (id: string, payload: iAnnouncement) => {
        try {
            const { data } = await api.patch(`/advertise/${id}`, payload);
            const { announcement } = data as { announcement: iAnnouncement };
            const newAnnouncements = announcements.map(announcement => {
                if (announcement.id === id) {
                    return announcement;
                }
                return announcement;
            })
            setAnnouncements(newAnnouncements);
        } catch (err) {
            toast({
                title: "Erro ao carregar anúncios",
                description: "Verifique os campos inseridos e tente novamente!",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }, [])

    const deleteAnnouncement = useCallback(async (id: string) => {
        try {
            await api.delete(`/advertise/${id}`);
            const newAnnouncements = announcements.filter(announcement => announcement.id !== id);
            setAnnouncements(newAnnouncements);
        } catch (err) {
            toast({
                title: "Erro ao carregar anúncios",
                description: "Verifique o anúncio selecionado e tente novamente!",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }, [])

    const listAnnouncement = useCallback(async (id: string) => {
        try {
            const { data } = await api.get(`/advertise/${id}`) as { data: iAnnouncement };
            return data;
        } catch (err) {
            toast({
                title: "Erro ao carregar anúncios",
                description: "Verifique o anúncio selecionado e tente novamente!",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        }
    }, [])

    return (
        <AdContext.Provider value={{
            announcements, createAnnouncement,
            editAnnouncement, deleteAnnouncement,
            listAnnouncement, getAnnouncements

        }}>
            {children}
        </AdContext.Provider>
    )
};

export const useAd = (): iContext => useContext(AdContext);

export default AdProvider;
