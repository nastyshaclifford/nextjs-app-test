    import Link from "next/link";

    export default function Header() {
    return (
        <header className="bg-black sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
            <Link href="/" className="text-2xl font-bold text-white hover:text-white transition">
            UserApp
            </Link>

            <nav className="space-x-6 text-white font-medium hidden sm:flex">
            <Link href="/" className="hover:text-white transition">
                Главная
            </Link>
            <Link href="/k" className="hover:text-white transition">
                О нас
            </Link>
            </nav>
        </div>
        </header>
    );
    }

