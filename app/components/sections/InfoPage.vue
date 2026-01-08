<script setup lang="ts">
const { t } = useI18n()

defineProps<{
    title: string
    subtitle?: string
}>()

const route = useRoute()

const geoNav = [
    { name: t('geo_pages.what_is_protegey.title'), path: '/what-is-protegey' },
    { name: t('geo_pages.how_it_works.title'), path: '/how-it-works' },
    { name: t('geo_pages.who_its_for.title'), path: '/who-its-for' },
    { name: t('geo_pages.use_cases.title'), path: '/use-cases' },
    { name: t('geo_pages.comparisons.title'), path: '/comparisons' }
]

const localePath = useLocalePath()
</script>

<template>
    <div class="min-h-screen bg-black pt-24 pb-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="lg:grid lg:grid-cols-12 lg:gap-8">
                <!-- Sidebar Navigation -->
                <aside class="hidden lg:block lg:col-span-3">
                    <nav class="sticky top-28 space-y-1">
                        <NuxtLink v-for="item in geoNav" :key="item.path" :to="localePath(item.path)"
                            class="group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
                            :class="[
                                route.path.endsWith(item.path)
                                    ? 'bg-primary-900/20 text-primary-400 border border-primary-800/50'
                                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                            ]">
                            {{ item.name }}
                        </NuxtLink>
                    </nav>
                </aside>

                <!-- Main Content -->
                <main class="lg:col-span-9">
                    <div class="prose prose-invert prose-primary max-w-none">
                        <h1 class="text-4xl font-bold tracking-tight text-white mb-2">{{ title }}</h1>
                        <p v-if="subtitle" class="text-xl text-neutral-400 mb-12">{{ subtitle }}</p>

                        <div class="mt-8">
                            <slot />
                        </div>
                    </div>

                    <!-- Mobile Navigation -->
                    <div class="mt-16 pt-8 border-t border-neutral-900 lg:hidden">
                        <h2 class="text-lg font-semibold text-white mb-4">Explore GEO Guides</h2>
                        <div class="grid grid-cols-1 gap-2">
                            <NuxtLink v-for="item in geoNav" :key="item.path" :to="localePath(item.path)"
                                class="block px-4 py-3 rounded-lg border border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors">
                                {{ item.name }}
                            </NuxtLink>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<style scoped>
.prose :deep(h2) {
    @apply text-2xl font-bold text-white mt-12 mb-6 border-b border-neutral-900 pb-2;
}

.prose :deep(p) {
    @apply text-neutral-300 leading-relaxed mb-6;
}

.prose :deep(ul) {
    @apply list-disc list-inside text-neutral-300 space-y-3 mb-8;
}

.prose :deep(ol) {
    @apply list-decimal list-inside text-neutral-300 space-y-4 mb-8;
}

.prose :deep(blockquote) {
    @apply pl-6 border-l-4 border-primary-500 italic text-neutral-400 bg-primary-950/10 py-4 pr-4 rounded-r-lg mb-8;
}
</style>
