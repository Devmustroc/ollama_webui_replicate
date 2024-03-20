import React from 'react';
import {create} from "zustand";

interface useModalProProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useModalPro = create<useModalProProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true}),
    onClose: () => set({ isOpen: false}),
}))