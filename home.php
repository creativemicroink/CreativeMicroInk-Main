<?php
/**
 * Blog Home Template (Posts Page)
 * This template displays the blog posts listing
 * 
 * @package CreativeMicroInk
 * @version 1.0.0
 */

get_header(); ?>

<main id="primary" class="site-main">
    
    <!-- Blog Header -->
    <section class="page-header">
        <div class="container">
            <h1><?php echo is_home() ? 'Our Blog' : get_the_title(); ?></h1>
            <p class="page-subtitle">Stay updated with the latest trends in permanent makeup and beauty tips.</p>
        </div>
    </section>

    <!-- Blog Posts -->
    <section class="section blog-section">
        <div class="container">
            <?php if (have_posts()) : ?>
                <div class="blog-grid">
                    <?php while (have_posts()) : the_post(); ?>
                        <article id="post-<?php the_ID(); ?>" <?php post_class('blog-card'); ?>>
                            
                            <?php if (has_post_thumbnail()) : ?>
                                <div class="blog-featured-image">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail('medium'); ?>
                                    </a>
                                </div>
                            <?php endif; ?>

                            <div class="blog-content">
                                <header class="blog-header">
                                    <div class="blog-meta">
                                        <span class="blog-date"><?php echo get_the_date(); ?></span>
                                        <span class="blog-category">
                                            <?php
                                            $categories = get_the_category();
                                            if ($categories) {
                                                echo esc_html($categories[0]->name);
                                            }
                                            ?>
                                        </span>
                                    </div>
                                    
                                    <h2 class="blog-title">
                                        <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                                    </h2>
                                </header>

                                <div class="blog-excerpt">
                                    <?php the_excerpt(); ?>
                                </div>

                                <footer class="blog-footer">
                                    <a href="<?php the_permalink(); ?>" class="btn btn-secondary">Read More</a>
                                </footer>
                            </div>
                        </article>
                    <?php endwhile; ?>
                </div>

                <!-- Pagination -->
                <div class="blog-pagination">
                    <?php
                    the_posts_pagination(array(
                        'prev_text' => '&laquo; Previous',
                        'next_text' => 'Next &raquo;',
                    ));
                    ?>
                </div>

            <?php else : ?>
                
                <!-- No Posts Found -->
                <div class="no-posts">
                    <h2>No Posts Found</h2>
                    <p>There are currently no blog posts to display. Check back soon for updates!</p>
                </div>

            <?php endif; ?>
        </div>
    </section>
</main>

<style>
/* Blog Styles */
.blog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.blog-card {
    background: var(--color-white);
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-soft);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-medium);
}

.blog-featured-image {
    aspect-ratio: 16/9;
    overflow: hidden;
}

.blog-featured-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.blog-card:hover .blog-featured-image img {
    transform: scale(1.05);
}

.blog-content {
    padding: 2rem;
}

.blog-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: var(--color-medium-gray);
}

.blog-title {
    margin-bottom: 1rem;
    font-size: 1.5rem;
    line-height: 1.3;
}

.blog-title a {
    color: var(--color-text-dark);
    text-decoration: none;
    transition: color 0.3s ease;
}

.blog-title a:hover {
    color: var(--color-accent-rose);
}

.blog-excerpt {
    margin-bottom: 1.5rem;
    color: var(--color-dark-gray);
    line-height: 1.6;
}

.blog-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.blog-pagination {
    text-align: center;
    margin-top: 3rem;
}

.blog-pagination .nav-links {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
}

.blog-pagination .page-numbers {
    padding: 0.75rem 1rem;
    background: var(--color-white);
    color: var(--color-text-dark);
    text-decoration: none;
    border-radius: var(--border-radius-sm);
    border: 1px solid var(--color-light-gray);
    transition: all 0.3s ease;
}

.blog-pagination .page-numbers:hover,
.blog-pagination .page-numbers.current {
    background: var(--color-accent-rose);
    color: var(--color-white);
    border-color: var(--color-accent-rose);
}

.no-posts {
    text-align: center;
    padding: 4rem 2rem;
}

.no-posts h2 {
    margin-bottom: 1rem;
    color: var(--color-text-dark);
}

.no-posts p {
    color: var(--color-dark-gray);
}

/* Responsive */
@media (max-width: 768px) {
    .blog-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }
    
    .blog-content {
        padding: 1.5rem;
    }
    
    .blog-meta {
        flex-direction: column;
        gap: 0.5rem;
    }
}
</style>

<?php get_footer(); ?>