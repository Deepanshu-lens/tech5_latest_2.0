<script lang="ts">
  import * as Dialog from "@/components/ui/dialog";
  import AddCameraForm from "@/components/forms/CameraForm.svelte";

  import pb from "@/lib/pb";
  import * as AlertDialog from "@/components/ui/alert-dialog";
  import * as Tabs from "@/components/ui/tabs/index.js";
  import * as Card from "@/components/ui/card/index.js";
  import { selectedNode, nodes, user } from "@/stores";

  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import AddItemModal from "./AddItemModal.svelte";

  export let action: "add" | "edit" | "delete";

  let modalOpen = false;

  let nodeName = "";
  let cameraName = "";
  let mainUrl = "";
  let subUrl = "";

  const addNode = async () => {
    const data = {
      name: nodeName,
      session: $user.session[0],
    };
    const record = await pb.collection("node").create(data);
    selectedNode.set(record.id);
    if (cameraName !== "" && mainUrl !== "") {
      const data = {
        name: cameraName,
        url: mainUrl,
        subUrl,
        node: record.id,
      };
      await pb.collection("camera").create(data);
    }

    modalOpen = false;
  };

  const editNode = async () => {
    const data = {
      name: nodeName,
      session: $user.session[0],
    };
    const record = await pb
      .collection("node")
      .update($nodes.find((n) => n.id === $selectedNode)?.id, data);
    selectedNode.set(record.id);
    modalOpen = false;
  };

  const deleteNode = async () => {
    const record = await pb
      .collection("node")
      .delete($nodes.find((n) => n.id === $selectedNode)?.id);
  };
</script>

{#if action === "add"}
  <AddItemModal {action}><slot /></AddItemModal>
{:else if action === "edit"}
  <Dialog.Root bind:open={modalOpen}>
    <Dialog.Trigger><slot /></Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[48rem]">
      <Dialog.Header>
        <Dialog.Title class="border-b pb-4">Edit Node</Dialog.Title>
      </Dialog.Header>
      <div class="space-y-1">
        <Label for="nodeName">Name</Label>
        <Input
          id="nodeName"
          placeholder={$nodes.find((n) => n.id === $selectedNode)?.name}
          bind:value={nodeName}
        />
      </div>
      <Dialog.Footer class="flex items-center justify-between">
        <Button
          variant="brand"
          type="submit"
          class="bg-[#015A62] text-white font-semibold"
          on:click={editNode}
          disabled={nodeName === ""}>Confirm</Button
        >
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
{:else}
  <AlertDialog.Root>
    <AlertDialog.Trigger><slot /></AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
          Deleting a node cannot be undone. This will permanently delete your
          node and remove all associated sub-nodes and cameras from our servers.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <AlertDialog.Action on:click={deleteNode} class="bg-rose-500 text-white"
          >Delete</AlertDialog.Action
        >
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
{/if}
