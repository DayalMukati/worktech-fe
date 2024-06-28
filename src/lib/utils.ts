import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export function checkPathMatch(
	currentPath: string,
	menuItemHref: string
): boolean {
	const regex = new RegExp(menuItemHref);
	return regex.test(currentPath);
}

export function getInitials(name?: string) {
	if (!name) return '';
	return name
		.match(/\b(\w)/g)
		?.join('')
		.toUpperCase();
}

export function sleep(ms: number) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
