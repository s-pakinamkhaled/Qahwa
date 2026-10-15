import { useEffect, useRef, useState } from 'react'
import './App.css'

const ticker = [
    'Single origin',
    'Baked every morning',
    'Good coffee, good company',
    'Stay awhile',
]

const coffee = [
    {
        no: '01',
        name: 'Cardamom Cloud',
        price: '$6.50',
        desc: 'Double espresso, cardamom cream, orange blossom',
        tag: 'House favorite',
    },
    {
        no: '02',
        name: 'Honey Cinnamon Latte',
        price: '$5.75',
        desc: 'Raw honey, warm cinnamon, your choice of milk',
        tag: 'Cozy',
    },
    {
        no: '03',
        name: 'Pistachio Rose',
        price: '$6.75',
        desc: 'Pistachio milk, rose, espresso, dried petals',
        tag: 'Something special',
    },
    {
        no: '04',
        name: 'Qahwa Tonic',
        price: '$6.25',
        desc: 'Cold brew, citrus tonic, rosemary, pink pepper',
        tag: 'Bright & bold',
    },
]

const moreCoffee = [
    {
        no: '05',
        name: 'Saffron Cortado',
        price: '$5.25',
        desc: 'Espresso, silky milk, a thread of saffron',
        tag: 'Slow sip',
    },
    {
        no: '06',
        name: 'Orange Blossom Americano',
        price: '$4.25',
        desc: 'Espresso, hot water, orange blossom',
        tag: 'Simple',
    },
    {
        no: '07',
        name: 'Date Oat Flat White',
        price: '$5.50',
        desc: 'Espresso, oat milk, medjool date',
        tag: 'Everyday',
    },
]

const pastries = [
    {
        no: '01',
        name: 'Almond Morning Bun',
        price: '$4.75',
        desc: 'Brown butter, toasted almond, morning sugar',
        tag: 'Baked today',
    },
    {
        no: '02',
        name: 'Pistachio Cardamom Bun',
        price: '$5.25',
        desc: 'Pistachio cream, cardamom sugar, flaky layers',
        tag: 'Baked today',
    },
    {
        no: '03',
        name: 'Olive Oil Citrus Cake',
        price: '$4.50',
        desc: 'Orange, olive oil, a pinch of sea salt',
        tag: 'To share',
    },
    {
        no: '04',
        name: 'Dark Rye Cookie',
        price: '$3.50',
        desc: 'Rye, sea salt, 70% chocolate',
        tag: 'Everyday',
    },
]

const times = [
    '7:00 AM',
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
]

function todayStatus() {
    const now = new Date()
    const weekend = now.getDay() === 0 || now.getDay() === 6
    const openHour = weekend ? 8 : 7
    const closeHour = weekend ? 20 : 19
    const minutes = now.getHours() * 60 + now.getMinutes()
    const open = minutes >= openHour * 60 && minutes < closeHour * 60
    const format = (hour) => {
        const suffix = hour >= 12 ? 'PM' : 'AM'
        const h = hour % 12 || 12
        return `${h}:00 ${suffix}`
    }
    return { open, hours: `${format(openHour)} — ${format(closeHour)}` }
}

