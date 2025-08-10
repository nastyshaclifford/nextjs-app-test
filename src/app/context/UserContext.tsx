"use client";

    import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
    import { User } from "@/types/user";

    interface UserContextType {
    users: User[];
    updateUser: (id: number, updatedUser: User) => void;
    deleteUser: (id: number) => void;
    addUser: (user: User) => void;
    }

    const UserContext = createContext<UserContextType | undefined>(undefined);

    export function UserProvider({
    initialUsers,
    children,
    }: {
    initialUsers: User[];
    children: ReactNode;
    }) {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("users");
        if (saved) {
        setUsers(JSON.parse(saved));
        } else {
        setUsers(initialUsers);
        localStorage.setItem("users", JSON.stringify(initialUsers));
        }
    }, [initialUsers]);

    const saveToLocalStorage = (newUsers: User[]) => {
        setUsers(newUsers);
        localStorage.setItem("users", JSON.stringify(newUsers));
    };

    const updateUser = (id: number, updatedUser: User) => {
        saveToLocalStorage(users.map(user => (user.id === id ? updatedUser : user)));
    };

    const deleteUser = (id: number) => {
        saveToLocalStorage(users.filter(user => user.id !== id));
    };

    const addUser = (user: User) => {
        saveToLocalStorage([...users, user]);
    };

    return (
        <UserContext.Provider value={{ users, updateUser, deleteUser, addUser }}>
        {children}
        </UserContext.Provider>
    );
    }

    export function useUsers() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("Хук useUsers нужно вызывать внутри UserProvide");
    }
    return context;
    }





