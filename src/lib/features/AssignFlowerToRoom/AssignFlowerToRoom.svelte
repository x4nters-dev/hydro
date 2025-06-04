<script lang="ts">
import CancelSubmit from "$lib/components/CancelSubmit/CancelSubmit.svelte";
import CustomModal from "$lib/components/CustomModal/CustomModal.svelte";
import Form from "$lib/components/Form/Form.svelte";
import HiddenInput from "$lib/components/HiddenInput/HiddenInput.svelte";
import Select from "$lib/components/Select/Select.svelte";
import { t } from "$lib/i18n";
import type { FlowerInterface } from "$lib/interfaces/flower.interface";
import { BadgePlus } from "lucide-svelte";

const props: {
	roomId: number;
	flowers: FlowerInterface[];
} = $props();
</script>

<CustomModal title={$t('assignPlant')}>
    {#snippet trigger()}
        <BadgePlus />
    {/snippet}

    {#snippet content(open, close)}
        <Form action="?/assignFlower">
            <HiddenInput name="roomId" value={props.roomId} />

            <Select name="flowerId" label={$t('plant')} required>
                {#each props.flowers as flower (flower.id)}
                    <option value={flower.id}>{flower.name}</option>
                {/each}
            </Select>

            {#snippet buttons()}
                <CancelSubmit onCancel={close} />
            {/snippet}
        </Form>
    {/snippet}
</CustomModal>

