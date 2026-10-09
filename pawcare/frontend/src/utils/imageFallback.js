export const DEFAULT_FALLBACK_IMAGES = {
  Dog: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600',
  Cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600',
  Bird: 'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?w=600',
  Rabbit: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=600',
  Other: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600',
  default: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600'
};

export const getFallbackImage = (category) => {
  return DEFAULT_FALLBACK_IMAGES[category] || DEFAULT_FALLBACK_IMAGES.default;
};

export const handleImageError = (e, category) => {
  const fallback = getFallbackImage(category);
  if (e.currentTarget.src !== fallback) {
    e.currentTarget.src = fallback;
  }
};
