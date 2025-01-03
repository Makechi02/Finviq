import Link from "next/link";
import {Logo} from "@/components/ui";
import {Login} from "@/components/pages";

export const metadata = {
    title: 'Login - Finviq'
}

const Page = () => {
    return (
        <section className={`p-1`}>
            <div className={`p-6`}>
                <Logo/>

                <div className={`my-6`}>
                    <h1 className={`font-bold text-2xl text-primary`}>Welcome Back! 👋</h1>
                    <p className={`text-sm`}>Please log in to continue</p>
                </div>

                <Login/>
            </div>

            <div
                className={`bg-background flex flex-wrap items-center justify-center gap-1 py-3 px-4 rounded-lg mt-4 text-center`}>
                <p>Not a member?</p>
                <Link
                    href={`/accounts/register`}
                    className={`font-bold hover:underline`}
                >
                    Create an account
                </Link>
            </div>
        </section>
    );
};

export default Page;
