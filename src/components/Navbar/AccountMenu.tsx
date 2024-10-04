import React from "react";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

interface AccountMenuProps {
    visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
    const { data: user } = useCurrentUser();

    if (!visible) {
        return null;
    }

    return (
        <div className="bg-black w-56 absolute right-0 top-14 flex-col border-2 border-gray-800 flex">
            <div className="flex flex-col gap-2">
                <div className="px-3 group/item flex flex-row gap-4 py-2 items-center w-full">
                    <img
                        className="w-8 rounded-md"
                        src="/images/profile.jpg"
                        alt="Profile"
                    />
                    <p className="text-white text-sm group-hover/item:underline">
                        {user?.name}
                    </p>
                </div>
                <hr className="bg-gray-600 border-0 h-px my-0" />
                <div
                    onClick={() => signOut()}
                    className="px-3 py-4 text-center text-white text-sm hover:underline"
                >
                    Sign Out of Netflix
                </div>
            </div>
        </div>
    );
};

export default AccountMenu;
