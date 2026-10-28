<script setup>
import { ref, onMounted } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowLeft01Icon, Clock01Icon, Calendar03Icon } from '@hugeicons/core-free-icons'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const CATEGORY_MAP = {
    'Fraud Intelligence': 'fraud_intelligence',
    'Identity & Onboarding': 'identity_onboarding',
    'Risk & Compliance': 'risk_compliance',
    'Financial Services in Africa': 'financial_services_africa',
    'Product & Technology': 'product_technology',
}

const post = ref(null)
const notFound = ref(false)

function formatDate(dateStr) {
    if (!dateStr) return ''
    return new Intl.DateTimeFormat(locale.value, { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr))
}

onMounted(async () => {
    try {
        const res = await $fetch(`/api/blog/article/${route.params.slug}`)
        post.value = res.post
    } catch {
        notFound.value = true
    }
})

usePageMeta({
    title: () => post.value ? `${post.value.title} | ${t('blog.seo.title')}` : t('blog.seo.title'),
    description: () => post.value?.excerpt || t('blog.seo.description'),
})
</script>

<template>
    <div class="relative min-h-screen bg-neutral-50 dark:bg-neutral-950">
        <div v-if="notFound" class="container mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24 text-center">
            <p class="text-neutral-500 dark:text-neutral-400 mb-6">{{ $t('blog.latest.empty_state') }}</p>
            <NuxtLink :to="localePath('/blog')" class="inline-flex items-center gap-2 text-sm font-bold text-primary-600 dark:text-primary-400">
                <HugeiconsIcon :icon="ArrowLeft01Icon" :size="16" class="rtl:rotate-180" />
                {{ $t('blog.back_to_blog') }}
            </NuxtLink>
        </div>

        <article v-else-if="post" class="pt-32 pb-24 md:pt-40">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="max-w-3xl mx-auto">
                    <NuxtLink :to="localePath('/blog')"
                        class="inline-flex items-center gap-2 text-sm font-bold text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors">
                        <HugeiconsIcon :icon="ArrowLeft01Icon" :size="16" class="rtl:rotate-180" />
                        {{ $t('blog.back_to_blog') }}
                    </NuxtLink>

                    <span v-if="post.category" class="inline-block text-xs font-bold uppercase tracking-wide text-primary-600 dark:text-primary-400 mb-4">
                        {{ $t(`blog.topics.categories.${CATEGORY_MAP[post.category]}.title`) }}
                    </span>

                    <h1 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight tracking-tight">
                        {{ post.title }}
                    </h1>

                    <div class="flex items-center gap-4 text-sm text-neutral-400 mb-10 pb-10 border-b border-neutral-200 dark:border-neutral-800">
                        <span class="flex items-center gap-1.5"><HugeiconsIcon :icon="Calendar03Icon" :size="14" />{{ formatDate(post.publishedDate) }}</span>
                        <span class="flex items-center gap-1.5"><HugeiconsIcon :icon="Clock01Icon" :size="14" />{{ $t('blog.min_read', { n: post.readingTime }) }}</span>
                    </div>

                    <div v-if="post.hasCover" class="rounded-2xl overflow-hidden mb-10 bg-neutral-100 dark:bg-neutral-900">
                        <img :src="`/api/blog/cover/${post.id}`" :alt="post.title" class="w-full h-auto object-cover" />
                    </div>

                    <div class="blog-prose text-neutral-700 dark:text-neutral-300 leading-relaxed" v-html="post.contentHtml" />
                </div>
            </div>
        </article>
    </div>
</template>

<style scoped>
.blog-prose :deep(h2) {
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: inherit;
}
.blog-prose :deep(h3) {
    font-size: 1.25rem;
    font-weight: 700;
    margin-top: 1.75rem;
    margin-bottom: 0.75rem;
}
.blog-prose :deep(h4) {
    font-size: 1.1rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
}
.blog-prose :deep(p) {
    margin-bottom: 1.25rem;
}
.blog-prose :deep(ul),
.blog-prose :deep(ol) {
    margin-bottom: 1.25rem;
    padding-inline-start: 1.5rem;
}
.blog-prose :deep(ul) {
    list-style-type: disc;
}
.blog-prose :deep(ol) {
    list-style-type: decimal;
}
.blog-prose :deep(li) {
    margin-bottom: 0.5rem;
}
.blog-prose :deep(blockquote) {
    border-inline-start: 3px solid theme('colors.primary.500');
    padding-inline-start: 1rem;
    font-style: italic;
    margin: 1.5rem 0;
}
.blog-prose :deep(img) {
    border-radius: 1rem;
    margin: 1.5rem 0;
}
.blog-prose :deep(hr) {
    margin: 2rem 0;
    border-color: theme('colors.neutral.200');
}
.blog-prose :deep(a) {
    color: theme('colors.primary.600');
    text-decoration: underline;
}
.blog-prose :deep(code) {
    background: theme('colors.neutral.100');
    padding: 0.15rem 0.4rem;
    border-radius: 0.3rem;
    font-size: 0.9em;
}
.blog-prose :deep(pre) {
    background: theme('colors.neutral.900');
    color: theme('colors.neutral.100');
    padding: 1rem;
    border-radius: 0.75rem;
    overflow-x: auto;
    margin-bottom: 1.25rem;
}
.blog-prose :deep(pre code) {
    background: none;
    padding: 0;
}
</style>
