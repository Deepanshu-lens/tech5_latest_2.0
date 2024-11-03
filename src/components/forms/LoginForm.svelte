<script lang="ts">
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";
  import { Input } from "@/components/ui/input";
  import { toast } from "svelte-sonner";
  import { actions, isInputError } from "astro:actions";

  let errors: {
    email?: string[] | string | undefined;
    password?: string[] | string | undefined;
  } = {
    email: "",
    password: "",
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const email = data.get("email")?.toString() ?? "";
    const password = data.get("password")?.toString() ?? "";
    const result = await actions.auth.login({ email, password });
    errors = {
      email: "",
      password: "",
    };
    if (result.error) {
      console.log("TOAST");
      if (!isInputError(result.error)) {
        toast.error(result.error.message);
      } else {
        errors = result.error.fields;
      }
      return;
    }
    localStorage.setItem("pb_auth_token", result?.data.token);
    window.location.href = "/";
  };
</script>

<form class="space-y-4 w-full" method="POST" on:submit={onSubmit}>
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <div class="relative">
      <Icon
        icon="material-symbols:mail-rounded"
        class="w-22 h-22 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <Input
        type="email"
        name="email"
        placeholder="Email Address"
        class="pl-10 w-full border border-gray-300 rounded-md"
      />
    </div>
    <div class="text-rose-500 text-xs">
      {#if errors.email}
        {errors.email}
      {/if}
    </div>
  </div>

  <div class="grid w-full max-w-sm items-center pb-4">
    <div class="relative">
      <Icon
        icon="material-symbols:password"
        class="w-22 h-22 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        class="pl-10 w-full border border-gray-300 rounded-md"
      />
    </div>
    <div class="text-rose-500 text-xs">
      {#if errors.password}
        {errors.password}
      {/if}
    </div>
  </div>

  <div class="flex flex-col items-center justify-between mb-10 sm:mb-0">
    <button
      class="bg-[#015A62] hover:bg-[#015A62]/[.4] text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline"
      type="submit"
    >
      Log In
    </button>
  </div>
</form>
