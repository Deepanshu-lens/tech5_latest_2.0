<script>
    import * as Table from "@/components/ui/table/index";
    import { Button } from "@/components/ui/button";
    import Checkbox from "@/components/ui/checkbox/checkbox.svelte";

    // Dummy data
    const dummyGalleryFeatures = [
        { id: 1, feature: "Upload Images" },
        { id: 2, feature: "Create Album" },
        { id: 3, feature: "Share Gallery" }
    ];

    const dummyUsers = [
        { id: "user1", name: "John Doe", features: [1, 2] },
        { id: "user2", name: "Jane Smith", features: [1] }
    ];
</script>

<Table.Root>
    <Table.Header>
        <Table.Row>
            <Table.Head>
                <Checkbox />
            </Table.Head>
            <Table.Head>User Name</Table.Head>
            {#each dummyGalleryFeatures as feature}
                <Table.Head>{feature.feature}</Table.Head>
            {/each}
        </Table.Row>
    </Table.Header>

    <Table.Body>
        {#each dummyUsers as user}
            <Table.Row>
                <Table.Cell>
                    <Checkbox />
                </Table.Cell>
                <Table.Cell>
                    <span class="flex flex-col">
                        <span>Name: {user.name}</span>
                        <span class="text-xs">Id: {user.id}</span>
                    </span>
                </Table.Cell>
                {#each dummyGalleryFeatures as feature}
                    <Table.Cell>
                        <Checkbox checked={user.features.includes(feature.id)} />
                    </Table.Cell>
                {/each}
            </Table.Row>
        {/each}
    </Table.Body>
    <Button>Save</Button>
</Table.Root>
