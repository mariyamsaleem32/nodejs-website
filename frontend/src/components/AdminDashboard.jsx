import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaBox, FaChartBar, FaUsers, FaShoppingCart, FaTimes } from 'react-icons/fa';
import Products from './products';

const AdminDashboard = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [activeTab, setActiveTab] = useState('Dashboard');

	const navigate = useNavigate();
	const API_URL = 'http://localhost:5000/api';

	// ✅ Check if the user is an admin before allowing access
	const checkAdminStatus = async () => {
		const token = localStorage.getItem('token');

		if (!token) {
			console.error('❌ No auth token found! Redirecting to login.');
			navigate('/login');
			return;
		}

		try {
			const response = await fetch(`${API_URL}/auth/isAdmin`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${token}`, // ✅ Send Token
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			});

			const data = await response.json();
			console.log('Admin Check Response:', data);

			if (!response.ok || !data.success || !data.isAdmin) {
				console.error('❌ User is not an admin, redirecting to login...');
				alert('Unauthorized access! You are not an admin.');
				localStorage.removeItem('authToken'); // 🔹 Remove invalid token
				navigate('/login');
			}
		} catch (error) {
			console.error('❌ Error checking admin status:', error);
			alert('An error occurred. Redirecting to login.');
			navigate('/login');
		}
	};

	// ✅ Run admin check on component mount
	// useEffect(() => {
	// 	checkAdminStatus();
	// }, []);

	// Function to toggle the sidebar
	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const renderContent = () => {
		switch (activeTab) {
			case 'Dashboard':
				return (
					<div className='p-6'>
						<h2 className='text-2xl font-bold mb-6'>Dashboard Overview</h2>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
							<DashboardCard title='Total Products' value='1,234' icon={<FaBox className='text-orange-600' />} />
							<DashboardCard title='Total Orders' value='567' icon={<FaShoppingCart className='text-green-600' />} />
							<DashboardCard title='Total Customers' value='890' icon={<FaUsers className='text-blue-600' />} />
						</div>
						<div className='mt-8'>
							<h3 className='text-xl font-semibold mb-4'>Sales Overview</h3>
							<div className='bg-white p-6 rounded-lg shadow'>
								{/* Placeholder for a chart */}
								<div className='h-64 bg-gray-100 flex items-center justify-center'>
									<p className='text-gray-500'>Sales Chart Placeholder</p>
								</div>
							</div>
						</div>
					</div>
				);
			case 'Products':
				return (
					<div className='p-6'>
						<h2 className='text-2xl font-bold mb-6'>Product Management</h2>
						<Products />
					</div>
				);
			default:
				return <div className='p-6'>Select an option from the menu</div>;
		}
	};

	return (
		<div className='flex h-screen bg-gray-100'>
			{/* Sidebar */}
			<div
				className={`fixed top-0 left-0 z-40 h-full bg-white shadow-lg transform ${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				} transition-transform duration-300 sm:translate-x-0 sm:w-64`}>
				<div className='flex items-center justify-between p-4 bg-orange-400'>
					<h2 className='text-white text-xl font-bold'>Admin Dashboard</h2>
					<button className='text-white sm:hidden' onClick={toggleSidebar}>
						<FaTimes />
					</button>
				</div>
				<nav className='p-4'>
					<ul className='space-y-2'>
						<MenuItem
							icon={<FaChartBar />}
							text='Dashboard'
							isActive={activeTab === 'Dashboard'}
							onClick={() => setActiveTab('Dashboard')}
						/>
						<MenuItem
							icon={<FaBox />}
							text='Products'
							isActive={activeTab === 'Products'}
							onClick={() => setActiveTab('Products')}
						/>
					</ul>
				</nav>
			</div>

			{/* Main Content */}
			<div className='flex flex-col flex-grow sm:ml-64'>
				<header className='flex items-center justify-between p-4 bg-white shadow-md sm:hidden'>
					<h2 className='text-lg font-semibold'>{activeTab}</h2>
					<button onClick={toggleSidebar} className='text-orange-600'>
						<FaBars />
					</button>
				</header>
				<main className='flex-grow overflow-y-auto'>{renderContent()}</main>
			</div>
		</div>
	);
};

const MenuItem = ({ icon, text, isActive, onClick }) => (
	<li>
		<button
			onClick={onClick}
			className={`flex items-center p-3 w-full text-left ${
				isActive ? 'text-orange-600 bg-gray-100' : 'text-gray-700'
			} hover:text-orange-600 hover:bg-gray-100 rounded-lg transition`}>
			<span className='mr-2'>{icon}</span>
			{text}
		</button>
	</li>
);

const DashboardCard = ({ title, value, icon }) => (
	<div className='flex items-center p-6 bg-white shadow rounded-lg'>
		<div className='p-3 bg-gray-100 rounded-full'>{icon}</div>
		<div className='ml-4'>
			<h3 className='text-lg font-medium text-gray-700'>{title}</h3>
			<p className='text-2xl font-bold text-gray-900'>{value}</p>
		</div>
	</div>
);

export default AdminDashboard;
