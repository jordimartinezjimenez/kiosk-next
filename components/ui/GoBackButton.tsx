"use client"
import { useRouter } from 'next/navigation'

export default function GoBackButton() {

    const router = useRouter()

    return (
        <button
            onClick={() => router.back()}
            className="bg-amber-400 hover:bg-amber-500 rounded transition-colors w-full lg:w-auto textl-xl px-10 py-3 text-center font-bold cursor-pointer "
        >Go back</button>
    )
}
