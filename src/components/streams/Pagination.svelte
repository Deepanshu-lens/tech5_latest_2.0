<script lang="ts">
  import * as Pagination from "@/components/ui/pagination/index.js";
  import ChevronLeft from "lucide-svelte/icons/chevron-left";
  import ChevronRight from "lucide-svelte/icons/chevron-right";
  export let count = 0;
  export let perPage = 9;
  export let currentPage = 0;

  function nextPage() {
    if ((currentPage + 1) * perPage < count) {
      currentPage++;
    }
  }
  function goToPage(page: number) {
    currentPage = page - 1;
  }

  function prevPage() {
    if (currentPage > 0) {
      currentPage--;
    }
  }
</script>

<Pagination.Root {count} {perPage} siblingCount={1} let:pages let:currentPage>
  <Pagination.Content class="mt-2">
    <Pagination.Item>
      <Pagination.PrevButton>
        <ChevronLeft
          class="h-4 w-4"
          on:click={prevPage}
          disabled={currentPage === 1}
        />
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
            isActive={currentPage === page.value}
            on:click={goToPage(page.value)}
          >
            {page.value}
          </Pagination.Link>
        </Pagination.Item>
      {/if}
    {/each}
    <Pagination.Item>
      <Pagination.NextButton
        on:click={nextPage}
        disabled={currentPage * perPage >= count}
      >
        <span class="hidden sm:block">Next</span>
        <ChevronRight class="h-4 w-4" />
      </Pagination.NextButton>
    </Pagination.Item>
  </Pagination.Content>
</Pagination.Root>
