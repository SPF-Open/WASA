<script lang="ts">
    import Part from "../Item/Part.svelte";

    import { assessment } from "../store";
</script>

{#if $assessment}
    <div>
        <h3>{$assessment?.title}</h3>
    </div>
    <Part parts={$assessment.parts} />
{/if}
