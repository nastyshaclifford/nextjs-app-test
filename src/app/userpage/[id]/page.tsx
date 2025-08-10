    import UserPageClient from "./UserPageClient";
    import { User } from "@/types/user";

    async function getUser(id: number): Promise<User | null> {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        next: { revalidate: 60 },
        });

        if (!res.ok) return null;
        
        const data = await res.json();
        return {
        id: data.id,
        name: data.name || '',
        username: data.username || '',
        email: data.email || '',
        phone: data.phone || '',
        website: data.website || '',
        address: {
            street: data.address?.street || '',
            suite: data.address?.suite || '',
            city: data.address?.city || '',
            zipcode: data.address?.zipcode || '',
        },
        company: {
            name: data.company?.name || '',
            catchPhrase: data.company?.catchPhrase || '',
            bs: data.company?.bs || '',
        }
        } as User;
    } catch (error) {
        console.error('Ошибка при загрузке пользователя:', error);
        return null;
    }
    }
    interface PageProps {
    params: {
        id: string;
    };
    }

    export default async function UserPage({ params }: PageProps) {
    const id = Number(params.id);
    if (isNaN(id)) return <div className="p-8 text-center">Неверный ID пользователя</div>;

    const user = await getUser(id);

    if (!user) return <div className="p-8 text-center">Пользователь не найден</div>;

    return <UserPageClient initialUser={user} />;
    }





