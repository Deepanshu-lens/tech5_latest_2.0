<script>
    import { onMount } from "svelte";
    import Button from "@/components/ui/button/button.svelte";
    import Checkbox from "@/components/ui/checkbox/checkbox.svelte";
    import * as Table from "@/components/ui/table/index";

    const dummyFeatures = [
        { id: 1, feature: "Feature 1" },
        { id: 2, feature: "Feature 2" },
        { id: 3, feature: "Feature 3" }
    ];

    const dummyUsers = [
        { id: "001", name: "John Doe" },
        { id: "002", name: "Jane Smith" }
    ];
</script>

<Table.Root class="mx-auto h-full w-full flex flex-col max-w-[calc(100vw-8.3rem)] max-h-[calc(100vh-310px)] overflow-x-auto">
    <Table.Header class="border rounded-lg w-max min-w-full">
        <Table.Row class="flex items-center p-3 gap-4">
            <Table.Head class="w-[50px]">
                <Checkbox/>
            </Table.Head>
            <Table.Head class="w-[200px]">User Info</Table.Head>
            {#each dummyFeatures as feature}
                <Table.Head class="w-[200px]">
                    {feature.feature}
                </Table.Head>
            {/each}
        </Table.Row>
    </Table.Header>
    <Table.Body class="pb-10">
        {#each dummyUsers as user}
            <Table.Row class="flex items-center gap-4 mt-4 px-3 rounded-lg border w-max min-w-full">
                <Table.Cell class="w-[50px]">
                    <Checkbox/>
                </Table.Cell>
                <Table.Cell class="w-[200px]">
                    <span class="flex flex-col">
                        <span>Name: {user.name}</span>
                        <span class="text-xs">Id: {user.id}</span>
                    </span>
                </Table.Cell>
                {#each dummyFeatures as feature}
                    <Table.Cell class="w-[183.3px]">
                        <Checkbox/>
                    </Table.Cell>
                {/each}
            </Table.Row>
        {/each}
    </Table.Body>
    <Button class="mr-auto">Save</Button>
</Table.Root>
  