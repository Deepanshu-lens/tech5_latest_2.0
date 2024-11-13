<script lang="ts">
    import Button from "@/components/ui/button/button.svelte";
    import Checkbox from "@/components/ui/checkbox/checkbox.svelte";
    import * as Table from "@/components/ui/table/index";
    import { toast } from "svelte-sonner";

    interface Permission {
        collectionId: string;
        collectionName: string;
        created: string;
        feature: string;
        id: string;
        permission: string;
        updated: string;
    }

    interface Role {
        collectionId: string;
        collectionName: string;
        created: string;
        id: string;
        email:string;
        name: string;
        updated: string;
        users: any[];
    }

    interface License {
        bundles: any[];
        collectionId: string;
        collectionName: string;
        created: string;
        expiry: string;
        features: string[];
        id: string;
        updated: string;
        user: string;
    }

    interface User {
        name: string;
        id: string;
        email: string;
        parentId: string;
        role: Role;
        license: License[];
        permissions: Permission[];
    }

    interface Feature {
        id: string;
        featureId: string;
        name: string;
    }

    interface ApiResponse {
        success: boolean;
        error?: string;
        message?: string;
    }

    export let data: Permission[];
    export let userChildrenData: User[];
    export let assignPermissions: (userId: string, featureId: string, permissions: string[]) => Promise<ApiResponse>;

    // Transform the input data into the required format
    $: features = data?.map(item => ({
        id: item.id,
        featureId: item.feature,
        name: item.permission
    })) || [];

    // Use typed userChildrenData
    $: users = userChildrenData || [];

    // Add state management for checkboxes with proper typing
    let userPermissions: Record<string, Set<string>> = {};

    // Initialize permissions for each user
    $: {
        if (data && users) {    
            users.forEach(user => {
                if (!userPermissions[user.id]) {
                    userPermissions[user.id] = new Set(
                        // Get existing permissions IDs
                        user.permissions?.map(p => p.id) || []
                    );
                }
            });
        }
    }

    // Handle checkbox changes
    function handlePermissionChange(userId: string, permissionId: string, checked: boolean) {
        if (checked) {
            userPermissions[userId].add(permissionId);
        } else {
            userPermissions[userId].delete(permissionId);
        }
        userPermissions = userPermissions; 
    }

    // Handle save permissions
    async function savePermissions() {
        const promises = users.map(async (user) => {
            const currentPermissions = new Set(user.permissions?.map(p => p.id) || []);
            const selectedPermissions = userPermissions[user.id] || new Set();
            
            if (setsAreEqual(currentPermissions, selectedPermissions)) return null;

            const permissionsArray = Array.from(selectedPermissions);
            if (permissionsArray.length > 0) {
                const result = await assignPermissions(
                    user.id, 
                    features[0].featureId, 
                    permissionsArray
                );
                return { userId: user.id, ...result };
            }
            return null;
        }).filter(Boolean);

        try {
            const results = await Promise.all(promises);
            const actualResults = results.filter(r => r !== null);
            
            if (actualResults.length === 0) {
                toast.info("No changes to save", {
                    description: "No permissions were modified"
                });
                return;
            }

            const failures = actualResults.filter(r => !r.success);
            if (failures.length > 0) {
                console.error('Some permissions failed to assign:', failures);
                toast.error("Some permissions failed to assign", {
                    description: failures[0].error || "An error occurred while saving permissions"
                });
            } else {
                console.log('All permissions assigned successfully',actualResults);
                toast.success("Permissions assigned successfully", {
                    description: actualResults[0].message?.split(".")[0] || "All permissions have been assigned successfully"
                });
            }
        } catch (error) {
            console.error('Error saving permissions:', error);
            toast.error("Error saving permissions", {
                description: error instanceof Error ? error.message : "An error occurred while saving permissions"
            });
        }
    }

    function setsAreEqual(a: Set<string>, b: Set<string>) {
        return a.size === b.size && [...a].every(value => b.has(value));
    }
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
        {#each users as user}
            <Table.Row class="flex items-center gap-4 mt-4 px-3 rounded-lg border w-max min-w-full">
                <Table.Cell class="w-[30px]">
                    <Checkbox/>
                </Table.Cell>
                <Table.Cell class="w-[130px]">
                    <span class="flex flex-col">
                        <span>Name: {user.name}</span>
                        <span class="text-xs">Email: {user.email}</span>
                    </span>
                </Table.Cell>
                {#each features as feature}
                    <Table.Cell class="w-[130px]">
                        <input
                            type="checkbox"
                            checked={userPermissions[user.id]?.has(feature.id)}
                            on:change={(e) => handlePermissionChange(user.id, feature.id, e.target.checked)}
                        />
                    </Table.Cell>
                {/each}
            </Table.Row>
        {/each}
    </Table.Body>
    <Button variant="brand" class="mr-auto mb-10" on:click={savePermissions}>Save</Button>
</Table.Root>
  