import React, { useCallback, useState, useEffect } from "react";
import { NavItem, MobileMenu, AccountMenu, Logo } from "./";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";

const TOP_OFFSET = 66;

const Navbar = () => {
    const [showMobileView, setShowMobileView] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const toggleMobileMenu = useCallback(() => {
        setShowMobileView((current) => !current);
    }, []);

    const toggleAccountMenu = useCallback(() => {
        setShowAccountMenu((current) => !current);
    }, []);

    return (
        <nav className="w-full fixed z-50">
            <div
                className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
                    showBackground ? "bg-zinc-900 bg-opacity-90" : ""
                }`}
            >
                <Logo className="h-4 lg:h-8" />
                <div className="flex-row ml-8 gap-6 hidden lg:flex">
                    <NavItem label="Home" />
                    <NavItem label="TV Shows" />
                    <NavItem label="Movies" />
                    <NavItem label="New & Popular" />
                    <NavItem label="My List" />
                    <NavItem label="Browse by Languages" />
                </div>
                <div
                    onClick={toggleMobileMenu}
                    className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
                >
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown
                        className={`text-white transition ${
                            showMobileView ? "rotate-180" : "rotate-0"
                        }`}
                    />
                    <MobileMenu visible={showMobileView} />
                </div>
                <div className="flex flex-row ml-auto gap-6 items-center">
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
                        <BsBell />
                    </div>
                    <div
                        onClick={toggleAccountMenu}
                        className="flex flex-row items-center gap-2 cursor-pointer relative"
                    >
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/profile.jpg" alt="Profile" />
                        </div>
                        <BsChevronDown
                            className={`text-white transition ${
                                showAccountMenu ? "rotate-180" : "rotate-0"
                            }`}
                        />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
