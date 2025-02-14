'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import Typography from '@tiptap/extension-typography';
import TextAlign from '@tiptap/extension-text-align';
import { ControllerRenderProps } from 'react-hook-form';

type Props = {
	field: ControllerRenderProps;
};

export function JobDescriptionEditor({ field }: Props) {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Typography,
			TextAlign.configure({
				types: ['heading', 'paragraph'],
			}),
		],
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class:
					'min-h-[280px] max-w-none p-4 focus:outline-none prose prose-sm sm:prose lg:prose-md xl-prose-lg dark:prose-invert',
			},
		},
		onUpdate: ({ editor }) => {
			field.onChange(JSON.stringify(editor.getJSON()));
		},

		content: field.value ? JSON.parse(field.value) : '',
	});

	return (
		<div className='w-full border rounded-lg bg-card overflow-hidden '>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
}
