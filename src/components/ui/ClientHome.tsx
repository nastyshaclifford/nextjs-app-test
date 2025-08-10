"use client";

import { useUsers } from "@/app/context/UserContext";
import { SearchAndFilter } from "./SearchAndFilter";
import { UserList } from "./UserList";
import { AddUserDialog } from "./AddUserDialog";
import { useState } from "react";
import { User } from "@/types/user";

export default function ClientHome() {
const { users, addUser, deleteUser } = useUsers();
const [search, setSearch] = useState("");
const [companyFilter, setCompanyFilter] = useState<string>();
const [isDialogOpen, setIsDialogOpen] = useState(false);

const companies = Array.from(new Set(users.map(u => u.company.name)));

const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase());
    const matchesCompany = companyFilter ? user.company.name === companyFilter : true;
    return matchesSearch && matchesCompany;
});

const handleAddUser = (userData: Omit<User, 'id'>) => {
    const newUser = {
    ...userData,
    id: Math.max(0, ...users.map(u => u.id)) + 1 
    };
    addUser(newUser);
    setIsDialogOpen(false);
};

return (
    <div className="container mx-auto py-8">
    <SearchAndFilter
        search={search}
        setSearch={setSearch}
        companyFilter={companyFilter}
        setCompanyFilter={setCompanyFilter}
        companies={companies}
        onOpenAddDialog={() => setIsDialogOpen(true)}
    />

<UserList
        users={filteredUsers}
        loading={false}
        error={false}
        onDelete={deleteUser}
    />

    <AddUserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddUser}
    />
    </div>
);
}



