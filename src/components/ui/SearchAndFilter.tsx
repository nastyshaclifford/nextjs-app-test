
    import { Input } from "@/components/ui/input";
    import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
    import { Button } from "@/components/ui/button";

    interface Props {
    search: string;
    setSearch: (val: string) => void;
    companyFilter: string | undefined;
    setCompanyFilter: (val: string) => void;
    companies: string[];
    onOpenAddDialog: () => void;
    }

    export function SearchAndFilter({ search, setSearch, companyFilter, setCompanyFilter, companies, onOpenAddDialog }: Props) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-6xl">
        <Input
            type="text"
            placeholder="Искать по имени..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow"
        />

        <Select onValueChange={setCompanyFilter} value={companyFilter || "all"}>
            <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by company" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="all">Все компании</SelectItem>
            {companies.map((company) => (
                <SelectItem key={company} value={company}>
                {company}
                </SelectItem>
            ))}
            </SelectContent>
        </Select>

        <Button onClick={onOpenAddDialog} className="whitespace-nowrap">Добавить пользователя</Button>
        </div>
    );
    }
