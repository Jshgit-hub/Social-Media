

import { Button } from '@/components/ui/button';

export default function ProfileHeader() {
    return (
        <div className="bg-white shadow-sm p-4 rounded-lg mb-4">
            <nav className="pt-3"> {/* Removed border-t and pt-3 if it looks better without it, otherwise keep it */}
                <ul className="flex space-x-6 text-gray-600">
                    <li><Button variant="link" className="text-blue-600 font-bold p-0">Wall</Button></li>
                    <li><Button variant="link" className="p-0">Info</Button></li>
                    <li><Button variant="link" className="p-0">Photos</Button></li>
                    <li><Button variant="link" className="p-0">Notes</Button></li>
                    <li><Button variant="link" className="p-0">Boxes</Button></li>
                </ul>
            </nav>
        </div>
    );
}