function CupIcon() {
    return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
            <path
                d="M11.2 13c.6-1.3.9-2.2.55-3.1M16.4 12.6c.55-1.35.8-2.2.45-3.1"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M8.4 14.2h12.2c1.7 0 2.8 1.1 2.8 2.45S22.3 19.1 20.6 19.1H19.4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
            <path
                d="M9.3 14.4 10.5 22.4A2.1 2.1 0 0 0 12.6 24.2h6.6a2.1 2.1 0 0 0 2.1-1.8l1.2-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function ArrowIcon() {
    return (
        <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true">
            <path
                d="M2.5 8h11M9 3.5 13.5 8 9 12.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function ChevronIcon() {
    return (
        <svg className="chevron" viewBox="0 0 14 14" aria-hidden="true">
            <path
                d="M2.5 5 7 9.2 11.5 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function StarIcon() {
    return (
        <svg className="star" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M6 .7 7.15 4.85 11.3 6 7.15 7.15 6 11.3 4.85 7.15.7 6l4.15-1.15Z" />
        </svg>
    )
}

function Sunburst() {
    return (
        <svg className="sunburst" viewBox="0 0 100 100" aria-hidden="true">
            {Array.from({ length: 16 }, (_, i) => (
                <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2="50"
                    y2="3"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    transform={`rotate(${i * 22.5} 50 50)`}
                />
            ))}
        </svg>
    )
}

function Brand({ onDark = false }) {
    return (
        <a href="#top" className={onDark ? 'brand on-dark' : 'brand'}>
            <span className="brand-mark">
                <CupIcon />
            </span>
            Qahwa
        </a>
    )
}

function MenuList({ items }) {
    return (
        <ul className="menu-list">
            {items.map((item) => (
                <li className="menu-item" key={item.no + item.name}>
                    <span className="item-no">{item.no}</span>
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">{item.price}</p>
                    <p className="item-desc">{item.desc}</p>
                    <span className="item-tag">{item.tag}</span>
                </li>
            ))}
        </ul>
    )
}

function BookingDialog({ open, onClose }) {
    const dialogRef = useRef(null)
    const [booked, setBooked] = useState(null)
    const today = new Date().toISOString().slice(0, 10)

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return
        if (open && !dialog.open) {
            setBooked(null)
            dialog.showModal()
        }
        if (!open && dialog.open) dialog.close()
    }, [open])

    function submit(event) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const date = new Date(`${data.get('date')}T00:00:00`)
        setBooked({
            name: String(data.get('name')).trim(),
            guests: String(data.get('guests')),
            time: String(data.get('time')),
            when: date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            }),
        })
    }

    return (
        <dialog
            ref={dialogRef}
            className="booking"
            onClose={onClose}
            onClick={(event) => {
                const rect = dialogRef.current.getBoundingClientRect()
                const inside =
                    event.clientX >= rect.left &&
                    event.clientX <= rect.right &&
                    event.clientY >= rect.top &&
                    event.clientY <= rect.bottom
                if (!inside) onClose()
            }}
        >
            <div className="booking-card">
                <button type="button" className="booking-close" onClick={onClose} aria-label="Close">
                    <span />
                    <span />
                </button>
                {booked ? (
                    <div className="booking-done">
                        <span className="brand-mark">
                            <CupIcon />
                        </span>
                        <h2>See you soon.</h2>
                        <p>
                            A table for {booked.guests} under {booked.name}, {booked.when} at {booked.time}.
                            We’ll keep the seat warm.
                        </p>
                        <button type="button" className="btn" onClick={onClose}>
                            Done
                        </button>
                    </div>
                ) : (
                    <>
                        <p className="eyebrow">Book a table</p>
                        <h2 id="book-title">Save you a seat.</h2>
                        <p className="booking-note">Tell us when you’d like to come by. We’ll take it from there.</p>
                        <form onSubmit={submit}>
                            <label>
                                <span>Name</span>
                                <input name="name" type="text" required autoComplete="name" placeholder="Your name" />
                            </label>
                            <label>
                                <span>Email</span>
                                <input name="email" type="email" required autoComplete="email" placeholder="you@email.com" />
                            </label>
                            <div className="form-grid">
                                <label>
                                    <span>Date</span>
                                    <input name="date" type="date" required min={today} />
                                </label>
                                <label>
                                    <span>Time</span>
                                    <select name="time" required defaultValue="">
                                        <option value="" disabled>
                                            Select
                                        </option>
                                        {times.map((time) => (
                                            <option key={time}>{time}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <label>
                                <span>Guests</span>
                                <select name="guests" defaultValue="2">
                                    {Array.from({ length: 8 }, (_, i) => i + 1).map((count) => (
                                        <option key={count} value={count}>
                                            {count} {count === 1 ? 'guest' : 'guests'}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                <span>Note</span>
                                <textarea name="note" rows="3" placeholder="A window seat, a quiet corner…" />
                            </label>
                            <button type="submit" className="btn btn-wide">
                                Book a table
                                <ArrowIcon />
                            </button>
                        </form>
                    </>
                )}
            </div>
        </dialog>
    )
}

export default function App() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [fullMenu, setFullMenu] = useState(false)
    const [bookingOpen, setBookingOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const status = todayStatus()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [menuOpen])

    function openBooking() {
        setMenuOpen(false)
        setBookingOpen(true)
    }

    function closeMobile() {
        setMenuOpen(false)
    }

    return (
        <div className="page" id="top">
            <header className={scrolled ? 'header scrolled' : 'header'}>
                <div className="header-bar">
                    <Brand />
                    <nav className="nav" aria-label="Primary">
                        <a href="#menu">Menu</a>
                        <a href="#story">Our story</a>
                        <a href="#visit">Visit</a>
                        <button type="button" className="btn btn-pill" onClick={openBooking}>
                            Book a table
                        </button>
                    </nav>
                    <button
                        type="button"
                        className={menuOpen ? 'nav-toggle open' : 'nav-toggle'}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                    >
                        <span />
                        <span />
                    </button>
                </div>
                <div className={menuOpen ? 'mobile-panel open' : 'mobile-panel'}>
                    <a href="#menu" onClick={closeMobile}>
                        Menu
                    </a>
                    <a href="#story" onClick={closeMobile}>
                        Our story
                    </a>
                    <a href="#visit" onClick={closeMobile}>
                        Visit
                    </a>
                    <button type="button" className="btn" onClick={openBooking}>
                        Book a table
                    </button>
                </div>
            </header>

            <main>
                <section className="hero">
                    <div className="hero-copy">
                        <p className="eyebrow">Slow mornings, beautifully made</p>
                        <h1>
                            Welcome to
                            <em>Qahwa.</em>
                        </h1>
                        <p className="lede">
                            Thoughtful coffee, warm pastries, and a little room to breathe. Your new favorite corner is
                            waiting.
                        </p>
                        <div className="hero-actions">
                            <a className="btn" href="#menu">
                                Explore our menu
                                <ArrowIcon />
                            </a>
                            <a className="text-link" href="#story">
                                Meet Qahwa
                                <ChevronIcon />
                            </a>
                        </div>
                        <div className="status">
                            <span className={status.open ? 'dot' : 'dot closed'} />
                            <div>
                                <strong>{status.open ? 'Open today' : 'Closed now'}</strong>
                                <span>{status.hours}</span>
                            </div>
                        </div>
                    </div>

                    <div className="hero-media">
                        <div className="lilac-slab" aria-hidden="true" />
                        <div className="seal" aria-hidden="true">
                            <svg viewBox="0 0 200 200">
                                <defs>
                                    <path
                                        id="sealPath"
                                        d="M100,28a72,72 0 1,1 -0.01,0"
                                    />
                                </defs>
                                <text>
                                    <textPath href="#sealPath" textLength="452" lengthAdjust="spacing">
                                        ROASTED WITH CARE · POURED WITH LOVE ·
                                    </textPath>
                                </text>
                            </svg>
                            <span className="seal-cup">
                                <CupIcon />
                            </span>
                        </div>
                        <div className="arch">
                            <img
                                src="/images/hero.jpg"
                                alt="Latte with leaf art and a croissant on a wooden café table"
                            />
                        </div>
                    </div>
                </section>

                <div className="marquee" aria-hidden="true">
                    <div className="marquee-track">
                        {[0, 1].map((copy) => (
                            <div className="marquee-group" key={copy}>
                                {ticker.map((phrase) => (
                                    <span className="marquee-item" key={`${copy}-${phrase}`}>
                                        <StarIcon />
                                        {phrase}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <section className="menu" id="menu">
                    <div className="menu-intro">
                        <div>
                            <p className="eyebrow">From our bar</p>
                            <h2>
                                Your daily ritual,
                                <em>made remarkable.</em>
                            </h2>
                        </div>
                        <p className="menu-aside">
                            Familiar comforts and curious new flavors, made with beans we know by name and ingredients
                            worth talking about.
                        </p>
                    </div>

                    <div className="menu-layout">
                        <div className="menu-visual">
                            <img src="/images/menu.jpg" alt="A café coffee on the morning table" />
                            <span className="photo-tab">01 / Coffee</span>
                        </div>
                        <div className="menu-panel">
                            <MenuList items={coffee} />
                            {fullMenu && (
                                <div className="menu-more">
                                    <p className="group-label">More from the bar</p>
                                    <MenuList items={moreCoffee} />
                                    <p className="group-label">From the pastry case</p>
                                    <MenuList items={pastries} />
                                </div>
                            )}
                            <button
                                type="button"
                                className="btn btn-line"
                                aria-expanded={fullMenu}
                                onClick={() => setFullMenu((open) => !open)}
                            >
                                {fullMenu ? 'Show the highlights' : 'View the full menu'}
                                <ArrowIcon />
                            </button>
                        </div>
                    </div>
                </section>

                <section className="visit" id="visit">
                    <div className="visit-copy">
                        <p className="eyebrow">Find your corner</p>
                        <h2>
                            Come for the
                            <br />
                            coffee.
                            <em>
                                Stay for the
                                <br />
                                feeling.
                            </em>
                        </h2>
                        <div className="visit-meta">
                            <div>
                                <h3>Find us</h3>
                                <p>
                                    18 Willow Lane
                                    <br />
                                    The Arts District
                                </p>
                            </div>
                            <div>
                                <h3>Hours</h3>
                                <div className="hours">
                                    <p>
                                        <span>Mon–Fri</span>
                                        <span>7–7</span>
                                    </p>
                                    <p>
                                        <span>Sat–Sun</span>
                                        <span>8–8</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <a
                            className="btn"
                            href="https://www.google.com/maps/search/?api=1&query=18+Willow+Lane+The+Arts+District"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Get directions
                            <ArrowIcon />
                        </a>
                    </div>
                    <div className="visit-photo">
                        <img src="/images/visit.jpg" alt="Overhead latte with a leaf poured into the foam" />
                        <div className="hello-seal">
                            <CupIcon />
                            <p>
                                See you
                                <br />
                                at Qahwa
                            </p>
                        </div>
                    </div>
                </section>

                <section className="story" id="story">
                    <div className="story-collage">
                        <Sunburst />
                        <img
                            className="story-main"
                            src="/images/story.jpg"
                            alt="Coffee and pastries shared at a café table"
                        />
                        <img
                            className="story-float"
                            src="/images/story-small.jpg"
                            alt="Cinnamon roll and a small latte on a wooden table"
                        />
                    </div>
                    <div className="story-copy">
                        <p className="eyebrow">Our little story</p>
                        <h2>
                            Rooted in
                            <br />
                            ritual.
                            <em>Made for now.</em>
                        </h2>
                        <p className="story-lead">Qahwa means coffee, but to us, it means so much more.</p>
                        <p className="story-body">
                            It is the pause between plans. The seat saved for a friend. The first sip that makes the day
                            feel possible. We built Qahwa to hold all of that—one beautiful cup at a time.
                        </p>
                        <a className="text-link light" href="#visit">
                            Come say hello
                            <ChevronIcon />
                        </a>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <Brand onDark />
                <p className="footer-tag">Small moments. Great coffee.</p>
                <nav className="footer-links" aria-label="Footer">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer">
                        Instagram
                    </a>
                    <a href="mailto:hello@qahwa.cafe">Email</a>
                    <a href="#visit">Visit</a>
                </nav>
                <p className="footer-copy">© 2025 Qahwa Café</p>
            </footer>

            <BookingDialog open={bookingOpen} onClose={() => setBookingOpen(false)} />
        </div>
    )
}
