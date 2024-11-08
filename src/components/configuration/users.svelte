<script lang="ts">
    import { Check, Filter, Search} from "lucide-svelte";
    import type { User } from "@/types";
    import { toast } from "svelte-sonner";
    import * as Table from "@/components/ui/table";
    import * as Tabs from "@/components/ui/tabs";
    import EventsTable from "./users/events-table.svelte";
    import GalleryTable from "./users/gallery-table.svelte";
    import ConfigurationTable from "./users/configuration-table.svelte";
    import ReportsTable from "./users/reports-table.svelte";
    import NodesTable from "./users/nodes-table.svelte";
    import NavbarTable from "./users/navbar-table.svelte";
    import UserTable from "./users/user-table.svelte";
    import Checkbox from "@/components/ui/checkbox/checkbox.svelte";
    let selected:number = 1;
    let permissionTab: number = 1;
  </script>
  
  <div
    class="flex flex-col items-start mt-12 h-[calc(100vh-75px)] w-full text-black dark:text-white"
  >
    <div
      class="flex w-full justify-start items-center gap-20 font-bold mb-4 px-8"
    >
      {#if selected === 1}
        <div class=" relative">
          <span class="font-bold text-[#015A62] dark:text-white">
            User details
          </span>
          <span
            class=" h-[3px] rounded-full bg-[#0B8995] w-full absolute left-0 -bottom-4"
          ></span>
        </div>
      {:else}
        <button
          class="cursor-pointer text-[#212427] dark:text-[rgba(255,255,255,.6)] font-medium"
          on:click={() => {
            selected = 1;
            //addUserLog("user clicked on user details button, user panel");
          }}
        >
          User details
        </button>
      {/if}
      {#if selected === 2}
        <div class=" relative">
          <span class="font-bold text-[#015A62] dark:text-white">
            Permissions
          </span>
          <span
            class=" h-[3px] rounded-full bg-[#0B8995] w-full absolute left-0 -bottom-4"
          ></span>
        </div>
      {:else}
        <button
          class="cursor-pointer text-[#212427] dark:text-[rgba(255,255,255,.6)] font-medium"
          on:click={() => {
            selected = 2;
            //addUserLog("user clicked on permissions button, user panel");
          }}
        >
          Permissions
        </button>
      {/if}
      {#if selected === 3}
        <div class=" relative">
          <span class="font-bold text-[#015A62] dark:text-white"> Policies </span>
          <span
            class=" h-[3px] rounded-full bg-[#0B8995] w-full absolute left-0 -bottom-4"
          ></span>
        </div>
      {:else}
        <button
          class="cursor-pointer text-[#212427] dark:text-[rgba(255,255,255,.6)] font-medium"
          on:click={() => {
            selected = 3;
            //addUserLog("user clicked on policies button, user panel");
          }}
        >
          Policies
        </button>
      {/if}
      {#if selected === 4}
        <div class=" relative">
          <span class="font-bold text-[#015A62] dark:text-white">
            Login Events
          </span>
          <span
            class=" h-[3px] rounded-full bg-[#0B8995] w-full absolute left-0 -bottom-4"
          ></span>
        </div>
      {:else}
        <button
          class="cursor-pointer text-[#212427] dark:text-[rgba(255,255,255,.6)] font-medium"
          on:click={() => {
            selected = 4;
            //addUserLog("user clicked on login events button, user panel");
          }}
        >
          Login Events
        </button>
      {/if}
      {#if selected === 6}
        <div class=" relative">
          <span class="font-bold text-[#015A62] dark:text-white">
            System Logs
          </span>
          <span
            class=" h-[3px] rounded-full bg-[#0B8995] w-full absolute left-0 -bottom-4"
          ></span>
        </div>
      {:else}
        <button
          class="cursor-pointer text-[#212427] dark:text-[rgba(255,255,255,.6)] font-medium"
          on:click={() => {
            selected = 6;
            //addUserLog("user clicked on system logs button, user panel");
          }}
        >
          System Logs
        </button>
      {/if}
      {#if selected === 5}
        <div class=" relative">
          <span class="font-bold text-[#015A62] dark:text-white">
            {" "}
            Device Authorisation
          </span>
          <span
            class=" h-[3px] rounded-full bg-[#0B8995] w-full absolute left-0 -bottom-4"
          ></span>
        </div>
      {:else}
        <button
          class="cursor-pointer text-[#212427] dark:text-[rgba(255,255,255,.6)] font-medium"
          on:click={() => {
            selected = 5;
            //addUserLog("user clicked on device authorisation button, user panel");
          }}
        >
          Device Authorisation
        </button>
      {/if}
    </div>
    {#if selected === 1}
      <div class="h-[1px] dark:bg-[#292929] w-[96%] mb-8 bg-[#e0e0e0]"></div>  
    
      <!-- User Table -->
      <UserTable />
    {/if}
    {#if selected === 2}
      <div class="h-[1px] dark:bg-[#292929] w-[96%] mb-8 bg-[#e0e0e0]"></div>  
      <div
        class="w-[96%] mx-auto justify-between flex items-center px-6 mb-4 border border-gray-300 rounded-lg mt-5"
      >
        <div class="py-3">
          <div class="flex-cb">
            <h2 class="font-medium text-lg">Permission</h2>
            <span
              class="text-sm text-black/.5 bg-[#F7FAFF] rounded-lg px-2 py-1 text-[#0070FF]"
              >Super Admin</span
            >
          </div>
          <p class="text-xs font-normal text-[#667085]">
            Select & assign permissions to users
          </p>
        </div>
        <span
          class="flex items-center justify-center rounded-lg border-black/[.13] border-solid border-[1px] p-1 w-[270px] h-[40px] -mx-2"
        >
          <button
            on:click={() => (permissionTab = 1)}
            class={`rounded-lg text-xs leading-[18px] px-[10px] py-[3px] font-medium w-full h-full ${permissionTab === 1 ? "text-white bg-[#015a62]" : "bg-transparent"}`}
            >Permissions</button>
          <button
            on:click={() => (permissionTab = 2)}
            class={`rounded-lg text-xs leading-[18px] px-[10px] py-[3px] font-medium w-full h-full ${permissionTab === 2 ? "text-white bg-[#015a62]" : "bg-transparent"}`}
            >Nodes</button>
        </span>
        <span class="flex items-center gap-4">
          <span class="text-xs font-medium flex items-center gap-2"
            ><Filter size={18} /> Filters</span
          >
          <span
            class="relative rounded-lg border-2 border-solid border-[#d0d5dd]"
          >
            <input
              type="text"
              placeholder="Search"
              class="border-none text-black outline-none pr-2 pl-8 py-2 text-sm placeholder:text-black bg-transparent"
            />
            <Search class="absolute top-1/2 -translate-y-1/2 left-2" size={18} />
          </span>
        </span>
      </div>
      {#if permissionTab === 1}
        <Tabs.Root class="mx-auto w-full px-6 pb-0 bg-transparent">
          <Tabs.List class="flex items-center w-full bg-white dark:bg-black ">
            <Tabs.Trigger
              value="live"
              class="rounded-t-md flex items-center justify-start px-2 gap-4 border-[#eaecf0] border-[1px] border-solid border-b-0 w-full data-[state=active]:bg-[#f8f8f8]"
              ><Checkbox
                class="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />Live</Tabs.Trigger
            >
            <Tabs.Trigger
              value="playback"
              class="rounded-t-md flex items-center justify-start px-2 gap-4 border-[#eaecf0] border-[1px] border-solid border-b-0 w-full data-[state=active]:bg-[#f8f8f8]"
              ><Checkbox
                class="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              /> Playback</Tabs.Trigger
            >
            <Tabs.Trigger
              value="events"
              class="rounded-t-md flex items-center justify-start px-2 gap-4 border-[#eaecf0] border-[1px] border-solid border-b-0 w-full data-[state=active]:bg-[#f8f8f8]"
              ><Checkbox
                class="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              /> Events</Tabs.Trigger
            >
            <Tabs.Trigger
              value="gallery"
              class="rounded-t-md flex items-center justify-start px-2 gap-4 border-[#eaecf0] border-[1px] border-solid border-b-0 w-full data-[state=active]:bg-[#f8f8f8]"
              ><Checkbox
                class="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              /> Gallery</Tabs.Trigger
            >
            <Tabs.Trigger
              value="config"
              class="rounded-t-md flex items-center justify-start px-2 gap-4 border-[#eaecf0] border-[1px] border-solid border-b-0 w-full data-[state=active]:bg-[#f8f8f8]"
              ><Checkbox
                class="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              /> Configuration</Tabs.Trigger
            >
            <Tabs.Trigger
              class="rounded-t-md flex items-center justify-start px-2 gap-4 border-[#eaecf0] border-[1px] border-solid border-b-0 w-full data-[state=active]:bg-[#f8f8f8] "
              value="reports"
              ><Checkbox
                class="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              /> Reports</Tabs.Trigger
            >
            <Tabs.Trigger
              class="rounded-t-md flex items-center justify-start px-2 gap-4 border-[#eaecf0] border-[1px] border-solid border-b-0 w-full data-[state=active]:bg-[#f8f8f8] "
              value="navbar"
              ><Checkbox
                class="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              /> Navbar</Tabs.Trigger
            >
          </Tabs.List>
          <Tabs.Content value="live" class="-mt-1">
            <LiveTable {liveFeatures} {allUsers} />
            <!-- live content -->
          </Tabs.Content>
          <Tabs.Content value="playback" class="-mt-1">
            <PlaybackTable {allUsers} />
            <!-- playback content -->
          </Tabs.Content>
          <Tabs.Content value="events" class="-mt-1">
            <EventsTable {allUsers} />
            <!-- events content -->
          </Tabs.Content>
          <Tabs.Content value="gallery" class="-mt-1">
            <GalleryTable {allUsers} />
            <!-- gallery content -->
          </Tabs.Content>
          <Tabs.Content value="config" class="-mt-1">
            <ConfigurationTable {allUsers} />
            <!-- config content -->
          </Tabs.Content>
          <Tabs.Content value="reports" class="-mt-1">
            <ReportsTable {allUsers} />
            <!-- reports content -->
          </Tabs.Content>
          <Tabs.Content value="navbar" class="-mt-1">
            <NavbarTable {allUsers} />
            <!-- navbar content -->
          </Tabs.Content>
        </Tabs.Root>
      {:else}
        <div
          class="w-full overflow-x-auto overflow-y-auto max-h-[calc(100vh-250px)] max-w-[calc(100vw-5.5rem)] hide-scrollbar pb-10 pt-4 px-6"
        >
          <NodesTable />
          <!-- nodes table -->
        </div>
      {/if}
    {/if}
    {#if selected === 3}
      <div class="h-[1px] dark:bg-[#292929] w-[96%] mb-8 bg-[#e0e0e0]"></div>
      <h2 class="font-medium px-6 mb-4">Policies</h2>
    {/if}
    {#if selected === 4}
      <div class="h-[1px] dark:bg-[#292929] w-[96%] mb-8 bg-[#e0e0e0]"></div>
      <h2 class="font-medium px-6 mb-4">Login Events</h2>
      {#if records}
        <div class="w-full">
          <Table.Root class=" w-[40%] px-6 flex flex-col pb-10 ">
            <Table.Header
              class="border-2 border-[#e4e4e4] border-solid rounded-lg bg-[#f9f9f9] "
            >
              <Table.Row class="bg-transparent flex items-center p-3">
                <Table.Head class="text-[#727272] w-full h-full text-start"
                  >S.No</Table.Head
                >
                <Table.Head class="text-[#727272] w-full h-full text-center">
                  Login Time
                </Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body
              class="overflow-y-scroll max-h-[calc(100vh-285px)] pb-10 "
            >
              {#each records as item, index}
                <Table.Row
                  class="bg-transparent cursor-pointer flex gap-4 mt-4 px-3 rounded-lg  border-2 border-solid border-[#e4e4e4]"
                >
                  <Table.Cell class="text-black w-full h-full text-start">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell
                    class="text-[#727272] w-full h-full text-sm text-center"
                  >
                    {formatDateTime(item?.created)}
                  </Table.Cell>
                </Table.Row>
              {/each}
            </Table.Body>
          </Table.Root>
        </div>
      {:else}
        <span class="px-6 text-sm">Loading...</span>
      {/if}
    {/if}
    {#if selected === 5}
      <div class="h-[1px] dark:bg-[#292929] w-[96%] mb-8 bg-[#e0e0e0]"></div>
      <h2 class="font-medium px-6 mb-4">Device Authorisation Settings</h2>
    {/if}
    {#if selected === 6}
      <div class="h-[1px] dark:bg-[#292929] w-[96%] mb-8 bg-[#e0e0e0]"></div>
      <h2 class="font-medium px-6 mb-4">System Logs</h2>
      {#if logs}
        <div class="w-full">
          <Table.Root class=" w-full px-6 flex flex-col pb-10 ">
            <Table.Header
              class="border-2 border-[#e4e4e4] border-solid rounded-lg bg-[#f9f9f9] "
            >
              <Table.Row class="bg-transparent flex items-center p-3">
                <Table.Head class="text-[#727272] w-full h-full ">S.No</Table.Head
                >
                <Table.Head class="text-[#727272] w-full h-full text-center">
                  Event Time
                </Table.Head>
                <Table.Head class="text-[#727272] w-full h-full text-center">
                  Event
                </Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body
              class="overflow-y-scroll max-h-[calc(100vh-285px)] pb-10 "
            >
              {#each logs as item, index}
                <Table.Row
                  class="bg-transparent cursor-pointer flex gap-4 mt-4 px-3 rounded-lg  border-2 border-solid border-[#e4e4e4]"
                >
                  <Table.Cell class="text-black w-full h-full ">
                    {index + 1}
                  </Table.Cell>
                  <Table.Cell
                    class="text-[#727272] w-full h-full text-sm text-center"
                  >
                    {formatDateTime(item?.created)}
                  </Table.Cell>
                  <Table.Cell
                    class="text-[#727272] w-full h-full text-sm text-center"
                  >
                    {item.event}
                  </Table.Cell>
                </Table.Row>
              {/each}
            </Table.Body>
          </Table.Root>
        </div>
      {:else}
        <span class="px-6 text-sm">Loading...</span>
      {/if}
    {/if}
  </div>
  
  <style>
    .shad {
      box-shadow: 0px 4px 4px 0px #0000000f;
    }
  </style>
  