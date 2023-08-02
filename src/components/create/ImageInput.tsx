'use client';

import { showToast } from '@/util/toastNotification';
import { useRef } from 'react';
import useDrivePicker from 'react-google-drive-picker';

type ImageInputProps = {
    onChange: (images: any) => void;
};

export type DriveImageProps = {
    name: string;
    id: string;
};

export default function ImageInput({ onChange }: ImageInputProps) {
    const [openPicker] = useDrivePicker();
    const accessTokenRef = useRef<string | null>(null);
    const expiryRef = useRef<number | null>(null);

    const getNewAccessToken = async (clientId: string, refreshToken: string) => {
        const clientSecret = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

        const url = 'https://oauth2.googleapis.com/token';
        const params = new URLSearchParams();
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret!);
        params.append('refresh_token', refreshToken);
        params.append('grant_type', 'refresh_token');

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        });

        const { access_token, expires_in } = await response.json();
        const expiryTime = Date.now() + expires_in * 1000;
        accessTokenRef.current = access_token;
        expiryRef.current = expiryTime;
    };

    const handleUploadImages = async () => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const developerKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
        const refreshToken = process.env.NEXT_PUBLIC_GOOGLE_REFRESH_TOKEN;
        if (!clientId || !developerKey || !refreshToken) return showToast('Missing authorization keys');

        if (!accessTokenRef.current || !expiryRef.current || Date.now() >= expiryRef.current) {
            await getNewAccessToken(clientId, refreshToken);
        }

        openPicker({
            clientId,
            developerKey,
            token: accessTokenRef.current!,
            viewId: 'DOCS_IMAGES',
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            setParentFolder: process.env.NEXT_PUBLIC_GOOGLE_FOLDER_ID,
            callbackFunction: data => {
                if (data.action === 'cancel' || !data) return;
                if (data.docs == null || data.docs.length === 0) return;
                console.log(data);
                onChange([
                    ...data.docs.map(({ name, id }: DriveImageProps) => {
                        return { name, url: `https://drive.google.com/uc?export=view&id=${id}` };
                    }),
                ]);
            },
        });
    };

    return (
        <button onClick={handleUploadImages} className={`relative flex w-full flex-col items-center gap-2 rounded-md border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-6 hover:opacity-60`}>
            <p className='text-xs text-slate-500 lg:text-sm '>Drag & Drop your images or click to browse files</p>
        </button>
    );
}
