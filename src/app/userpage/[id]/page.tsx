    import React from "react";
    import UserPageClient from "./UserPageClient";

    async function getUser(id: number) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
    }

    interface UserPageProps {
    params: {
        id: string;
    };
    }

    export default async function UserPage({ params }: UserPageProps) {
    const user = await getUser(Number(params.id));

    if (!user) {
        return <div>Ошибка загрузки пользователя</div>;
    }

    return <UserPageClient initialUser={user} />;
    }



