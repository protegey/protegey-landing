<script setup>
import { ref, onMounted, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
    ArrowRight01Icon,
    Clock01Icon,
    Calendar03Icon,
    SecurityIcon,
    FingerPrintIcon,
    JusticeScale01Icon,
    GlobalIcon,
    Settings01Icon,
} from '@hugeicons/core-free-icons'

gsap.registerPlugin(ScrollTrigger)

const { t, locale } = useI18n()
const localePath = useLocalePath()

const CATEGORY_MAP = {
    'Fraud Intelligence': 'fraud_intelligence',
    'Identity & Onboarding': 'identity_onboarding',
    'Risk & Compliance': 'risk_compliance',
    'Financial Services in Africa': 'financial_services_africa',
    'Product & Technology': 'product_technology',
}

const topicCards = [
    { key: 'fraud_intelligence', icon: SecurityIcon, accent: 'primary' },
    { key: 'identity_onboarding', icon: FingerPrintIcon, accent: 'secondary' },
    { key: 'risk_compliance', icon: JusticeScale01Icon, accent: 'cyan' },
    { key: 'financial_services_africa', icon: GlobalIcon, accent: 'orange' },
    { key: 'product_technology', icon: Settings01Icon, accent: 'primary' },
]

const accentClasses = {
    primary: 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
    secondary: 'bg-secondary-500/10 text-secondary-600 dark:text-secondary-400',
    cyan: 'bg-accent-cyan-500/10 text-accent-cyan-600 dark:text-accent-cyan-400',
    orange: 'bg-accent-orange-500/10 text-accent-orange-600 dark:text-accent-orange-400',
}

const featured = ref(null)
const posts = ref([])
const isLoading = ref(true)
const activeCategory = ref(null)

async function loadPosts() {
    isLoading.value = true
    try {
        const [featuredRes, postsRes] = await Promise.all([
            $fetch('/api/blog/featured'),
            $fetch('/api/blog/posts', { params: activeCategory.value ? { category: activeCategory.value } : {} }),
        ])
        featured.value = featuredRes.post
        posts.value = (postsRes.posts || []).filter((p) => !featured.value || p.id !== featured.value.id)
    } catch {
        featured.value = null
        posts.value = []
    } finally {
        isLoading.value = false
    }
}

function selectCategory(category) {
    activeCategory.value = activeCategory.value === category ? null : category
    loadPosts()
}

function formatDate(dateStr) {
    if (!dateStr) return ''
    return new Intl.DateTimeFormat(locale.value, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr))
}

onMounted(() => {
    loadPosts()
    gsap.from('.blog-reveal', {
        opacity: 0, y: 20, duration: 0.7, stagger: 0.08, ease: 'power3.out',
    })
})

usePageMeta({
    title: t('blog.seo.title'),
    description: t('blog.seo.description'),
})
</script>

