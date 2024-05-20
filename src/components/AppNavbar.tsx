import { Navbar } from 'flowbite-react';
import { DarkThemeToggle, Flowbite } from 'flowbite-react';

import '../App.css';

const AppNavbar = () => {
	return (
		<>
			<Flowbite>
				<Navbar fluid rounded>
					<Navbar.Brand href="/">
						<img src="/chatbot_logo.svg" className="mr-3 h-6 sm:h-9" alt="" />
						<span className="self-center whitespace-nowrap text-xl font-semibold dark:text-gray">FRONT CHAT</span>
					</Navbar.Brand>
					<Navbar.Toggle />
					<Navbar.Collapse>
						<Navbar.Link href="/" active>
							Home
						</Navbar.Link>
						<Navbar.Link className="text-lg" href="/conversations">
							Conversations
						</Navbar.Link>
						<Navbar.Link className="text-lg" href="/messages">
							Messages
						</Navbar.Link>
					</Navbar.Collapse>
					<DarkThemeToggle />
				</Navbar>
			</Flowbite>
		</>
	);
};

export default AppNavbar;
