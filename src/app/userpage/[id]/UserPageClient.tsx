"use client";

    import React, { useState }  from 'react';
    import { Button } from "@/components/ui/button";
    import { useRouter } from "next/navigation";
    import { useUsers } from "@/app/context/UserContext";
    import { User } from "@/types/user";
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { motion } from "framer-motion";

    export default function UserPageClient({ initialUser }: { initialUser: User }) {
    const router = useRouter();
    const { updateUser } = useUsers();
    const [user, setUser] = useState<User>(initialUser);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({
        ...prev,
        address: { ...prev.address, [name]: value },
        }));
    };

    const handleCompanyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({
        ...prev,
        company: { ...prev.company, [name]: value },
        }));
    };

    const handleSave = () => {
        updateUser(user.id, user);
        setIsEditing(false);
        router.push("/"); 
    };

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex items-center justify-center min-h-screen bg-gray-50 px-4"
        >
        <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-xl mx-auto">
            <div className="space-y-4">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            
            <div className="grid gap-4">
                <div>
                <Label>Username:</Label>
                <p className="mt-1">{user.username}</p>
                </div>

                <div>
                <Label>Email:</Label>
                <p className="mt-1">{user.email}</p>
                </div>

                <div>
                <Label>Address:</Label>
                <p className="mt-1">
                    {user.address.street}, {user.address.suite}<br />
                    {user.address.city}, {user.address.zipcode}
                </p>
                </div>

                <div>
                <Label>Company:</Label>
                <p className="mt-1">{user.company.name}</p>
                </div>
            </div>

            <div className="flex gap-4 mt-6">
                <Button variant="outline" onClick={() => router.back()}>
                Назад
                </Button>

                <Dialog open={isEditing} onOpenChange={setIsEditing}>
                <DialogTrigger asChild>
                    <Button>Редактировать</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                    <DialogTitle>Редактировать пользователя</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleInputChange}
                        className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleInputChange}
                        className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="street">Address</Label>
                        <Input
                        id="street"
                        name="street"
                        value={user.address.street}
                        onChange={handleAddressChange}
                        className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="city">City</Label>
                        <Input
                        id="city"
                        name="city"
                        value={user.address.city}
                        onChange={handleAddressChange}
                        className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="company">Company</Label>
                        <Input
                        id="company"
                        name="name"
                        value={user.company.name}
                        onChange={handleCompanyChange}
                        className="col-span-3"
                        />
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Отмена
                        </Button>
                        <Button onClick={handleSave}>Сохранить</Button>
                    </div>
                    </div>
                </DialogContent>
                </Dialog>
            </div>
            </div>
        </div>
        </motion.div>
    );
    }
