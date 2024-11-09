<script lang="ts">
    import Button from "@/components/ui/button/button.svelte";
    import Checkbox from "@/components/ui/checkbox/checkbox.svelte";
    import * as Table from "@/components/ui/table/index";

    interface Permission {
        collectionId: string;
        collectionName: string;
        created: string;
        feature: string;
        id: string;
        permission: string;
        updated: string;
    }

    export let data: Permission[];

    // Transform the input data into the required format
    $: features = data?.map(item => ({
        id: item.id,
        featureId: item.feature,
        name: item.permission
    })) || [];

    const dummyUsers = [
        { id: "001", name: "John Doe" },
        { id: "002", name: "Jane Smith" }
    ];
    
</script>

<Table.Root class="mx-auto h-full w-full flex flex-col max-w-[calc(100vw-8.3rem)] max-h-[calc(100vh-310px)] overflow-auto">
    <Table.Header class="border rounded-lg w-max min-w-full">
        <Table.Row class="flex items-center p-3 gap-4">
            <Table.Head class="w-[30px]">
                <Checkbox/>
            </Table.Head>
            <Table.Head class="w-[130px]">User Info</Table.Head>
            {#each features as feature}
                <Table.Head class="w-[130px]">
                    {feature.name}
                </Table.Head>
            {/each}
        </Table.Row>
    </Table.Header>
    <Table.Body class="pb-10">
        {#each dummyUsers as user}
            <Table.Row class="flex items-center gap-4 mt-4 px-3 rounded-lg border w-max min-w-full">
                <Table.Cell class="w-[30px]">
                    <Checkbox/>
                </Table.Cell>
                <Table.Cell class="w-[130px]">
                    <span class="flex flex-col">
                        <span>Name: {user.name}</span>
                        <span class="text-xs">Id: {user.id}</span>
                    </span>
                </Table.Cell>
                {#each features as feature}
                    <Table.Cell class="w-[130px]">
                        <Checkbox/>
                    </Table.Cell>
                {/each}
            </Table.Row>
        {/each}
    </Table.Body>
    <Button class="mr-auto">Save</Button>
</Table.Root>
  