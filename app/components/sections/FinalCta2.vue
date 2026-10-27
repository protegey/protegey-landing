<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const localePath = useLocalePath();

onMounted(() => {
    gsap.from('.final-cta-reveal', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#final-cta', start: 'top 80%' },
    });
});
</script>

<template>
    <section id="final-cta" class="relative bg-neutral-900 dark:bg-neutral-950 py-24 md:py-28">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-2xl mx-auto text-center">
                <h2 class="final-cta-reveal text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight leading-tight">
                    {{ $t('final_cta2.title') }}
                </h2>
                <p class="final-cta-reveal text-lg text-neutral-400 leading-relaxed mb-9">
                    {{ $t('final_cta2.subtitle') }}
                </p>
                <div class="final-cta-reveal flex flex-col sm:flex-row gap-4 justify-center">
                    <NuxtLink :to="localePath('/#waitlist')"
                        class="bg-primary-500 hover:bg-primary-400 text-white px-6 py-3 rounded-lg font-bold text-base transition-colors">
                        {{ $t('final_cta2.cta_primary') }}
                    </NuxtLink>
                    <NuxtLink :to="localePath('/expert')"
                        class="border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white px-6 py-3 rounded-lg font-bold text-base transition-colors">
                        {{ $t('final_cta2.cta_secondary') }}
                    </NuxtLink>
                </div>
            </div>
        </div>
    </section>
</template>
