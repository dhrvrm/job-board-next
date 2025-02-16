import React from 'react';
import { Editor } from '@tiptap/react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { Toggle } from '@/components/ui/toggle';
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	Bold,
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
	Heading6,
	Italic,
	ListIcon,
	ListOrdered,
	Redo,
	Strikethrough,
	Undo,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

type Props = {
	editor: Editor | null;
};
const MenuBar = ({ editor }: Props) => {
	if (!editor) {
		return null;
	}

	return (
		<div className='flex flex-wrap p-2 border rounded-t-lg bg-card gap-1 items-center '>
			<TooltipProvider>
				<div className='flex flex-wrap gap-1'>
					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size='sm'
								pressed={editor.isActive('bold')}
								onPressedChange={() =>
									editor.chain().focus().toggleBold().run()
								}
								className={cn(
									editor.isActive('bold') && 'bg-muted text-muted-foreground'
								)}
							>
								<Bold />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Bold [ctrl+b]</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size='sm'
								pressed={editor.isActive('italic')}
								onPressedChange={() =>
									editor.chain().focus().toggleItalic().run()
								}
								className={cn(
									editor.isActive('italic') && 'bg-muted text-muted-foreground'
								)}
							>
								<Italic />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Italic</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size='sm'
								pressed={editor.isActive('strike')}
								onPressedChange={() =>
									editor.chain().focus().toggleStrike().run()
								}
								className={cn(
									editor.isActive('strike') && 'bg-muted text-muted-foreground'
								)}
							>
								<Strikethrough />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Strike-Through</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size='sm'
								pressed={editor.isActive('heading', { level: 1 })}
								onPressedChange={() =>
									editor.chain().focus().toggleHeading({ level: 1 }).run()
								}
								className={cn(
									editor.isActive('heading', { level: 1 }) &&
										'bg-muted text-muted-foreground'
								)}
							>
								<Heading1 />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Heading 1</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size='sm'
								pressed={editor.isActive('heading', { level: 2 })}
								onPressedChange={() =>
									editor.chain().focus().toggleHeading({ level: 2 }).run()
								}
								className={cn(
									editor.isActive('heading', { level: 2 }) &&
										'bg-muted text-muted-foreground'
								)}
							>
								<Heading2 />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Heading 2</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size='sm'
								pressed={editor.isActive('heading', { level: 3 })}
								onPressedChange={() =>
									editor.chain().focus().toggleHeading({ level: 3 }).run()
								}
								className={cn(
									editor.isActive('heading', { level: 3 }) &&
										'bg-muted text-muted-foreground'
								)}
							>
								<Heading3 />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Heading 3</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size='sm'
								pressed={editor.isActive('heading', { level: 4 })}
								onPressedChange={() =>
									editor.chain().focus().toggleHeading({ level: 4 }).run()
								}
								className={cn(
									editor.isActive('heading', { level: 4 }) &&
										'bg-muted text-muted-foreground'
								)}
							>
								<Heading4 />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Heading 4</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size='sm'
								pressed={editor.isActive('heading', { level: 5 })}
								onPressedChange={() =>
									editor.chain().focus().toggleHeading({ level: 5 }).run()
								}
								className={cn(
									editor.isActive('heading', { level: 5 }) &&
										'bg-muted text-muted-foreground'
								)}
							>
								<Heading5 />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Heading 5</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size='sm'
								pressed={editor.isActive('heading', { level: 6 })}
								onPressedChange={() =>
									editor.chain().focus().toggleHeading({ level: 6 }).run()
								}
								className={cn(
									editor.isActive('heading', { level: 6 }) &&
										'bg-muted text-muted-foreground'
								)}
							>
								<Heading6 />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Heading 6</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size='sm'
								pressed={editor.isActive('bulletList')}
								onPressedChange={() =>
									editor.chain().focus().toggleBulletList().run()
								}
								className={cn(
									editor.isActive('bulletList') &&
										'bg-muted text-muted-foreground'
								)}
							>
								<ListIcon />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Bullet List</TooltipContent>
					</Tooltip>

					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size='sm'
								pressed={editor.isActive('orderedList')}
								onPressedChange={() =>
									editor.chain().focus().toggleOrderedList().run()
								}
								className={cn(
									editor.isActive('orderedList') &&
										'bg-muted text-muted-foreground'
								)}
							>
								<ListOrdered />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Ordered List</TooltipContent>
					</Tooltip>

					<div className='w-px h-6 bg-border mx-2'></div>

					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size='sm'
								pressed={editor.isActive({ textAlign: 'left' })}
								onPressedChange={() =>
									editor.chain().focus().setTextAlign('left').run()
								}
								className={cn(
									editor.isActive({ textAlign: 'left' }) &&
										'bg-muted text-muted-foreground'
								)}
							>
								<AlignLeft />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Align Left</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size='sm'
								pressed={editor.isActive({ textAlign: 'center' })}
								onPressedChange={() =>
									editor.chain().focus().setTextAlign('center').run()
								}
								className={cn(
									editor.isActive({ textAlign: 'center' }) &&
										'bg-muted text-muted-foreground'
								)}
							>
								<AlignCenter />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Align Center</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Toggle
								size='sm'
								pressed={editor.isActive({ textAlign: 'right' })}
								onPressedChange={() =>
									editor.chain().focus().setTextAlign('right').run()
								}
								className={cn(
									editor.isActive({ textAlign: 'right' }) &&
										'bg-muted text-muted-foreground'
								)}
							>
								<AlignRight />
							</Toggle>
						</TooltipTrigger>
						<TooltipContent>Align Right</TooltipContent>
					</Tooltip>

					<div className='w-px h-6 bg-border mx-2'></div>

					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size='sm'
								variant='ghost'
								onClick={() => editor.chain().focus().undo().run()}
								type='button'
								disabled={!editor.can().undo()}
							>
								<Undo />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Undo</TooltipContent>
					</Tooltip>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								size='sm'
								variant='ghost'
								onClick={() => editor.chain().focus().redo().run()}
								type='button'
								disabled={!editor.can().redo()}
							>
								<Redo />
							</Button>
						</TooltipTrigger>
						<TooltipContent>Redo</TooltipContent>
					</Tooltip>
				</div>
			</TooltipProvider>
		</div>
	);
};

export default MenuBar;
