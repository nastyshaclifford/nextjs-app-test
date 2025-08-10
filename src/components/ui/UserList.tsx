import { UserCard } from "./UserCard";
import Loading from "@/app/load";
import ErrorCard from "./ErrorCard";
import { User } from "@/types/user";

interface Props {
users: User[];
loading: boolean;
error: boolean;
onDelete: (id: number) => void;
}

export function UserList({ users, loading, error, onDelete }: Props) {
if (loading) return <Loading />;
if (error) return <ErrorCard message="Ошибка заугрузки"/>;
if (users.length === 0) {
    return <p className="text-gray-500">Пользователи не найдены</p>;
}

return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
    {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={onDelete} />
    ))}
    </div>
);
}

