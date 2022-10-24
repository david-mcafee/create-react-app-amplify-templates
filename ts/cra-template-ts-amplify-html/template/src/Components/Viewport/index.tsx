type ViewportProps = {};

const Viewport: React.FC<ViewportProps> = ({ children }) => {
	return (
		<div
			style={{
				flexDirection: 'column',
				minHeight: '100vh',
				width: '100vw',
				alignItems: 'center',
				padding: '2rem',
			}}
		>
			{children}
		</div>
	);
};

export default Viewport;
