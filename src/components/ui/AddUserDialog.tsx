
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
    import { Input } from "@/components/ui/input";
    import { Button } from "@/components/ui/button";
    import { useForm } from "react-hook-form";
    import { User } from "@/types/user";

    interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (data: User) => void;
    }

    export function AddUserDialog({ open, onOpenChange, onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<User>();

    const internalSubmit = (data: User) => {
        onSubmit(data);
        reset();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>Добавить нового пользователя</DialogTitle>
            <DialogDescription>Заполните форму ниже</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(internalSubmit)} className="space-y-4 mt-4">
            <Input placeholder="Имя" {...register("name", { required: true })} aria-invalid={errors.name ? "true" : "false"} />
            <Input placeholder="Фамилия" {...register("username", { required: true })} aria-invalid={errors.username ? "true" : "false"} />
            <Input placeholder="Email" type="email" {...register("email", { required: true })} aria-invalid={errors.email ? "true" : "false"} />
            <Input placeholder="Телефон" {...register("phone")} />
            <Input placeholder="Сайт" {...register("website")} />
            <Input placeholder="Компания" {...register("company.name", { required: true })} aria-invalid={errors.company?.name ? "true" : "false"} />
            <DialogFooter>
                <Button type="submit">Добавить</Button>
            </DialogFooter>
            </form>
        </DialogContent>
        </Dialog>
    );
    }
