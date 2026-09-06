# Article images

Put real image files here, then reference them from an article:

```ts
{
  type: "image",
  src: "/insights/clinic-inbox.png",
  alt: "Describe what the image shows, for screen readers and for Google",
  width: 1440,
  height: 900,
  caption: "Optional line beneath the image",
}
```

`alt`, `width` and `height` are required by the type system. Dimensions
let the browser reserve space so the page does not jump while the image
loads; alt is both an accessibility requirement and an SEO signal.

## What not to put here

- **Stock photography.** Generic clinic or "smiling team" photos read as
  filler and imply client relationships that do not exist.
- **GoHighLevel screenshots.** Publishing the delivery stack is locked
  against (governance §5). Any interface shown must be an ArkFlow-branded
  illustration, labelled as one — the pattern already used by the unified
  inbox mockup on the homepage.
- **Anything showing real customer data**, including blurred. Blur is
  reversible often enough to be a bad habit.

Prefer WebP or optimised PNG. Anything above ~300KB should be compressed
before it goes in.
