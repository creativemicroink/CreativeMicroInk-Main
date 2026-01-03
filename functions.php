<?php
/**
 * CreativeMicroInk WordPress Theme Functions
 * 
 * @package CreativeMicroInk
 * @version 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme setup
 */
function creativemicroink_theme_setup() {
    // Add theme support for various features
    add_theme_support('post-thumbnails');
    add_theme_support('title-tag');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ));
    
    // Add support for responsive embeds
    add_theme_support('responsive-embeds');
    
    // Add support for wide and full width blocks
    add_theme_support('align-wide');
    
    // Add support for custom line height
    add_theme_support('custom-line-height');
    
    // Add support for custom spacing
    add_theme_support('custom-spacing');
    
    // Add support for custom units
    add_theme_support('custom-units');
    
    // Add support for editor color palette
    add_theme_support('editor-color-palette', array(
        array(
            'name' => 'Primary Cream',
            'slug' => 'primary-cream',
            'color' => '#FAF7F2',
        ),
        array(
            'name' => 'Secondary Gray',
            'slug' => 'secondary-gray',
            'color' => '#F5F3F0',
        ),
        array(
            'name' => 'Light Gray',
            'slug' => 'light-gray',
            'color' => '#E8E5E1',
        ),
        array(
            'name' => 'Medium Gray',
            'slug' => 'medium-gray',
            'color' => '#9B9B9B',
        ),
        array(
            'name' => 'Dark Gray',
            'slug' => 'dark-gray',
            'color' => '#4A4A4A',
        ),
        array(
            'name' => 'Accent Rose',
            'slug' => 'accent-rose',
            'color' => '#D4A574',
        ),
        array(
            'name' => 'Accent Mauve',
            'slug' => 'accent-mauve',
            'color' => '#C8A2A2',
        ),
        array(
            'name' => 'Text Dark',
            'slug' => 'text-dark',
            'color' => '#2D2D2D',
        ),
        array(
            'name' => 'White',
            'slug' => 'white',
            'color' => '#FFFFFF',
        ),
    ));
    
    // Add support for custom font sizes
    add_theme_support('editor-font-sizes', array(
        array(
            'name' => 'Small',
            'slug' => 'small',
            'size' => 14,
        ),
        array(
            'name' => 'Normal',
            'slug' => 'normal',
            'size' => 16,
        ),
        array(
            'name' => 'Medium',
            'slug' => 'medium',
            'size' => 20,
        ),
        array(
            'name' => 'Large',
            'slug' => 'large',
            'size' => 24,
        ),
        array(
            'name' => 'Extra Large',
            'slug' => 'extra-large',
            'size' => 32,
        ),
        array(
            'name' => 'Huge',
            'slug' => 'huge',
            'size' => 48,
        ),
    ));
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => 'Primary Navigation',
        'footer' => 'Footer Navigation',
    ));
    
    // Add support for automatic feed links
    add_theme_support('automatic-feed-links');
}
add_action('after_setup_theme', 'creativemicroink_theme_setup');

/**
 * Enqueue scripts and styles
 */
function creativemicroink_scripts() {
    // Enqueue main stylesheet
    wp_enqueue_style(
        'creativemicroink-style',
        get_stylesheet_uri(),
        array(),
        wp_get_theme()->get('Version')
    );
    
    // Enqueue Google Fonts
    wp_enqueue_style(
        'creativemicroink-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
        array(),
        null
    );
    
    // Enqueue theme JavaScript
    wp_enqueue_script(
        'creativemicroink-script',
        get_template_directory_uri() . '/assets/js/theme.js',
        array(),
        wp_get_theme()->get('Version'),
        true
    );
    
    // Add inline styles for CSS custom properties
    $custom_css = "
        :root {
            --color-primary-cream: #FAF7F2;
            --color-secondary-gray: #F5F3F0;
            --color-light-gray: #E8E5E1;
            --color-medium-gray: #9B9B9B;
            --color-dark-gray: #4A4A4A;
            --color-accent-rose: #D4A574;
            --color-accent-mauve: #C8A2A2;
            --color-text-dark: #2D2D2D;
            --color-white: #FFFFFF;
        }
    ";
    wp_add_inline_style('creativemicroink-style', $custom_css);
}
add_action('wp_enqueue_scripts', 'creativemicroink_scripts');

