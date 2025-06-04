<script lang="ts">
import { page } from "$app/state";
import { Navigation } from "@skeletonlabs/skeleton-svelte";
import { Droplets, Flower, History, SquareSquare } from "lucide-svelte";

const id = $derived(page.route.id);
const rootOfActiveRoute = $derived(`/${String(id).split("/")[1]}`);
</script>

<Navigation.Rail classes="max-w-16" value={rootOfActiveRoute}>
    {#snippet tiles()}
        <Navigation.Tile id="/daily" href="/daily">
            <Droplets />
        </Navigation.Tile>

        <Navigation.Tile id="/flowers" href="/flowers">
            <Flower />
        </Navigation.Tile>

        <Navigation.Tile id="/rooms" href="/rooms">
            <SquareSquare />
        </Navigation.Tile>

        <Navigation.Tile id="/history" href="/history">
            <History />
        </Navigation.Tile>
    {/snippet}
</Navigation.Rail>