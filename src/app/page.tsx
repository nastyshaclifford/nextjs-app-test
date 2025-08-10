import ClientHome from "@/components/ui/ClientHome";
import { UserProvider } from "@/app/context/UserContext";
import { User } from "@/types/user";

async function getUsers(): Promise<User[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    throw new Error('Failed to fetch users');
  }

  return res.json();
}

export default async function Home() {
  const initialUsers = await getUsers();

  return (
    <UserProvider initialUsers={initialUsers}>
      <ClientHome />
    </UserProvider>
  );
}

