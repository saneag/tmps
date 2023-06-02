import React from 'react';

const PostListSkeleton = () => {
    return (
        <div
            className="w-full animate-pulse rounded-xl bg-gray-300
            md:min-w-[600px]"
        >
            <div className="grid grid-cols-3 items-center gap-2 border-b-2 p-3">
                <div className="flex w-52 items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-400"></div>
                    <div className="h-7 w-40 bg-gray-400"></div>
                </div>
                <div
                    className="col-span-3 row-start-2 flex h-10
                    w-full justify-center bg-gray-400 text-center
                    md:col-span-1 md:col-start-2 md:row-span-2 md:row-start-1"
                ></div>
            </div>
            <div
                className="flex h-60 w-full flex-col gap-2 border-b-2 p-3
                md:flex-row"
            >
                <div className="flex flex-col justify-center gap-2 pl-3 md:w-5/12">
                    {Array.from({ length: 7 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex h-5 w-full rounded bg-gray-400"
                        ></div>
                    ))}
                </div>
                <div className="flex w-full items-center rounded-xl bg-gray-400 md:w-7/12"></div>
            </div>
            <div className="flex items-center justify-between p-3">
                <div className="h-7 w-32 rounded bg-gray-400"></div>
                <div className="flex gap-2">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div
                            key={index}
                            className="h-10 w-10 rounded-full bg-gray-400"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PostListSkeleton;
