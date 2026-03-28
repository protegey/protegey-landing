<script setup lang="ts">
import InfoPage from '~/components/sections/InfoPage.vue'
import WhoItsFor from '~/components/sections/WhoItsFor.vue'

const { t } = useI18n()

useSeoMeta({
    title: t('who_its_for.seo.title'),
    ogTitle: t('who_its_for.seo.title'),
    description: t('who_its_for.seo.description'),
    ogDescription: t('who_its_for.seo.description'),
})

if (import.meta.server) {
    useSchemaOrg([
        {
            '@type': 'WebPage',
            name: t('who_its_for.seo.title'),
            description: t('who_its_for.seo.description'),
        }
    ])
}
</script>

<template>
    <InfoPage :title="t('who_its_for.title')" :subtitle="t('who_its_for.subtitle')">
        <!-- Cards -->
        <div class="max-w-5xl mx-auto">
            <WhoItsFor />
        </div>

        <!-- Closing note -->
        <p class="text-center text-neutral-500 text-sm mt-14 max-w-xl mx-auto">
            {{ t('who_its_for.exclusion') }}
        </p>
    </InfoPage>
</template>
