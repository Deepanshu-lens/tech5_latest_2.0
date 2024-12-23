<script lang="ts">
  import * as Pagination from "@/components/ui/pagination/index.js";
  import ChevronLeft from "lucide-svelte/icons/chevron-left";
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  import { writable, get } from "svelte/store";
  import {
    cameras,
    totalCameras,
    selectedLayout,
    displayCameras,
    selectedNode,
  } from "@/stores";

  // Writable store to keep track of the current page
  const initialPage = 1;
  const currentPage = writable(initialPage);

  // Reactive value for MAX_CAMERAS_PER_PAGE
  $: MAX_CAMERAS_PER_PAGE =
    ($selectedLayout > 0 ? $selectedLayout : 3) ** 2 ||
    parseInt(localStorage.getItem("selectedLayout") || "3") ** 2;

  // Function to update the displayCameras store based on current page
  const fetchDisplayCameras = (page: number) => {
    const start = (page - 1) * MAX_CAMERAS_PER_PAGE;
    const end = start + MAX_CAMERAS_PER_PAGE;

    displayCameras.set(get(cameras).slice(start, end));
  };

  // Handle next page
  const nextPage = () => {
    currentPage.update((page) => {
      const totalPages = Math.ceil(get(totalCameras) / MAX_CAMERAS_PER_PAGE);
      if (page < totalPages) {
        fetchDisplayCameras(page + 1);
        return page + 1;
      }
      return page;
    });
  };

  // Handle previous page
  const prevPage = () => {
    currentPage.update((page) => {
      if (page > 1) {
        fetchDisplayCameras(page - 1);
        return page - 1;
      }
      return page;
    });
  };

  // Go to a specific page
  const goToPage = (page: number) => {
    const totalPages = Math.ceil(get(totalCameras) / MAX_CAMERAS_PER_PAGE);
    if (page >= 1 && page <= totalPages) {
      currentPage.set(page);
      fetchDisplayCameras(page);
    }
  };

  // Fetch initial data
  $: if (get(cameras).length > 0 && MAX_CAMERAS_PER_PAGE) {
    fetchDisplayCameras(get(currentPage));
  }

  cameras.subscribe((value) => {
    const previousPage = get(currentPage);
    const totalPages = Math.ceil(value.length / MAX_CAMERAS_PER_PAGE);

    totalCameras.set(value.length);

    // If on the last page and a new camera is added, move to the next page
    if ($selectedNode) currentPage.set(1);
    else {
      if (previousPage < totalPages) {
        currentPage.set(totalPages);
      } else if (previousPage > totalPages && totalPages > 0) {
        // If the current page becomes invalid due to deletions, move to the previous page
        currentPage.set(totalPages);
      } else if (totalPages === 0) {
        // If no cameras are left, reset to page 1
        currentPage.set(1);
      }
    }
    fetchDisplayCameras(get(currentPage));
  });
</script>

<Pagination.Root
  count={$totalCameras}
  perPage={MAX_CAMERAS_PER_PAGE || 9}
  siblingCount={1}
  let:pages
>
  <Pagination.Content>
    <Pagination.Item>
      <Pagination.PrevButton
        on:click={() => prevPage()}
        disabled={get(currentPage) === 1}
      >
        <ChevronLeft class="h-4 w-4" />
        <span class="hidden sm:block">Previous</span>
      </Pagination.PrevButton>
    </Pagination.Item>
    {#each pages as page (page.key)}
      {#if page.type === "ellipsis"}
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
      {:else}
        <Pagination.Item>
          <Pagination.Link
            {page}
            isActive={get(currentPage) === page.value}
            on:click={() => goToPage(page.value)}
          >
            {page.value}
          </Pagination.Link>
        </Pagination.Item>
      {/if}
    {/each}
    <Pagination.Item>
      <Pagination.NextButton
        on:click={() => nextPage()}
        disabled={get(currentPage) * MAX_CAMERAS_PER_PAGE >= $totalCameras}
      >
        <span class="hidden sm:block">Next</span>
        <ChevronRight class="h-4 w-4" />
      </Pagination.NextButton>
    </Pagination.Item>
  </Pagination.Content>
</Pagination.Root>
