<?php
/**
 * Template Name: Services Page
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
        <article id="post-<?php the_ID(); ?>" <?php post_class('services-page'); ?>>
            
            <!-- Page Header -->
            <section class="page-header">
                <div class="container">
                    <h1><?php the_title(); ?></h1>
                    <p class="page-subtitle"><?php echo get_field('page_subtitle') ?: 'Professional permanent makeup services designed to enhance your natural beauty and save you time every day.'; ?></p>
                </div>
            </section>

            <!-- Eyebrow Services Section -->
            <section class="section" id="microblading">
                <div class="container">
                    <h2 class="section-title">Eyebrow Services</h2>
                    
                    <div class="grid-2">
                        <!-- Microblading -->
                        <div class="service-detail-card">
                            <h3>Microblading</h3>
                            <p>The most popular permanent makeup service. We create natural-looking hair strokes that blend seamlessly with your existing brow hair.</p>
                            
                            <h4>What's Included:</h4>
                            <ul>
                                <li>Consultation and brow mapping</li>
                                <li>Custom color matching</li>
                                <li>Initial treatment (2-3 hours)</li>
                                <li>6-8 week touch-up session</li>
                                <li>Aftercare kit and instructions</li>
                            </ul>
                            
                            <div class="service-pricing">
                                <span class="service-price">$350</span>
                                <span class="service-duration">2-3 hours</span>
                            </div>
                            
                            <a href="<?php echo get_permalink(get_page_by_path('book-appointment')); ?>" class="btn btn-primary">Book This Service</a>
                        </div>

                        <!-- Powder Brows -->
                        <div class="service-detail-card">
                            <h3>Powder Brows</h3>
                            <p>Soft, powdered look that mimics the appearance of makeup. Perfect for those who prefer a filled-in brow appearance.</p>
                            
                            <h4>What's Included:</h4>
                            <ul>
                                <li>Consultation and brow design</li>
                                <li>Color selection and testing</li>
                                <li>Initial treatment (2-3 hours)</li>
                                <li>6-8 week perfection session</li>
                                <li>Complete aftercare package</li>
                            </ul>
                            
                            <div class="service-pricing">
                                <span class="service-price">$380</span>
                                <span class="service-duration">2-3 hours</span>
                            </div>
                            
                            <a href="<?php echo get_permalink(get_page_by_path('book-appointment')); ?>" class="btn btn-primary">Book This Service</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Eyeliner Services Section -->
            <section class="section" id="eyeliner">
                <div class="container">
                    <h2 class="section-title">Eyeliner Services</h2>
                    
                    <div class="grid-2">
                        <!-- Lash Line Enhancement -->
                        <div class="service-detail-card">
                            <h3>Lash Line Enhancement</h3>
                            <p>Subtle enhancement that adds definition between your lashes. Perfect for a natural, no-makeup look.</p>
                            
                            <h4>What's Included:</h4>
                            <ul>
                                <li>Eye shape analysis</li>
                                <li>Numbing for comfort</li>
                                <li>Initial treatment (1.5-2 hours)</li>
                                <li>6 week touch-up</li>
                                <li>Healing ointment</li>
                            </ul>
                            
                            <div class="service-pricing">
                                <span class="service-price">$280</span>
                                <span class="service-duration">1.5-2 hours</span>
                            </div>
                            
                            <a href="<?php echo get_permalink(get_page_by_path('book-appointment')); ?>" class="btn btn-primary">Book This Service</a>
                        </div>

                        <!-- Classic Eyeliner -->
                        <div class="service-detail-card">
                            <h3>Classic Eyeliner</h3>
                            <p>Bold, defined eyeliner that creates a classic makeup look. Can be thin or thick based on your preference.</p>
                            
                            <h4>What's Included:</h4>
                            <ul>
                                <li>Custom eyeliner design</li>
                                <li>Topical anesthetic</li>
                                <li>Initial treatment (2-2.5 hours)</li>
                                <li>6-8 week perfection session</li>
                                <li>Aftercare instructions</li>
                            </ul>
                            
                            <div class="service-pricing">
                                <span class="service-price">$340</span>
                                <span class="service-duration">2-2.5 hours</span>
                            </div>
                            
                            <a href="<?php echo get_permalink(get_page_by_path('book-appointment')); ?>" class="btn btn-primary">Book This Service</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Lip Services Section -->
            <section class="section" id="lip-blush">
                <div class="container">
                    <h2 class="section-title">Lip Services</h2>
                    
                    <div class="grid-2">
                        <!-- Lip Blush -->
                        <div class="service-detail-card">
                            <h3>Lip Blush</h3>
                            <p>Enhance your natural lip color with a subtle tint. Creates fuller-looking lips with a natural, just-bitten look.</p>
                            
                            <h4>What's Included:</h4>
                            <ul>
                                <li>Lip shape consultation</li>
                                <li>Custom color blending</li>
                                <li>Initial treatment (2-2.5 hours)</li>
                                <li>6-8 week touch-up session</li>
                                <li>Healing balm and care guide</li>
                            </ul>
                            
                            <div class="service-pricing">
                                <span class="service-price">$320</span>
                                <span class="service-duration">2-2.5 hours</span>
                            </div>
                            
                            <a href="<?php echo get_permalink(get_page_by_path('book-appointment')); ?>" class="btn btn-primary">Book This Service</a>
                        </div>

                        <!-- Full Lip Color -->
                        <div class="service-detail-card">
                            <h3>Full Lip Color</h3>
                            <p>Complete lip color coverage for a bolder look. Perfect for those who love wearing lipstick but want the convenience.</p>
                            
                            <h4>What's Included:</h4>
                            <ul>
                                <li>Comprehensive lip mapping</li>
                                <li>Personalized color selection</li>
                                <li>Initial treatment (3-3.5 hours)</li>
                                <li>8 week perfection session</li>
                                <li>Premium aftercare kit</li>
                            </ul>
                            
                            <div class="service-pricing">
                                <span class="service-price">$420</span>
                                <span class="service-duration">3-3.5 hours</span>
                            </div>
                            
                            <a href="<?php echo get_permalink(get_page_by_path('book-appointment')); ?>" class="btn btn-primary">Book This Service</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Page Content -->
            <div class="entry-content container">
                <?php the_content(); ?>
            </div>

            <!-- CTA Section -->
            <section class="section cta-section">
                <div class="container">
                    <h2>Ready to Book Your Service?</h2>
                    <p>Schedule your consultation today and take the first step toward effortless beauty.</p>
                    <a href="<?php echo get_permalink(get_page_by_path('book-appointment')); ?>" class="btn btn-primary btn-large">Book Your Appointment</a>
                </div>
            </section>

        </article>
        <?php
    endwhile;
    ?>
</main>

<?php get_footer(); ?>