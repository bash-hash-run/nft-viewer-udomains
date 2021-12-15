import './App.css';
import UAuth from '@uauth/js'
import {NftGallery} from 'react-nft-gallery';
import {useEffect, useState} from "react";

function App() {
    const [address, setAddress] = useState('')
    const [formAddress, setFormAddress] = useState('')
    const [unstop, setUnstop] = useState(null)


    const login = async () => {
        try {
            const data = await unstop.loginWithPopup()
            console.log(data)
            setFormAddress(data.idToken.wallet_address)
            setTimeout(_ => {
                onFind()
            }, 300)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(_ => {
        const uauth = new UAuth({
            clientID: 'z3JyXmGf0Iip6mXAE0cf1wjxLaUmVFtq3NlrvaPuoqo=',
            clientSecret: 'DYs44P3wW3NnxMHHYLb1zKQfhzVsHDZ7tzw1we6zcZs=',
            redirectUri: 'https://ud-nft.surge.sh/callback',
        })
        setUnstop(uauth);
    }, [])

    const onFind = () => {
        setAddress('');

        setTimeout(_ => {
            setAddress(formAddress);

        }, 500);
    };

    return (
        <div className="App">
            <div className="container">
                <h1>NFT collection viewer</h1>

                <div className="input-group flex-nowrap mt-2">
                    <span className="input-group-text">Address or ENS</span>
                    <input type="text"
                           onChange={e => setFormAddress(e.target.value)}
                           value={formAddress}
                           className="form-control"
                           placeholder="Address or ENS domain"
                           aria-describedby="addon-wrapping"/>
                </div>

                <button disabled={formAddress.length === 0} onClick={onFind}
                        className="btn btn-outline-primary mt-2 mb-5">Find
                </button>
                <button onClick={login} className="btn btn-outline-success mx-2 mt-2 mb-5">Find by Unstoppable Domain
                </button>

                {address && <NftGallery ownerAddress={address}/>}
            </div>
        </div>
    );
}

export default App;
