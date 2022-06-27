import '../styles/Header.css';

function Header() {

    return (
        <section className='header-section'>
            <div className='header'>
                <div className='left-header'></div>
                <div className='right-header'>
                    <a href='/#' className='watchlist'>Watchlist<button className='watchlist-number'>234</button></a>
                    <a href='/#' className='login'>Login</a>
                </div>
            </div>
        </section>
    )
}

export default Header;