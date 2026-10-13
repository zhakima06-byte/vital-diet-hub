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

- Keep menu generation and nutrition calculations in the existing shared engines; menu views only select and present their results to avoid duplicate formulas.
- Export personalized menu weeks through the existing PDF helper and a dedicated read-only sheet, so downloads reflect the displayed generated meals without another menu engine.
- Organize nutrient content under composition-nutritionnelle/category/nutrient routes with Outlet layouts and a shared section registry; hide empty groups and redirect legacy nutrient URLs to avoid duplicate content while preserving old links.
