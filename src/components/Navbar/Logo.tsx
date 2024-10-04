import React from "react";

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <div className="cursor-pointer">
            <img src="/images/logo.png" alt="Logo" className={className} />
        </div>
    );
};

export default Logo;
