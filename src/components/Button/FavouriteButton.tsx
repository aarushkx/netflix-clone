import React, { useCallback, useMemo } from "react";
import { useCurrentUser, useFavourites } from "@/hooks";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import axios from "axios";

interface FavouriteButtonProps {
    movieId: string;
}

const FavouriteButton: React.FC<FavouriteButtonProps> = ({ movieId }) => {
    const { mutate: mutateFavourites } = useFavourites();
    const { data: currentUser, mutate } = useCurrentUser();

    const isFavourite = useMemo(() => {
        const list = currentUser?.favouriteIds || [];
        return list.includes(movieId);
    }, [currentUser, movieId]);

    const toggleFavourites = useCallback(async () => {
        let response;

        if (isFavourite) {
            response = await axios.delete("/api/favourite", {
                data: { movieId },
            });
        } else {
            response = await axios.post("/api/favourite", { movieId });
        }

        const updatedFavourites = response?.data?.favouriteIds;

        mutate({
            ...currentUser,
            favouriteIds: updatedFavourites,
        });
        mutateFavourites();
    }, [isFavourite, currentUser, movieId, mutate, mutateFavourites]);

    const Icon = isFavourite ? AiOutlineCheck : AiOutlinePlus;

    return (
        <div
            onClick={toggleFavourites}
            className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
        >
            <Icon className="text-white" size={28} />
        </div>
    );
};

export default FavouriteButton;
