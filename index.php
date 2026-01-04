<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="CreativeMicroInk - Professional permanent makeup services for eyebrows, eyeliner, and lips. Book your consultation today.">
    <meta name="keywords" content="permanent makeup, microblading, eyebrow tattoo, eyeliner tattoo, lip blush, cosmetic tattooing">
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <header id="masthead" class="site-header">
        <?php
        // Check if we have a header template part
        if (function_exists('block_template_part')) {
            block_template_part('header');
        } else {
            // Fallback header
            ?>
            <div class="container">
                <nav class="main-navigation">
                    <div class="site-branding">
                        <?php if (has_custom_logo()) : ?>
                            <?php the_custom_logo(); ?>
                        <?php else : ?>
                            <h1 class="site-title">
                                <a href="<?php echo esc_url(home_url('/')); ?>">
                                    <?php bloginfo('name'); ?>
                                </a>
                            </h1>
                        <?php endif; ?>
                    </div>
                    
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'primary',
                        'menu_id'        => 'primary-menu',
                        'container'      => false,
                        'menu_class'     => 'main-menu',
                        'fallback_cb'    => false,
                    ));
                    ?>
                    
                    <div class="header-cta">
                        <a href="/book-appointment" class="btn btn-primary">Book Now</a>
                    </div>
                </nav>
            </div>
            <?php
        }
        ?>
    </header>

    <main id="primary" class="site-main">
        <?php
        // Check if this is a block theme and try to use block templates
        if (function_exists('wp_is_block_theme') && wp_is_block_theme()) {
            // For block themes, the content will be rendered by the template
            if (have_posts()) {
                while (have_posts()) {
                    the_post();
                    the_content();
                }
            }
        } else {
            // Fallback for classic theme compatibility
            if (have_posts()) : ?>
                <div class="container">
                    <?php while (have_posts()) : the_post(); ?>
                        <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                            <header class="entry-header">
                                <?php
                                if (is_singular()) :
                                    the_title('<h1 class="entry-title">', '</h1>');
                                else :
                                    the_title('<h2 class="entry-title"><a href="' . esc_url(get_permalink()) . '">', '</a></h2>');
                                endif;
                                ?>
                            </header>

                            <div class="entry-content">
                                <?php
                                if (is_singular()) {
                                    the_content();
                                } else {
                                    the_excerpt();
                                }
                                
                                wp_link_pages(array(
                                    'before' => '<div class="page-links">' . esc_html__('Pages:', 'creativemicroink'),
                                    'after'  => '</div>',
                                ));
                                ?>
                            </div>

                            <?php if (!is_singular()) : ?>
                                <footer class="entry-footer">
                                    <a href="<?php the_permalink(); ?>" class="btn btn-secondary">
                                        <?php esc_html_e('Read More', 'creativemicroink'); ?>
                                    </a>
                                </footer>
                            <?php endif; ?>
                        </article>
                    <?php endwhile; ?>

                    <?php
                    // Pagination
                    the_posts_pagination(array(
                        'prev_text' => esc_html__('Previous', 'creativemicroink'),
                        'next_text' => esc_html__('Next', 'creativemicroink'),
                    ));
                    ?>
                </div>
                
            <?php else : ?>
                <div class="container">
                    <section class="no-results not-found">
                        <header class="page-header">
                            <h1 class="page-title"><?php esc_html_e('Nothing here', 'creativemicroink'); ?></h1>
                        </header>

                        <div class="page-content">
                            <?php if (is_home() && current_user_can('publish_posts')) : ?>
                                <p><?php
                                    printf(
                                        wp_kses(
                                            __('Ready to publish your first post? <a href="%1$s">Get started here</a>.', 'creativemicroink'),
                                            array('a' => array('href' => array()))
                                        ),
                                        esc_url(admin_url('post-new.php'))
                                    );
                                ?></p>
                            <?php elseif (is_search()) : ?>
                                <p><?php esc_html_e('Sorry, but nothing matched your search terms. Please try again with some different keywords.', 'creativemicroink'); ?></p>
                                <?php get_search_form(); ?>
                            <?php else : ?>
                                <p><?php esc_html_e('It seems we can&rsquo;t find what you&rsquo;re looking for. Perhaps searching can help.', 'creativemicroink'); ?></p>
                                <?php get_search_form(); ?>
                            <?php endif; ?>
                        </div>
                    </section>
                </div>
            <?php endif; ?>
        <?php } ?>
    </main>

    <footer id="colophon" class="site-footer">
        <?php
        // Check if we have a footer template part
        if (function_exists('block_template_part')) {
            block_template_part('footer');
        } else {
            // Fallback footer
            ?>
            <div class="container">
                <div class="footer-content">
                    <div class="footer-info">
                        <h3><?php bloginfo('name'); ?></h3>
                        <p class="footer-text">Professional permanent makeup services</p>
                        <p class="footer-text">Email: Creativemicroink@gmail.com</p>
                        <p class="footer-text">Phone: (555) 123-4567</p>
                    </div>
                    
                    <?php
                    wp_nav_menu(array(
                        'theme_location' => 'footer',
                        'menu_id'        => 'footer-menu',
                        'container'      => 'nav',
                        'container_class' => 'footer-navigation',
                        'menu_class'     => 'footer-menu',
                        'fallback_cb'    => false,
                    ));
                    ?>
                    
                    <div class="footer-bottom">
                        <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All rights reserved.</p>
                    </div>
                </div>
            </div>
            <?php
        }
        ?>
    </footer>
</div>

<?php wp_footer(); ?>

</body>
</html>