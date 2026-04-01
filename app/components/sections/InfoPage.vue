<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()

defineProps<{
    title: string
    subtitle?: string
}>()

const route = useRoute()

const geoNav = [
    { name: t('geo_pages.what_is_protegey.title'), path: '/what-is-protegey' },
    { name: t('geo_pages.who_its_for.title'), path: '/who-its-for' },
    { name: t('geo_pages.comparisons.title'), path: '/comparisons' },
    { name: t('geo_pages.trust.title'), path: '/trust' }
]

const localePath = useLocalePath()

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Fade-in animations for sidebar and main content
    gsap.from('.aside-nav', {
        x: -20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    })

    gsap.from('.main-content', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4
    })
})
</script>

<template>
    <div class="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 pt-28 pb-20 md:pt-36 overflow-hidden">
        <!-- Technical Background Grid -->
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:64px_64px]"></div>
            
            <!-- Strategic Animated Glows -->
            <div class="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen animate-pulse" />
            <div class="absolute bottom-[20%] right-[-5%] w-[35%] h-[35%] bg-secondary-500/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="lg:grid lg:grid-cols-12 lg:gap-12">
                <!-- Sidebar Navigation -->
                <aside class="hidden lg:block lg:col-span-3 aside-nav">
                    <nav class="sticky top-32 space-y-2">
                        <div
                            class="text-xs font-mono text-primary-500 uppercase tracking-widest mb-4 px-3 rtl:text-right">
                            {{ t('geo_pages.common.resources_label') }}
                        </div>
                        <NuxtLink v-for="item in geoNav" :key="item.path" :to="localePath(item.path)"
                            class="group flex items-center px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 border border-transparent"
                            :class="[
                                route.path.endsWith(item.path)
                                    ? 'bg-primary-500/10 text-primary-400 border-primary-500/20 shadow-[0_0_20px_rgba(12,185,158,0.1)]'
                                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                            ]">
                            <span class="w-1.5 h-1.5 rounded-full me-3 transition-colors"
                                :class="route.path.endsWith(item.path) ? 'bg-primary-500' : 'bg-neutral-300 dark:bg-neutral-600 group-hover:bg-neutral-400 dark:group-hover:bg-neutral-400'"></span>
                            {{ item.name }}
                        </NuxtLink>
                    </nav>
                </aside>

                <!-- Main Content -->
                <main class="lg:col-span-9 main-content">
                    <div
                        class="bg-white/80 dark:bg-neutral-900/60 backdrop-blur-3xl border border-neutral-200 dark:border-white/10 rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-black/5 dark:shadow-black/40 relative overflow-hidden">
                        
                        <!-- Top Accent Line -->
                        <div class="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-500/0 via-primary-500/40 to-primary-500/0" />

                        <div class="prose prose-invert prose-primary max-w-none relative z-10">
                            <h1 class="text-3xl md:text-4xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-6 leading-[1.1] hero-title">
                                {{ title }}
                            </h1>
                            <p v-if="subtitle" class="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-10 font-medium leading-relaxed lead">
                                {{ subtitle }}
                            </p>

                            <div class="mt-8">
                                <slot />
                            </div>
                        </div>

                        <!-- Mobile Navigation -->
                        <div class="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 lg:hidden text-left">
                            <h2 class="text-lg font-semibold text-neutral-900 dark:text-white mb-4">{{
                                t('geo_pages.common.explore_guides_label') }}
                            </h2>
                            <div class="grid grid-cols-1 gap-2">
                                <NuxtLink v-for="item in geoNav" :key="item.path" :to="localePath(item.path)"
                                    class="block px-4 py-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all">
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
    @apply text-xl font-bold text-neutral-900 dark:text-white mt-12 mb-6 tracking-tight rtl:text-right;
}

.prose :deep(p) {
    @apply text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 text-sm md:text-base font-medium rtl:text-right;
}

.prose :deep(ul) {
    @apply space-y-5 mb-10 list-none p-0;
}

.prose :deep(li) {
    @apply flex items-start text-neutral-600 dark:text-neutral-400 text-sm md:text-base font-medium;
}

.prose :deep(li)::before {
    content: "→";
    @apply text-primary-400 me-3 font-bold flex-shrink-0 rtl:rotate-180;
}

.prose :deep(ol) {
    @apply space-y-6 mb-10 list-none p-0;
}

.prose :deep(ol li) {
    @apply flex items-start text-neutral-900 dark:text-neutral-200 text-sm md:text-base font-bold bg-neutral-100/50 dark:bg-white/5 p-4 md:p-6 rounded-2xl border border-neutral-200/50 dark:border-white/10 shadow-sm transition-all hover:bg-neutral-100 dark:hover:bg-white/10;
}

.prose :deep(ol li)::before {
    content: none;
}

.prose :deep(blockquote) {
    @apply ps-6 border-s-4 border-primary-500 italic text-neutral-900 dark:text-white bg-primary-500/5 dark:bg-primary-500/10 py-6 pe-6 rounded-e-2xl mb-10 text-lg md:text-xl font-light leading-relaxed rtl:text-right;
}

.lead {
    @apply text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-white/10 pb-10 mb-12;
}

.hero-title {
    background: linear-gradient(135deg, #0B1741 0%, #0cb99e 40%, #1b59ae 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}

:global(.dark) .hero-title {
    background: linear-gradient(135deg, #ffffff 20%, #0cb99e 60%, #1b59ae 100%);
}
</style>
