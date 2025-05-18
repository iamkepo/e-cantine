"use client";
import { useState } from 'react';
import { Option } from '@/core/types';

import { useThemeStore } from '@/stores/themeStore';

export interface DropdownProps {
	chevron?: boolean;
	options: Option[];
}

export const Dropdown: React.FC<DropdownProps> = ({ chevron, options }) => {
	const { theme } = useThemeStore();
	const [selected, setSelected] = useState<Option>(options[0]);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option: Option) => {
		setSelected(option)
		option.action();
		setIsOpen(false); // Close dropdown after selecting an option
	};

	return (
		<div className="dropdown d-inline-block">
			{
				chevron ? 
				<button
					className={`btn btn-secondary`}
					type="button"
					onClick={toggleDropdown}
				>
					<span className='me-3'>{selected?.label}</span>
					<i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
				</button>
				:
				<i className="bi bi-three-dots-vertical" onClick={toggleDropdown}></i>
			}
			<ul className={`dropdown-menu dropdown-menu-${theme} ${isOpen ? 'show' : ''}`}>
				{options.filter(el => (el.label != selected.label)).map((option: Option, index: number) => (
					<li key={index}>
						<a
							href='#'
							className="dropdown-item"
							onClick={() => handleOptionClick(option)}
						>
							{option.label}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
};