/**
 * Add editor styles
 */
function creativemicroink_editor_styles() {
    add_theme_support('editor-styles');
    add_editor_style('assets/css/editor-style.css');
}
add_action('after_setup_theme', 'creativemicroink_editor_styles');

/**
 * Register block patterns
 */
function creativemicroink_register_block_patterns() {
    // Hero section pattern
    register_block_pattern(
        'creativemicroink/hero-section',
        array(
            'title' => 'Hero Section',
            'description' => 'A large hero section with title, subtitle and call-to-action button',
            'content' => '<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"6rem","bottom":"6rem","left":"1.5rem","right":"1.5rem"}}},"backgroundColor":"primary-cream","className":"hero-section"} -->
<div class="wp-block-group alignfull hero-section has-primary-cream-background-color has-background" style="padding-top:6rem;padding-right:1.5rem;padding-bottom:6rem;padding-left:1.5rem"><!-- wp:group {"layout":{"type":"constrained","contentSize":"800px"}} -->
<div class="wp-block-group"><!-- wp:heading {"textAlign":"center","level":1,"fontSize":"huge","className":"hero-title"} -->
<h1 class="wp-block-heading has-text-align-center hero-title has-huge-font-size">Enhance Your Natural Beauty</h1>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","fontSize":"large","className":"hero-subtitle"} -->
<p class="has-text-align-center hero-subtitle has-large-font-size">Professional permanent makeup services to give you confidence and save you time every day.</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"2.5rem"}}}} -->
<div class="wp-block-buttons" style="margin-top:2.5rem"><!-- wp:button {"backgroundColor":"accent-rose","textColor":"white","className":"btn btn-primary btn-large"} -->
<div class="wp-block-button btn btn-primary btn-large"><a class="wp-block-button__link has-white-color has-accent-rose-background-color has-text-color has-background wp-element-button" href="/book-appointment">Book Your Consultation</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group --></div>
<!-- /wp:group -->',
            'categories' => array('creativemicroink'),
        )
    );
    
    // Service card pattern
    register_block_pattern(
        'creativemicroink/service-card',
        array(
            'title' => 'Service Card',
            'description' => 'A service card with icon, title, description, price and duration',
            'content' => '<!-- wp:group {"style":{"spacing":{"padding":{"top":"2.5rem","bottom":"2.5rem","left":"2.5rem","right":"2.5rem"},"border":{"radius":"20px"}},"border":{"radius":"20px"}},"backgroundColor":"white","className":"service-card"} -->
<div class="wp-block-group service-card has-white-background-color has-background" style="border-radius:20px;padding-top:2.5rem;padding-right:2.5rem;padding-bottom:2.5rem;padding-left:2.5rem"><!-- wp:group {"layout":{"type":"constrained","contentSize":"80px"},"className":"service-icon"} -->
<div class="wp-block-group service-icon"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"2rem"}},"textColor":"white"} -->
<p class="has-text-align-center has-white-color has-text-color" style="font-size:2rem">✨</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->

