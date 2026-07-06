import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Heart, ShoppingBag, Star, Truck, ShieldCheck, Video, Phone,
  MessageCircle, MapPin, CheckCircle2, ChevronRight, Share2, Scale,
  Maximize2, ChevronLeft,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { ProductCarousel } from "@/components/ProductCarousel";
import { QuantitySelector } from "@/components/QuantitySelector";
import { ImageZoom } from "@/components/ImageZoom";
import { BookingDialog } from "@/components/BookingDialog";
import {
  getProductBySlug, getRelatedProducts, collections, formatPrice, products,
} from "@/data/products";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { useCompare } from "@/hooks/useCompare";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { toast as sonner } from "sonner";
import { cn } from "@/lib/utils";
import { CONTACT, whatsappUrl } from "@/config/contact";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger,
} from "@/components/ui/dialog";

interface UserReview { name: string; rating: number; text: string; ts: number }

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug || "");
  const [imageIdx, setImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [pincodeResult, setPincodeResult] = useState<null | { ok: boolean; msg: string }>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, text: "" });
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { addItem: addToCart } = useCart();
  const { toggle: toggleCompare, has: inCompare } = useCompare();
  const pushRecent = useRecentlyViewed((s) => s.push);
  const recentItems = useRecentlyViewed((s) => s.items);
  const { toast } = useToast();

  const reviewsKey = product ? `rf.reviews.${product.id}` : "";

  useEffect(() => {
    if (!product) return;
    pushRecent(product);
    setImageIdx(0);
    try {
      const raw = localStorage.getItem(reviewsKey);
      setUserReviews(raw ? JSON.parse(raw) : []);
    } catch {
      setUserReviews([]);
    }
  }, [product, pushRecent, reviewsKey]);

  if (!product) {
    return (
      <Layout>
        <div className="container-wide py-28 text-center">
          <h1 className="font-serif text-4xl mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The piece you're looking for doesn't exist.</p>
          <Button asChild className="rounded-sm px-8"><Link to="/products">Browse All Products</Link></Button>
        </div>
      </Layout>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const related = getRelatedProducts(product.id);
  const collection = collections.find((c) => c.id === product.collection);
  const emiMonthly = Math.ceil(product.price / 6);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast({ title: "Added to cart", description: `${quantity} × ${product.name}` });
  };

  const handleBuyReadymade = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast({ title: "Removed from wishlist" });
    } else {
      addToWishlist(product);
      toast({ title: "Saved to wishlist", description: product.name });
    }
  };

  const checkPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{6}$/.test(pincode)) {
      setPincodeResult({ ok: false, msg: "Please enter a valid 6-digit pincode." });
      return;
    }
    // Mock: even last digit = available
    const ok = parseInt(pincode.slice(-1), 10) % 2 === 0;
    setPincodeResult(
      ok
        ? { ok: true, msg: `Delivery available — arrives in 7–10 days.` }
        : { ok: false, msg: "Sorry, delivery to this pincode is not yet available." },
    );
  };

  const reviews = [
    { name: "Aisha M.", rating: 5, text: "Build quality is spectacular. The oak finish is exactly as shown." },
    { name: "Rohan K.", rating: 4, text: "Delivery was smooth and assembly team was professional." },
    { name: "Meera S.", rating: 5, text: "Looks premium in our living room. Very happy with the purchase." },
  ];

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container-full py-4 border-b border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/products" className="hover:text-foreground">Shop</Link>
          {collection && (
            <>
              <ChevronRight className="w-3 h-3" />
              <Link to={`/products?collection=${collection.slug}`} className="hover:text-foreground">
                {collection.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground truncate">{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <section className="py-8 md:py-12">
        <div className="container-full">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
            {/* Gallery */}
            <div className="lg:col-span-6 xl:col-span-5">
              <ImageZoom src={product.images[imageIdx]} alt={product.name} />

              {product.images.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImageIdx(i)}
                      className={cn(
                        "w-20 h-20 overflow-hidden rounded-sm transition-all",
                        i === imageIdx
                          ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                          : "opacity-60 hover:opacity-100",
                      )}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-6 xl:col-span-7"
            >
              {collection && (
                <Link
                  to={`/products?collection=${collection.slug}`}
                  className="inline-block text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3"
                >
                  {collection.name}
                </Link>
              )}
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.05] mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className={cn(
                        "w-4 h-4",
                        n <= Math.round(product.rating || 0)
                          ? "fill-primary text-primary"
                          : "text-muted-foreground/40",
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating?.toFixed(1)} · {product.reviewCount} reviews
                </span>
              </div>

              {/* Price */}
              <div className="p-5 bg-linen rounded-sm mb-6">
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-primary mb-2">
                  Today's Deal Price
                </p>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-serif text-4xl text-foreground">{formatPrice(product.price)}</span>
                  {product.mrp && (
                    <span className="text-lg text-muted-foreground line-through">
                      MRP {formatPrice(product.mrp)}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-primary text-primary-foreground rounded-sm">
                      {product.discountPercent}% OFF
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Inclusive of all taxes</p>

                {/* EMI */}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="mt-3 text-xs text-primary hover:underline flex items-center gap-1">
                      No-cost EMI from <span className="font-semibold">{formatPrice(emiMonthly)}/mo</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>EMI Calculator</DialogTitle>
                      <DialogDescription>Split your purchase into easy monthly installments.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 pt-2">
                      {[3, 6, 9, 12].map((m) => (
                        <div key={m} className="flex justify-between items-center py-3 border-b border-border">
                          <span className="text-sm">{m} months</span>
                          <span className="font-semibold">{formatPrice(Math.ceil(product.price / m))}/mo</span>
                        </div>
                      ))}
                      <p className="text-xs text-muted-foreground pt-2">
                        No-cost EMI on all major bank cards. Terms apply.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Quantity + Pincode */}
              <div className="grid sm:grid-cols-2 gap-5 mb-6">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-2">Quantity</p>
                  <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
                </div>
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-2">
                    Check Delivery
                  </p>
                  <form onSubmit={checkPincode} className="flex gap-2">
                    <Input
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="Enter pincode"
                      className="rounded-sm"
                      maxLength={6}
                    />
                    <Button type="submit" variant="outline" className="rounded-sm shrink-0">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </form>
                  {pincodeResult && (
                    <p
                      className={cn(
                        "text-xs mt-2 flex items-start gap-1",
                        pincodeResult.ok ? "text-primary" : "text-destructive",
                      )}
                    >
                      {pincodeResult.ok && <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />}
                      {pincodeResult.msg}
                    </p>
                  )}
                </div>
              </div>

              {/* CTAs */}
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <Button
                  size="lg"
                  onClick={handleBuyReadymade}
                  className="rounded-sm py-6 text-sm tracking-[0.15em] uppercase btn-premium"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" /> Buy Now
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setBookingOpen(true)}
                  className="rounded-sm py-6 text-sm tracking-[0.15em] uppercase"
                >
                  Book Now
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <Button variant="secondary" onClick={handleAddToCart} className="rounded-sm text-xs">
                  <ShoppingBag className="w-4 h-4 mr-2" /> Add to Cart
                </Button>
                <Button variant="secondary" onClick={() => setBookingOpen(true)} className="rounded-sm text-xs">
                  Order Now
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-2 mb-6">
                <Button variant="ghost" onClick={handleWishlist} className="rounded-sm text-xs px-2">
                  <Heart className={cn("w-4 h-4 md:mr-1.5", inWishlist && "fill-primary text-primary")} />
                  <span className="hidden md:inline">{inWishlist ? "Saved" : "Wishlist"}</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    const res = toggleCompare(product);
                    if (res.full) sonner.error("Compare is full", { description: "Remove one to add another (max 4)." });
                    else sonner(res.added ? "Added to compare" : "Removed from compare");
                  }}
                  className="rounded-sm text-xs px-2"
                >
                  <Scale className={cn("w-4 h-4 md:mr-1.5", inCompare(product.id) && "text-primary")} />
                  <span className="hidden md:inline">Compare</span>
                </Button>
                <Button
                  variant="ghost"
                  onClick={async () => {
                    const url = window.location.href;
                    const data = { title: product.name, text: product.description, url };
                    try {
                      if (navigator.share) await navigator.share(data);
                      else { await navigator.clipboard.writeText(url); sonner("Link copied to clipboard"); }
                    } catch { /* user cancelled */ }
                  }}
                  className="rounded-sm text-xs px-2"
                >
                  <Share2 className="w-4 h-4 md:mr-1.5" />
                  <span className="hidden md:inline">Share</span>
                </Button>
                <Button asChild variant="ghost" className="rounded-sm text-xs px-2">
                  <a href={whatsappUrl(`Hi, I'm interested in ${product.name} (${product.productCode})`)} target="_blank" rel="noreferrer">
                    <MessageCircle className="w-4 h-4 md:mr-1.5" />
                    <span className="hidden md:inline">WhatsApp</span>
                  </a>
                </Button>
              </div>

              <div className="mb-6">
                <Button asChild variant="outline" className="w-full rounded-sm text-xs">
                  <a href={`tel:${CONTACT.phoneTel}`}><Phone className="w-4 h-4 mr-2" /> Call to Order · {CONTACT.phone}</a>
                </Button>
              </div>


              {/* Payment Options */}
              <div className="border border-border rounded-sm p-4 mb-6">
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-3">
                  Payment Options
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {["UPI", "GPay", "PhonePe", "Paytm", "Net Banking", "Credit / Debit Card", "EMI"].map((m) => (
                    <span
                      key={m}
                      className="px-3 py-1.5 text-xs bg-muted text-foreground rounded-sm border border-border"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Truck, label: "Safe & Swift Delivery" },
                  { icon: ShieldCheck, label: "5-Year Warranty" },
                  { icon: Video, label: "Shop via Video Call" },
                ].map((b, i) => (
                  <div key={i} className="flex flex-col items-center text-center gap-2 p-3 bg-linen rounded-sm">
                    <b.icon className="w-5 h-5 text-primary" />
                    <span className="text-[11px] text-muted-foreground leading-tight">{b.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Kitchen dimensions — modular kitchens only */}
          {product.collection === "modular-kitchen" && product.kitchenDims && (
            <div className="mt-14 max-w-4xl">
              <p className="text-[11px] font-semibold tracking-[0.3em] uppercase text-primary mb-3">Design Dimensions</p>
              <h2 className="font-serif text-2xl md:text-3xl mb-6">Kitchen footprint & clearances</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {[
                  { label: "Length", value: product.kitchenDims.lengthCm },
                  { label: "Width", value: product.kitchenDims.widthCm },
                  { label: "Height", value: product.kitchenDims.heightCm },
                  { label: "Depth", value: product.kitchenDims.depthCm },
                ].map((d) => (
                  <div key={d.label} className="p-5 bg-linen rounded-sm border border-border/60">
                    <p className="text-[10px] font-semibold tracking-[0.25em] uppercase text-muted-foreground mb-1">
                      {d.label}
                    </p>
                    <p className="font-serif text-2xl md:text-3xl text-foreground">
                      {d.value.toLocaleString("en-IN")} <span className="text-base text-muted-foreground">cm</span>
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Overall footprint: L {product.kitchenDims.lengthCm} × W {product.kitchenDims.widthCm} × H {product.kitchenDims.heightCm} × D {product.kitchenDims.depthCm} cm. Every kitchen is re-measured on site before manufacturing.
              </p>
            </div>
          )}

          {/* Details Accordion */}
          <div className="mt-16 max-w-4xl">

            <Accordion type="multiple" defaultValue={["desc"]} className="border-t border-border">
              <AccordionItem value="desc">
                <AccordionTrigger className="text-sm tracking-[0.15em] uppercase font-semibold">
                  Description
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground leading-[1.8]">{product.longDescription}</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="specs">
                <AccordionTrigger className="text-sm tracking-[0.15em] uppercase font-semibold">
                  Specifications
                </AccordionTrigger>
                <AccordionContent>
                  <dl className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Dimensions</dt>
                      <dd className="text-foreground">{product.dimensions}</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Material</dt>
                      <dd className="text-foreground">{product.materials}</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Finish</dt>
                      <dd className="text-foreground">Warm Oak, Matte</dd>
                    </div>
                    <div className="flex justify-between border-b border-border pb-2">
                      <dt className="text-muted-foreground">Assembly</dt>
                      <dd className="text-foreground">Free professional assembly</dd>
                    </div>
                  </dl>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="care">
                <AccordionTrigger className="text-sm tracking-[0.15em] uppercase font-semibold">
                  Care & Maintenance
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="text-sm text-muted-foreground leading-[1.8] list-disc pl-5 space-y-1">
                    <li>Dust regularly with a soft, dry cloth.</li>
                    <li>Avoid direct sunlight for long periods to preserve the finish.</li>
                    <li>Wipe spills immediately using a lightly damp microfiber cloth.</li>
                    <li>Do not use harsh chemicals or abrasive cleaners.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="reviews">
                <AccordionTrigger className="text-sm tracking-[0.15em] uppercase font-semibold">
                  Ratings & Reviews
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-4xl">{product.rating?.toFixed(1)}</span>
                      <div>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <Star
                              key={n}
                              className={cn(
                                "w-4 h-4",
                                n <= Math.round(product.rating || 0)
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground/40",
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Based on {product.reviewCount} verified reviews
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {reviews.map((r, i) => (
                        <div key={i} className="border-t border-border pt-4">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{r.name}</span>
                            <div className="flex">
                              {Array.from({ length: r.rating }).map((_, j) => (
                                <Star key={j} className="w-3 h-3 fill-primary text-primary" />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{r.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <div className="bg-linen">
          <ProductCarousel
            eyebrow="You may also like"
            title={`More from ${collection?.name}`}
            viewAllHref={`/products?collection=${collection?.slug}`}
            products={related}
          />
        </div>
      )}

      {/* Recently viewed */}
      {recentItems.filter((p) => p.id !== product.id).length > 0 && (
        <ProductCarousel
          eyebrow="Recently viewed"
          title="Continue browsing"
          products={recentItems.filter((p) => p.id !== product.id)}
        />
      )}

      <BookingDialog product={product} open={bookingOpen} onOpenChange={setBookingOpen} />
    </Layout>
  );
};

export default ProductDetail;
