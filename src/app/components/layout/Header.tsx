import Link from 'next/link';
import { Input } from '@/components/ui/input'; // Shadcn Input
import { Button } from '@/components/ui/button'; // Shadcn Button

export default function Header() {
    return (
        <header className="bg-white shadow-sm py-2">
            <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-4">

                    <nav className="hidden md:flex space-x-4">
                        <Link href="#" className="text-gray-700 hover:text-blue-600">Home</Link>
                    </nav>
                </div>

                {/* i make this as static right now */}
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Joshua La rosa</span>
                    <span className="text-gray-700">Settings</span>
                    <Link href="#" className="text-gray-700 hover:text-blue-600">Logout</Link>
                    <div className="relative">
                        <Input type="search" placeholder="Search" className="pl-8" />
                        <svg className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                </div>
            </div>
        </header>
    );
}