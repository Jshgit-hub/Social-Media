// src/components/profile/MainContent.tsx

"use client";

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import MessagePost from './MessagePost';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image'; // Import Next.js Image component for preview

interface Message {
    id: string;
    author: string;
    text: string;
    timestamp: number;
    created_at: string;
    image_url?: string;
}

export default function MainContent() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessageText, setNewMessageText] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null); // New state for image preview
    const [loading, setLoading] = useState<boolean>(true);
    const [sharing, setSharing] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const MAX_CHARS = 280;
    const WALL_PHOTOS_BUCKET = 'wall-photos'; // Your Supabase Storage bucket name

    const fetchMessages = useCallback(async () => {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .order('timestamp', { ascending: false });

        if (error) {
            console.error('Error fetching messages:', error);
            setError('Failed to load messages.');
        } else {
            setMessages(data || []);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    useEffect(() => {
        const channel = supabase
            .channel('wall_messages_channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'messages' },
                (payload) => {
                    console.log('Realtime change received!', payload);
                    fetchMessages();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [fetchMessages]);

    // Handler for file input change - now also creates and sets preview URL
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            // Create a URL for the image preview
            setImagePreviewUrl(URL.createObjectURL(file));
        } else {
            setSelectedFile(null);
            setImagePreviewUrl(null); // Clear preview if no file is selected
        }
    };

    // Effect to clean up the object URL when the component unmounts or file changes
    useEffect(() => {
        return () => {
            if (imagePreviewUrl) {
                URL.revokeObjectURL(imagePreviewUrl); // Clean up the temporary URL
            }
        };
    }, [imagePreviewUrl]);

    const handleShare = async () => {
        setSharing(true);
        const trimmedMessage = newMessageText.trim();
        let imageUrl: string | null = null;

        if (!trimmedMessage && !selectedFile) {
            alert("Message text or a photo is required to share!");
            setSharing(false);
            return;
        }

        if (trimmedMessage.length > MAX_CHARS) {
            alert(`Message exceeds ${MAX_CHARS} characters.`);
            setSharing(false);
            return;
        }

        try {
            if (selectedFile) {
                const fileExtension = selectedFile.name.split('.').pop();
                const filePath = `${uuidv4()}.${fileExtension}`;
                console.log("Attempting to upload file to:", filePath);

                const { error: uploadError } = await supabase.storage
                    .from(WALL_PHOTOS_BUCKET)
                    .upload(filePath, selectedFile, {
                        cacheControl: '3600',
                        upsert: false,
                    });

                if (uploadError) {
                    throw new Error(`File upload failed: ${uploadError.message}`);
                }

                const { data: publicUrlData } = supabase.storage
                    .from(WALL_PHOTOS_BUCKET)
                    .getPublicUrl(filePath);

                if (publicUrlData) {
                    imageUrl = publicUrlData.publicUrl;
                    console.log("Uploaded image public URL:", imageUrl);
                } else {
                    throw new Error("Could not get public URL for uploaded image.");
                }
            }

            const newMessageData: Omit<Message, 'id' | 'created_at'> = {
                author: 'Joshua La rosa', // i Hardcoded author for now
                text: trimmedMessage,
                timestamp: Date.now(),
                ...(imageUrl && { image_url: imageUrl }),
            };

            console.log("Attempting to insert message data:", newMessageData);

            const { error: insertError } = await supabase
                .from('messages')
                .insert([newMessageData]);

            if (insertError) {
                throw new Error(`Message insertion failed: ${insertError.message}`);
            }

            setNewMessageText('');
            setSelectedFile(null);
            setImagePreviewUrl(null); // Clear the preview after successful share

        } catch (err: unknown) { // Changed 'err: Error' to 'err: unknown'
            console.error('Error sharing message or uploading file:', err);
            let errorMessage = 'Unknown error';
            // Safely check if err is an instance of Error before accessing .message
            if (err instanceof Error) {
                errorMessage = err.message;
            } else if (typeof err === 'object' && err !== null && 'message' in err && typeof err.message === 'string') {
                // Fallback for objects that have a message property but aren't Error instances
                errorMessage = err.message;
            }
            setError(`Failed to share message: ${errorMessage}. Check console for details.`);
            alert(`Failed to share message: ${errorMessage}. Check console for details.`);
        } finally {
            setSharing(false);
        }
    };

    const charsRemaining = MAX_CHARS - newMessageText.length;
    const isOverLimit = charsRemaining < 0;

    const isShareDisabled = isOverLimit || (newMessageText.trim().length === 0 && !selectedFile) || sharing;

    return (
        <div className="space-y-4">
            {/* Post/Attach Section */}
            <div className="bg-white shadow-sm p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                    <label htmlFor="file-upload" className="cursor-pointer">
                        <Button variant="outline" size="sm" asChild>
                            <span>Attach Photo</span>
                        </Button>
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    {selectedFile && <span className="text-gray-600 text-sm italic">{selectedFile.name}</span>}
                </div>

                {/* Image Preview Area */}
                {imagePreviewUrl && (
                    <div className="mb-4 relative w-full h-48 overflow-hidden rounded-lg border border-gray-200">
                        <Image
                            src={imagePreviewUrl}
                            alt="Image Preview"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {/* Optional: Add a button to clear the selected image */}
                        <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 z-10"
                            onClick={() => {
                                setSelectedFile(null);
                                setImagePreviewUrl(null);
                            }}
                        >
                            Clear
                        </Button>
                    </div>
                )}

                <Textarea
                    placeholder="What's on your mind, Greg?"
                    className="mb-2"
                    rows={3}
                    value={newMessageText}
                    onChange={(e) => setNewMessageText(e.target.value)}
                    maxLength={MAX_CHARS}
                    disabled={sharing}
                />
                <div className="text-right text-xs mt-1 mb-3">
                    <span className={isOverLimit ? 'text-red-500' : 'text-gray-500'}>
                        {charsRemaining} characters remaining
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    {/* Removed "New Privacy Control" div for brevity, add back if needed */}
                    <Button
                        onClick={handleShare}
                        disabled={isShareDisabled}
                    >
                        {sharing ? 'Sharing...' : 'Share'}
                    </Button>
                </div>
            </div>

            {/* Live Feed of Messages */}
            {loading ? (
                <div className="bg-white shadow-sm p-4 rounded-lg text-center text-gray-500">
                    Loading messages...
                </div>
            ) : error ? (
                <div className="bg-white shadow-sm p-4 rounded-lg text-center text-red-500">
                    Error: {error}
                </div>
            ) : messages.length > 0 ? (
                messages.map(message => (
                    <MessagePost key={message.id} message={message} />
                ))
            ) : (
                <div className="bg-white shadow-sm p-4 rounded-lg text-center text-gray-500">
                    No messages yet. Be the first to share something!
                </div>
            )}
        </div>
    );
}