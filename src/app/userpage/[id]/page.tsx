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
        return <div className="p-4 text-red-500">Invalid user ID format</div>;
    }

    const user = await getUser(userId);
    if (!user) {
        return <div className="p-4 text-red-500">User not found</div>;
    }

    return <UserPageClient initialUser={user} />;
    }




