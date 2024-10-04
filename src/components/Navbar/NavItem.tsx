import React from "react";

interface NavItemProps {
    label: string;
}

const NavItem: React.FC<NavItemProps> = ({ label }) => {
    return (
        <div className="text-white cursor-pointer hover:text-gray-300 transition">
            {label}
        </div>
    );
};

export default NavItem;
