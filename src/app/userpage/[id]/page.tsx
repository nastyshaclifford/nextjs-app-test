    import UserPageClient from "./UserPageClient";
    import { User } from "@/types/user";

    async function getUser(id: number): Promise<User | null> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!res.ok) return null;
    return res.json();
    }

    interface UserPageParams {
    params: {
        id: string;
    };
    }

    export default async function UserPage({ params }: UserPageParams) {
    const userId = parseInt(params.id, 10);
    if (isNaN(userId)) {
        return <div className="p-4 text-red-500">Неверный номер пользователя</div>;
    }

    const user = await getUser(userId);
    if (!user) {
        return <div className="p-4 text-red-500">Пользователь не найден</div>;
    }

    return <UserPageClient initialUser={user} />;
    }




