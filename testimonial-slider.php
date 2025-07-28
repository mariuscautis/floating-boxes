<?php 
$slide_type = get_field('slides_type');
?>
<section class="testimonials <?php echo $slide_type; ?>">
    <div class="outer">
        <div class="testimonials-row">
            <!-- Sample testimonials for demo -->
            <?php 
            if ($slide_type == 'testimonial') { 
                // Check rows exists.
                if( have_rows('testimonial_repeater') ):
                    // Loop through rows.
                    while( have_rows('testimonial_repeater') ) : the_row();
                        // Load sub field value.
                        $id = get_sub_field('testimonial');
                        $author = get_the_title($id);
                        $content = get_field('content', $id);
                        
                        // Do something, but make sure you escape the value if outputting directly... ?>
                        <div class="testimonial base-content">
                            <div class="testimonial-inner">
                                <div class="inner-area">
                                    <div class="testimonial-overlay gradient-border-mask">
                                        <div class="quote-reference"></div>
                                    </div>
                                    <p class="testimonial-content">
                                        <?php echo $content; ?>                                
                                    </p>
                                    <p class="testimonial-title">
                                        <?php echo $author; ?>
                                    </p>
                                </div>
                            </div>
                        </div>
                    <?php  // End loop.
                    endwhile;
                // No value.
                else :
                    // Do something...
                endif; 
            } else {
                if( have_rows('custom_content_repeater') ):
                    // Loop through rows.
                    while( have_rows('custom_content_repeater') ) : the_row();
                        // Load sub field value.
                        $box_heading = get_sub_field('box_heading');
                        $content_area = get_sub_field('content');
                        $link_text = get_sub_field('link_text');
                        $URL = get_sub_field('link_url');
                        
                        // Do something, but make sure you escape the value if outputting directly... ?>
                        <div class="testimonial custom-content">
                            <div class="testimonial-inner">
                                <div class="inner-area">
                                    <div class="testimonial-overlay gradient-border-mask">
                                        <div class="quote-reference"></div>
                                    </div>
                                    <p class="testimonial-content">
                                        <h3><?php echo $box_heading; ?></h3>
                                        <span class="custom-content-text"><?php echo $content_area; ?></span>
                                    </p>
                                    <?php if ( $URL ) { ?>
                                        <a href="<?php echo $URL; ?>" class="box-url"><?php echo $link_text; ?> <span class="mini-chevron"> > </span></a>
                                    <?php } ?>
                                </div>
                            </div>
                        </div>
                    <?php  // End loop.
                    endwhile;
                // No value.
                else :
                    // Do something...
                endif;
            }
            ?>
            
            <!-- Duplicate the testimonials for seamless looping -->
            <?php 
            if ($slide_type == 'testimonial') { 
                // Check rows exists.
                if( have_rows('testimonial_repeater') ):
                    // Loop through rows.
                    while( have_rows('testimonial_repeater') ) : the_row();
                        // Load sub field value.
                        $id = get_sub_field('testimonial');
                        $author = get_the_title($id);
                        $content = get_field('content', $id);
                        
                        // Do something, but make sure you escape the value if outputting directly... ?>
                        <div class="testimonial base-content">
                            <div class="testimonial-inner">
                                <div class="inner-area">
                                    <div class="testimonial-overlay gradient-border-mask">
                                        <div class="quote-reference"></div>
                                    </div>
                                    <p class="testimonial-content">
                                        <?php echo $content; ?>                                
                                    </p>
                                    <p class="testimonial-title">
                                        <?php echo $author; ?>
                                    </p>
                                </div>
                            </div>
                        </div>
                    <?php  // End loop.
                    endwhile;
                // No value.
                else :
                    // Do something...
                endif; 
            } else {
                if( have_rows('custom_content_repeater') ):
                    // Loop through rows.
                    while( have_rows('custom_content_repeater') ) : the_row();
                        // Load sub field value.
                        $box_heading = get_sub_field('box_heading');
                        $content_area = get_sub_field('content');
                        $link_text = get_sub_field('link_text');
                        $URL = get_sub_field('link_url');
                        
                        // Do something, but make sure you escape the value if outputting directly... ?>
                        <div class="testimonial custom-content">
                            <div class="testimonial-inner">
                                <div class="inner-area">
                                    <div class="testimonial-overlay gradient-border-mask">
                                        <div class="quote-reference"></div>
                                    </div>
                                    <p class="testimonial-content">
                                        <h3><?php echo $box_heading; ?></h3>                                       
                                        <span class="custom-content-text"><?php echo $content_area; ?></span>                             
                                    </p>
                                    <?php if( $URL) { ?>
                                        <a href="<?php echo $URL; ?>" class="box-url"><?php echo $link_text; ?> <span class="mini-chevron">  > </span></a>
                                   <?php } ?>
                                </div>
                            </div>
                        </div>
                    <?php  // End loop.
                    endwhile;
                // No value.
                else :
                    // Do something...
                endif;
            }
            ?>
        </div>
        
        <!-- Updated Scrollbar -->
        <div class="testimonials-scrollbar-container">
            <div class="testimonials-scrollbar-track">
                <div class="testimonials-scrollbar-bar"></div>
            </div>
        </div>


          <!-- Navigation Arrows -->
          <div class="testimonials-navigation">
            <button class="testimonial-nav-arrow testimonial-nav-prev" type="button" aria-label="Previous testimonials">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button class="testimonial-nav-arrow testimonial-nav-next" type="button" aria-label="Next testimonials">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
    </div>

    <div class="testimonial-wavy-container">
        <div class="testimonial-wave-line line1">
            <svg viewBox="0 0 800 100">
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#0058F7;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#0CD089;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#0058F7;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path class="wave-path1" d="M 0 50 C 200 10, 200 10, 400 50 C 600 90, 600 90, 800 50" />
            </svg>
        </div>            
    </div>
</section>