<!-- wp:heading {"textAlign":"center","level":3,"className":"service-title"} -->
<h3 class="wp-block-heading has-text-align-center service-title">Eyebrow Microblading</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"align":"center","className":"service-description"} -->
<p class="has-text-align-center service-description">Natural-looking hair strokes that enhance your eyebrow shape and fullness.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"600"}},"textColor":"accent-rose","fontSize":"medium","className":"service-price"} -->
<p class="has-text-align-center service-price has-accent-rose-color has-text-color has-medium-font-size" style="font-weight:600">From $350</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontStyle":"italic"}},"textColor":"medium-gray","fontSize":"small","className":"service-duration"} -->
<p class="has-text-align-center service-duration has-medium-gray-color has-text-color has-small-font-size" style="font-style:italic">2-3 hours</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->',
            'categories' => array('creativemicroink'),
        )
    );
    
    // Testimonial pattern
    register_block_pattern(
        'creativemicroink/testimonial',
        array(
            'title' => 'Testimonial',
            'description' => 'A testimonial card with quote, author and rating',
            'content' => '<!-- wp:group {"style":{"spacing":{"padding":{"top":"2.5rem","bottom":"2.5rem","left":"2.5rem","right":"2.5rem"},"border":{"radius":"20px"}},"border":{"radius":"20px"}},"backgroundColor":"white","className":"testimonial-card"} -->
<div class="wp-block-group testimonial-card has-white-background-color has-background" style="border-radius:20px;padding-top:2.5rem;padding-right:2.5rem;padding-bottom:2.5rem;padding-left:2.5rem"><!-- wp:paragraph {"align":"center","style":{"typography":{"fontStyle":"italic","fontSize":"1.25rem"}},"textColor":"dark-gray","className":"testimonial-quote"} -->
<p class="has-text-align-center testimonial-quote has-dark-gray-color has-text-color" style="font-style:italic;font-size:1.25rem">"The results exceeded my expectations! My eyebrows look so natural and I save so much time each morning."</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","style":{"typography":{"fontWeight":"600"}},"textColor":"text-dark","className":"testimonial-author"} -->
<p class="has-text-align-center testimonial-author has-text-dark-color has-text-color" style="font-weight:600">Sarah M.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph {"align":"center","className":"testimonial-rating"} -->
<p class="has-text-align-center testimonial-rating">⭐⭐⭐⭐⭐</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->',
            'categories' => array('creativemicroink'),
        )
    );
}
add_action('init', 'creativemicroink_register_block_patterns');

/**
 * Register pattern categories
 */
function creativemicroink_register_pattern_categories() {
    register_block_pattern_category(
        'creativemicroink',
        array(
            'label' => 'CreativeMicroInk',
            'description' => 'Patterns for the CreativeMicroInk theme',
        )
    );
}
add_action('init', 'creativemicroink_register_pattern_categories');

/**
 * Customize the excerpt
 */
function creativemicroink_custom_excerpt_length($length) {
    return 30;
}
add_filter('excerpt_length', 'creativemicroink_custom_excerpt_length', 999);

/**
 * Add custom body classes
 */
function creativemicroink_body_classes($classes) {
    // Add class for block theme
    $classes[] = 'block-theme';
    
    // Add class for the current template
    if (is_front_page()) {
        $classes[] = 'template-home';
    } elseif (is_page_template('page-services.html')) {
        $classes[] = 'template-services';
    } elseif (is_page_template('page-gallery.html')) {
        $classes[] = 'template-gallery';
    } elseif (is_page_template('page-booking.html')) {
        $classes[] = 'template-booking';
    }
    
    return $classes;
}
add_filter('body_class', 'creativemicroink_body_classes');

/**
 * Add inline SVG support for admin
 */
function creativemicroink_mime_types($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    return $mimes;
}
add_filter('upload_mimes', 'creativemicroink_mime_types');

/**
 * Enqueue block editor assets
 */
function creativemicroink_block_editor_assets() {
    wp_enqueue_style(
        'creativemicroink-block-editor',
        get_template_directory_uri() . '/assets/css/block-editor.css',
        array('wp-edit-blocks'),
        wp_get_theme()->get('Version')
    );
}
add_action('enqueue_block_editor_assets', 'creativemicroink_block_editor_assets');

/**
 * Add theme support for block templates
 */
function creativemicroink_block_template_support() {
    if (function_exists('wp_is_block_theme') && wp_is_block_theme()) {
        add_theme_support('block-templates');
        add_theme_support('block-template-parts');
    }
}
add_action('after_setup_theme', 'creativemicroink_block_template_support');

/**
 * Custom query modifications
 */
function creativemicroink_modify_main_query($query) {
    if (!is_admin() && $query->is_main_query()) {
        // Modify gallery page to show more posts
        if (is_page_template('page-gallery.html')) {
            $query->set('posts_per_page', 24);
            $query->set('post_type', array('post', 'portfolio'));
        }
    }
}
add_action('pre_get_posts', 'creativemicroink_modify_main_query');

/**
 * Add custom image sizes
 */
