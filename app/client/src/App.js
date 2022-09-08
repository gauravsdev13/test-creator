import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import './App.css'
import Bottom from './Bottom'
import Settings from './Settings'
import Profile from './Profile'
import Welcome from './Welcome'
import Results from './Results'
import CropSquareIcon from '@mui/icons-material/CropSquare';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import Segments from './Manager';
import Verification from './Verification';
import Popover from '@mui/material/Popover';
import ErrorIcon from '@mui/icons-material/Error';
import Typography from '@mui/material/Typography';

import { green, red } from '@mui/material/colors';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputIcon from '@mui/icons-material/Input';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import logo from './components/logo-new.png';
import logoNav from './components/logo-nav.png';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

import { Button, Tooltip } from '@mui/material';
import { ethers } from "ethers";
import { contractABI, contractAddress } from "/home/gaurav/Desktop/trellis-app/app/client/src/utils/constants.js";


function App() {

	const [errorMessage, setErrorMessage] = useState(null);
	const notifyConnected = () => toast.success("You are now connected");
	const notifyConnectWallet = () => toast.error("Connect to Metamask");
	const notifyError = () => toast.error({ errorMessage });
	const [navbarStatus, setNavbarStatus] = useState("Connect");
	const [status, setStatus] = useState();
	const joinedOn = new Date();
	const [currentBalance, setCurrentBalance] = useState();

	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;


	const register = () => {
		Axios.post("https://trellisserver.herokuapp.com/register", {
			username: status,
			joinedOn: joinedOn,
			tokens: '{"token": "50 inch"}'
		}).then((response) => {
			console.log(response);
		});
	};

	const connectWalletHandler = () => {

		if (!window.ethereum) {
			alert('Please install MetaMask browser extension to interact')
		};

		if (window.ethereum && window.ethereum.isMetaMask && navbarStatus === "Connect") {

			window.ethereum.request({ method: 'eth_requestAccounts' })
				.then(result => {
					accountChangedHandler(result[0]);
					setNavbarStatus('Disconnect');
					notifyConnected();

				})
				.catch(error => {
					setErrorMessage(error.message);
					notifyError();

				});

		} else {
			setNavbarStatus('Connect');
			setCurrentBalance();
			localStorage.clear();
			accountChangedHandler("");

		}
	}



	const accountChangedHandler = (newAccount) => {
		setStatus(newAccount);
		localStorage.setItem('status', newAccount);

	}

	const chainChangedHandler = () => {
		window.location.reload();
	}


	window.ethereum.on('accountsChanged', accountChangedHandler);
	window.ethereum.on('chainChanged', chainChangedHandler);



	const getBalance = async () => {

		if (window.ethereum) {

			const provider = new ethers.providers.Web3Provider(window.ethereum);

			const transactionsContract = new ethers.Contract(contractAddress, contractABI, provider);

			const balance = await transactionsContract.getUserBalance(status);

			if (balance) setCurrentBalance(ethers.utils.formatEther(balance.toLocaleString()))

		}
	};

	async function withdraw() {

		if (window.ethereum && status) {

			const provider = new ethers.providers.Web3Provider(window.ethereum);

			await provider.send("eth_requestAccounts", []);

			const signer = await provider.getSigner();

			const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

			const withdrawRequest = await transactionsContract.userWithdraw();


		}

		else {
			notifyConnectWallet()
		}
	};

	useEffect(() => {
		getBalance();
		if (status) {
			register();
		}
	}, [status]);

	useEffect(() => {
		if (localStorage.getItem('status')) connectWalletHandler();
	}, []);

	return (
		<div className="App">
			<BrowserRouter basename={process.env.PUBLIC_URL}>

				<div className="nav-bar">

					<Link to="/">
						<div className="workbench-logo"   >
							<div> <img width="40" height="38" src={logo} /></div>
							<div><img width="65" height="20" src={logoNav} /></div>
						</div></Link>


					<div className="user-menu">
						<Tooltip title="Home"><Link to="/"><Button className="user-menu-button" > <CropSquareIcon color="success" style={{ cursor: 'pointer' }} /> </Button></Link></Tooltip>
						<Tooltip title="Test manager"><Link to="Manager"><Button className="user-menu-button" ><ViewColumnIcon color="success" style={{ cursor: 'pointer' }} /></Button></Link></Tooltip>
						<Tooltip title="Settings"><Link to="Settings"><Button className="user-menu-button" ><SettingsEthernetIcon color="success" style={{ cursor: 'pointer' }} /></Button></Link></Tooltip>
						<Tooltip title="Profile"><Link to="Profile"><Button className="user-menu-button" ><AccountCircleIcon color="success" style={{ cursor: 'pointer' }} /></Button></Link></Tooltip>
					</div>


					<div className="user-balance">{currentBalance}$ &nbsp;  <Tooltip title='Withdraw'><InputIcon style={{ cursor: 'pointer' }} fontSize="small" color="success" onClick={withdraw} /></Tooltip></div>
					<div className="user-balance"><FingerprintIcon color="success" style={{ cursor: 'pointer' }} fontSize="small" aria-describedby={id} onClick={handleClick} /></div>
					<button className="button-wallet" onClick={connectWalletHandler} >
						<Typography variant="button" gutterBottom>{navbarStatus}</Typography></button>
					<ToastContainer position="top-center" hideProgressBar={true} />

					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
					>
						<div className='identity'>
							<div>

								<ErrorIcon fontSize="medium" sx={{ color: red[500] }} />
								<Typography variant="overline" display="block" sx={{ color: red[500] }}>No ID associated with this account</Typography>  <br></br> <br></br>
								<Link to="Verification" onClick={handleClose}> <Typography style={{ cursor: 'pointer' }} variant="caption" display="block" gutterBottom>Get new ID</Typography> </Link>

							</div>

							{/* 	<>
		JOHN DOE <br></br>
		23/04/1976 <br></br> <br></br>
     
		HJ323244n43m43
		</> */}
						</div>
					</Popover>

				</div>

				<div className="segments">

					<Routes>
						<Route path="/" element={<Welcome />} />
						<Route path='/Settings' element={<Settings />} />
						<Route path='/Manager' element={<Segments />} />
						<Route path='/Profile' element={<Profile />} />
						<Route path='/Results' element={<Results />} />
						<Route path='/Verification' element={<Verification />} />

					</Routes>

				</div>
			</BrowserRouter>

			<Bottom status={status} />
		</div>
	);
}

export default App;