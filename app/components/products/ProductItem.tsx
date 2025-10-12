import Image from "next/image";
import { DummyProduct, FakeProduct } from "@prisma/client";
import { Star, ShoppingCart, Heart, Eye } from "lucide-react";

const ProductItem = (props: DummyProduct | FakeProduct) => {
  // Common product data extraction
  const isDummyProduct = "images" in props;

  const { id, title, price, category, description } = props;

  const image = isDummyProduct ? props.images[0] : props.image;
  const rating = isDummyProduct ? props.rating : props.rating;

  const discount = isDummyProduct ? props.discountPercentage : 0;
  const stock = isDummyProduct ? props.stock : undefined;

  // Format price
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  // Calculate discounted price
  const discountedPrice =
    discount && discount > 0 ? price * (1 - discount / 100) : null;
  const formattedDiscountedPrice = discountedPrice
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(discountedPrice)
    : null;

  // Generate stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={14}
        className={
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }
      />
    ));
  };

  return (
    <div className='group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100'>
      {/* Discount Badge */}
      {discount && discount > 0 && (
        <div className='absolute top-3 left-3 z-10'>
          <span className='bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
            -{Math.round(discount)}% OFF
          </span>
        </div>
      )}

      {/* Stock Status */}
      {stock !== undefined && stock && stock < 10 && stock > 0 && (
        <div className='absolute top-3 right-3 z-10'>
          <span className='bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full'>
            Only {stock} left
          </span>
        </div>
      )}

      {/* Image Container */}
      <div className='relative overflow-hidden bg-gray-50'>
        <Image
          src={image}
          alt={title}
          width={300}
          height={300}
          className='w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500'
          placeholder='blur'
          blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R'
        />

        {/* Quick Actions Overlay */}
        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100'>
          <div className='flex space-x-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
            <button className='bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 hover:scale-110 transition-all duration-200'>
              <Eye size={18} className='text-gray-700' />
            </button>
            <button className='bg-white p-3 rounded-full shadow-lg hover:bg-blue-50 hover:scale-110 transition-all duration-200'>
              <Heart size={18} className='text-gray-700' />
            </button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className='p-5'>
        {/* Category */}
        <div className='mb-2'>
          <span className='text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wide'>
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className='font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight'>
          {title}
        </h3>

        {/* Description */}
        <p className='text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed'>
          {description}
        </p>

        {/* Rating */}
        <div className='flex items-center mb-3'>
          <div className='flex items-center space-x-1'>
            {rating && renderStars(rating)}
          </div>
        </div>

        {/* Price Section */}
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-2'>
            {discountedPrice ? (
              <>
                <span className='text-2xl font-bold text-gray-900'>
                  {formattedDiscountedPrice}
                </span>
                <span className='text-lg text-gray-500 line-through'>
                  {formattedPrice}
                </span>
              </>
            ) : (
              <span className='text-2xl font-bold text-gray-900'>
                {formattedPrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className='w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 group/btn'>
          <ShoppingCart
            size={18}
            className='group-hover/btn:scale-110 transition-transform'
          />
          <span>Add to Cart</span>
        </button>

        {/* Quick Features */}
        <div className='mt-3 flex items-center justify-between text-xs text-gray-500'>
          <span className='flex items-center'>
            <div className='w-2 h-2 bg-green-500 rounded-full mr-1'></div>
            Free shipping
          </span>
          <span>🔥 24+ sold today</span>
        </div>
      </div>

      {/* Hover Border Effect */}
      <div className='absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-2xl pointer-events-none transition-all duration-300'></div>
    </div>
  );
};

export default ProductItem;
