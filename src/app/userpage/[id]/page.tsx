    import UserPageClient from "./UserPageClient";
    import { User } from "@/types/user";

    async function getUser(id: number): Promise<User | null> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
    }

    interface PageProps {
    params: { id: string };
    }

    export default async function UserPage({ params }: PageProps) {
    const user = await getUser(Number(params.id));

    if (!user) return <div>Пользователь не найден</div>;

    return <UserPageClient initialUser={user} />;
    }




