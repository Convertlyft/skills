# Product and category playbooks

Each section is one to-do's steps. A to-do on the What to do page names its section by id.

### PB-PRODUCT-UNIQUE-DESCRIPTION — Product pages share the same description

**When:** Product pages carry a description that is short, or the same as on other pages or other shops.

**Do:**
1. `cvl_site_pages` with `type` set to `product`: each product page's title, H1, meta description and word count. Start with the pages that get the most visits.
2. `cvl_page_content` with `path` for each: read the description as the page shows it.
3. Write what this shop knows about the product: fit, use, what is in the box, the questions customers ask. Take every fact from the owner or the page; never invent a specification or a claim.
4. Change a few pages first and note the day.

**Check after:** The word count and title of those pages on the next crawl, and their visits and sales with `cvl_page_conversions`.

### PB-PRODUCT-OFFER-SHIPPING-RETURNS — Price, delivery and returns are missing from the page or its markup

**When:** A product page does not show its delivery cost or returns terms where people decide, or its `Offer` markup leaves them out.

**Do:**
1. `cvl_page_content` with `path`: does the page show the price, delivery cost and time, and the returns terms near the Add to cart button?
2. `cvl_heatmap` with `path` and `device` set to `mobile`: do people on phones scroll far enough to see them?
3. Show the delivery cost and returns terms beside the price, in the shop's own terms as the owner confirms them.
4. In the `Product` markup, give the `Offer` its price, currency and availability, with `shippingDetails` and `hasMerchantReturnPolicy` matching what the page shows. See `adding-schema-markup`, and check the page in Google's Rich Results Test.

**Check after:** Visits that added to cart on that page with `cvl_funnel_report`, over the same length of window.

### PB-PRODUCT-VARIANTS-GROUP — Each size or colour is its own product with no link between them

**When:** Sizes, colours or other variants of one product each have their own page or address, and nothing marks them as one product.

**Do:**
1. `cvl_site_pages` with `type` set to `product`: find pages whose titles differ only by a size, colour or other variant.
2. Decide with the owner whether each variant needs its own page (people search for that colour by name) or one page with a picker is enough.
3. Where variants keep their own pages, mark them as one group: a `ProductGroup` with `variesBy` and `hasVariant`, and each variant's `Product` with its own `Offer`. Where one page is enough, point the other addresses at it with a canonical tag or a redirect.
4. Check the pages in Google's Rich Results Test; Convertlyft does not validate markup.

**Check after:** `canonical` for each variant page with `cvl_page_content` on the next crawl.

### PB-PRODUCT-OUT-OF-STOCK — Out-of-stock products are removed or say nothing

**When:** A product page that sold before is gone, redirects to the home page, or shows no stock state.

**Do:**
1. `cvl_page_content` with `path`: the page's status, what it says now, and the issues the crawl raised on it.
2. Out for a while: keep the page live, say plainly that it is out of stock and when it is expected back if the owner knows, and set `availability` in its `Offer` to match.
3. Gone for good: redirect it to the closest replacement or to its category, not to the home page.
4. Offer a way on from the page: similar products, or a note to say when it is back.

**Check after:** That page's status and text with `cvl_page_content` on the next crawl, and where visits go next from it with `cvl_paths`.

### PB-PRODUCT-IMAGE-ALT — Product photos have no alt text

**When:** Product images carry no alt text, or the same alt text on every image.

**Do:**
1. Open the product page and check the alt text of each product photo; Convertlyft's page reads give the page's text and headings, not its images.
2. Describe each photo in a few plain words: the product, and the detail the photo shows (colour, angle, the item in use).
3. Never stuff searches into alt text, and leave it empty only for images that are purely decoration.

**Check after:** The alt text on those pages, opened again once the change is live.

### PB-CATEGORY-INTRO — Category pages have no introduction

**When:** A category page lists products with no text that says what the category holds or helps people choose.

**Do:**
1. `cvl_site_pages` with `type` set to `category_listing`: title, H1 and word count for each category page.
2. `cvl_seo_brief` with `keyword` (the category as people search for it): what most top pages for that search do that this one does not, when a stored brief exists.
3. Write a short, useful introduction above or below the list: what the category holds and how to choose between the products, in the owner's facts. No block of keywords.
4. Name the category in the title and H1 the way people search for it.

**Check after:** The word count and title on the next crawl, and visits to that page with `cvl_page_conversions`.

### PB-CATEGORY-FACET-CANONICAL — Filters and sorting make many addresses for one category

**When:** The crawl finds many addresses for one category page that differ only by filter, sort or tracking parameters.

**Do:**
1. `cvl_site_pages` with `type` set to `category_listing`: each `path` keeps its query string, so addresses that differ only by `?sort=`, `?colour=` or a tracking parameter show as separate rows. `cvl_page_content` with `path` gives each one's `canonical`.
2. Decide with the owner which filtered pages people really search for, such as a brand within a category. Give those a clean, linked address with their own title and introduction.
3. Point every other filtered or sorted address at the main category with a canonical tag, or keep it out of the index, and keep it out of the sitemap.
4. A product in several categories keeps one canonical product address.

**Check after:** The number of category rows with a query string in `cvl_site_pages`, and their `canonical` in `cvl_page_content`, on the next crawl.
