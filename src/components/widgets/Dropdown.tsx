import { useState } from 'react';
import { Option } from '../../helpers/types';
import { useThemeStore } from '../../stores/themeStore';

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
		<div className="dropdown">
			<button
				className={`btn btn-${theme}`}
				type="button"
				onClick={toggleDropdown}
			>
				{
					chevron ? 
					<>
						<span className='me-3'>{selected?.label}</span>
						<i className={`bi bi-chevron-${isOpen ? 'up' : 'down'}`}></i>
					</>
					:
					<i className="bi bi-three-dots-vertical"></i>
				}
			</button>
			<ul className={`dropdown-menu dropdown-menu-end text-bg-${theme} ${isOpen ? 'show mt-4' : ''}`}>
				{options.filter(el => (el.label != selected.label)).map((option: Option, index: number) => (
					<li key={index}>
						<button
							className="dropdown-item text-secondary"
							type="button"
							onClick={() => handleOptionClick(option)}
						>
							{option.label}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};