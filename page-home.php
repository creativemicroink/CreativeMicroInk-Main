<?php
/**
 * Template Name: Home Page
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
        <article id="post-<?php the_ID(); ?>" <?php post_class('home-page'); ?>>
            
            <!-- Hero Section -->
            <section class="hero-section">
                <div class="hero-content container">
                    <h1 class="hero-title"><?php echo get_field('hero_title') ?: 'Enhance Your Natural Beauty'; ?></h1>
                    <p class="hero-subtitle"><?php echo get_field('hero_subtitle') ?: 'Professional permanent makeup services to give you confidence and save you time every day.'; ?></p>
                    <div class="hero-cta">
                        <a href="<?php echo get_permalink(get_page_by_path('book-appointment')); ?>" class="btn btn-primary btn-large">Book Your Consultation</a>
                    </div>
                </div>
            </section>

            <!-- Services Overview Section -->
            <section class="section services-overview">
                <div class="container">
                    <h2 class="section-title"><?php echo get_field('services_title') ?: 'Our Services'; ?></h2>
                    
                    <div class="grid-3">
                        <!-- Service 1: Microblading -->
                        <div class="service-card">
                            <div class="service-icon">✨</div>
                            <h3 class="service-title">Eyebrow Microblading</h3>
                            <p class="service-description">Natural-looking hair strokes that enhance your eyebrow shape and fullness for up to 18 months.</p>
                            <div class="service-price">From $350</div>
                            <div class="service-duration">2-3 hours</div>
                            <a href="<?php echo get_permalink(get_page_by_path('services')); ?>#microblading" class="btn btn-secondary">Learn More</a>
                        </div>

                        <!-- Service 2: Eyeliner -->
                        <div class="service-card">
                            <div class="service-icon">👁️</div>
                            <h3 class="service-title">Permanent Eyeliner</h3>
                            <p class="service-description">Define your eyes with precise, smudge-proof eyeliner that enhances your natural eye shape.</p>
                            <div class="service-price">From $280</div>
                            <div class="service-duration">1.5-2 hours</div>
                            <a href="<?php echo get_permalink(get_page_by_path('services')); ?>#eyeliner" class="btn btn-secondary">Learn More</a>
                        </div>

                        <!-- Service 3: Lip Blush -->
                        <div class="service-card">
                            <div class="service-icon">💋</div>
                            <h3 class="service-title">Lip Blush</h3>
                            <p class="service-description">Add natural color and definition to your lips with our subtle lip blush technique.</p>
                            <div class="service-price">From $320</div>
                            <div class="service-duration">2-2.5 hours</div>
                            <a href="<?php echo get_permalink(get_page_by_path('services')); ?>#lip-blush" class="btn btn-secondary">Learn More</a>
                        </div>
                    </div>

                    <div class="section-cta">
                        <a href="<?php echo get_permalink(get_page_by_path('services')); ?>" class="btn btn-primary btn-large">View All Services</a>
                    </div>
                </div>
            </section>

            <!-- Testimonials Section -->
            <section class="section testimonials-section">
                <div class="container">
                    <h2 class="section-title"><?php echo get_field('testimonials_title') ?: 'What Our Clients Say'; ?></h2>
                    
                    <div class="grid-3">
                        <div class="testimonial-card">
                            <p class="testimonial-quote">"The results exceeded my expectations! My eyebrows look so natural and I save so much time each morning."</p>
                            <div class="testimonial-author">Sarah M.</div>
                            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                        </div>

                        <div class="testimonial-card">
                            <p class="testimonial-quote">"Professional, clean, and absolutely beautiful work. I feel so confident with my new permanent eyeliner!"</p>
                            <div class="testimonial-author">Jessica L.</div>
                            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                        </div>

                        <div class="testimonial-card">
                            <p class="testimonial-quote">"Amazing attention to detail and such a comfortable experience. My lips look perfectly natural!"</p>
                            <div class="testimonial-author">Emily R.</div>
                            <div class="testimonial-rating">⭐⭐⭐⭐⭐</div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="section cta-section">
                <div class="container">
                    <h2><?php echo get_field('cta_title') ?: 'Ready to Enhance Your Natural Beauty?'; ?></h2>
                    <p><?php echo get_field('cta_subtitle') ?: 'Book your consultation today and discover how permanent makeup can transform your daily routine.'; ?></p>
                    <a href="<?php echo get_permalink(get_page_by_path('book-appointment')); ?>" class="btn btn-primary btn-large">Book Now</a>
                </div>
            </section>

            <!-- Page Content (if any) -->
            <div class="entry-content container">
                <?php the_content(); ?>
            </div>

        </article>
        <?php
    endwhile;
    ?>
</main>

<?php get_footer(); ?>