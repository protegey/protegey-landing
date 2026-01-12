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
    { name: t('geo_pages.comparisons.title'), path: '/comparisons' },
    { name: t('geo_pages.trust.title'), path: '/trust' }
]

const localePath = useLocalePath()
</script>

<template>
    <div class="relative min-h-screen bg-neutral-900 pt-32 pb-16 overflow-hidden">
        <!-- Animated Background Grid -->
        <div class="absolute inset-0 z-0">
            <div
                class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950"></div>

            <!-- Glowing Orbs -->
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-pulse-glow">
            </div>
            <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl animate-pulse-glow"
                style="animation-delay: 1s;"></div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="lg:grid lg:grid-cols-12 lg:gap-12">
                <!-- Sidebar Navigation -->
                <aside class="hidden lg:block lg:col-span-3">
                    <nav class="sticky top-32 space-y-2">
                        <div
                            class="text-xs font-mono text-primary-500 uppercase tracking-widest mb-4 px-3 rtl:text-right">
                            {{ t('geo_pages.common.resources_label') }}
                        </div>
                        <NuxtLink v-for="item in geoNav" :key="item.path" :to="localePath(item.path)"
                            class="group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 border border-transparent"
                            :class="[
                                route.path.endsWith(item.path)
                                    ? 'bg-primary-500/10 text-primary-400 border-primary-500/20 shadow-[0_0_20px_rgba(132,204,22,0.1)]'
                                    : 'text-neutral-500 hover:text-white hover:bg-white/5'
                            ]">
                            <span class="w-1.5 h-1.5 rounded-full me-3 transition-colors"
                                :class="route.path.endsWith(item.path) ? 'bg-primary-500' : 'bg-neutral-800 group-hover:bg-neutral-600'"></span>
                            {{ item.name }}
                        </NuxtLink>
                    </nav>
                </aside>

                <!-- Main Content -->
                <main class="lg:col-span-9">
                    <div
                        class="bg-neutral-950/40 backdrop-blur-sm border border-neutral-800/50 rounded-3xl p-8 md:p-12 shadow-2xl">
                        <div class="prose prose-invert prose-primary max-w-none">
                            <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 hero-title">
                                {{ title }}
                            </h1>
                            <p v-if="subtitle" class="text-xl text-neutral-400 mb-12 lead">
                                {{ subtitle }}
                            </p>

                            <div class="mt-8">
                                <slot />
                            </div>
                        </div>

                        <!-- Mobile Navigation -->
                        <div class="mt-16 pt-8 border-t border-neutral-900 lg:hidden text-left">
                            <h2 class="text-lg font-semibold text-white mb-4">{{
                                t('geo_pages.common.explore_guides_label') }}
                            </h2>
                            <div class="grid grid-cols-1 gap-2">
                                <NuxtLink v-for="item in geoNav" :key="item.path" :to="localePath(item.path)"
                                    class="block px-4 py-4 rounded-xl border border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:text-white hover:bg-neutral-800 transition-all">
                                    {{ item.name }}
                                </NuxtLink>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<style scoped>
.prose :deep(h2) {
    @apply text-2xl font-bold text-white mt-12 mb-6 border-s-4 border-primary-500 ps-4 bg-primary-500/5 py-2 rtl:text-right;
}

.prose :deep(p) {
    @apply text-neutral-400 leading-relaxed mb-6 text-lg rtl:text-right;
}

.prose :deep(ul) {
    @apply space-y-4 mb-8 list-none p-0;
}

.prose :deep(li) {
    @apply flex items-start text-neutral-400 text-lg;
}

.prose :deep(li)::before {
    content: "→";
    @apply text-primary-500 me-3 font-bold flex-shrink-0 rtl:rotate-180;
}

.prose :deep(ol) {
    @apply space-y-6 mb-8 list-none p-0;
}

.prose :deep(ol li) {
    @apply flex items-start text-neutral-300 text-lg bg-white/5 p-4 rounded-2xl border border-white/5;
}

.prose :deep(ol li)::before {
    content: none;
}

.prose :deep(blockquote) {
    @apply ps-6 border-s-4 border-primary-500 italic text-neutral-300 bg-primary-500/5 py-6 pe-6 rounded-e-2xl mb-12 text-xl rtl:text-right;
}

.lead {
    @apply text-neutral-300 border-b border-neutral-800 pb-8 mb-12;
}
</style>
