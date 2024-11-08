<script lang="ts">
    import { Button } from "@/components/ui/button";
    import AddUser from "@/components/configuration/modals/add-user.svelte";
    import {
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from "@/components/ui/table";
    import { Checkbox } from "@/components/ui/checkbox";
    import {
      SlidersHorizontal,
      ChevronDown,
      Plus,
      ArrowDown,
      SquarePen,
    } from "lucide-svelte";
    import { user } from '@/stores'
  import { onMount } from "svelte";

    let userChildrenData:any[] = [];
    let userData:any;
    let roles = {
        superAdmin: 'Super Admin',
        admin: 'Admin',
        user: 'User',
    };
    const BASE_URL = "https://license.lenscorp.cloud/api";

  
    // Mock data for the table
    // const userChildrenData = [
    //   {
    //     name: "Sam Singh",
    //     email: "sam.singh@gmail.com",
    //     lastActivity: "Thu, March 21, 2024",
    //     logEvent: "Changed Password from userChildrenData",
    //   },
    //   {
    //     name: "Rahul Singh",
    //     email: "rahul.singh@gmail.com",
    //     lastActivity: "Thu, March 21, 2024",
    //     logEvent: "Added new face to FRS",
    //   },
    //   {
    //     name: "Rahul Singh",
    //     email: "rahul.singh@gmail.com",
    //     lastActivity: "Thu, March 21, 2024",
    //     logEvent: "Added new face to FRS",
    //   },
    //   {
    //     name: "Rahul Singh",
    //     email: "rahul.singh@gmail.com",
    //     lastActivity: "Thu, March 21, 2024",
    //     logEvent: "Added new face to FRS",
    //   },
    //   {
    //     name: "Rahul Singh",
    //     email: "rahul.singh@gmail.com",
    //     lastActivity: "Thu, March 21, 2024",
    //     logEvent: "Added new face to FRS",
    //   },
    //   {
    //     name: "Rahul Singh",
    //     email: "rahul.singh@gmail.com",
    //     lastActivity: "Thu, March 21, 2024",
    //     logEvent: "Added new face to FRS",
    //   },
    //   {
    //     name: "Rahul Singh",
    //     email: "rahul.singh@gmail.com",
    //     lastActivity: "Thu, March 21, 2024",
    //     logEvent: "Added new face to FRS",
    //   },
    //   {
    //     name: "Rahul Singh",
    //     email: "rahul.singh@gmail.com",
    //     lastActivity: "Thu, March 21, 2024",
    //     logEvent: "Added new face to FRS",
    //   },
    // ];

    async function fetchUserData(userId:string) {
    try {
      const response = await fetch(`${BASE_URL}/user/${userId}/details`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const childrenData = $user ? await fetchUserChildrenData($user.id) : [];
    userData = data;
    userChildrenData = childrenData;
  } catch (error) {
    console.error('Fetch error:', error);
    }
  }

async function fetchUserChildrenData(userId:string) {
  try {
    const response = await fetch(`${BASE_URL}/user/${userId}/children`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

onMount(() => {
  if ($user && $user.id) {
    fetchUserData($user.id);
  }
})
</script>
  
  <div class="p-2 h-auto rounded-lg w-full">
    <div class="border border-gray-200 rounded-lg shadow-sm">
      <!-- Table Heading -->
      <div class="flex justify-between items-center mb-4 px-5 pt-4">
        <div>
          <div class="flex items-center gap-2 my-1">
            <h2 class="text-xl font-semibold">{userData?.name || 'User Name'}</h2>
            <span
              class="text-sm text-black/.5 bg-[#F7FAFF] rounded-lg px-2 py-1 text-[#0070FF]"
              >{roles[userData?.role.name as keyof typeof roles] || 'User Role'}</span
            >
          </div>
          <p class="text-sm text-gray-500">Record of user & log events</p>
        </div>
        <div class="flex items-center space-x-2">
          <Button disabled variant="outline" class="flex items-center">
            <SlidersHorizontal class="w-4 h-4 mr-2" />
            Filters
          </Button>
          <AddUser parentId={$user?.id}>
            <Button>
              <Plus class="w-4 h-4 mr-2" />
              Add User
            </Button>
          </AddUser>
        </div>
      </div>
  
      <Table>
        <TableHeader class="bg-[#EAECF0]/50">
          <TableRow>
            <TableHead class="w-12">
              <Checkbox />
            </TableHead>
            <TableHead
              ><span class="flex items-center gap-1"
                >User Name
                <ArrowDown size={15} /></span
              >
            </TableHead>
            <TableHead
              ><span class="flex items-center gap-1"
                >Role
                <ArrowDown size={15} /></span
              >
            </TableHead>
            <TableHead
              ><span class="flex items-center gap-1"
                >Email Address
                <ArrowDown size={15} /></span
              ></TableHead
            >
            <TableHead>
              <span class="flex items-center gap-1"
                >Last Activity
                <ArrowDown size={15} /></span
              >
            </TableHead>
            <TableHead>
              <span class="flex items-center gap-1"
                >Log Event
                <ArrowDown size={15} /></span
              >
            </TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="max-h-[40%] overflow-y-auto">
          {#if userChildrenData.length === 0}
            <TableRow>
              <TableCell colspan="6" class="text-center text-neutral-500">
                No users
              </TableCell>
            </TableRow>
          {:else}
          <!-- had to reverse to get the latest user first  -->
            {#each userChildrenData.reverse() as user}
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell class="text-neutral-500">{roles[user.role.name as keyof typeof roles] || 'User Role'}</TableCell>
                <TableCell class="text-neutral-500">{user.email}</TableCell>
                <TableCell class="text-neutral-500">{user.lastActivity}</TableCell>
                <TableCell class="text-neutral-500">{user.logEvent}</TableCell>
                <TableCell>
                  <Button
                    size="sm"
                    variant="ghost"
                    class="bg-[#F16522]/10 rounded-3xl text-[#F16522] py-3 px-3"
                  >
                    <SquarePen class="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            {/each}
          {/if}
        </TableBody>
      </Table>
    </div>
  </div>
  