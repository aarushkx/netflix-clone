import React from "react";
import { isEmpty } from "lodash";
import { MovieCard } from "./";

interface MovieListProps {
    data: Record<string, any>[];
    title: string;
}

const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
    if (isEmpty(data)) {
        return null;
    }

    return (
        <div className="px-4 md:px-12 mt-2 space-y-8 mb-4">
            <div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-bold">
                    {title}
                </p>
                <div className="grid grid-cols-4 gap-1 mt-2">
                    {data.map((movie) => (
                        <MovieCard key={movie.id} data={movie} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieList;
