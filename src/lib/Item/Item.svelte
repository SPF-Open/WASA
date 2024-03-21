<script lang="ts">
    import { Item } from "../../helper/Parser";
    import Tools from "./Tools.svelte";

    export let item: Item | undefined = undefined;
</script>

{#if item}
    {@const title = item.id}
    {@const content = item.content}
    {@const tools = item.tools}
    <div class="item">
        <h4>{title + " Title"}</h4>
        <div class="text">
            <p>{content + " Content"}</p>
        </div>
        <footer>
            <Tools {tools} />
        </footer>
    </div>
{/if}

<style>
    .item {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        background-color: #f4f4f4;
        text-align: left;
    }
    .item > *{
        padding: 0.25rem;
        margin: 0;
    }
    h4{
        border-bottom: 1px solid #e0e0e0;
    }
    .text {
        border-radius: 5px;
        display: flex;
        flex-direction: column;
    }
    footer {
        border-top: 1px solid #e0e0e0;
    }
</style>
