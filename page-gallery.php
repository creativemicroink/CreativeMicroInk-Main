<?php
/**
 * Template Name: Gallery Page
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
        <article id="post-<?php the_ID(); ?>" <?php post_class('gallery-page'); ?>>
            
            <!-- Page Header -->
            <section class="page-header">
                <div class="container">
                    <h1><?php the_title(); ?></h1>
                    <p class="page-subtitle"><?php echo get_field('page_subtitle') ?: 'See the beautiful transformations we\'ve created for our clients. From natural enhancements to bold statements, every look is customized to perfection.'; ?></p>
                </div>
            </section>

            <!-- Gallery Filter Navigation -->
            <section class="gallery-filters">
                <div class="container">
                    <div class="filter-buttons">
                        <button class="filter-btn active" data-filter="all">All Work</button>
                        <button class="filter-btn" data-filter="eyebrows">Eyebrows</button>
                        <button class="filter-btn" data-filter="eyeliner">Eyeliner</button>
                        <button class="filter-btn" data-filter="lips">Lips</button>
                    </div>
                </div>
            </section>

            <!-- Main Gallery Section -->
            <section class="section gallery-section">
                <div class="container">
                    <div class="gallery-grid" id="gallery-grid">
                        
                        <?php
                        // Get gallery images from custom fields or WordPress media
                        $gallery_images = get_field('gallery_images');
                        
                        if ($gallery_images) :
                            foreach ($gallery_images as $image) :
                                $category = get_field('image_category', $image['ID']) ?: 'all';
                                $caption = $image['caption'] ?: $image['alt'];
                        ?>
                                <div class="gallery-item" data-category="<?php echo esc_attr($category); ?>">
                                    <img src="<?php echo esc_url($image['sizes']['large']); ?>" 
                                         alt="<?php echo esc_attr($image['alt']); ?>"
                                         data-full="<?php echo esc_url($image['url']); ?>">
                                    <?php if ($caption) : ?>
                                        <div class="gallery-caption"><?php echo esc_html($caption); ?></div>
                                    <?php endif; ?>
                                </div>
                        <?php
                            endforeach;
                        else :
                            // Default placeholder images for demo
                            $default_items = [
                                ['category' => 'eyebrows', 'caption' => 'Microblading - Natural Hair Strokes', 'image' => '/wp-content/uploads/gallery/eyebrow-before-after-1.jpg'],
                                ['category' => 'eyebrows', 'caption' => 'Powder Brows - Soft & Natural', 'image' => '/wp-content/uploads/gallery/powder-brows-before-after-1.jpg'],
                                ['category' => 'eyebrows', 'caption' => 'Shape Correction & Enhancement', 'image' => '/wp-content/uploads/gallery/eyebrow-shape-correction.jpg'],
                                ['category' => 'eyeliner', 'caption' => 'Lash Line Enhancement', 'image' => '/wp-content/uploads/gallery/lash-line-enhancement.jpg'],
                                ['category' => 'eyeliner', 'caption' => 'Classic Top Eyeliner', 'image' => '/wp-content/uploads/gallery/classic-eyeliner-top.jpg'],
                                ['category' => 'eyeliner', 'caption' => 'Winged Eyeliner Design', 'image' => '/wp-content/uploads/gallery/winged-eyeliner-permanent.jpg'],
                                ['category' => 'lips', 'caption' => 'Natural Lip Blush', 'image' => '/wp-content/uploads/gallery/lip-blush-natural.jpg'],
                                ['category' => 'lips', 'caption' => 'Full Lip Color - Rose', 'image' => '/wp-content/uploads/gallery/full-lip-color-rose.jpg'],
                                ['category' => 'lips', 'caption' => 'Lip Enhancement & Definition', 'image' => '/wp-content/uploads/gallery/lip-enhancement-definition.jpg'],
                            ];
                            
                            foreach ($default_items as $item) :
                        ?>
                                <div class="gallery-item" data-category="<?php echo esc_attr($item['category']); ?>">
                                    <img src="<?php echo esc_url($item['image']); ?>" 
                                         alt="<?php echo esc_attr($item['caption']); ?>"
                                         data-full="<?php echo esc_url($item['image']); ?>">
                                    <div class="gallery-caption"><?php echo esc_html($item['caption']); ?></div>
                                </div>
                        <?php
                            endforeach;
                        endif;
                        ?>
                        
                    </div>
                    
                    <!-- Load More Button -->
                    <div class="gallery-load-more">
                        <button id="load-more-btn" class="btn btn-secondary">View More Work</button>
                    </div>
                </div>
            </section>

            <!-- Before & After Information Section -->
            <section class="section info-section">
                <div class="container">
                    <h2 class="section-title">What to Expect</h2>
                    
                    <div class="grid-3">
                        <div class="info-card">
                            <h3>Healing Process</h3>
                            <p>Your permanent makeup will appear darker initially and will lighten significantly during the 4-6 week healing process. The final result will be natural and beautiful.</p>
                        </div>

                        <div class="info-card">
                            <h3>Touch-Up Session</h3>
                            <p>A touch-up appointment 6-8 weeks after your initial treatment ensures perfect results and extends the longevity of your permanent makeup.</p>
                        </div>

                        <div class="info-card">
                            <h3>Long-Term Care</h3>
                            <p>With proper care, your permanent makeup can last 1-3 years. We recommend annual touch-ups to maintain the color and shape.</p>
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
                    <h2>Ready for Your Transformation?</h2>
                    <p>Book your consultation today and let us create your perfect permanent makeup look.</p>
                    <a href="<?php echo get_permalink(get_page_by_path('book-appointment')); ?>" class="btn btn-primary btn-large">Schedule Consultation</a>
                </div>
            </section>

        </article>
        <?php
    endwhile;
    ?>
</main>

<script>
// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});
</script>

<?php get_footer(); ?>