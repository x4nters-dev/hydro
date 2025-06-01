<script lang="ts">
import CustomModal from "$lib/components/CustomModal/CustomModal.svelte";
import { Plus } from "lucide-svelte";
import TextInput from "$lib/components/TextInput/TextInput.svelte";
import type { RoomInterface } from "$lib/interfaces/room.interface";
import Select from "$lib/components/Select/Select.svelte";
import NumberInput from "$lib/components/NumberInput/NumberInput.svelte";
import { SoilTypeEnum } from "$lib/enums/soilType.enum";
import CancelSubmit from "$lib/components/CancelSubmit/CancelSubmit.svelte";
import Form from "$lib/components/Form/Form.svelte";
import ImageFileField from "$lib/components/ImageFileField/ImageFileField.svelte";
import { t } from "$lib/i18n";

const props: {
	rooms: RoomInterface[];
} = $props();
</script>

<CustomModal title={$t('addPlant')}>
    {#snippet trigger()}
        <Plus />
    {/snippet}

    {#snippet content(open, close)}
        <Form action="?/addFlower">
            <TextInput
                name="name"
                label={$t('name')}
            />

            <ImageFileField />

            <Select label={$t('room')} name="roomId">
                {#each props.rooms as room}
                    <option value={room.id}>{room.name}</option>
                {/each}
            </Select>

            <NumberInput
                label={$t('wateringFrequency')}
                name="watering[frequency]"
            />

            <NumberInput
                label={$t('wateringAmount')}
                name="watering[amount]"
            />

            <NumberInput
                label={$t('minTemperature')}
                name="conditions[minTemperature]"
            />

            <NumberInput
                label={$t('maxTemperature')}
                name="conditions[maxTemperature]"
            />

            <Select
                label={$t('soilType')}
                name="conditions[soilType]"
            >
                {#each Object.values(SoilTypeEnum) as soilType}
                    <option value={soilType}>{$t(soilType)}</option>
                {/each}
            </Select>

            {#snippet buttons()}
                <CancelSubmit onCancel={close} />
            {/snippet}
        </Form>
    {/snippet}
</CustomModal>
