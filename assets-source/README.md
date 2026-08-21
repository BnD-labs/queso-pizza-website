# assets-source

Full-resolution photography. **Nothing in here is served** — it sits outside
`public/`, so the static export never sees it. `public/images` is generated
from here by `npm run photos` (`scripts/build-photos.mjs`).

## `photography-2026-08/` — tracked

The build inputs. These are committed so `npm run photos` is reproducible on a
fresh clone; delete one and the derivative it feeds can never be regenerated.

Verified as Queso's own: six carry EXIF placing them on a **Canon PowerShot
S3 IS on 2026-08-04**, edited in Lightroom Classic on 2026-08-19. The two with
no EXIF (`Chicken fingers with fries.jpg`, `Meal prep.jpg`) reached us via
WhatsApp, which strips metadata, and match the shop on props and setting — the
same pink polystyrene trays and the same prep counter as the EXIF-bearing set.

## `held-back/` — on disk, not tracked

Not shipped, not committed, not deleted. See the 2026-08-20 photography audit
in `CLAUDE.md` for why each one is here. In short:

- **AI re-renders of the real photos.** No EXIF, generator-style filenames,
  diffusion output dimensions (1024x1024, 2048x2048), one PNG intermediate.
  `Kitchen_Prep.jpg_202608191809.jpeg` is the clearest case: it is `Meal prep.jpg`
  re-composed, with a person, an apron and a gloved hand hallucinated into a
  scene that contained none.
- **Frames that contradict their own labels.** `Beef_Pizza_OG` shows chicken.
  `Flavorful_beef_Pizza` shows ham and mushroom. A customer ordering off either
  gets something else, and the counter absorbs the complaint.
- **Third-party stock.** `Pesto-Veggie-Pizza_EXPS_FT26_26064_AC_0327_5.jpg` uses
  Taste of Home's `EXPS_` asset-ID convention. No licence has been obtained.
- **An interior that is not this shop.** `Queso_Interior_shot.jpg_2K_...` shows
  a room that does not match the verified interior. Not asserted to be fake —
  unverified, which is enough to keep it out.

## Three frames promoted back, 2026-08-21

Brandon reviewed the held-back set and chose three for use. They moved into
`photography-2026-08/` and are built by `npm run photos`:

| File | Used as | Note |
|---|---|---|
| `Dining_shot.jpg_2K_...` | About, "Grounded in Community" | Replaced the Canon `Interior shot 3.JPG`, which is still here but no longer built |
| `Chicken_Tornado.jpg_202608191715.jpeg` | `chicken-tornado` menu thumb | A re-render, but of Queso's **own** wrap, so unlike the held-back pizzas it does not misdescribe what it labels |
| `Chicken_&_Mushroom-1.jpg_...` | `chicken-mushroom` menu card | This item previously had neither photo nor description and rendered as a bare name and price |

These are re-renders, so the audit's objection still stands in principle. It was
weighed and overridden for these three specifically. The one open question is
whether the Chicken and Mushroom frame matches the real pizza — worth confirming
with the founder, same as `creamy-chicken`.

## Fonts

`Comix Loud.ttf` is Queso's brand display face, supplied 2026-08-21. The shipped
WOFF2 in `app/fonts/` is generated from it. **Its embedded licence field says
"Free for personal use"** — see the licensing note in `CLAUDE.md`.

---

If the founder later confirms any of these depicts the real product, move the
file back into `photography-2026-08/`, add a job to `scripts/build-photos.mjs`,
and note the confirmation here.
