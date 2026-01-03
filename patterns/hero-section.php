<?php
/**
 * Title: Hero Section
 * Slug: creativemicroink/hero-section
 * Categories: creativemicroink, header
 * Description: A large hero section with title, subtitle and call-to-action button
 * Keywords: hero, banner, cta, call-to-action
 */
?>

<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"6rem","bottom":"6rem","left":"1.5rem","right":"1.5rem"},"margin":{"top":"0","bottom":"0"}},"color":{"gradient":"hero-gradient"}},"className":"hero-section"} -->
<div class="wp-block-group alignfull hero-section has-hero-gradient-gradient-background has-background" style="margin-top:0;margin-bottom:0;padding-top:6rem;padding-right:1.5rem;padding-bottom:6rem;padding-left:1.5rem">
    <!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
    <div class="wp-block-group">
        <!-- wp:heading {"textAlign":"center","level":1,"style":{"typography":{"fontSize":"4rem","fontWeight":"700","letterSpacing":"-0.02em"}},"textColor":"text-dark","className":"hero-title"} -->
        <h1 class="wp-block-heading has-text-align-center hero-title has-text-dark-color has-text-color" style="font-size:4rem;font-weight:700;letter-spacing:-0.02em">Enhance Your Natural Beauty</h1>
        <!-- /wp:heading -->

        <!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.5rem","fontWeight":"300"}},"textColor":"dark-gray","className":"hero-subtitle"} -->
        <p class="has-text-align-center hero-subtitle has-dark-gray-color has-text-color" style="font-size:1.5rem;font-weight:300">Professional permanent makeup services to give you confidence and save you time every day.</p>
        <!-- /wp:paragraph -->

        <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"2.5rem"}}}} -->
        <div class="wp-block-buttons" style="margin-top:2.5rem">
            <!-- wp:button {"backgroundColor":"accent-rose","textColor":"white","style":{"typography":{"fontSize":"1.125rem","fontWeight":"500"},"spacing":{"padding":{"top":"1.25rem","bottom":"1.25rem","left":"3rem","right":"3rem"}},"border":{"radius":"12px"}},"className":"btn btn-primary btn-large"} -->
            <div class="wp-block-button btn btn-primary btn-large">
                <a class="wp-block-button__link has-white-color has-accent-rose-background-color has-text-color has-background wp-element-button" href="/book-appointment" style="border-radius:12px;padding-top:1.25rem;padding-right:3rem;padding-bottom:1.25rem;padding-left:3rem;font-size:1.125rem;font-weight:500">Book Your Consultation</a>
            </div>
            <!-- /wp:button -->
        </div>
        <!-- /wp:buttons -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->