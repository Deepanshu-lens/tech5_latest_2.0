<script lang="ts">
    //types
    type USER_DATA = {
      name: string;
      username: string;
      password: string;
      ip_addr: string;
      httpPort: string;
      ssl: boolean;
      session: string;
    };
  
    // Import
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Button } from "@/components/ui/button";
    import { toast } from "svelte-sonner";
    import * as Dialog from "../../../components/ui/dialog";
    import { Send } from "lucide-svelte";
  import { cn } from "@/lib/utils";
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

  const BASE_URL = "https://license.lenscorp.cloud/api";


  //todo find a better way to fetch the data after adding a user
  const refreshPageWithUserSection = () => {
    window.location.href = window.location.pathname + "?section=User";
  };
  
    //props
    export let parentId:string | undefined;

    // variables
    let dialogOpen: boolean = false;
    let userName: string = "";
    let userEmail: string = "";
    let userRole: { label: string, value: string } = { label: "", value: "" };
  
    // Functions
    async function handleSubmit(addUserData?: USER_DATA) {
      try {
        // Use form data if addUserData is not provided
        if (!parentId) {
          throw new Error("Parent ID is required");
        }
        const userDataToSubmit = addUserData || {
          name: userName,
          email: userEmail,
          roleName: userRole.value,
          parentId,
        };

        const response = await fetch(`${BASE_URL}/user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDataToSubmit),
        });
        const result = await response.json();

        if (!response.ok) {
          toast.error(result.error);
          return;
        }
        toast.success(`Invite sent successfully to ${userEmail}`);
        dialogOpen = false;
        // Add delay before refresh
        setTimeout(() => {
          refreshPageWithUserSection();
        }, 3000);
      } catch (error) {
        console.error("Error sending invite:", error);
        toast.error("Failed to send invite");
      }
    }

    function debounce<T extends (...args: any[]) => any>(
        fn: T,
        delay: number
    ): (...args: Parameters<T>) => void {
        let timeoutId: ReturnType<typeof setTimeout>;
        return (...args: Parameters<T>) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => fn(...args), delay);
        };
    }
    
    let isEmailValid = true;
    const validateEmail = debounce((email: string) => {
        isEmailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }, 500); // 500ms delay

    // Watch userEmail changes
    $: if (userEmail !== undefined) validateEmail(userEmail);
  </script>
  
  <Dialog.Root bind:open={dialogOpen}>
    <Dialog.Trigger><slot /></Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[600px] z-[70] scale-90 sm:scale-100">
      <Dialog.Header>
        <Dialog.Title>Add New User</Dialog.Title>
      </Dialog.Header>
      <div class="grid grid-cols-2 gap-4 py-4">
        <div class="col-span-2 flex items-center gap-4">
          <Label class="w-24" for="name">Name</Label>
          <Input
            type="text"
            bind:value={userName}
            class="text-base"
            placeholder="Name"
          />
        </div>
        <div class="col-span-2 flex items-center gap-4">
          <Label class="w-24" for="user-email">Email</Label>
          <Input
            type="email"
            bind:value={userEmail}
            class={cn("text-base", { error: !isEmailValid })}
            placeholder="Email"
          />
        </div>
        {#if !isEmailValid}
          <div class="col-span-2 text-red-500 text-sm">
            Please enter a valid email address.
          </div>
        {/if}
        <div class="col-span-2 flex items-center gap-4">
          <Label class="w-24" for="user-role">Role</Label>
            <Select bind:selected={userRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="superAdmin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
          </div>
      </div>
  
      <Dialog.Footer>
        <span class="flex items-center gap-4">
          <Button
            on:click={() => {
              dialogOpen = false;
            }}
            variant="secondary">Cancel</Button
          >
          <Button
            on:click={() => handleSubmit()}
            disabled={!isEmailValid || !userEmail}
            class="mt-auto flex items-center gap-1 w-full"
          >
            <Send size={16} />
            Invite user
          </Button>
        </span>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
  