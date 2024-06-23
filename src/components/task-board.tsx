'use client';
import { DEFAULT_CARDS } from '@/data/data';
import { cn } from '@/lib/utils';
import { Flame, Plus, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';

interface ColumnProps {
	title: string;
	headingColor: string;
	column: string;
	cards: typeof DEFAULT_CARDS;
	setCards: Function;
}
interface CardProps {
	title: string;
	id: string;
	column: string;
}

interface DropIndicatorProps {
	before: string;
	column: string;
}

const TaskBoard = () => {
	return (
		<div className='bg-muted w-full h-[90vh] text-muted-foreground'>
			<Board />
		</div>
	);
};

const Board = () => {
	const [cards, setCards] = useState(DEFAULT_CARDS);
	return (
		<div className='flex gap-3 p-12 w-full h-full overflow-scroll'>
			<Column
				title='To Do'
				headingColor='red-500'
				column='todo'
				cards={cards}
				setCards={setCards}
			/>
			<Column
				title='In Progress'
				headingColor='yellow-500'
				column='in-progress'
				cards={cards}
				setCards={setCards}
			/>
			<Column
				title='Done'
				headingColor='green-500'
				column='done'
				cards={cards}
				setCards={setCards}
			/>
			<DropZone setCards={setCards} />
		</div>
	);
};

const Column = ({
	title,
	headingColor,
	column,
	cards,
	setCards
}: ColumnProps) => {
	const [activeCard, setActiveCard] = useState(false);
	const filteredCards = cards.filter(card => card.column === column);
	return (
		<div className='w-56 shrink-0'>
			<div className='flex justify-between items-center mb-3'>
				<h3 className={`text-${headingColor}`}>{title}</h3>
				<span className='rounded text-secondary-foreground text-sm'>
					{filteredCards.length}
				</span>
			</div>
			<div
				className={`h-full w-full p-2 transition-colors ${
					activeCard ? 'bg-primary/50' : 'bg-primary/20'
				}`}>
				{filteredCards.map(card => (
					<Card key={card.id} {...card} />
				))}
				<DropIndicator before='-1' column={column} />
				<AddCard column={column} setCards={setCards} />
			</div>
		</div>
	);
};

const Card = ({ title, id, column }: CardProps) => {
	return (
		<>
			<DropIndicator before={id} column={column} />
			<div
				draggable={true}
				className='bg-muted p-3 border rounded cursor-grab active:cursor-grabbing'>
				<p className='text-muted-foreground text-sm'>{title} </p>
			</div>
		</>
	);
};

const DropIndicator = ({ before, column }: DropIndicatorProps) => {
	return (
		<div
			data-before={before || '-1'}
			data-column={column}
			className={cn(
				'bg-primary opacity-0 my-0.5 w-full h-0.5'
			)}></div>
	);
};

const DropZone = ({ setCards }: { setCards: Function }) => {
	const [active, setActive] = useState(false);
	return (
		<div
			className={cn(
				'mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl border-muted-foreground bg-muted-foreground/50 text-muted-foreground transition-colors cursor-pointer',
				active && 'border-red-800 bg-red-800/20 text-red-500'
			)}>
			{active ? (
				<Flame className='w-10 h-10' />
			) : (
				<Trash className='w-10 h-10' />
			)}
		</div>
	);
};

const AddCard = ({
	column,
	setCards
}: {
	column: string;
	setCards: Function;
}) => {
	const [text, setText] = useState('');
	const [adding, setAdding] = useState(false);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!text.trim().length) return;

		const newCard = {
			column,
			title: text.trim(),
			id: Math.random().toString(36)
		};
		setCards((prev: any) => [...prev, newCard]);
		setText('');
		setAdding(false);
	};
	return (
		<>
			{adding ? (
				<form onSubmit={handleSubmit}>
					<textarea
						placeholder='Enter card title'
						className='border-primary bg-primary/20 p-3 border rounded w-full text-primary-foreground text-sm placeholder-primary-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 transition-colors'
						value={text}
						onChange={e => setText(e.target.value)}
					/>
					<div className='flex justify-end items-center gap-1.5 mt-1.5'>
						<Button
							onClick={() => setAdding(false)}
							variant={'ghost'}
							className='hover:bg-transparent px-3 py-1.5 text-muted-foreground text-xs'>
							<span>close</span>
						</Button>
						<Button
							type='submit'
							variant={'ghost'}
							className='gap-1.5 hover:bg-primary px-3 py-1.5 text-secondary-foreground text-xs hover:text-primary-foreground'>
							<span>Add</span>
							<Plus className='w-4 h-4' />
						</Button>
					</div>
				</form>
			) : (
				<Button
					variant={'ghost'}
					className='flex justify-start items-center gap-1.5 hover:bg-primary/30 px-3 py-1.5 w-full text-muted-foreground text-xs hover:text-primary-foreground transition-colors'
					onClick={() => setAdding(true)}>
					<span>Add Card</span>
					<Plus className='w-4 h-4' />
				</Button>
			)}
		</>
	);
};

export default TaskBoard;
