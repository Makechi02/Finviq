'use client'

import {Logo} from "@/components/ui";
import {adminNavLinks} from "@/data/constants";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState} from "react";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa6";
import {FaBars} from "react-icons/fa";

const Sidebar = ({user, children}) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const toggleDrawer = () => setIsDrawerOpen(prevState => !prevState);

    return (
        <div>
            <SideContent user={user} isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
            <div
                className={`sm:absolute bg-background text-text overflow-y-auto min-h-svh transition-all duration-500 ${isDrawerOpen ? 'left-60 right-0' : 'left-0 w-full'}`}>
                {!isDrawerOpen && (
                    <div className={`absolute top-9 -left-4 hidden sm:block`}>
                        <button
                            onClick={toggleDrawer}
                            className={`bg-primary size-10 text-base pr-2 rounded-lg flex justify-end items-center`}
                        >
                            <FaChevronRight/>
                        </button>
                    </div>
                )}
                <div className={`sm:hidden bg-surface w-full flex items-center justify-between px-8`}>
                    <Logo/>
                    <button
                        title={`Toggle drawer`}
                        onClick={toggleDrawer}
                        className={`rounded-lg flex justify-center items-center text-white`}
                    >
                        <FaBars/>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

const SideContent = ({user, isDrawerOpen, toggleDrawer}) => {
    const firstLetter = user.name.charAt(0).toUpperCase();
    const secondLetter = user.name.split(" ")[1]?.charAt(0).toUpperCase();

    const pathname = usePathname();

    return (
        <aside className={`fixed top-0 h-svh flex flex-col justify-between border-e bg-surface transition-all duration-500 overflow-x-hidden
                          ${isDrawerOpen ? 'w-60 left-0' : 'w-0 -left-60'}`}>
            <div className={`px-4 py-6`}>
                <div className={`text-xs relative`}>
                    <Logo/>
                    <div className={`absolute -right-6 top-3`}>
                        <button
                            title={`Close drawer`}
                            onClick={toggleDrawer}
                            className={`bg-primary size-10 text-base rounded-lg flex justify-center sm:justify-start items-center sm:pl-2`}
                        >
                            <FaChevronLeft/>
                        </button>
                    </div>
                </div>

                <ul className={`mt-6 space-y-1`}>
                    {adminNavLinks.map((link, index) => {
                        if (link.type === 'link') {
                            const isActive = link.href === "/admin" ? pathname === link.href : pathname.startsWith(link.href);

                            return (
                                <li key={index} className={`capitalize`}>
                                    <Link
                                        href={link.href}
                                        className={`block rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary hover:text-black
                                        ${isActive ? 'bg-primary text-black' : 'text-gray-300'}`}
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            )
                        } else {
                            return (
                                <li key={index} className={`capitalize`}>
                                    <details className={`group [&_summary::-webkit-details-marker]:hidden`}>
                                        <summary
                                            className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-300 hover:bg-primary hover:text-black`}
                                        >
                                            <span className={`text-sm font-medium`}>{link.text}</span>
                                            <span
                                                className={`shrink-0 transition duration-300 group-open:-rotate-180`}>
                                            <ChevronDownIcon/>
                                        </span>
                                        </summary>

                                        <ul className={`mt-2 space-y-1 px-4`}>
                                            {link.subLinks.map((subLink, index) => {
                                                const isActive = pathname.startsWith(subLink.href);

                                                return (
                                                    <li key={index}>
                                                        <Link
                                                            href={subLink.href}
                                                            className={`block rounded-lg px-4 py-2 text-sm font-medium hover:bg-primary hover:text-black
                                                            ${isActive ? 'bg-primary text-black' : 'text-gray-300'}`}
                                                        >
                                                            {subLink.text}
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </details>
                                </li>
                            )
                        }
                    })}
                </ul>
            </div>

            <div className={`sticky inset-x-0 bottom-0 border-t border-secondary`}>
                <Link
                    href={`/admin/profile`}
                    className={`flex items-center gap-2 bg-secondary text-white p-4 hover:bg-gray-50 hover:text-black`}
                >
                    <div
                        className={`bg-primary font-bold text-black size-10 flex items-center justify-center rounded-full`}>
                        {firstLetter}{secondLetter}
                    </div>

                    <div>
                        <p className={`text-xs`}>
                            <strong className={`block font-medium`}>{user.name}</strong>
                            <span>{user.email}</span>
                        </p>
                    </div>
                </Link>
            </div>
        </aside>
    )
}

const ChevronDownIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-5"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
            />
        </svg>
    )
}

export default Sidebar;