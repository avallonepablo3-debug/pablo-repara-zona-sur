<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep all WhatsApp entrypoints on the shared WA_URL and render contact links through the Button whatsapp variant, so the contact destination and interaction styling remain consistent.
- Define the industrial page's palette, section treatments and shadows in src/styles.css; use semantic tokens in page code so visual changes remain centralized.
- Use responsive bundled WebP image variants with srcSet/sizes and lazy-load below-fold photos to minimize mobile transfer without server image processing.
- Keep mobile conversion ordering in CSS layout with persistent contact controls outside section flow so the same content remains accessible on every viewport.
