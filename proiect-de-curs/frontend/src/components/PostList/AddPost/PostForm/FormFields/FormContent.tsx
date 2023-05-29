import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Paragraph } from '@tiptap/extension-paragraph';

interface Props {
    content: string;
    setContent: (content: string) => void;
}

const FormContent = ({ content, setContent }: Props) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Paragraph.configure({
                HTMLAttributes: {
                    class:
                        'block max-h-[50vh] min-h-[200px] w-full ' +
                        'overflow-y-auto rounded-2xl bg-gray-500 p-3 ' +
                        'text-xl text-white outline-none scrollbar',
                },
            }),
        ],
        editorProps: {
            attributes: {
                class: 'focus:outline-none',
            },
        },
        content: content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
    });

    return (
        <div className="flex justify-center">
            <div className="flex w-11/12 flex-col items-center md:w-7/12">
                <div className="flex w-full justify-evenly">
                    <MenuBar editor={editor} />
                </div>
                <EditorContent editor={editor} className="w-full" />
            </div>
        </div>
    );
};

const MenuBar = ({ editor }: any) => {
    if (!editor) return null;

    const editorButtons = [
        {
            icon: 'format_bold',
            command: () => editor.chain().focus().toggleBold().run(),
            disabled: !editor.can().chain().focus().toggleBold().run(),
        },
        {
            icon: 'format_italic',
            command: () => editor.chain().focus().toggleItalic().run(),
            disabled: !editor.can().chain().focus().toggleItalic().run(),
        },
        {
            icon: 'format_strikethrough',
            command: () => editor.chain().focus().toggleStrike().run(),
            disabled: !editor.can().chain().focus().toggleStrike().run(),
        },
        {
            icon: 'undo',
            command: () => editor.chain().focus().undo().run(),
            disabled: !editor.can().chain().focus().undo().run(),
        },
        {
            icon: 'redo',
            command: () => editor.chain().focus().redo().run(),
            disabled: !editor.can().chain().focus().redo().run(),
        },
    ];

    return (
        <>
            {editorButtons.map((button, index) => (
                <button
                    key={index}
                    onClick={button.command}
                    disabled={button.disabled}
                >
                    <span className="material-symbols-outlined">
                        {button.icon}
                    </span>
                </button>
            ))}
        </>
    );
};

export default FormContent;
