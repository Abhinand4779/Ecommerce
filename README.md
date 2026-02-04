# Aurelia Jewels - Flipkart-Style E-commerce Frontend

A modern, Flipkart-inspired jewellery e-commerce platform built with **Next.js 14**, **TypeScript**, and responsive design principles.

## 🎯 Flipkart-Inspired Features

### **Homepage**
- ✅ Clean white background with blue accents (Flipkart colors)
- ✅ Prominent search bar in header
- ✅ Horizontal scrolling category banner
- ✅ Deal sections with grid layouts
- ✅ Promotional banners with CTAs
- ✅ "Why Choose Us" trust indicators
- ✅ Product cards with ratings and discounts

### **Shop Page (Product Listing)**
- ✅ Filters sidebar (desktop) with categories, price, discount, ratings
- ✅ Mobile filter modal
- ✅ Breadcrumb navigation
- ✅ Sort options (Popularity, Price, Rating, Newest)
- ✅ Product count display
- ✅ Grid layout (2-6 columns responsive)
- ✅ Discount badges and ratings on cards

### **Product Detail Page**
- ✅ Image gallery with thumbnails
- ✅ Star ratings with review count
- ✅ Price with strikethrough original price
- ✅ Discount percentage in green
- ✅ Available offers section
- ✅ Pincode delivery check
- ✅ Product highlights and specifications
- ✅ Service icons (Free Delivery, Warranty, Returns)
- ✅ Sticky "Add to Cart" and "Buy Now" buttons
- ✅ Detailed specifications table

### **Shopping Cart**
- ✅ Item cards with images and details
- ✅ Quantity increment/decrement controls
- ✅ Remove item functionality
- ✅ Delivery timeline per item
- ✅ Price breakdown (Price, Discount, Delivery, Total)
- ✅ Savings highlight in green
- ✅ Coupon code section
- ✅ Sticky price summary (desktop)
- ✅ "Place Order" CTA button

### **Navigation**
- ✅ Clean white header with search bar
- ✅ Logo with tagline
- ✅ Cart icon with item count badge
- ✅ Admin/User login link
- ✅ Mobile-responsive search
- ✅ Sticky header

## 🎨 Design System

### **Colors**
- Primary Blue: `#2874f0` (Flipkart blue)
- Gold Accent: `#D4AF37` (Luxury touch)
- Background: `#f1f3f6` (Light gray)
- Success Green: `#388e3c`
- Orange CTA: `#ff9f00`
- Text Dark: `#212121`
- Text Gray: `#878787`

### **Typography**
- Primary: Roboto (Flipkart's font)
- Secondary: Inter
- Clean, readable hierarchy

### **Components**
- White cards with subtle borders
- Rounded corners (2-4px)
- Minimal shadows
- Green rating badges
- Discount tags
- Clean buttons with uppercase text

## 📱 Responsive Design

- **Mobile** (< 640px): 2-column grids, mobile filters, stacked layouts
- **Tablet** (640px - 1024px): 3-column grids, optimized spacing
- **Desktop** (> 1024px): Full sidebar filters, 4-6 column grids

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 New Components

### Layout Components
- `FlipkartNavbar.tsx` - E-commerce header with search

### UI Components
- `CategoryBanner.tsx` - Horizontal scrolling categories
- `DealsSection.tsx` - Promotional deals grid
- `ProductCardFlipkart.tsx` - Product card with ratings & discounts

## 🔗 Routes

- **Homepage**: `/` - Hero, categories, deals, trending products
- **Shop**: `/shop` - Product listing with filters
- **Product Detail**: `/shop/[id]` - Full product information
- **Cart**: `/cart` - Shopping cart with checkout
- **Admin**: `/admin` - Admin dashboard (existing)

## ✨ Key Differences from Previous Version

| Feature | Previous (Luxury) | Current (Flipkart) |
|---------|------------------|-------------------|
| Theme | Dark, premium gold | Clean white, blue accents |
| Navigation | Glassmorphism navbar | White header with search |
| Products | Hover effects, minimal info | Ratings, discounts, detailed |
| Layout | Hero-focused, artistic | Grid-focused, functional |
| Typography | Playfair Display serif | Roboto sans-serif |
| Colors | Black & gold | White, blue, green |
| Filters | Top pills | Sidebar with checkboxes |
| Cart | Minimal, elegant | Detailed with breakdowns |

## 🎯 E-commerce Best Practices

✅ **Trust Signals**: Ratings, reviews, certifications  
✅ **Urgency**: Discount percentages, limited offers  
✅ **Convenience**: Pincode check, delivery estimates  
✅ **Transparency**: Price breakdowns, savings display  
✅ **Accessibility**: Clear CTAs, breadcrumbs, filters  
✅ **Mobile-First**: Touch-friendly, responsive design  

---

**Built with inspiration from Flipkart.com** 🛒
