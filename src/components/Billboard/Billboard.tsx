import React, { useCallback, useState } from "react";
import { useBillboard, useInfoModal } from "@/hooks";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { PlayButton } from "../Button";

const Billboard = () => {
    const { data } = useBillboard();
    const { openModal } = useInfoModal();

    const [isMuted, setIsMuted] = useState(true);

    const toggleMute = () => {
        setIsMuted((prev) => !prev);
    };

    const handleOpenModal = useCallback(() => {
        openModal(data?.id);
    }, [openModal, data?.id]);

    return (
        <div className="relative h-[56.25vw]">
            <video
                className="w-full h-[56.25vw] object-cover brightness-[60%]"
                autoPlay
                muted={isMuted}
                loop
                poster={data?.thumbnailUrl}
                src={data?.videoUrl}
            ></video>

            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>

            <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16 z-10 ">
                <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
                    {data?.title}
                </p>
                <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                    {data?.description}
                </p>

                <div className="flex flex-row items-center justify-between mt-3 md:mt-4 gap-3">
                    <div className="flex flex-row items-center gap-2">
                        <PlayButton movieId={data?.id} />
                        <button
                            onClick={handleOpenModal}
                            className="bg-white text-white bg-opacity-30 rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
                        >
                            <AiOutlineInfoCircle size={24} className="mr-1" />
                            More Info
                        </button>
                    </div>

                    <button
                        onClick={toggleMute}
                        className="mr-4 md:mr-16 text-white hover:text-gray-300 transition"
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
    );
};

export default Billboard;
