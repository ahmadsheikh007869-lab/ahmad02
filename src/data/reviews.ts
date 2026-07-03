export interface Review {
  name: string;
  city: string;
  rating: number;
  quote: string;
  product: string;
}

export const reviews: Review[] = [
  {
    name: "Ananya Mehta",
    city: "Bengaluru",
    rating: 5,
    quote:
      "The modular kitchen fits our apartment like it was built for it. Delivery was exactly on schedule and installation took a single day.",
    product: "Astra L-Shape Modular Kitchen",
  },
  {
    name: "Rahul Verma",
    city: "Mumbai",
    rating: 5,
    quote:
      "Solid oak, honest finish and no gimmicks. Feels like something we'll pass down. Highly recommend the Aspen bed.",
    product: "Aspen Upholstered King Bed",
  },
  {
    name: "Priya Sharma",
    city: "Gurugram",
    rating: 4,
    quote:
      "Beautifully designed wardrobe with soft-close hinges and a mirror I actually use every day. The design consult was genuinely helpful.",
    product: "Marlow 3-Door Sliding Wardrobe",
  },
  {
    name: "Karan Singh",
    city: "Delhi",
    rating: 5,
    quote:
      "The Linden media wall transformed our living room. Warm oak against a white wall — exactly the mood we wanted.",
    product: "Linden Media Wall System",
  },
  {
    name: "Meera Iyer",
    city: "Hyderabad",
    rating: 5,
    quote:
      "The video consultation was a great start. They understood our brief and the dining table arrived flawless.",
    product: "Harvest 6-Seater Dining Table",
  },
  {
    name: "Aditya Rao",
    city: "Pune",
    rating: 4,
    quote:
      "Premium build without the premium markup you get at fancier stores. The 5-year warranty seals the deal.",
    product: "Copen Island Modular Kitchen",
  },
];
