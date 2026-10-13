import metadata from "./metadata.json" with { type: "json" };

/** The bundled SVG keeps its own package-relative location under any host base. */
export const logoUrl = new URL("./assets/logo.svg", import.meta.url).href;
export const logoMetadata = Object.freeze({
  ...metadata,
  provenance: Object.freeze({ ...metadata.provenance }),
  rights: Object.freeze({ ...metadata.rights }),
  generation: Object.freeze({ ...metadata.generation }),
});
