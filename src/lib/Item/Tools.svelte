<script lang="ts">
    import { getIcon } from "./tools";

    export let tools: string[] | undefined = undefined;
</script>

{#if tools && tools.length > 0}
    <div class="tools">
        <span>Outil disponnible : </span>
        {#each tools as tool}
        {@const icon = getIcon(tool)}
            {#if icon.split('.').pop() === 'svg'}
                <img src={icon} alt={tool} />
            {:else}
            <span>{icon}</span>
            {/if}
        {/each}
    </div>
{/if}

<style>
    .tools {
        display: flex;
        align-items: center;
        gap: 0.2rem;
        background-color: #f4f4f4;
        border-radius: 5px;
        height: 1rem;
        font-size: smaller;
    }

    img {
        width: 1rem;
        height: 1rem;
    }
</style>
