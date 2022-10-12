import { useState } from 'react';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

import { useWallet } from '@solana/wallet-adapter-react';

import model from '../assets/img/model.png';
import discord from '../assets/img/Discord.png';
import twitter from '../assets/img/Twitter.png';
import logo from '../assets/img/logo.png';

const Mint = () => {
    const wallet = useWallet();
    const [count, setCount] = useState(0);

    const counter = (flag) => {
        if (flag) {
            setCount(count + 1)
        } else {
            if (count === 0) return;
            setCount(count - 1)
        }
    }
    console.log(wallet)
    return (
        <>
            <div className='bg'>
                <div className='bg-center'>
                    <img src={model} alt='model' className='bg-model' />
                </div>
            </div>
            <div className='main'>
                <div className="container">
                    <div className='header'>
                        <a href='https://discord.com'>
                            <img className='link-img' src={discord} alt='discord' />
                        </a>
                        <a href='https://twiter.com' className='ml-2'>
                            <img className='link-img' src={twitter} alt='twitter' />
                        </a>
                    </div>
                    <div className='body'>
                        <img src={logo} alt='logo' className='logo' />
                        <div>
                            <h1 className='text title'>2WHITE LIST</h1>
                            <h5 className='text desc'>1wl = 3 pieces</h5>
                            <h5 className='text desc'>slay emma / wl: 3sol public: 5sol</h5>
                        </div>
                        <div className='count-wraper'>
                            <button className='count-btn' onClick={() => counter(false)}><span className='minus'>-</span></button>
                            <h2 className='counter'>{count}</h2>
                            <button className='count-btn' onClick={() => counter(true)}><span>+</span></button>
                        </div>
                        <div className='account'>
                            {
                                wallet.connected ?
                                    <>
                                        <h3 className='text'>your wallet address</h3>
                                        <h3 className='text'>{wallet.publicKey.toBase58()}</h3>
                                    </> : null
                            }
                            <div className='btn-wrapper'>
                                <WalletModalProvider>
                                    <WalletMultiButton className='connect-btn' />
                                </WalletModalProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Mint;