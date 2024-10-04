import React from "react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useMovieList, useFavourites, useInfoModal } from "@/hooks";
import { Navbar, Billboard, MovieList, InfoModal } from "@/components";

export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
}

export default function Home() {
    const { data: movies = [] } = useMovieList();
    const { data: favorites = [] } = useFavourites();
    const { isOpen, closeModal } = useInfoModal();

    return (
        <>
            <Navbar />
            <InfoModal visible={isOpen} onClose={closeModal} />
            <Billboard />
            <div className="pb-40">
                <MovieList title="Trending Now" data={movies} />
                <MovieList title="My List" data={favorites} />
            </div>
        </>
    );
}
