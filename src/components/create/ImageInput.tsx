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

    console.log(process.env.NEXT_PUBLIC_GOOGLE_CLOUD_CLIENT_SECRET);

    const handleUploadImages = () => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const developerKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
        if (!clientId || !developerKey) return alert('Missing API keys');
        openPicker({
            clientId,
            developerKey,
            // token: process.env.NEXT_PUBLIC_GOOGLE_ACCESS_TOKEN,
            viewId: 'DOCS_IMAGES',
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            setParentFolder: process.env.NEXT_PUBLIC_GOOGLE_FOLDER_ID,
            callbackFunction: data => {
                if (data.action === 'cancel' || !data) return;
                if (data.docs == null || data.docs.length === 0) return;
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
