import {
  useState,
  createContext,
  useContext,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { api } from "../services/axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./user.context";
import { IUser } from "./user.context";

interface iImage {
  id: string;
  img: string;
}

export interface iAnnouncement {
  id: string;
  brand: string;
  model: string;
  year: string;
  fuel: string;
  odometer: string;
  color: string;
  fipe: number;
  price: number;
  description: string;
  isPublished: boolean;
  images: iImage[];
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}

interface iUserSimple {
  id: string;
  fullName: string;
}

interface iComent {
  id: string;
  createdAt: string;
  user: iUserSimple;
  description: string;
}

export interface iAnnouncementDetail extends iAnnouncement {
  comments: iComent[];
}

interface iContext {
  announcements: iAnnouncement[];
  getAnnouncements: () => Promise<void>;
  createAnnouncement: (payload: iAnnouncement) => Promise<void>;
  editAnnouncement: (id: string, payload: iAnnouncement) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;
  listAnnouncement: (id: string) => Promise<iAnnouncementDetail>;
  profileAnnouncements: iAnnouncement[];
  setAnnouncements: React.Dispatch<React.SetStateAction<iAnnouncement[]>>;
  setProfileAnnouncements: React.Dispatch<
    React.SetStateAction<iAnnouncement[]>
  >;
  createComment: (payload: any, advertiserId: string) => Promise<void>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  nextPage: boolean;
  previusPage: boolean;
}

export const AdContext = createContext({} as iContext);

export const AdProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const { user } = useUser();
  const navigate = useNavigate();
  const toast = useToast();

  const [announcements, setAnnouncements] = useState<iAnnouncement[]>([]);
  const [profileAnnouncements, setProfileAnnouncements] = useState<
    iAnnouncement[]
  >([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [previusPage, setPreviusPage] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  api.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
    "@TOKEN"
  )}`;

  useEffect(() => {
    getAnnouncements();
    if (user) setProfileAnnouncements(user.announcements);
  }, [page]);

  const getAnnouncements = useCallback(async () => {
    try {
      const { data } = await api.get(`/advertise?page=${page}`);
      setAnnouncements(Object.values(data.announcement));
      if (data.nextPage) {
        setNextPage(true);
      } else {
        setNextPage(false);
      }
      if (data.previusPage) {
        setPreviusPage(true);
      } else {
        setPreviusPage(false);
      }
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
      toast({
        title: "Erro ao carregar anúncios",
        description: "Tente novamente mais tarde",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [page]);

  const createAnnouncement = useCallback(async (payload: iAnnouncement) => {
    try {
      const { data } = await api.post("/advertise", payload);
      const { announcement } = data as { announcement: iAnnouncement };
      setAnnouncements([...announcements, announcement]);
      setProfileAnnouncements([...profileAnnouncements, announcement]);
    } catch (err) {
      toast({
        title: "Erro ao carregar anúncios",
        description: "Verifique os campos inseridos e tente novamente!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  }, []);

  const editAnnouncement = useCallback(
    async (id: string, payload: iAnnouncement) => {
      try {
        const { data } = await api.patch(`/advertise/${id}`, payload);

        const newAnnouncements = announcements.map((announcement) => {
          if (announcement.id === id) {
            return (announcement = { ...announcement, ...data });
          }
          return announcement;
        });
        setAnnouncements(newAnnouncements);
        toast({
          title: "Anúncio editado!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (err) {
        console.error(err);
        toast({
          title: "Erro ao carregar anúncios",
          description: "Verifique os campos inseridos e tente novamente!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [announcements]
  );

  const deleteAnnouncement = useCallback(
    async (id: string) => {
      try {
        await api.delete(`/advertise/${id}`);
        const newAnnouncements = announcements.filter(
          (announcement) => announcement.id !== id
        );
        setAnnouncements(newAnnouncements);
        toast({
          title: "Anúncio deletado!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } catch (err) {
        toast({
          title: "Erro ao carregar anúncios",
          description: "Verifique o anúncio selecionado e tente novamente!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    },
    [announcements]
  );

  const listAnnouncement = useCallback(async (id: any) => {
    if (typeof id !== "string") {
      toast({
        title: "Erro ao carregar anúncios",
        description: "Verifique o anúncio selecionado e tente novamente!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate(-1);
      return;
    } else if (id === "undefined") {
      toast({
        title: "Erro ao carregar anúncios",
        description: "Verifique o anúncio selecionado e tente novamente!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate(-1);
      return;
    }

    try {
      const { data } = (await api.get(`/advertise/${id}`)) satisfies {
        data: iAnnouncementDetail;
      };

      return data;
    } catch (err) {
      console.error(err);
      toast({
        title: "Erro ao carregar anúncios",
        description: "Verifique o anúncio selecionado e tente novamente!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      navigate(-1);
    }
  }, []);

  const createComment = async (payload: any, advertiserId: string) => {
    try {
      await api.post(`/advertise/${advertiserId}/comments`, payload);
      toast({
        title: "Comentário publicado!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao comentar",
        description: "Tente novamente!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <AdContext.Provider
      value={{
        announcements,
        createAnnouncement,
        editAnnouncement,
        deleteAnnouncement,
        listAnnouncement,
        getAnnouncements,
        profileAnnouncements,
        setAnnouncements,
        setProfileAnnouncements,
        createComment,
        page,
        setPage,
        totalPages,
        nextPage,
        previusPage,
      }}
    >
      {children}
    </AdContext.Provider>
  );
};

export const useAd = (): iContext => useContext(AdContext);

export default AdProvider;