<template>
    <div class="relative min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <!-- Hero -->
        <section class="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent"></div>
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div class="max-w-3xl mx-auto text-center">
                    <div class="blog-reveal text-xs font-bold tracking-widest uppercase text-primary-600 dark:text-primary-400 mb-5">
                        {{ $t('blog.hero.eyebrow') }}
                    </div>
                    <h1 class="blog-reveal text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6 tracking-tight leading-tight">
                        {{ $t('blog.hero.title') }}
                    </h1>
                    <p class="blog-reveal text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                        {{ $t('blog.hero.subtitle') }}
                    </p>
                    <p class="blog-reveal text-base text-neutral-500 dark:text-neutral-400 leading-relaxed mb-9">
                        {{ $t('blog.hero.description') }}
                    </p>
                    <div class="blog-reveal flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#latest-articles"
                            class="bg-primary-500 hover:bg-primary-400 text-white px-6 py-3 rounded-lg font-bold text-base transition-colors">
                            {{ $t('blog.hero.cta_primary') }}
                        </a>
                        <NuxtLink :to="localePath('/')"
                            class="border border-neutral-300 dark:border-neutral-700 hover:border-primary-500/50 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-6 py-3 rounded-lg font-bold text-base transition-colors bg-white dark:bg-neutral-900/50">
                            {{ $t('blog.hero.cta_secondary') }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Article -->
        <section v-if="featured" class="relative py-8 pb-20">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-6xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-xl grid md:grid-cols-2">
                    <div class="relative h-64 md:h-auto bg-gradient-to-br from-primary-500/15 to-secondary-500/15">
                        <img v-if="featured.hasCover" :src="`/api/blog/cover/${featured.id}`" :alt="featured.title"
                            class="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div class="p-8 md:p-10 flex flex-col justify-center">
                        <div class="flex items-center gap-3 mb-4">
                            <span class="inline-flex items-center px-3 py-1 rounded-full bg-primary-500 text-white text-xs font-bold uppercase tracking-wide">
                                {{ $t('blog.featured.label') }}
                            </span>
                            <span v-if="featured.category" class="text-xs font-bold uppercase tracking-wide text-neutral-400">
                                {{ $t(`blog.topics.categories.${CATEGORY_MAP[featured.category]}.title`) }}
                            </span>
                        </div>
                        <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
                            {{ featured.title }}
                        </h2>
                        <p class="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-6">
                            {{ featured.excerpt }}
                        </p>
                        <div class="flex items-center gap-4 text-xs text-neutral-400 mb-6">
                            <span class="flex items-center gap-1.5"><HugeiconsIcon :icon="Calendar03Icon" :size="14" />{{ formatDate(featured.publishedDate) }}</span>
                            <span class="flex items-center gap-1.5"><HugeiconsIcon :icon="Clock01Icon" :size="14" />{{ $t('blog.min_read', { n: featured.readingTime }) }}</span>
                        </div>
                        <NuxtLink :to="localePath(`/blog/${featured.slug}`)"
                            class="inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400 hover:gap-3 transition-all w-fit">
                            {{ $t('blog.featured.read_article') }}
                            <HugeiconsIcon :icon="ArrowRight01Icon" :size="16" class="rtl:rotate-180" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- Browse by Topic -->
        <section class="relative py-16 md:py-20 bg-white dark:bg-neutral-900">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-3xl mx-auto text-center mb-12">
                    <div class="text-xs font-bold tracking-widest uppercase text-primary-600 dark:text-primary-400 mb-4">
                        {{ $t('blog.topics.eyebrow') }}
                    </div>
                    <h2 class="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
                        {{ $t('blog.topics.title') }}
                    </h2>
                </div>
                <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
                    <button v-for="card in topicCards" :key="card.key" type="button"
                        @click="selectCategory(Object.keys(CATEGORY_MAP).find((k) => CATEGORY_MAP[k] === card.key))"
                        class="text-left rtl:text-right bg-neutral-50 dark:bg-neutral-950 border rounded-2xl p-6 transition-colors"
                        :class="activeCategory === Object.keys(CATEGORY_MAP).find((k) => CATEGORY_MAP[k] === card.key) ? 'border-primary-500' : 'border-neutral-200 dark:border-neutral-800 hover:border-primary-500/40'">
                        <div class="w-10 h-10 rounded-xl flex items-center justify-center mb-4" :class="accentClasses[card.accent]">
                            <HugeiconsIcon :icon="card.icon" :size="20" />
                        </div>
                        <h3 class="font-bold text-neutral-900 dark:text-white text-sm mb-2">
                            {{ $t(`blog.topics.categories.${card.key}.title`) }}
                        </h3>
                        <p class="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                            {{ $t(`blog.topics.categories.${card.key}.description`) }}
                        </p>
                    </button>
                </div>
            </div>
        </section>

        <!-- Latest Articles -->
        <section id="latest-articles" class="relative py-20 md:py-24">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-3xl mx-auto text-center mb-12">
                    <div class="text-xs font-bold tracking-widest uppercase text-primary-600 dark:text-primary-400 mb-4">
                        {{ $t('blog.latest.eyebrow') }}
                    </div>
                    <h2 class="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
                        {{ $t('blog.latest.title') }}
                    </h2>
                </div>

                <div v-if="!isLoading && posts.length === 0 && !featured" class="max-w-xl mx-auto text-center">
                    <p class="text-neutral-500 dark:text-neutral-400 leading-relaxed">
                        {{ $t('blog.latest.empty_state') }}
                    </p>
                </div>

                <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <NuxtLink v-for="post in posts" :key="post.id" :to="localePath(`/blog/${post.slug}`)"
                        class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden hover:border-primary-500/40 transition-colors group">
                        <div class="h-44 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 overflow-hidden">
                            <img v-if="post.hasCover" :src="`/api/blog/cover/${post.id}`" :alt="post.title"
                                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        </div>
                        <div class="p-5">
                            <span v-if="post.category" class="text-xs font-bold uppercase tracking-wide text-primary-600 dark:text-primary-400">
                                {{ $t(`blog.topics.categories.${CATEGORY_MAP[post.category]}.title`) }}
                            </span>
                            <h3 class="font-bold text-neutral-900 dark:text-white text-base mt-2 mb-2 leading-snug">
                                {{ post.title }}
                            </h3>
                            <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4 line-clamp-2">
                                {{ post.excerpt }}
                            </p>
                            <div class="flex items-center gap-3 text-xs text-neutral-400">
                                <span>{{ formatDate(post.publishedDate) }}</span>
                                <span>·</span>
                                <span>{{ $t('blog.min_read', { n: post.readingTime }) }}</span>
                            </div>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- From the team -->
        <section class="relative py-20 md:py-24 bg-neutral-900 dark:bg-neutral-950">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-2xl mx-auto text-center">
                    <h2 class="text-2xl md:text-3xl font-bold text-white mb-6">
                        {{ $t('blog.team.title') }}
                    </h2>
                    <p class="text-neutral-400 leading-relaxed mb-4">{{ $t('blog.team.body_1') }}</p>
                    <p class="text-neutral-400 leading-relaxed">{{ $t('blog.team.body_2') }}</p>
                </div>
            </div>
        </section>

        <!-- Closing CTA -->
        <section class="relative py-20 md:py-24">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-2xl mx-auto text-center">
                    <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                        {{ $t('blog.closing.title') }}
                    </h2>
                    <p class="text-neutral-500 dark:text-neutral-400 leading-relaxed mb-8">
                        {{ $t('blog.closing.subtitle') }}
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <NuxtLink :to="localePath('/solutions')"
                            class="border border-neutral-300 dark:border-neutral-700 hover:border-primary-500/50 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-6 py-3 rounded-lg font-bold text-base transition-colors bg-white dark:bg-neutral-900/50">
                            {{ $t('blog.closing.cta_primary') }}
                        </NuxtLink>
                        <NuxtLink :to="localePath('/#waitlist')"
                            class="bg-primary-500 hover:bg-primary-400 text-white px-6 py-3 rounded-lg font-bold text-base transition-colors">
                            {{ $t('blog.closing.cta_secondary') }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
