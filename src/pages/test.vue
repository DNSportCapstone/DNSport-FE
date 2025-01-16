<template>
    <div class="home-page">
        <nav class="navbar">
            <div class="container">
                <h1 class="logo">FieldSportBooker</h1>
                <ul class="nav-links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Sports</a></li>
                    <li><a href="#">Bookings</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
        </nav>

        <header class="hero">
            <div class="container">
                <h2>Book Your Field Now</h2>
                <p>Easy and quick booking for your favorite sports</p>
                <a href="#booking" class="btn">Book a Field</a>
            </div>
        </header>

        <section class="featured-sports">
            <div class="container">
                <h3>Featured Sports</h3>
                <div class="sports-grid">
                    <div class="sport-card">
                        <img src="/placeholder.svg?height=80&width=80" alt="Soccer" />
                        <h4>Soccer</h4>
                        <p>Book soccer fields for your team matches or practice sessions.</p>
                    </div>
                    <div class="sport-card">
                        <img src="/placeholder.svg?height=80&width=80" alt="Tennis" />
                        <h4>Tennis</h4>
                        <p>Reserve tennis courts for singles or doubles games.</p>
                    </div>
                    <div class="sport-card">
                        <img src="/placeholder.svg?height=80&width=80" alt="Baseball" />
                        <h4>Baseball</h4>
                        <p>Secure baseball diamonds for your league or friendly games.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="booking" class="booking-cta">
            <div class="container">
                <h3>Ready to Play?</h3>
                <p>Book your field now and get ready for an amazing game!</p>
                <a href="#" class="btn btn-white">Start Booking</a>
            </div>
        </section>
    </div>
</template>

<style scoped>
/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
}

/* Navigation styles */
.navbar {
    background-color: #22c55e;
    color: white;
    padding: 1rem 0;
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
}

.nav-links {
    display: flex;
    list-style: none;
}

.nav-links li {
    margin-left: 1rem;
}

.nav-links li a {
    color: white;
    text-decoration: none;
}

/* Hero section styles */
.hero {
    background-image: url('https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80');
    background-size: cover;
    background-position: center;
    height: 500px;
    display: flex;
    align-items: center;
    text-align: center;
    color: white;
}

.hero h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

.btn {
    display: inline-block;
    background-color: #22c55e;
    color: white;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.btn:hover {
    background-color: #16a34a;
}

/* Featured sports section styles */
.featured-sports {
    padding: 4rem 0;
    background-color: #f3f4f6;
}

.featured-sports h3 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
}

.sports-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.sport-card {
    background-color: white;
    border-radius: 5px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sport-card img {
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;
}

.sport-card h4 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
}

/* Booking CTA section styles */
.booking-cta {
    background-color: #22c55e;
    color: white;
    padding: 4rem 0;
    text-align: center;
}

.booking-cta h3 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

.booking-cta p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

.btn-white {
    background-color: white;
    color: #22c55e;
}

.btn-white:hover {
    background-color: #f3f4f6;
}

/* Responsive design */
@media (max-width: 768px) {
    .nav-links {
        display: none;
    }

    .hero h2 {
        font-size: 2rem;
    }

    .hero p {
        font-size: 1rem;
    }
}
</style>
