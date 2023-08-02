export default function Loading() {
    return (
        <div className='flex flex-grow items-center justify-center'>
            <div style={{ translate: '-35px' }}>
                <div
                    className='aspect-square w-4 rounded-sm bg-slate-500'
                    style={{
                        animation: 'loading 1.5s cubic-bezier(0.17, 0.37, 0.43, 0.67) infinite',
                    }}
                ></div>
            </div>
        </div>
    );
}
