import React from "react";

interface MobileMenuProps {
    visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
    if (!visible) {
        return null;
    }

    return (
        <div className="bg-black w-56 absolute top-8 left-0 flex-col border-2 border-gray-800 flex opacity-80">
            <div className="flex flex-col">
                <div className="px-2 py-2 text-center text-white hover:bg-[#1c1b1b]">
                    Home
                </div>
                <div className="px-2 py-2 text-center text-white hover:bg-[#1c1b1b]">
                    Series
                </div>
                <div className="px-2 py-2 text-center text-white hover:bg-[#1c1b1b]">
                    Films
                </div>
                <div className="px-2 py-2 text-center text-white hover:bg-[#1c1b1b]">
                    New & Popular
                </div>
                <div className="px-2 py-2 text-center text-white hover:bg-[#1c1b1b]">
                    My List
                </div>
                <div className="px-2 py-2 text-center text-white hover:bg-[#1c1b1b]">
                    Browse by Languages
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
