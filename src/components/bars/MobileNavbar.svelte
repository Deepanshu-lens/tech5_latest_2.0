<script>
  import MobileMenu from "./MobileNavs/MobileMenu.svelte";
  import MobileNav from "./MobileNavs/MobileNav.svelte";
  console.log(window.localStorage.getItem("pb_auth_token"), "auth token here");

  let isLoggedIn = !!window.localStorage.getItem("pb_auth_token");
</script>

{#if isLoggedIn}
  <MobileMenu />
  <MobileNav />
{/if}
