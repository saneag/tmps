import React from 'react';
import { motion } from 'framer-motion';

interface IProps {
    header: string;
    body: string;
    confirm: string;
    cancel: string;
    setIsModalOpen: (value: boolean) => void;
    setIsEditMode: (value: boolean) => void;
    setModalMessage: (value: 'ok' | 'cancel') => void;
}

const ModalConfirmation = ({
    header,
    body,
    confirm,
    cancel,
    setIsModalOpen,
    setIsEditMode,
    setModalMessage,
}: IProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 z-20 flex h-screen w-full justify-center bg-gray-800 bg-opacity-90 pt-10"
            onClick={() => {
                setIsModalOpen(false);
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.3 }}
                className="flex h-fit w-[500px] flex-col rounded-lg bg-white py-3"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="border-b p-3 pt-0">
                    <span className="text-2xl font-bold">{header}</span>
                </div>
                <div className="border-b p-3">
                    <span>{body}</span>
                </div>
                <div className="flex gap-3 self-end px-3 pt-3">
                    <button
                        className="rounded bg-green-600 px-4 py-2 font-bold text-white hover:bg-green-700"
                        onClick={() => {
                            setIsEditMode(false);
                            setIsModalOpen(false);
                            setModalMessage('ok');
                        }}
                    >
                        {confirm}
                    </button>
                    <button
                        className="rounded bg-red-600 px-4 py-2 font-bold text-white hover:bg-red-700"
                        onClick={() => {
                            setIsModalOpen(false);
                            setModalMessage('cancel');
                        }}
                    >
                        {cancel}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ModalConfirmation;
