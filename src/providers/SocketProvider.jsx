import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const SocketContext = createContext();

const SocketProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const newSocket = io.connect(import.meta.env.VITE_SERVER_URL);
		setSocket(newSocket);
		return () => newSocket.close();
	}, []);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};

SocketProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default SocketProvider;
