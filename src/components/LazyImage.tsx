import React, {
  useState,
  useEffect,
  useRef,
  ComponentRef,
  ComponentProps,
  FC,
} from 'react'

import Skeleton from 'react-loading-skeleton'

/**
 * A drop-in replacement for `img` tag.
 * Will start loading the image only when the wrapper is visible on the screen,
 * and will display a skeleton while the image loads
 */
export const LazyImage: FC<ComponentProps<'img'> & { src: string }> = ({
  className,
  src,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false)
  const [skeletonStyle, setSkeletonStyle] = useState<
    React.CSSProperties | undefined
  >(undefined)
  const containerRef = useRef<ComponentRef<'div'>>(null)
  const imgRef = useRef<ComponentRef<'img'>>(null)

  useEffect(() => {
    if (!containerRef.current || !imgRef.current) return

    setSkeletonStyle(getDimensions(imgRef.current))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start loading now that I'm on the screen
            imgRef.current!.src = src
            observer.unobserve(imgRef.current!)
          }
        })
      },
      {
        root: null,
        threshold: 0.1,
      }
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [src])

  return (
    <div
      ref={containerRef}
      style={{
        width: 'fit-content',
        height: 'fit-content',
        position: 'relative',
      }}
    >
      <img
        ref={imgRef}
        onLoad={(e) =>
          (e.target as HTMLImageElement).src === src && setLoaded(true)
        }
        className={className}
        // blank image
        src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        {...props}
      />
      {!loaded && (
        <Skeleton
          style={{
            position: 'absolute',
            borderRadius: 0,
            ...skeletonStyle,
          }}
          baseColor="#1a1a1a"
          highlightColor="#6a6a6a"
        />
      )}
    </div>
  )
}

/**
 * Get the dimensions of an element excluding the border
 */
const getDimensions = (element: HTMLElement) => {
  // Get the bounding rectangle including the border
  const rect = element.getBoundingClientRect()
  const style = getComputedStyle(element)
  const borderTopWidth = parseFloat(style.borderTopWidth)
  const borderBottomWidth = parseFloat(style.borderBottomWidth)
  const borderLeftWidth = parseFloat(style.borderLeftWidth)
  const borderRightWidth = parseFloat(style.borderRightWidth)

  return {
    left: borderLeftWidth,
    top: borderTopWidth,
    width: rect.width - (borderLeftWidth + borderRightWidth),
    height: rect.height - (borderTopWidth + borderBottomWidth),
  }
}
