import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
        throw new Error("Not authenticated");
    }
    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        },
    });
    if (!currentUser) {
        throw new Error("Not authenticated");
    }
    return { currentUser };
};

export default serverAuth;
