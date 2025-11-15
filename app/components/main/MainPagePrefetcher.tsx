// // components/MainPagePrefetcher.tsx
// "use client";
// import { useEffect } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import { fetchProductById } from "@/lib/queries";
// import useCart from "@/app/stores/CartStore";

// export const MainPagePrefetcher = () => {
//   const queryClient = useQueryClient();
//   const { cartItems } = useCart(); // Get cart items from your cart store

//   useEffect(() => {
//     // Prefetch all cart items when main page loads
//     cartItems.forEach((item) => {
//       queryClient.prefetchQuery({
//         queryKey: ["product", item.productId],
//         queryFn: () => fetchProductById(item.productId),
//       });
//     });
//   }, [cartItems, queryClient]);

//   return null;
// };
