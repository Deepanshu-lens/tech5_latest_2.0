<script lang="ts">
  import * as Select from "@/components/ui/select/index.js";
  import { nodes, selectedNode } from "@/stores";
  let selectedValue = {
    value: $selectedNode,
    label: $nodes.find((n) => n.id === $selectedNode)?.name,
  };
  $: selectedValue = {
    value: $selectedNode,
    label: $nodes.find((n) => n.id === $selectedNode)?.name,
  };
</script>

<Select.Root
  items={$nodes.map(node => ({ value: node.id, label: node.name }))}
  onSelectedChange={(e:any) => {
    console.log("selected node from node selection", e.value);
    selectedNode.set(e.value);
  }}
  bind:selected={selectedValue}
>
  <Select.Trigger class="w-full max-w-xs">
    <span class="text-muted-foreground">Node:</span>
    <Select.Value placeholder="Cameras" />
  </Select.Trigger>
  <Select.Content
    class="overflow-y-auto max-h-[calc(100vh-10rem)]"
  >
    {#each $nodes as node}
      <Select.Item
        value={node.id}
        label={node.name}
        class="truncate max-w-xs inline-block"
      >
        {node.name}
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>
