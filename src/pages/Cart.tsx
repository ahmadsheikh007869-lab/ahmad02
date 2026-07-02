import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import { Layout } from "@/components/Layout";
import { QuantitySelector } from "@/components/QuantitySelector";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/data/products";

const Cart = () => {
  const { items, updateQuantity, removeItem, getSubtotal } = useCart();
  const subtotal = getSubtotal();
  const shipping = subtotal > 15000 ? 0 : 499;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-narrow py-28 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-muted-foreground/30" />
          <h1 className="font-serif text-4xl mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Browse our modular collections and add pieces you love.
          </p>
          <Button asChild size="lg" className="rounded-sm px-10 py-6 text-sm tracking-[0.2em] uppercase btn-premium">
            <Link to="/products">Start Shopping <ArrowRight className="ml-3 w-4 h-4" /></Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container-full py-6 border-b border-border">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Link to="/products" className="hover:text-foreground">Shop</Link>
          <span>/</span>
          <span className="text-foreground">Your Cart</span>
        </div>
      </div>

      <section className="py-10 md:py-16">
        <div className="container-full">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-4xl md:text-5xl mb-10"
          >
            Your Cart
          </motion.h1>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-7">
              {items.map((item, i) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex gap-5 py-6 border-b border-border"
                >
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="w-28 h-32 md:w-36 md:h-40 shrink-0 overflow-hidden bg-muted/30 rounded-sm"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-serif text-lg md:text-xl hover:text-primary transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-muted-foreground mt-1">{item.product.materials.split(",")[0]}</p>
                      <div className="flex items-baseline gap-2 mt-3">
                        <span className="font-semibold">{formatPrice(item.product.price)}</span>
                        {item.product.mrp && (
                          <span className="text-xs line-through text-muted-foreground">
                            {formatPrice(item.product.mrp)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <QuantitySelector
                        quantity={item.quantity}
                        onQuantityChange={(q) => updateQuantity(item.product.id, q)}
                      />
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              <Link
                to="/products"
                className="inline-flex items-center gap-2 mt-6 text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-primary"
              >
                <ArrowRight className="w-4 h-4 rotate-180" /> Continue Shopping
              </Link>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-linen p-8 rounded-sm lg:sticky lg:top-32">
                <h2 className="font-serif text-2xl mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>
                  {subtotal < 15000 && (
                    <p className="text-xs text-muted-foreground">Free delivery on orders over ₹15,000</p>
                  )}
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between font-serif text-xl">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-sm py-6 text-sm tracking-[0.2em] uppercase btn-premium"
                >
                  <Link to="/checkout">Proceed to Checkout <ArrowRight className="ml-3 w-4 h-4" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
