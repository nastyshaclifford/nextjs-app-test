    import React, { Suspense } from "react";
    import UserPageClient from "./UserPageClient";
    import Loading from "@/app/load";

    async function getUser(id: number) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
    }

    export default async function UserPage({ params }: { params: { id: string } }) {
    const user = await getUser(Number(params.id));

    return (
        <Suspense fallback={<Loading />}>
        <UserPageClient initialUser={user} />
        </Suspense>
    );
    }


