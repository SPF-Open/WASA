<script lang="ts">
    import { type Part } from "../../helper/Parser";
    import Item from "./Item.svelte";

    export let parts: Part[] | undefined = undefined;
</script>

{#if parts && parts.length > 0}
    {#each parts as part}
        {@const title = part.title}
        {@const childParts = part.parts}
        {@const childItems = part.items}
        <div class="parent">
            <h3>{title}</h3>
            <div class="childs parts">
                {#if childParts && childParts.length > 0}
                    <svelte:self parts={childParts} />
                {/if}
            </div>
            <div class="childs items">
                {#if childItems && childItems.length > 0}
                    {#each childItems as item}
                        <Item {item} />
                    {/each}
                {/if}
            </div>
        </div>
    {/each}
{/if}

<style>
    .parent {
        margin: 0.5rem;
        border: 1px solid black;
        padding: 0.5rem;
    }

    .parts, .items{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
</style>
