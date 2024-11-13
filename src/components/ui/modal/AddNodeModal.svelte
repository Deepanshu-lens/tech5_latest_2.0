<script lang="ts">
  import { toast } from "svelte-sonner";
  import * as Dialog from "@/components/ui/dialog";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { Slider } from "@/components/ui/slider";
  import { Switch } from "@/components/ui/switch";
  import { ChevronDown, PlusCircle, X } from "lucide-svelte";
  import * as Select from "@/components/ui/select/index";
  import { selectedNode } from "@/stores";

  let cameraName = "";
  let cameraURL = "";
  let subURL = "";
  let cameraUsername = "";
  let cameraPass = "";
  let cameraIp = "";
  let saving: boolean = false;
  let vehicle: boolean = false;
  let face: boolean = false;
  let dialogOpen: boolean = false;
  let company: number = 0;
  let disabled: string | null = null;
  let priority: boolean = true;
  let motionThresh: number = 0;
  let nvrName = "";
  let sparshID = "";

  let mode = 2;
  let uploadMode = 1;
  let addMode = 1;
  export let addSubNode = false;
  let modeAdd = addSubNode ? 2 : 1;
  let addNodeCounter = 1;
  let subNodeCounter = 1;
  let addDevice = 1;
  let nodeName = [];
  let subNodeNames = [];
  let chosenNode: any;
  let httpPort: null | number = null;
  let nvrUserId;
  let nvrPass;
  let nvrIp;
  let nvrPort;
  let vehicleScan: boolean = false;
  let serverIPs: string[] = [""];

  const addMoreIPs = () => {
    serverIPs = [...serverIPs, ""];
  };

  //   New declared varibles
  let mainURL = "";
  let usingRTSP = true;
  let features = {
    feedSaving: false,
    vehicleScan: false,
    faceScan: false,
    priority: false,
  };

  export let sNode;
  export let nodes;

  const onSubmit = () => {
    console.log(mode, "mode here");
    if (addMode === 1) {
      let modifiedCameraURL = cameraURL;
      let modSubURL = subURL;
      const urlParts = cameraURL.split("@");
      console.log(urlParts);
      const atIndex = cameraURL.indexOf("@");
      if (urlParts.length > 2) {
        console.log(atIndex);
        modifiedCameraURL = urlParts[0] + "%40" + urlParts.slice(1).join("@");
      }
      const subParts = subURL.split("@");
      if (subParts.length > 2) {
        modSubURL = subParts[0] + "%40" + subParts.slice(1).join("@");
      }
      console.log(modifiedCameraURL, "Modified CaMURL");
      console.log(subURL, "suburl");

      fetch("/api/camera/addCamera", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cameraName,
          url: modifiedCameraURL,
          subUrl: subURL,
          nodeId: sNode ? sNode.id : $selectedNode.id,
          sessionId: $selectedNode.session,
          face: face,
          save: saving,
          saveFolder: "./PlayBack/",
          saveDuration: 30 * 60 * 24,
          vehicle: vehicle,
          faceDetThresh: 0.93,
          faceMatchThresh: 0.3,
          vehicleDetThresh: 0.4,
          vehiclePlateThresh: 0.5,
          vehicleOCRThresh: 0.6,
          priority: priority === true ? 1 : 0,
          motionThresh:
            motionThresh === 0 ? 1000 : motionThresh === 50 ? 2500 : 5000,
          sparshID: sparshID,
          vehicleScan: vehicleScan,
        }),
      }).then((response) => {
        if (response.ok) {
          dialogOpen = false;
        }
        toast("Camera added!");
      });
    } else {
      // onvif://admin:admin123@50.168.139.58:80
      const onvifUrl = `onvif://${cameraUsername}:${cameraPass}@${cameraIp}${httpPort ? `:${httpPort}` : ""}`;
      console.log(onvifUrl);

      let onvifData;

      fetch(`http://localhost:8084/api/onvif?url=${onvifUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            onvifData = data;
            if (onvifData) {
              const main =
                onvifData[0].stream_type === "MainStream"
                  ? onvifData[0].url
                  : onvifData[1].url;
              const sub =
                onvifData[1].stream_type === "SubStream"
                  ? onvifData[1].url
                  : onvifData[0].url;

              if (main && sub) {
                fetch("/api/camera/addCamera", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    name: cameraName,
                    url: main,
                    subUrl: sub,
                    nodeId: sNode ? sNode.id : $selectedNode.id,
                    sessionId: $selectedNode.session,
                    face: face,
                    save: saving,
                    saveFolder: "./PlayBack/",
                    saveDuration: 30 * 60 * 24,
                    vehicle: vehicle,
                    faceDetThresh: 0.93,
                    faceMatchThresh: 0.3,
                    vehicleDetThresh: 0.4,
                    vehiclePlateThresh: 0.5,
                    vehicleOCRThresh: 0.6,
                    priority: priority === true ? 1 : 0,
                    motionThresh:
                      motionThresh === 0
                        ? 1000
                        : motionThresh === 50
                          ? 2500
                          : 5000,
                    sparshID: sparshID,
                    vehicleScan: vehicleScan,
                  }),
                }).then((response) => {
                  if (response.ok) {
                    dialogOpen = false;
                  }
                  toast("Camera added!");
                });
              }
            }
          } else {
            toast("Failed to add camera via ONVIF");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          toast("Error adding camera via ONVIF");
        });
    }
  };

  const onSubmitNVR = async () => {
    await fetch("/api/nvr/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nvrName,
        password: nvrPass,
        user_id: nvrUserId,
        http_port: nvrPort,
        ip: nvrIp,
        node: $selectedNode.id,
        nodeName: $selectedNode.name,
      }),
    })
      .then((response) => {
        if (response.ok) {
          dialogOpen = false;
        }
        toast("NVR added!");
      })
      .catch((err) => console.log(err));
  };

  function updateCompany(value: number) {
    company = value;
  }

  async function handleAddNode() {
    // Check all nodeNames for underscores first
    const invalidNodes = nodeName.filter((node) => node.includes("_"));

    if (invalidNodes.length > 0) {
      toast.error(
        '"_" are not allowed for Node names, please try with some other name!'
      );
      return;
    }

    for (let node of nodeName) {
      await fetch("/api/node/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: node,
          sessionId: $selectedNode?.session,
        }),
      }).catch((err) => console.log(err));
      // console.log(node)
    }
    dialogOpen = false;
    nodeName = [];
    addNodeCounter = 1;
  }

  let selectedMethod = "Manually";
  let selectedLens = "Lens Office";
  let isBulkUpload = false;

  const methods = ["Manually", "Automatically", "Via API"];
  const lenses = ["Lens Office", "Lens Home", "Lens Outdoor"];

  async function handleAddSubNodes() {
    // Check all subNodeNames for underscores first
    const invalidSubNodes = subNodeNames.filter((sub) => sub.includes("_"));

    if (invalidSubNodes.length > 0) {
      toast.error(
        '"_" are not allowed for subNode names, please try with some other name!'
      );
      return;
    }

    for (let subs of subNodeNames) {
      await fetch("/api/node/subnode/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subNode: subs,
          node: chosenNode.name,
          sessionId: $selectedNode.session,
        }),
      });
      dialogOpen = false;
      subNodeNames = [];
      subNodeCounter = 1;
    }
  }
  $: {
    if (
      cameraUsername?.length > 0 ||
      cameraPass?.length > 0 ||
      cameraIp?.length > 0
    ) {
      disabled = "url";
    } else if (cameraURL?.length > 0) {
      disabled = "other";
    } else {
      disabled = null;
    }
  }
</script>

<Dialog.Root bind:open={dialogOpen}>
  <Dialog.Trigger><slot /></Dialog.Trigger>
  <Dialog.Content
  class="sm:max-w-[920px] scale-90 sm:scale-100 z-[70] max-h-[95%] sm:max-h-auto overflow-y-scroll p-0"
>
  <Dialog.Header class="border-b border-gray-200 p-4 mb-0">
    <Dialog.Title>Node Settings</Dialog.Title>
  </Dialog.Header>

  <div class="flex flex-col sm:flex-row h-[30rem]">
    <!-- Sidebar content -->
    <div class="w-full sm:w-1/3 border-b sm:border-r px-4 bg-[#F3F3F3] dark:bg-black dark:text-white h-full">
      <Button
        variant="brand"
        class="font-semibold w-full text-left my-3 px-4 py-2 rounded-md dark:hover:bg-neutral-700 {modeAdd === 1 ? 'dark:bg-neutral-700 shadow-md bg-white' : 'dark:hover:bg-neutral-700'}"
        on:click={() => (modeAdd = 1)}
      >
        Add Node
      </Button>
      <button
        class="font-semibold w-full text-left my-3 px-4 py-2 rounded-md dark:hover:bg-neutral-700 {modeAdd === 2 ? 'dark:bg-neutral-700 shadow-md bg-white' : 'dark:hover:bg-neutral-700'}"
        on:click={() => (modeAdd = 2)}
      >
        Add Sub-node
      </button>
      <button
        class="font-semibold w-full text-left my-3 px-4 py-2 rounded-md {modeAdd === 3 ? 'dark:bg-neutral-700 shadow-md bg-white' : 'dark:hover:bg-neutral-700'}"
        on:click={() => (modeAdd = 3)}
      >
        Add Camera
      </button>
      <button
        class="font-semibold w-full text-left my-3 px-4 py-2 rounded-md {modeAdd === 4 ? 'dark:bg-neutral-700 shadow-md bg-white' : 'dark:hover:bg-neutral-700'}"
        on:click={() => (modeAdd = 4)}
      >
        Add Server
      </button>
    </div>

    <!-- Main add container -->
    <div class="w-full sm:w-2/3 pl-0 sm:pl-4 flex flex-col h-full mx-2">
      <div class="flex-grow">
        {#if modeAdd === 1}
          <h2 class="text-xl font-bold mb-4 border-b pb-2">Add Node</h2>
          {#each Array(addNodeCounter) as _, index (index)}
            <div class="mb-4">
              <Label for="node-name">Node Name {index + 1}</Label>
              <Input
                id="node-name"
                placeholder="Office"
                bind:value={nodeName[index]}
                class="w-full sm:w-96 bg-[#F6F6F6] dark:bg-neutral-400 mt-1 dark:text-black dark:placeholder:text-black"
              />
            </div>
          {/each}
          <button
            class="text-orange-500 flex items-center"
            on:click={() => (addNodeCounter += 1)}
          >
            <PlusCircle size={18} class="mr-2" /> Add New Node
          </button>
        {:else if modeAdd === 2}
          <h2 class="text-xl font-bold mb-4 border-b pb-2">Add Sub-node</h2>
          <div class="mb-4">
            <div class="items-center gap-4 py-2">
              <Label for={`node-name`}>Select Node</Label>
              <div class="relative col-span-3 mt-1">
                <select
                  class="w-full p-2 border border-gray-300 bg-[#F6F6F6] dark:bg-neutral-400 rounded-md"
                  bind:value={chosenNode}
                >
                  {#if nodes && nodes.length > 0}
                    {#each nodes as node}
                      <option value={node}>{node?.name}</option>
                    {/each}
                  {/if}
                </select>
              </div>
            </div>
          </div>
          {#each Array(subNodeCounter) as _, index (index)}
            <div class="mb-4">
              <Label for="sub-node">Sub-node {index + 1}</Label>
              <Input
                id="sub-node"
                placeholder="Office"
                bind:value={subNodeNames[index]}
                class="w-full sm:w-96 bg-[#F6F6F6] dark:bg-neutral-400 mt-1 dark:text-black dark:placeholder:text-black"
              />
            </div>
          {/each}
          <button
            class="text-orange-500 flex items-center"
            on:click={() => (subNodeCounter += 1)}
          >
            <PlusCircle size={18} class="mr-2" /> Add Sub Node
          </button>
        {:else if modeAdd === 3}
          <h2 class="text-xl font-bold mb-4 border-b pb-2">Add Camera</h2>
          <div class="drop-shadow-md px-2">
            <div class="w-full flex flex-col items-start justify-center py-4 gap-4">
              <!-- Camera mode content goes here -->
            </div>
          </div>
        {:else if modeAdd === 4}
          <h2 class="text-xl font-bold mb-4 border-b pb-2">Add Server</h2>
          <div class="mb-4">
            {#each serverIPs as ip, index}
              <Label for="ip-address" class="text-lg font-semibold">IP Address {index + 1}</Label>
              <Input
                id="ip-address-{index}"
                placeholder="Enter IP Address"
                bind:value={serverIPs[index]}
                class="w-full sm:w-96 bg-[#F6F6F6] dark:bg-neutral-400 mt-1 dark:text-black dark:placeholder:text-black"
              />
            {/each}
          </div>
          <button class="text-orange-500 flex items-center" on:click={addMoreIPs}>
            <PlusCircle size={18} class="mr-2" /> Add more
          </button>
        {/if}
      </div>
    </div>
  </div>

  <Dialog.Footer>
    <!-- Dialog Footer -->
    {#if modeAdd === 1}
      <div class="mt-auto w-32 self-end m-4">
        <Button
          disabled
          type="submit"
          on:click={() => handleAddNode()}
          variant="brand"
          class="w-full"
        >Submit</Button>
      </div>
    {:else if modeAdd === 2}
      <Button
        disabled
        class="mt-auto w-32 self-end m-4"
        variant="brand"
        on:click={() => handleAddSubNodes()}
      >Submit</Button>
    {:else if modeAdd === 3}
      <Button
        disabled
        class="mt-auto w-32 self-end m-4"
        variant="brand"
        on:click={onSubmit}
        type="submit"
      >Submit</Button>
    {:else}
      <Button
        disabled
        class="mt-auto w-32 self-end m-4"
        variant="brand"
        type="submit"
      >Submit</Button>
    {/if}
  </Dialog.Footer>
</Dialog.Content>
</Dialog.Root>
