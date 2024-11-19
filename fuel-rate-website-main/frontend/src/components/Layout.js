import React, {useState,useEffect} from 'react';
import Navbar from './Navbar.js';
import '../css/layout.css';
import BannerImg from '../images/header_banner.jpg';

function TopHeader(props) {

    const [scrolled,setScrolled] = useState(false);

    const handleScroll = () => {
        const offset = window.scrollY;

        if (offset > 150) {
            setScrolled(true);
        } 

        else {
            setScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll',handleScroll)
    });

    useEffect(() => {
        const nav = document.getElementById("navbox");
        if (scrolled) {
            nav.classList.add('scrolled');
        }
        else {
            nav.classList.remove('scrolled');
        }
    },[scrolled])

    return (
        <header>
            <div id='topheader'>
                <div id="logo"><strong>Fuel<span className="highlight black-word">Tracker</span></strong></div>
                <div id="banner" style={{backgroundImage: "url("+BannerImg+")"}}></div>
            </div>
            <div style={{height:"60px"}}>
                <Navbar login={props.login}/>
            </div>
        </header>
    );
}

function BottomFooter() {
    return (
        <footer id='bottomfooter'>
            <pre id='footertext' >
            <span id='footerlogo'>Contact Us</span><br />
                1800-COSC-4351     info@fuel.com <br />
                Avery Lindseth, Johnny Lu, Richard Lam, Rodney Hong
            </pre>
        </footer>
    );
}

export {TopHeader,BottomFooter};