function creativemicroink_image_sizes() {
    add_image_size('service-thumbnail', 400, 300, true);
    add_image_size('gallery-square', 600, 600, true);
    add_image_size('hero-background', 1920, 1080, true);
}
add_action('after_setup_theme', 'creativemicroink_image_sizes');

/**
 * Customize the WordPress admin
 */
function creativemicroink_admin_customizations() {
    // Add custom CSS for admin
    echo '<style>
        .block-editor-page .editor-styles-wrapper {
            font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        
        .components-color-palette__item[aria-label*="Accent rose"] .components-color-palette__color {
            background: #D4A574 !important;
        }
        
        .components-color-palette__item[aria-label*="Accent mauve"] .components-color-palette__color {
            background: #C8A2A2 !important;
        }
    </style>';
}
add_action('admin_head', 'creativemicroink_admin_customizations');

/**
 * Security enhancements
 */
function creativemicroink_security_headers() {
    if (!is_admin()) {
        header('X-Content-Type-Options: nosniff');
        header('X-Frame-Options: SAMEORIGIN');
        header('X-XSS-Protection: 1; mode=block');
        header('Referrer-Policy: strict-origin-when-cross-origin');
    }
}
add_action('send_headers', 'creativemicroink_security_headers');

/**
 * Remove WordPress version from head
 */
remove_action('wp_head', 'wp_generator');

/**
 * Disable XML-RPC
 */
add_filter('xmlrpc_enabled', '__return_false');

/**
 * Performance optimizations
 */
function creativemicroink_performance_optimizations() {
    // Remove emoji scripts if not needed
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('admin_print_styles', 'print_emoji_styles');
    
    // Remove unnecessary head elements
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    
    // Remove REST API links from head
    remove_action('wp_head', 'rest_output_link_wp_head');
    remove_action('wp_head', 'wp_oembed_add_discovery_links');
}
add_action('init', 'creativemicroink_performance_optimizations');


// Disable blog features added by ChatGPT
add_action('init', function () {
    // Hide Posts from admin menu
    remove_menu_page('edit.php');
});


/**
 * Booking links defaults and admin management
 */
function creativemicroink_get_default_booking_links() {
    return array(
        'powder-brows' => 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/HX7Y4RYQTN6FAETXP65QRV52',
        'ombre-brows' => 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/Q3D2VQO5K4YT3TIOPWI2K4R3',
        'microshading' => 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/MKDJESN64Q36D6AS4OLGN6GE',
        'microblading' => 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/ELARJL56PO5VEGIR4H7EERAK',
        'combo-brows' => 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/3FJ6EKM7SL42BCTJBTNYDNER',
        'lip-blushing' => 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/QKKYNGNKXQH54Q4UYNENX4FJ',
        'removal' => 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/HCN6QE2WGJP55MQYL4TZ2TTZ',
        'lamination' => 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/AXAHF2T4SQ22JYDJTJEWC5M5',
        'lash-lift' => 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/4KUUQYDXLH3QKSC2ZRQC274C',
        'brow-wax' => 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/E52373UZDFMNSGRP4DGVQC4Z',
        'promo-bf-youfriend' => 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/U56CTYOVLSNROSCSOMSRUUNU',
        'promo-bf-brows-lip' => 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/ELDYPBYQC575ZGXXJ7ZLNELR',
        'promo-bf-micro' => 'https://book.squareup.com/appointments/mqg2qbsbetp3qk/location/LNT7960JWJJ0Z/services/JAZN7MXT4J7NIU7TPGA6TENR',
    );
}

add_action('after_setup_theme', function() {
    if (!get_option('creativemicroink_booking_links')) {
        add_option('creativemicroink_booking_links', creativemicroink_get_default_booking_links());
    }
});

function creativemicroink_enqueue_booking_assets() {
    // Enqueue booking JS and CSS
    wp_enqueue_script(
        'creativemicroink-booking',
        get_template_directory_uri() . '/assets/js/booking.js',
        array(),
        wp_get_theme()->get('Version'),
        true
    );

    wp_enqueue_style(
        'creativemicroink-booking-style',
        get_template_directory_uri() . '/assets/css/booking.css',
        array(),
        wp_get_theme()->get('Version')
    );

    $links = get_option('creativemicroink_booking_links', creativemicroink_get_default_booking_links());
    wp_localize_script('creativemicroink-booking', 'CREATIVEMICROINK_BOOKING_LINKS', $links);
}
add_action('wp_enqueue_scripts', 'creativemicroink_enqueue_booking_assets', 20);

/**
 * Services defaults and admin management
 */
function creativemicroink_get_default_services() {
    return array(
        'powder-brows' => array('title' => 'Powder Brows', 'description' => 'Soft, filled-in, makeup-like look.', 'price' => 'Initial: $380 — Touch-up: $150+'),
        'ombre-brows' => array('title' => 'Ombré Brows', 'description' => 'Gradient brow from light to dark.', 'price' => 'Initial: $425 — Touch-up: $100'),
        'microshading' => array('title' => 'Microshading', 'description' => 'Soft, powdered effect using tiny dots.', 'price' => 'Initial: $380 — Touch-up: $125'),
        'microblading' => array('title' => 'Microblading / Nano Brows', 'description' => 'Hair-like strokes for fuller brows.', 'price' => 'Initial: $450 — Touch-up: $100+'),
        'combo-brows' => array('title' => 'Combo Brows', 'description' => 'Blend of strokes and shading with ombré tail.', 'price' => 'Initial: $450 — Touch-up: $100+'),
        'lip-blushing' => array('title' => 'Lip Blushing', 'description' => 'Enhances color, symmetry, and fullness.', 'price' => 'Initial: $400+ — Touch-up: $125'),
        'removal' => array('title' => 'Microblading Removal', 'description' => 'Corrects faded or discolored pigment.', 'price' => 'Initial: $160/session'),
        'lamination' => array('title' => 'Brow Lamination', 'description' => 'Fuller, groomed brow lasting 4–6 weeks.', 'price' => 'Initial: $90'),
        'lash-lift' => array('title' => 'Lash Lift & Tint', 'description' => 'Curls, lifts, and darkens natural lashes.', 'price' => 'Initial: $110'),
        'brow-wax' => array('title' => 'Brow Wax', 'description' => 'Precise hair removal for brow shaping.', 'price' => 'Initial: $20'),
        'promo-bf-youfriend' => array('title' => 'Black Friday: You & Friend Brows', 'description' => '', 'price' => '$400'),
        'promo-bf-brows-lip' => array('title' => 'Black Friday: Brows + Lip Blush', 'description' => 'Excludes touch-up.', 'price' => '$400'),
        'promo-bf-micro' => array('title' => 'Black Friday: Microblading Session', 'description' => '', 'price' => '$80'),
    );
}

add_action('after_setup_theme', function() {
    if (!get_option('creativemicroink_services')) {
        add_option('creativemicroink_services', creativemicroink_get_default_services());
    }
});

// Localize services to booking script along with links
add_action('wp_enqueue_scripts', function() {
    $services = get_option('creativemicroink_services', creativemicroink_get_default_services());
    wp_localize_script('creativemicroink-booking', 'CREATIVEMICROINK_SERVICES', $services);
}, 21);

// Admin page to edit services
function creativemicroink_services_admin_menu() {
    add_theme_page(
        __('Services', 'creativemicroink'),
        __('Services', 'creativemicroink'),
        'manage_options',
        'creativemicroink-services',
        'creativemicroink_services_page'
    );
}
add_action('admin_menu', 'creativemicroink_services_admin_menu');

function creativemicroink_services_page() {
    if (!current_user_can('manage_options')) return;

    $defaults = creativemicroink_get_default_services();
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && check_admin_referer('creativemicroink_services_save', 'creativemicroink_services_nonce')) {
        $new = array();
        foreach ($defaults as $key => $val) {
            $title_key = $key . '_title';
            $desc_key = $key . '_desc';
            $price_key = $key . '_price';
            $new[$key] = array(
                'title' => isset($_POST[$title_key]) ? sanitize_text_field(wp_unslash($_POST[$title_key])) : $val['title'],
                'description' => isset($_POST[$desc_key]) ? sanitize_text_field(wp_unslash($_POST[$desc_key])) : $val['description'],
                'price' => isset($_POST[$price_key]) ? sanitize_text_field(wp_unslash($_POST[$price_key])) : $val['price'],
            );
        }
        update_option('creativemicroink_services', $new);
        echo '<div class="updated"><p>' . esc_html__('Services saved.', 'creativemicroink') . '</p></div>';
    }

    $services = get_option('creativemicroink_services', $defaults);
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Services', 'creativemicroink'); ?></h1>
        <form method="post">
            <?php wp_nonce_field('creativemicroink_services_save', 'creativemicroink_services_nonce'); ?>
            <table class="form-table" role="presentation">
                <tbody>
                <?php foreach ($defaults as $key => $val) : ?>
                    <tr>
                        <th colspan="2"><h2><?php echo esc_html(ucwords(str_replace(array('-', '_'), ' ', $key))); ?></h2></th>
                    </tr>
                    <tr>
                        <th scope="row"><label for="<?php echo esc_attr($key . '_title'); ?>"><?php esc_html_e('Title', 'creativemicroink'); ?></label></th>
                        <td>
                            <input name="<?php echo esc_attr($key . '_title'); ?>" type="text" id="<?php echo esc_attr($key . '_title'); ?>" value="<?php echo esc_attr($services[$key]['title'] ?? $val['title']); ?>" class="regular-text" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="<?php echo esc_attr($key . '_desc'); ?>"><?php esc_html_e('Description', 'creativemicroink'); ?></label></th>
                        <td>
                            <textarea name="<?php echo esc_attr($key . '_desc'); ?>" id="<?php echo esc_attr($key . '_desc'); ?>" class="large-text" rows="2"><?php echo esc_textarea($services[$key]['description'] ?? $val['description']); ?></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="<?php echo esc_attr($key . '_price'); ?>"><?php esc_html_e('Price string', 'creativemicroink'); ?></label></th>
                        <td>
                            <input name="<?php echo esc_attr($key . '_price'); ?>" type="text" id="<?php echo esc_attr($key . '_price'); ?>" value="<?php echo esc_attr($services[$key]['price'] ?? $val['price']); ?>" class="regular-text" />
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

// Admin page to edit booking links
function creativemicroink_booking_admin_menu() {
    add_theme_page(
        __('Booking Links', 'creativemicroink'),
        __('Booking Links', 'creativemicroink'),
        'manage_options',
        'creativemicroink-booking',
        'creativemicroink_booking_page'
    );
}
add_action('admin_menu', 'creativemicroink_booking_admin_menu');

function creativemicroink_booking_page() {
    if (!current_user_can('manage_options')) return;

    $defaults = creativemicroink_get_default_booking_links();
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && check_admin_referer('creativemicroink_booking_save', 'creativemicroink_booking_nonce')) {
        $new = array();
        foreach ($defaults as $key => $val) {
            $name = sanitize_text_field($key);
            $new[$key] = isset($_POST[$name]) ? esc_url_raw(wp_unslash($_POST[$name])) : '';
        }
        update_option('creativemicroink_booking_links', $new);
        echo '<div class="updated"><p>' . esc_html__('Booking links saved.', 'creativemicroink') . '</p></div>';
    }

    $links = get_option('creativemicroink_booking_links', $defaults);
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Booking Links', 'creativemicroink'); ?></h1>
        <form method="post">
            <?php wp_nonce_field('creativemicroink_booking_save', 'creativemicroink_booking_nonce'); ?>
            <table class="form-table" role="presentation">
                <tbody>
                <?php foreach ($defaults as $key => $val) : ?>
                    <tr>
                        <th scope="row"><label for="<?php echo esc_attr($key); ?>"><?php echo esc_html(ucwords(str_replace(array('-', '_'), ' ', $key))); ?></label></th>
                        <td>
                            <input name="<?php echo esc_attr($key); ?>" type="url" id="<?php echo esc_attr($key); ?>" value="<?php echo esc_attr($links[$key] ?? $val); ?>" class="regular-text" />
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

?>