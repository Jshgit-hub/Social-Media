

import Link from 'next/link';
import Image from 'next/image';

export default function ProfileSidebar() {
    return (
        <div className="bg-white shadow-sm p-4 rounded-lg sticky top-4">

            <div className="flex flex-col items-center mb-6">
                <div className="w-48 h-48 relative overflow-hidden rounded-md border border-gray-200 bg-gray-50 mb-3">

                    <Image
                        src="/img/profile.jpeg"
                        alt="Greg Wientjes Profile Photo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                    />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Joshua La Rosa</h2>
                <p className="text-gray-600 text-sm">Wall</p>
            </div>





            <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Information</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                    <li><span className="font-medium">Networks:</span> Nueva Ecija Science and technology</li>
                    <li><span className="font-medium">Current City:</span> Cabanatuan city</li>

                </ul>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
                <h3 className="font-semibold text-gray-800 mb-2">Mutual Friends</h3>
                <p className="text-sm text-gray-700">287 friends in common <Link href="#" className="text-blue-600 hover:underline">See All</Link></p>
                {/* You'd add a grid of mutual friend avatars here */}
            </div>
        </div>
    );
}