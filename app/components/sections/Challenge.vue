<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
    gsap.from('.challenge-reveal', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '#challenge', start: 'top 75%' },
    });
});
</script>

<template>
    <section id="challenge" class="relative bg-neutral-50 dark:bg-neutral-950 py-24 md:py-32">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center">
                <div class="challenge-reveal text-xs font-bold tracking-widest uppercase text-primary-600 dark:text-primary-400 mb-5">
                    {{ $t('challenge2.eyebrow') }}
                </div>
                <h2 class="challenge-reveal text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-8 tracking-tight leading-tight">
                    {{ $t('challenge2.title') }}
                </h2>
                <p class="challenge-reveal text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                    {{ $t('challenge2.body_1') }}
                </p>
                <blockquote class="challenge-reveal border-l-4 border-primary-500 bg-primary-500/5 dark:bg-primary-500/10 rounded-r-xl px-6 py-5 text-left rtl:text-right rtl:border-l-0 rtl:border-r-4 mb-8">
                    <p class="text-lg font-semibold text-neutral-800 dark:text-neutral-200 leading-relaxed">
                        "{{ $t('challenge2.quote') }}"
                    </p>
                </blockquote>
                <p class="challenge-reveal text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {{ $t('challenge2.body_2') }}
                </p>
            </div>
        </div>
    </section>
</template>
