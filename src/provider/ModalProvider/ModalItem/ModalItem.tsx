"use client";
import { memo } from "react";
import { ModalData } from "../ModalProvider";

import ModalCenter from "@/components/Modal/ModalCenter/ModalCenter";
import useClickOutside from "@/hooks/useClickOutside";

type ModalItemProps = {
  modalData: ModalData;
  closeModal: (id: string) => void;
};

const ModalItem = memo(
  ({ modalData, closeModal }: ModalItemProps) => {
    const { id, props, active } = modalData;
    const [activeLocal, setActive, ref] = useClickOutside({
      initialState: active,
      groupClass: ".modal-true",
      callBackInactive: () => closeModal(id),
      ignoreClasses: ["popOver"]
    });

    const modalProps = {
      active: activeLocal,
      onClose: () => closeModal(id),
      headerName: props.headerName,
      ref
    };

    const modalContent = <ModalCenter {...modalProps}>{props.children}</ModalCenter>;

    return modalContent;
  },
  (prevProps, nextProps) => prevProps.modalData === nextProps.modalData
);

export default ModalItem;
