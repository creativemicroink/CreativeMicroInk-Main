<?php
/**
 * Template Name: Booking Page
 * 
 * @package CreativeMicroInk
 * @version 1.0.0
 */

get_header(); ?>

<main id="primary" class="site-main">
    <?php
    while (have_posts()) :
        the_post();
        ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('booking-page'); ?>>
            
            <!-- Page Header -->
            <section class="page-header">
                <div class="container">
                    <h1 class="booking-title"><?php the_title(); ?></h1>
                    <p class="booking-subtitle"><?php echo get_field('page_subtitle') ?: 'Schedule your consultation or permanent makeup service using our online booking system below.'; ?></p>
                </div>
            </section>

            <!-- Booking Widget Section -->
            <section class="section booking-section">
                <div class="container">
                    <div class="booking-container">
                        
                        <!-- Booking Instructions -->
                        <h2 class="booking-title">Schedule Your Service</h2>
                        <p class="booking-subtitle">Select your preferred date, time, and service using our secure booking system.</p>

                        <!-- HTML Embed Area for Square Appointments -->
                        <div class="booking-embed-area">
                            <?php 
                            // Check if custom booking code is added via custom field
                            $booking_widget = get_field('booking_widget_code');
                            
                            if ($booking_widget) :
                                echo $booking_widget;
                            else :
                                // Show placeholder with instructions
                            ?>
                                <div class="booking-placeholder">
                                    <div class="placeholder-icon">📅</div>
                                    <h3>Square Appointments Booking Widget</h3>
                                    <p>To enable online booking:</p>
                                    <ol class="booking-instructions">
                                        <li>Log into your Square Appointments dashboard</li>
                                        <li>Go to Settings > Online Booking</li>
                                        <li>Copy the HTML embed code</li>
                                        <li>In WordPress admin, edit this page</li>
                                        <li>Add the code to the "Booking Widget Code" custom field</li>
                                    </ol>
                                    <p class="note">This placeholder will be replaced with your booking calendar once you add the Square Appointments widget code.</p>
                                </div>
                            <?php endif; ?>
                        </div>

                        <!-- Alternative Contact Information -->
                        <hr class="booking-separator">
                        
                        <h3>Prefer to Book by Phone?</h3>
                        <div class="phone-booking-info">
                            <div class="contact-card">
                                <p class="phone-number">📞 <?php echo get_field('phone_number') ?: '(555) 123-4567'; ?></p>
                                <p class="business-hours">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                <p class="business-hours">Saturday: 9:00 AM - 4:00 PM</p>
                            </div>
                        </div>

                        <p>Call us directly to schedule your appointment or if you have any questions about our services.</p>
                    </div>
                </div>
            </section>

            <!-- Booking Information Section -->
            <section class="section booking-info-section">
                <div class="container">
                    <h2 class="section-title">Before Your Appointment</h2>
                    
                    <div class="grid-3">
                        <div class="info-card">
                            <h3>Consultation Process</h3>
                            <ul>
                                <li>Discuss your desired look and expectations</li>
                                <li>Analyze your facial features and skin tone</li>
                                <li>Design and map the perfect shape</li>
                                <li>Color matching and selection</li>
                                <li>Explain the procedure and aftercare</li>
                            </ul>
                        </div>

                        <div class="info-card">
                            <h3>Pre-Appointment Care</h3>
                            <ul>
                                <li>No caffeine or alcohol 24 hours before</li>
                                <li>Avoid blood-thinning medications</li>
                                <li>No sun exposure or tanning</li>
                                <li>Don't tweeze or wax brows beforehand</li>
                                <li>Arrive with clean, makeup-free skin</li>
                            </ul>
                        </div>

                        <div class="info-card">
                            <h3>What to Bring</h3>
                            <ul>
                                <li>Valid government-issued ID</li>
                                <li>Payment method (cash, card accepted)</li>
                                <li>Any reference photos you like</li>
                                <li>List of current medications</li>
                                <li>Comfortable clothing</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Pricing Quick Reference -->
            <section class="section pricing-section">
                <div class="container">
                    <h2 class="section-title">Service Pricing</h2>
                    
                    <div class="grid-3">
                        <div class="pricing-card">
                            <h3>Eyebrow Services</h3>
                            <div class="price-item">
                                <span>Microblading</span>
                                <span class="price">$350</span>
                            </div>
                            <div class="price-item">
                                <span>Powder Brows</span>
                                <span class="price">$380</span>
                            </div>
                        </div>

                        <div class="pricing-card">
                            <h3>Eyeliner Services</h3>
                            <div class="price-item">
                                <span>Lash Line Enhancement</span>
                                <span class="price">$280</span>
                            </div>
                            <div class="price-item">
                                <span>Classic Eyeliner</span>
                                <span class="price">$340</span>
                            </div>
                        </div>

                        <div class="pricing-card">
                            <h3>Lip Services</h3>
                            <div class="price-item">
                                <span>Lip Blush</span>
                                <span class="price">$320</span>
                            </div>
                            <div class="price-item">
                                <span>Full Lip Color</span>
                                <span class="price">$420</span>
                            </div>
                        </div>
                    </div>
                    
                    <p class="pricing-note">*All prices include initial service and required touch-up session. Consultation fees may apply for some services.</p>
                </div>
            </section>

            <!-- Page Content -->
            <div class="entry-content container">
                <?php the_content(); ?>
            </div>

        </article>
        <?php
    endwhile;
    ?>
</main>

<?php get_footer(); ?>