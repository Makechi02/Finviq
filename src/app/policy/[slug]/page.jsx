import {Footer} from "@/components/ui/preview";

export default async function Page({params}) {
    const {slug} = await params;

    return (
        <div className={`flex flex-col gap-4 min-h-svh`}>
            <main className={`flex-1 container mx-auto py-6 px-4`}>
                <h1 className={`font-gfs_didot text-3xl font-bold`}>{slug} policy</h1>
            </main>

            <Footer/>
        </div>
    )
}