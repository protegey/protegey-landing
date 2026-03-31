<template>
    <div class="bg-neutral-50 dark:bg-neutral-950 min-h-screen overflow-hidden">
        <!-- ── Hero ──────────────────────────────────────────── -->
        <section class="relative pt-20 pb-10 md:pt-28 md:pb-16 overflow-hidden">
            <!-- Grid background -->
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
            
            <!-- Technical Glows -->
            <div class="absolute top-0 right-0 w-[60%] h-[60%] bg-primary-500/5 rounded-full blur-[160px] pointer-events-none" />
            <div class="absolute bottom-0 left-0 w-[40%] h-[40%] bg-accent-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div class="container mx-auto px-4 max-w-7xl relative z-10">
                <div class="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">
                            <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                            Developer Hub v1.0
                        </div>
                        <h1 class="text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 leading-[1.1]">
                            Built for <span class="text-primary-400">Builders</span>.
                        </h1>
                        <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-lg mb-8 leading-relaxed font-medium">
                            Integrate Africa's most advanced fraud intelligence infrastructure with just a few lines of code. Flexible gRPC, REST, and mobile SDKs.
                        </p>
                        
                        <div class="flex flex-wrap gap-4">
                            <div class="px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm flex items-center gap-3">
                                <HugeiconsIcon :icon="Settings01Icon" :size="20" class="text-neutral-400" />
                                <span class="text-sm font-bold text-neutral-800 dark:text-neutral-200">REST API</span>
                            </div>
                            <div class="px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm flex items-center gap-3">
                                <HugeiconsIcon :icon="DashboardSquare01Icon" :size="20" class="text-neutral-400" />
                                <span class="text-sm font-bold text-neutral-800 dark:text-neutral-200">gRPC</span>
                            </div>
                        </div>
                    </div>

                    <!-- Code Preview Panel -->
                    <div data-reveal class="relative group" style="--delay:200ms">
                        <div class="absolute -inset-0.5 bg-gradient-to-br from-primary-500/20 to-accent-cyan-500/20 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000" />
                        <div class="relative bg-neutral-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden font-mono text-[12px] md:text-[13px]">
                            <!-- Terminal Header -->
                            <div class="flex items-center justify-between px-6 py-4 bg-white/5 border-b border-white/10">
                                <div class="flex gap-2">
                                    <div class="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div class="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div class="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div class="text-white/40 text-[10px] uppercase font-bold tracking-widest">protect_transaction.py</div>
                            </div>
                            <!-- Code Content -->
                            <div class="p-6 leading-relaxed text-neutral-400 overflow-x-auto whitespace-pre">
<span class="text-primary-400">import</span> protegey <span class="text-primary-400">as</span> ptg

client = ptg.<span class="text-white">Client</span>(<span class="text-secondary-400">'YOUR_API_KEY'</span>)

<span class="text-neutral-500"># Submit signal for real-time scoring</span>
response = client.<span class="text-white">score_transaction</span>({
    <span class="text-secondary-400">'amount'</span>: <span class="text-accent-cyan-400">450000.00</span>,
    <span class="text-secondary-400">'currency'</span>: <span class="text-secondary-400">'XOF'</span>,
    <span class="text-secondary-400">'entity_id'</span>: <span class="text-secondary-400">'usr_772A1B'</span>,
    <span class="text-secondary-400">'behavioral_flags'</span>: [<span class="text-secondary-400">'SIM_SWAP_RISK'</span>]
})

<span class="text-primary-400">if</span> response.score <span class="text-white">></span> <span class="text-accent-cyan-400">0.85</span>:
    <span class="text-white">block_action</span>(response.reason_codes)</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── Features ──────────────────────────────────────── -->
        <section class="py-16 md:py-24 bg-white/50 dark:bg-neutral-900/20 border-y border-neutral-200 dark:border-neutral-900">
            <div class="container mx-auto px-4 max-w-7xl">
                <div class="grid md:grid-cols-3 gap-8">
                    <div data-reveal class="space-y-4">
                        <div class="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center mb-6">
                            <HugeiconsIcon :icon="Activity01Icon" :size="24" class="text-primary-400" />
                        </div>
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-white">Low Latency</h3>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                            Under 100ms response time globally. Engineered for the speed of modern payments.
                        </p>
                    </div>
                    <div data-reveal class="space-y-4" style="--delay:100ms">
                        <div class="w-12 h-12 rounded-2xl bg-secondary-500/10 flex items-center justify-center mb-6">
                            <HugeiconsIcon :icon="Shield01Icon" :size="24" class="text-secondary-400" />
                        </div>
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-white">Explainable AI</h3>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                            Every risk score comes with structured reason codes. No black-box decisions.
                        </p>
                    </div>
                    <div data-reveal class="space-y-4" style="--delay:200ms">
                        <div class="w-12 h-12 rounded-2xl bg-accent-cyan-500/10 flex items-center justify-center mb-6">
                            <HugeiconsIcon :icon="Settings01Icon" :size="24" class="text-accent-cyan-400" />
                        </div>
                        <h3 class="text-lg font-bold text-neutral-900 dark:text-white">Multilingual Errors</h3>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                            Structured error object with localized messages in English, French, and Arabic.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── Status / Coming Soon ─────────────────────────── -->
        <section class="py-16 md:py-24 px-4">
            <div class="container mx-auto max-w-4xl text-center">
                <div data-reveal class="p-10 md:p-12 rounded-[2rem] border-2 border-dashed border-neutral-300 dark:border-neutral-800 bg-neutral-100/30 dark:bg-neutral-900/30 relative">
                    <div class="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full border border-primary-500/30 bg-primary-500 text-neutral-950 font-bold text-sm tracking-widest uppercase">
                        COMING Q2 2026
                    </div>
                    <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-6">
                        {{ $t('api_docs.coming_soon') }}
                    </h2>
                    <p class="text-base text-neutral-600 dark:text-neutral-400 mb-10 max-w-xl mx-auto">
                        {{ $t('api_docs.intro') }}
                    </p>
                    <NuxtLink :to="localePath('/contact')" 
                        class="px-8 py-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold hover:scale-[1.03] transition-all">
                        Request Early API Access
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
    Activity01Icon, Shield01Icon, Settings01Icon, 
    DashboardSquare01Icon, CodeIcon, BookOpen01Icon
} from '@hugeicons/core-free-icons'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const { t } = useI18n()
const localePath = useLocalePath()

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Fade-in animations
    const reveals = gsap.utils.toArray('[data-reveal]')
    reveals.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            delay: el.dataset.delay ? parseFloat(el.dataset.delay) / 1000 : 0
        })
    })

    // Animation for hero content
    gsap.from('h1, p', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    })
})

useSeoMeta({
    title: t('seo.api_docs.title'),
    ogTitle: t('seo.api_docs.title'),
    description: t('seo.api_docs.description')
})
</script>

<style scoped>
/* Technical styling */
h1 span {
    text-shadow: 0 0 30px rgba(74, 222, 128, 0.2);
}
</style>
