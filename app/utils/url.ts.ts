/**
 * Encode filename for URL usage
 */
export function encodeImageSlug (pathname: string): string {
  return encodeURIComponent(pathname.split('.')[0] as string)
}

/**
 * Decode URL slug back to filename
 */
export function decodeImageSlug (slug: string): string {
  return decodeURIComponent(slug)
}

/**
 * Check if two image paths match (handling encoding)
 */
export function isImageMatch (pathname: string, slug: string): boolean {
  const imageName = pathname.split('.')[0]
  const decodedSlug = decodeImageSlug(slug)
  return imageName === decodedSlug
}
