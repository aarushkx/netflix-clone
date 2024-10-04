import React from "react";
import { useRouter } from "next/router";
import { useInfoModal } from "@/hooks";
import { BsFillPlayFill } from "react-icons/bs";
import { BiChevronDown } from "react-icons/bi";
import { FavouriteButton } from "../Button";

interface MovieCardProps {
    data: Record<string, any>;
}

const MovieCard: React.FC<MovieCardProps> = ({ data }) => {
    const router = useRouter();
    const { openModal } = useInfoModal();

    return (
        <div className="group bg-zinc-900 col-span relative h-[12vw]">
            <img
                src={data.thumbnailUrl}
                alt="Thumbnail"
                className="cursor-pointer object-cover transition-opacity duration-200 shadow-xl rounded-sm group-hover:opacity-0 delay-300 w-full h-[12vw]"
            />
            <div className="absolute top-0 transition-all duration-200 z-10 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100 delay-300">
                <img
                    src={data?.thumbnailUrl}
                    alt="Thumbnail"
                    className="cursor-pointer object-cover transition-opacity duration-300 shadow-xl rounded-t-sm w-full h-[12vw]"
                />
                <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-sm">
                    <div className="flex flex-row items-center gap-2">
                        <div
                            onClick={() => router.push(`/watch/${data?.id}`)}
                            className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
                        >
                            <BsFillPlayFill size={28} />
                        </div>
                        <FavouriteButton movieId={data?.id} />
                        <div
                            onClick={() => openModal(data?.id)}
                            className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
                        >
                            <BiChevronDown
                                size={28}
                                className="text-white group-hover/item:text-neutral-300"
                            />
                        </div>
                    </div>

                    <div className="flex flex-row mt-2 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">
                            {data?.duration}
                        </p>
                    </div>

                    <div className="flex flex-row mt-2 gap-2 items-center">
                        <p className="text-white text-[10px] lg:text-sm">
                            {data?.genre}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
