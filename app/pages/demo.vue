<script setup lang="ts">
import WaitlistDemo from '~/components/sections/WaitlistDemo.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const baseUrl = 'https://www.protegey.com'

usePageMeta({
    title: t('seo.demo.title'),
    description: t('seo.demo.description'),
    schemaOrg: [
        {
            '@type': 'ContactPage',
            name: t('seo.demo.title'),
            description: t('seo.demo.description'),
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('seo.demo.title'), item: `${baseUrl}/demo` }
            ]
        }
    ]
})
</script>

<template>
    <div class="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 overflow-hidden">
        <WaitlistDemo />
    </div>
</template>
