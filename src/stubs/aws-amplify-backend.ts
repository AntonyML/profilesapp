// Browser stub — @aws-amplify/backend is backend/CDK only, never runs in browser.
// amplify/data/resource.ts imports from here; those imports are type-only in the
// frontend, but Vite still resolves the module. This stub satisfies the import
// without pulling in Node.js / CDK code.

export const a: unknown = {};
export const defineData: unknown = () => ({});
export const defineAuth: unknown = () => ({});
export const defineBackend: unknown = () => ({});
export const defineFunction: unknown = () => ({});

// ClientSchema is a type — no runtime export needed, but exporting {} keeps
// destructured imports from throwing at runtime if they ever execute.
export type ClientSchema<T> = T;

export default {};
