import React, { useState, useEffect, useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoVolumeMuteOutline, IoVolumeHighOutline } from "react-icons/io5";
import { PlayButton, FavouriteButton } from "../Button";
import { useInfoModal, useMovie } from "@/hooks";

interface InfoModalProps {
    visible?: boolean;
    onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
    const [isVisible, setIsVisible] = useState(!!visible);
    const [isMuted, setIsMuted] = useState(true);

    const { movieId } = useInfoModal();
    const { data = {} } = useMovie(movieId);

    const toggleMute = () => {
        setIsMuted((prev) => !prev);
    };

    useEffect(() => {
        setIsVisible(!!visible);
    }, [visible]);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    if (!visible) {
        return null;
    }

    return (
        <div className="z-50 transition duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
            <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden">
                <div
                    className={`${
                        isVisible ? "scale-100" : "scale-0"
                    } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
                >
                    <div className="relative h-96">
                        <video
                            className="w-full h-full object-cover brightness-[60%]"
                            autoPlay
                            muted={isMuted}
                            loop
                            poster={data?.thumbnailUrl}
                            src={data?.videoUrl}
                        ></video>

                        <div className="cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center">
                            <AiOutlineClose
                                onClick={handleClose}
                                size={20}
                                className="text-white"
                            />
                        </div>

                        <div className="absolute bottom-[10%] left-10 w-full">
                            <p className="text-white text-3xl md:text-4xl h-full w-[50%] lg:text-5xl font-bold mb-8">
                                {data?.title}
                            </p>
                            <div className="flex flex-row gap-4 items-center justify-between">
                                <div className="flex flex-row items-center gap-2">
                                    <PlayButton movieId={data?.id} />
                                    <FavouriteButton movieId={data?.id} />
                                </div>

                                <button
                                    onClick={toggleMute}
                                    className="mr-16 text-white hover:text-gray-300 transition"
                                >
                                    {isMuted ? (
                                        <IoVolumeMuteOutline size={24} />
                                    ) : (
                                        <IoVolumeHighOutline size={24} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="px-12 py-8">
                        <p className="text-white text-lg">{data?.duration}</p>
                        <p className="text-white text-lg">{data?.genre}</p>
                        <p className="text-white text-lg mt-4">
                            {data?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfoModal;
