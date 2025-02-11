'use client';

import TextAlign from '@tiptap/extension-text-align';
import Typography from '@tiptap/extension-typography';
import { EditorContent, JSONContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

const JSONtoHTMLView = ({ jsonData }: { jsonData: JSONContent }) => {
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
					'max-w-none focus:outline-none prose prose-sm lg:prose-md dark:prose-invert',
			},
		},
		editable: false,
		content: jsonData,
	});
	return <EditorContent editor={editor} />;
};

export default JSONtoHTMLView;
