import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { NavFilters } from "./navFilters";
import { useEffect } from "react";

export const ModalNavFilter = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSmallerThanMd] = useMediaQuery("(max-width: 770px)");

  useEffect(() => {
    if (!isSmallerThanMd && isOpen) {
      onClose();
    }
  }, [isSmallerThanMd, isOpen, onClose]);

  return (
    <>
      <Button
        margin={"0 auto"}
        marginY={"1rem"}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
      >
        Filtros
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textStyle={"heading_7_500"} color={"grey.1"}>
            Filtro
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <NavFilters />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
