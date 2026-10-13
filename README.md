# Rayan Alam Portfolio

A responsive portfolio for robotics, computer vision, autonomous systems, and applied research. Built with HTML, CSS, and JavaScript; no installation or build step is needed.

## Preview

Double-click `Open_Portfolio.cmd` or `index.html` to open the portfolio in your browser. For a local server, run `npm run dev` from this folder and open **http://localhost:4173**. The local server is recommended for clipboard support and consistent preview behavior.

## Included

- Shaded industrial six-wheel rover and quadcopter concepts that switch automatically every four seconds, with pointer-controlled orbit and click-to-scan. Reduced-motion preferences disable continuous animation and use instant model changes.
- Nine project case studies with category filters and accessible detail dialogs.
- An interactive A* waypoint-planning sketch, clearly presented as a concept rather than live robot telemetry.
- Professional experience, education, technical skills, leadership, and awards.
- Downloadable CV. Research projects are described without downloadable manuscripts.
- Responsive layouts, keyboard controls, and reduced-motion support.

## Editing

- `index.html`: page structure, biography, experience, education, awards, and contact details.
- `script.js`: project descriptions, diagrams, filtering, and route-planning interaction.
- `styles.css`: base layout. `robotics.css`: robotics theme and responsive styling.
- `robotics-source.js`: editable Three.js models, materials, lighting, pointer effects, and motion preferences.
- `robotics.js`: bundled renderer. Runs locally without a network connection.
- To rebuild models after editing the source: run `npm install`, then `npm run build:models`. No rebuild is needed to preview the included site.
- `assets/`: portrait and favicon.
- `documents/`: downloadable PDFs.

The project drawings are explanatory illustrations, not photographs of the actual hardware. Research project descriptions do not claim publication or acceptance. Job entries use confirmed titles and dates. The website is saved locally and has not been published.

## Hosting

The site is static. Upload `index.html`, `styles.css`, `robotics.css`, `script.js`, `robotics.js`, `assets/`, and `documents/` to a static host while preserving their folder paths. No backend, API keys, or account integrations are required. Contact buttons use email and telephone links; no unconnected contact form is included.

The hero models are original engineering concept visualizations, not photographs or exact replicas of project hardware. Three.js is bundled locally under its MIT license (see `assets/three-LICENSE.txt`).
