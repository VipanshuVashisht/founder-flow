import Link from "next/link";
import { auth, signIn, signOut } from "@/auth"
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = async () => {
    const session = await auth();

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <span className="text-xl font-bold text-[#EE2B69]">Founder</span>
                    <span className="text-xl font-bold text-black">Flow</span> 
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span className="max-sm:hidden">Create</span>
                                <BadgePlus className="size-6 sm:hidden" />
                            </Link>

                            <form
                                action = {async () => {
                                    // Forms are client-side elements but require server execution for secure operations like authentication
                                    "use server";
                                    await signOut({ redirectTo: "/" })
                                }}
                            >
                                <button type="submit">
                                    <span className="max-sm:hidden">Logout</span>
                                    <LogOut className="size-6 sm:hidden text-red-500" />
                                </button>
                            </form>

                            <Link href={`/user/${session?.id}`}>
                                <Avatar className="size-10">
                                    <AvatarImage
                                        src = {session?.user?.image || ""}
                                        alt = {session?.user?.name || ""}
                                    />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </Link>
                        </>
                    ) : (
                        <>
                            <form
                                action = {async () => {
                                    "use server";
                                    await signIn("github")
                                }}
                            >
                                <button type="submit">Login</button>
                            </form>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar;