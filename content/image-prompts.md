# Billed-prompts — MT Vagt

Alle billeder er cinematiske, fotoreelle, desaturerede med kølig grade og en
amber accent-lyskilde. **Ingen læselige logoer, ingen genkendelige ansigter,
ingen falske brandmærker på uniformer.** Uniformer er neutrale, mørke high-vis
uden tekst. Gem færdige filer i `/public/img/<navn>.webp` (16:9 og 4:5 crops).
Filnavnene nedenfor matcher `heroBillede`/`hero`-referencer i koden — læg blot
filen med det rette navn, så vises den automatisk i stedet for pladsholderen.

> Status: Genereret via Higgsfield/estate-MCP. Kræver billed-credits på
> workspacet + adgang til asset-hosten for at downloade til `/public/img/`.

| Filnavn | Crop | Prompt |
|---|---|---|
| `hero-byggeplads-nat` | 16:9 | Cinematic photoreal wide shot of a professional security guard patrolling a large construction site at night, seen from behind at a distance, plain dark high-visibility jacket with reflective stripes (no logos, no readable text), holding a bright torch beam through cold night air. Tower cranes and scaffolding against deep blue night sky, amber floodlights on wet concrete. Desaturated cool grade, filmic grain, no identifiable faces. |
| `portvagt-daggry` | 16:9 | Security guard standing at a construction site access gate beside a plain site container/booth at dawn, checking access, viewed from the side/behind. Soft cold dawn light, mist, mud and fencing. Desaturated cool grade with subtle amber accent, no logos, no identifiable face. |
| `materiel-lager` | 4:5 | Security guard patrolling a fenced material storage yard at night, stacks of building materials and equipment, chain-link fence, torch light, optional dog silhouette. Cold night grade, amber security light, filmic grain, no logos, no face. |
| `event-vagt` | 16:9 | Security guard at a public event in the evening, crowd behind barriers, plain dark uniform, calm and professional posture, seen from behind/side. Warm event lighting mixed with cool evening tones, shallow depth of field, no logos, no identifiable faces. |
| `kommune-vagt-dag` | 16:9 | Security guard in a calm municipal setting during daytime (town hall / civic building / recycling centre), service-oriented and relaxed posture, plain dark uniform. Neutral daylight, subtle cool grade, no logos, no identifiable face. |
| `rundering-koeretoej-nat` | 16:9 | A guard patrol vehicle on a rundering route at night, headlights on, wet asphalt reflecting light, industrial/urban edge. Cinematic cold night grade with warm headlight glow, filmic grain, no readable branding on the vehicle. |
| `butiksvagt-interior` | 4:5 | Discreet security guard inside a retail store, warm interior lighting, blurred shelves, calm professional presence, plain dark attire. Warm/cool contrast grade, shallow depth of field, no logos, no identifiable face. |
| `team-briefing` | 16:9 | Two security guards in a calm, professional briefing, indoor low-key lighting, plain dark uniforms, seen from behind/side. Moody desaturated grade with amber accent, teamwork/culture feel, no logos, no identifiable faces. |
| `tryghedsvagt-bosted` | 4:5 | Calm, respectful security guard in a public/social care environment (bosted / public space), reassuring and low-key presence, plain dark attire. Soft neutral light, gentle cool grade, no logos, no identifiable faces. |
| `fastvagt-adresse-nat` | 4:5 | Security guard stationed at the entrance of a fixed address at night, standing watch, plain dark uniform, subtle interior light behind. Cold night grade with warm doorway glow, filmic grain, no logos, no face. |

## Tekstur-shots (til sektions-dividers)

| Filnavn | Crop | Prompt |
|---|---|---|
| `tekstur-hegn` | 21:9 | Abstract close-up of chain-link/mesh fence at night, shallow focus, cold blue with a hint of amber flare. Minimal, moody, no text. |
| `tekstur-floodlight` | 21:9 | Abstract floodlight lens flare against a dark night sky, cinematic bokeh, cold-to-amber gradient, no text. |
| `tekstur-hivis` | 21:9 | Macro close-up of dark high-visibility fabric with reflective stripe catching light, desaturated with amber highlight, no logos, no text. |

## Video (valgfri hero-loop)

Kort loop (5–8 sek.) af nat-byggeplads-vagt: lygtens lys bevæger sig, mens vagten
går; subtil parallaks. Bruges kun som progressiv forbedring efter LCP — poster
`hero-byggeplads-nat` vises først. Kræver video-credits.
