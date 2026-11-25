// pretendLogin.svelte.js — a PRETEND login, kept in the browser's memory.
//
// This is the shared-state pattern from Week 3: a $state object in a
// .svelte.js file, which any component can import and change.
// It is here to FAIL, on purpose. See the three tests on the /pretend page.
export const pretendLogin = $state({ loggedIn: false });
