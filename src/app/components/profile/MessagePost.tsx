
import Image from 'next/image';
import Link from 'next/link';


interface Message {
    id: string;
    author: string;
    text: string;
    timestamp: number;
    created_at: string;
    image_url?: string;
}

interface MessagePostProps {
    message: Message;
}

export default function MessagePost({ message }: MessagePostProps) {
    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };
        return date.toLocaleString('en-US', options);
    };

    return (
        <div className="bg-white shadow-sm p-4 rounded-lg">
            <div className="flex items-start space-x-3">
                <div className="w-10 h-10 relative overflow-hidden rounded-full flex-shrink-0">
                    <Image
                        src="/img/profile.jpeg"
                        alt={`${message.author}'s avatar`}
                        fill
                        sizes="40px"
                        className="rounded-full object-cover"
                    />
                </div>
                <div className="flex-grow">
                    <p className="font-semibold text-gray-800">{message.author}</p>
                    <p className="text-xs text-gray-500 mb-2">{formatDate(message.timestamp)}</p>

                    {message.text && message.text.trim().length > 0 && (
                        <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{message.text}</p>
                    )}

                    {message.image_url && (
                        <div className="mt-3 relative w-full h-64 overflow-hidden rounded-lg">
                            <Image
                                src={message.image_url}
                                alt="Uploaded photo"
                                fill
                                className="rounded-lg object-cover"

                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    )}
                    <div className="mt-2 text-xs text-gray-500 space-x-3">
                        <Link href="#" className="hover:underline">Comment</Link>
                        <Link href="#" className="hover:underline">Like</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}