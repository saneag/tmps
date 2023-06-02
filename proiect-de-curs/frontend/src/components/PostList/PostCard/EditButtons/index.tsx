import React from 'react';
import { useAppDispatch } from 'redux/store';
import { deletePost, setPostCreated } from 'redux/slices/postSlice';

interface ButtonProps {
    type: string;
    name?: string;
    className?: string;
    onClick?: () => void;
}

interface EditButtonsProps {
    postId: string;
}

const EditButtons = ({ postId }: EditButtonsProps) => {
    const dispatch = useAppDispatch();

    const [showEditButtons, setShowEditButtons] = React.useState(false);

    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    const handleDeletePost = async () => {
        setShowEditButtons(false);
        await dispatch(deletePost(postId));
        dispatch(setPostCreated(true));
    };

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                buttonRef.current &&
                !buttonRef.current.contains(
                    event.target as HTMLButtonElement
                ) &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as HTMLDivElement)
            ) {
                setShowEditButtons(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [buttonRef]);

    return (
        <div className="relative">
            <Button
                type="more_vert"
                className="text-gray-600 drop-shadow-sm"
                onClick={() => setShowEditButtons(!showEditButtons)}
                ref={buttonRef}
            />
            {showEditButtons && (
                <div
                    className="absolute right-0 top-[25px] flex
                    items-center gap-2 rounded-2xl bg-neutral-200 px-3 py-1"
                    ref={dropdownRef}
                >
                    <Button
                        type="edit"
                        className="text-blue-600 drop-shadow"
                        name="Edit"
                    />
                    <Button
                        type="delete"
                        className="text-red-500 drop-shadow-sm"
                        name="Delete"
                        onClick={handleDeletePost}
                    />
                </div>
            )}
        </div>
    );
};

const Button = React.forwardRef(
    (
        { type, name = '', className, onClick }: ButtonProps,
        ref: React.Ref<HTMLButtonElement>
    ) => {
        return (
            <button
                className={`${className} p-0.5`}
                onClick={onClick}
                ref={ref}
            >
                <span className="material-symbols-outlined block">{type}</span>
                {name && <span className="block text-xs">{name}</span>}
            </button>
        );
    }
);

export default EditButtons;
