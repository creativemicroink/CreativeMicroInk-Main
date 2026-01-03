<?php
/**
 * Title: Service Cards Grid
 * Slug: creativemicroink/service-cards
 * Categories: creativemicroink, services
 * Description: A responsive grid of service cards with pricing and descriptions
 * Keywords: services, cards, pricing, grid
 */
?>

<!-- wp:group {"style":{"spacing":{"padding":{"top":"6rem","bottom":"6rem","left":"1.5rem","right":"1.5rem"}}},"backgroundColor":"white"} -->
<div class="wp-block-group has-white-background-color has-background" style="padding-top:6rem;padding-right:1.5rem;padding-bottom:6rem;padding-left:1.5rem">
    <!-- wp:group {"layout":{"type":"constrained","contentSize":"1200px"}} -->
    <div class="wp-block-group">
        <!-- wp:heading {"textAlign":"center","level":2,"style":{"spacing":{"margin":{"bottom":"3rem"}}},"textColor":"text-dark"} -->
        <h2 class="wp-block-heading has-text-align-center has-text-dark-color has-text-color" style="margin-bottom:3rem">Our Services</h2>
        <!-- /wp:heading -->

        <!-- wp:columns {"style":{"spacing":{"blockGap":{"top":"2rem","left":"2rem"}}}} -->
        <div class="wp-block-columns">
            <!-- Service Card 1 -->
            <!-- wp:column -->
            <div class="wp-block-column">
                <!-- wp:group {"style":{"spacing":{"padding":{"top":"2.5rem","bottom":"2.5rem","left":"2.5rem","right":"2.5rem"}},"border":{"radius":"20px"}},"backgroundColor":"white","className":"service-card"} -->
                <div class="wp-block-group service-card has-white-background-color has-background" style="border-radius:20px;padding-top:2.5rem;padding-right:2.5rem;padding-bottom:2.5rem;padding-left:2.5rem">
                    <!-- wp:group {"style":{"spacing":{"margin":{"bottom":"1.5rem"}}},"layout":{"type":"constrained","contentSize":"80px"},"className":"service-icon"} -->
                    <div class="wp-block-group service-icon" style="margin-bottom:1.5rem">
                        <!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"2rem"}},"textColor":"white"} -->
                        <p class="has-text-align-center has-white-color has-text-color" style="font-size:2rem">✨</p>
                        <!-- /wp:paragraph -->
                    </div>
                    <!-- /wp:group -->

                    <!-- wp:heading {"textAlign":"center","level":3,"style":{"spacing":{"margin":{"bottom":"1rem"}}},"className":"service-title"} -->
                    <h3 class="wp-block-heading has-text-align-center service-title" style="margin-bottom:1rem">Eyebrow Microblading</h3>
                    <!-- /wp:heading -->

                    <!-- wp:paragraph {"align":"center","style":{"spacing":{"margin":{"bottom":"1.5rem"}}},"textColor":"dark-gray","className":"service-description"} -->
                    <p class="has-text-align-center service-description has-dark-gray-color has-text-color" style="margin-bottom:1.5rem">Natural-looking hair strokes that enhance your eyebrow shape and fullness for up to 18 months.</p>
                    <!-- /wp:paragraph -->

                    <!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"600","fontSize":"1.25rem"},"spacing":{"margin":{"bottom":"0.5rem"}}},"textColor":"accent-rose","className":"service-price"} -->
                    <p class="has-text-align-center service-price has-accent-rose-color has-text-color" style="margin-bottom:0.5rem;font-size:1.25rem;font-weight:600">From $350</p>
                    <!-- /wp:paragraph -->

                    <!-- wp:paragraph {"align":"center","style":{"typography":{"fontStyle":"italic","fontSize":"0.875rem"},"spacing":{"margin":{"bottom":"1.5rem"}}},"textColor":"medium-gray","className":"service-duration"} -->
                    <p class="has-text-align-center service-duration has-medium-gray-color has-text-color" style="margin-bottom:1.5rem;font-size:0.875rem;font-style:italic">2-3 hours</p>
                    <!-- /wp:paragraph -->

                    <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
                    <div class="wp-block-buttons">
                        <!-- wp:button {"backgroundColor":"accent-rose","textColor":"white","style":{"border":{"radius":"12px"}}} -->
                        <div class="wp-block-button">
                            <a class="wp-block-button__link has-white-color has-accent-rose-background-color has-text-color has-background wp-element-button" href="/book-appointment" style="border-radius:12px">Book Now</a>
                        </div>
                        <!-- /wp:button -->
                    </div>
                    <!-- /wp:buttons -->
                </div>
                <!-- /wp:group -->
            </div>
            <!-- /wp:column -->

            <!-- Service Card 2 -->
            <!-- wp:column -->
            <div class="wp-block-column">
                <!-- wp:group {"style":{"spacing":{"padding":{"top":"2.5rem","bottom":"2.5rem","left":"2.5rem","right":"2.5rem"}},"border":{"radius":"20px"}},"backgroundColor":"white","className":"service-card"} -->
                <div class="wp-block-group service-card has-white-background-color has-background" style="border-radius:20px;padding-top:2.5rem;padding-right:2.5rem;padding-bottom:2.5rem;padding-left:2.5rem">
                    <!-- wp:group {"style":{"spacing":{"margin":{"bottom":"1.5rem"}}},"layout":{"type":"constrained","contentSize":"80px"},"className":"service-icon"} -->
                    <div class="wp-block-group service-icon" style="margin-bottom:1.5rem">
                        <!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"2rem"}},"textColor":"white"} -->
                        <p class="has-text-align-center has-white-color has-text-color" style="font-size:2rem">👁️</p>
                        <!-- /wp:paragraph -->
                    </div>
                    <!-- /wp:group -->

                    <!-- wp:heading {"textAlign":"center","level":3,"style":{"spacing":{"margin":{"bottom":"1rem"}}},"className":"service-title"} -->
                    <h3 class="wp-block-heading has-text-align-center service-title" style="margin-bottom:1rem">Permanent Eyeliner</h3>
                    <!-- /wp:heading -->

                    <!-- wp:paragraph {"align":"center","style":{"spacing":{"margin":{"bottom":"1.5rem"}}},"textColor":"dark-gray","className":"service-description"} -->
                    <p class="has-text-align-center service-description has-dark-gray-color has-text-color" style="margin-bottom:1.5rem">Define your eyes with precise, smudge-proof eyeliner that enhances your natural eye shape.</p>
                    <!-- /wp:paragraph -->

                    <!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"600","fontSize":"1.25rem"},"spacing":{"margin":{"bottom":"0.5rem"}}},"textColor":"accent-rose","className":"service-price"} -->
                    <p class="has-text-align-center service-price has-accent-rose-color has-text-color" style="margin-bottom:0.5rem;font-size:1.25rem;font-weight:600">From $280</p>
                    <!-- /wp:paragraph -->

                    <!-- wp:paragraph {"align":"center","style":{"typography":{"fontStyle":"italic","fontSize":"0.875rem"},"spacing":{"margin":{"bottom":"1.5rem"}}},"textColor":"medium-gray","className":"service-duration"} -->
                    <p class="has-text-align-center service-duration has-medium-gray-color has-text-color" style="margin-bottom:1.5rem;font-size:0.875rem;font-style:italic">1.5-2 hours</p>
                    <!-- /wp:paragraph -->

                    <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
                    <div class="wp-block-buttons">
                        <!-- wp:button {"backgroundColor":"accent-rose","textColor":"white","style":{"border":{"radius":"12px"}}} -->
                        <div class="wp-block-button">
                            <a class="wp-block-button__link has-white-color has-accent-rose-background-color has-text-color has-background wp-element-button" href="/book-appointment" style="border-radius:12px">Book Now</a>
                        </div>
                        <!-- /wp:button -->
                    </div>
                    <!-- /wp:buttons -->
                </div>
                <!-- /wp:group -->
            </div>
            <!-- /wp:column -->

            <!-- Service Card 3 -->
            <!-- wp:column -->
            <div class="wp-block-column">
                <!-- wp:group {"style":{"spacing":{"padding":{"top":"2.5rem","bottom":"2.5rem","left":"2.5rem","right":"2.5rem"}},"border":{"radius":"20px"}},"backgroundColor":"white","className":"service-card"} -->
                <div class="wp-block-group service-card has-white-background-color has-background" style="border-radius:20px;padding-top:2.5rem;padding-right:2.5rem;padding-bottom:2.5rem;padding-left:2.5rem">
                    <!-- wp:group {"style":{"spacing":{"margin":{"bottom":"1.5rem"}}},"layout":{"type":"constrained","contentSize":"80px"},"className":"service-icon"} -->
                    <div class="wp-block-group service-icon" style="margin-bottom:1.5rem">
                        <!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"2rem"}},"textColor":"white"} -->
                        <p class="has-text-align-center has-white-color has-text-color" style="font-size:2rem">💋</p>
                        <!-- /wp:paragraph -->
                    </div>
                    <!-- /wp:group -->

                    <!-- wp:heading {"textAlign":"center","level":3,"style":{"spacing":{"margin":{"bottom":"1rem"}}},"className":"service-title"} -->
                    <h3 class="wp-block-heading has-text-align-center service-title" style="margin-bottom:1rem">Lip Blush</h3>
                    <!-- /wp:heading -->

                    <!-- wp:paragraph {"align":"center","style":{"spacing":{"margin":{"bottom":"1.5rem"}}},"textColor":"dark-gray","className":"service-description"} -->
                    <p class="has-text-align-center service-description has-dark-gray-color has-text-color" style="margin-bottom:1.5rem">Add natural color and definition to your lips with our subtle lip blush technique.</p>
                    <!-- /wp:paragraph -->

                    <!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"600","fontSize":"1.25rem"},"spacing":{"margin":{"bottom":"0.5rem"}}},"textColor":"accent-rose","className":"service-price"} -->
                    <p class="has-text-align-center service-price has-accent-rose-color has-text-color" style="margin-bottom:0.5rem;font-size:1.25rem;font-weight:600">From $320</p>
                    <!-- /wp:paragraph -->

                    <!-- wp:paragraph {"align":"center","style":{"typography":{"fontStyle":"italic","fontSize":"0.875rem"},"spacing":{"margin":{"bottom":"1.5rem"}}},"textColor":"medium-gray","className":"service-duration"} -->
                    <p class="has-text-align-center service-duration has-medium-gray-color has-text-color" style="margin-bottom:1.5rem;font-size:0.875rem;font-style:italic">2-2.5 hours</p>
                    <!-- /wp:paragraph -->

                    <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
                    <div class="wp-block-buttons">
                        <!-- wp:button {"backgroundColor":"accent-rose","textColor":"white","style":{"border":{"radius":"12px"}}} -->
                        <div class="wp-block-button">
                            <a class="wp-block-button__link has-white-color has-accent-rose-background-color has-text-color has-background wp-element-button" href="/book-appointment" style="border-radius:12px">Book Now</a>
                        </div>
                        <!-- /wp:button -->
                    </div>
                    <!-- /wp:buttons -->
                </div>
                <!-- /wp:group -->
            </div>
            <!-- /wp:column -->
        </div>
        <!-- /wp:columns -->
    </div>
    <!-- /wp:group -->
</div>
<!-- /wp:group -->