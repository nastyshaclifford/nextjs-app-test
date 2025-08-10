
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
    import { Button } from "@/components/ui/button";
    import Link from "next/link";
    import { User } from "@/types/user";

    interface Props {
    user: User;
    onDelete: (id: number) => void;
    }

    export function UserCard({ user, onDelete }: Props) {
    return (
        <Card className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 hover:shadow-md hover:border-blue-200">
        <CardHeader>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>User name</CardDescription>
        </CardHeader>
        <CardContent>
            <CardTitle>{user.email}</CardTitle>
            <CardDescription>Email</CardDescription>
            <CardTitle>{user.company.name}</CardTitle>
            <CardDescription>Company</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between">
            <Link href={`/userpage/${user.id}`}>
            <Button variant="default">Подробнее</Button>
            </Link>
            <Button variant="default" onClick={() => onDelete(user.id)}>
            Удалить
            </Button>
        </CardFooter>
        </Card>
    );
    }
