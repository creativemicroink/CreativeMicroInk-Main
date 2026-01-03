# WordPress Pages Setup Guide

Now that you have the theme files, you need to create the actual WordPress pages and assign the templates. Follow these steps:

## Step 1: Create the Required Pages

### 1. Go to WordPress Admin
- Log into your WordPress admin dashboard
- Navigate to **Pages > Add New**

### 2. Create Front Page (Homepage)
- **Title**: "Home" 
- **Content**: You can leave this mostly empty as the front-page.php template handles the content
- **DO NOT** select any page template - the theme will automatically use `front-page.php`
- **Publish** the page

### 3. Create Blog Page (for Posts)
- **Title**: "Blog" 
- **Content**: You can leave this empty as the home.php template handles the blog layout
- **DO NOT** select any page template - the theme will automatically use `home.php` when set as posts page
- **Publish** the page

### 4. Create Services Page  
- **Title**: "Services"
- **Content**: Add any additional text you want (optional)
- **Page Attributes**: Select **Template**: "Services Page"
- **Publish** the page

### 5. Create Gallery Page
- **Title**: "Gallery" or "Portfolio"
- **Content**: Add any intro text (optional)
- **Page Attributes**: Select **Template**: "Gallery Page" 
- **Publish** the page

### 6. Create Booking Page
- **Title**: "Book Appointment" 
- **Content**: Add any additional booking information (optional)
- **Page Attributes**: Select **Template**: "Booking Page"
- **Publish** the page

## Step 2: Set Homepage and Blog Page

### 1. Configure Reading Settings
- Go to **Settings > Reading**
- Under "Your homepage displays" select **A static page**
- **Homepage**: Select "Home" from dropdown (this will use front-page.php)
- **Posts page**: Select "Blog" from dropdown (this will use home.php for blog posts)
- **Save Changes**

## Step 3: Create Navigation Menus

### 1. Create Primary Menu
- Go to **Appearance > Menus**
- Click **Create a new menu**
- **Menu Name**: "Primary Navigation"
- Add your pages to the menu:
  - Home
  - Services  
  - Gallery
  - About (create this page if needed)
  - Contact (create this page if needed)
- Under **Menu Settings**, check **Primary Navigation**
- **Save Menu**

### 2. Create Footer Menu (Optional)
- Create another menu called "Footer Navigation"
- Add relevant pages
- Check **Footer Navigation** under Menu Settings

## Step 4: Add Custom Fields (Optional but Recommended)

If you want to customize the content without editing template files, install the **Advanced Custom Fields** plugin and add these fields:

### For Home Page:
- `hero_title` (Text)
- `hero_subtitle` (Textarea) 
- `services_title` (Text)
- `testimonials_title` (Text)
- `cta_title` (Text)
- `cta_subtitle` (Textarea)

### For Services Page:
- `page_subtitle` (Textarea)

### For Gallery Page:
- `page_subtitle` (Textarea)
- `gallery_images` (Gallery field)

### For Booking Page:
- `page_subtitle` (Textarea)
- `booking_widget_code` (Textarea) - **This is where you'll paste your Square Appointments code**
- `phone_number` (Text)

## Step 5: Add Your Square Appointments Booking Widget

### Method 1: Using Custom Field (Recommended)
1. Edit your Booking page
2. In the **Booking Widget Code** custom field, paste your Square Appointments HTML embed code
3. Update the page

### Method 2: Direct Edit (Alternative)
1. Edit the `page-booking.php` file
2. Find the comment that says "Show placeholder with instructions"  
3. Replace the placeholder div with your Square Appointments embed code

## Step 6: Customize Content

### Edit Page Content
- Go to each page and edit the content as needed
- The templates will display your content along with the designed sections
- You can add additional content blocks using the WordPress editor

### Add Images to Gallery
- Upload your before/after photos to the Media Library
- If using ACF, add them to the Gallery field on the Gallery page
- Otherwise, you'll need to edit the `page-gallery.php` file directly

## Step 7: Configure Theme Settings

### 1. Site Identity
- Go to **Appearance > Customize > Site Identity**
- Add your logo, site title, and tagline

### 2. Colors (if needed)
- The theme uses pre-defined colors, but you can customize via **Appearance > Customize > Colors**

### 3. Widgets (if applicable)
- Set up any sidebar widgets if your theme uses them

## Step 8: Test Your Pages

1. **Visit each page** to ensure they display correctly
2. **Test navigation** between pages
3. **Test mobile responsiveness**
4. **Test the booking widget** (if added)
5. **Check all "Book Now" buttons** link to your booking page

## Troubleshooting

### If Template Options Don't Appear:
1. Make sure all theme files are uploaded correctly
2. Check that the page template files are in the theme root directory
3. Refresh your WordPress admin page

### If Styling Looks Wrong:
1. Clear any caching plugins
2. Hard refresh your browser (Ctrl+F5)
3. Check that `style.css` is properly uploaded

### If Custom Fields Don't Work:
- The templates will work without custom fields, showing default content
- Install Advanced Custom Fields plugin for full customization

## Next Steps

Once pages are set up:
1. **Add your real content** and images
2. **Install and configure** your Square Appointments booking widget  
3. **Test the booking process** thoroughly
4. **Optimize images** for web performance
5. **Set up backup** and security measures

Your CreativeMicroInk website should now be fully functional with editable pages in WordPress!