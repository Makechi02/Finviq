"use client"

import Link from "next/link";
import {useEffect, useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === '') {
            setErrorMessage("Email can't be blank");
            return;
        }

        if (password === '') {
            setErrorMessage("Password can't be blank");
            return;
        }

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        });

        if (result.error) {
            setErrorMessage(result.error);
        } else {
            const response = await fetch("/api/auth/session");
            const session = await response.json();
            const role = session.user.role;

            if (role === 'USER')
                router.push("/dashboard/user");
            else if (role === 'ADMIN')
                router.push("/dashboard/admin");
        }
    }

    useEffect(() => {
        setErrorMessage('');
    }, [email, password]);

    return (
        <section className={`h-full p-4 flex items-center justify-center`}>
            <div className={`flex flex-col gap-6 w-[90%] md:w-[60%]`}>
                <div>
                    <h1 className={`font-bold font-gfs_didot text-2xl`}>Welcome 👋</h1>
                    <p className={`text-sm text-gray-700`}>Please login here</p>
                </div>
                <form className={`flex flex-col gap-4`} onSubmit={handleSubmit}>
                    <div>
                        {errorMessage && (
                            <p className={`text-red-600 text-sm`}>{errorMessage}</p>
                        )}
                    </div>

                    <div className={`input-box`}>
                        <label htmlFor={`email`} className={`label`}>Email address *</label>
                        <input
                            type={`email`}
                            name={`email`}
                            className={`input`}
                            id={`email`}
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                        />
                    </div>

                    <div className={`input-box`}>
                        <label htmlFor={`password`} className={`label`}>Password *</label>
                        <input
                            type={`password`}
                            name={`password`}
                            className={`input`}
                            id={`password`}
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>

                    <button className={`bg-black text-white p-2 rounded-lg`}>Login</button>
                </form>

                <div className={`flex justify-between`}>
                    <Link href={`/accounts/register`} className={`text-sm text-gray-700 underline`}>
                        Create an account?
                    </Link>
                    <Link href={`/accounts/forgot-password`} className={`text-sm text-gray-700 underline`}>
                        Forgot password?
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Login;