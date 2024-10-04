import React, { useState, useCallback } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { Logo, Input } from "@/components/index";

const Auth = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [variant, setVariant] = useState("signin");

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) =>
            currentVariant === "signin" ? "signup" : "signin"
        );
    }, []);

    const signin = useCallback(async () => {
        try {
            await signIn("credentials", {
                email,
                password,
                callbackUrl: "/profiles",
            });
        } catch (error) {}
    }, [email, password]);

    const signup = useCallback(async () => {
        try {
            await axios.post("/api/signup", {
                name,
                email,
                password,
            });

            signin();
        } catch (error) {}
    }, [name, email, password, signin]);

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-2">
                    <Logo className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {variant === "signin" ? "Sign In" : "Sign Up"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === "signup" && (
                                <Input
                                    id="name"
                                    onChange={(e: any) =>
                                        setName(e.target.value)
                                    }
                                    value={name}
                                    label="Name"
                                />
                            )}
                            <Input
                                id="email"
                                onChange={(e: any) => setEmail(e.target.value)}
                                value={email}
                                label="Email"
                                type="email"
                            />
                            <Input
                                id="password"
                                onChange={(e: any) =>
                                    setPassword(e.target.value)
                                }
                                value={password}
                                label="Password"
                                type="password"
                            />
                        </div>
                        <button
                            onClick={variant === "signin" ? signin : signup}
                            className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
                        >
                            {variant === "signin" ? "Sign In" : "Sign up"}
                        </button>
                        <p className="text-neutral-500 mt-12">
                            {variant === "signin"
                                ? "New to Netflix?"
                                : "Already have an account?"}{" "}
                            <span
                                className="text-white cursor-pointer hover:underline"
                                onClick={toggleVariant}
                            >
                                {variant === "signin"
                                    ? "Sign up now"
                                    : "Sign in"}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Auth;
