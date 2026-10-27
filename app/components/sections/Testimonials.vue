<script setup>
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const { tm, rt } = useI18n();

const people = [
    { key: 't1', initials: 'AD', bg: 'bg-primary-500' },
    { key: 't2', initials: 'KM', bg: 'bg-secondary-500' },
    { key: 't3', initials: 'FB', bg: 'bg-accent-cyan-500' },
    { key: 't4', initials: 'CO', bg: 'bg-accent-orange-500' },
];

onMounted(() => {
    gsap.from('.testimonial-card', {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.testimonials-grid', start: 'top 80%' },
    });
});
</script>

<template>
    <section id="testimonials" class="relative bg-neutral-50 dark:bg-neutral-950 py-24 md:py-32">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto text-center mb-14">
                <div class="text-xs font-bold tracking-widest uppercase text-primary-600 dark:text-primary-400 mb-5">
                    {{ $t('testimonials.eyebrow') }}
                </div>
                <h2 class="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white tracking-tight leading-tight">
                    {{ $t('testimonials.title') }}
                </h2>
            </div>

            <div class="testimonials-grid grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
                <div v-for="person in people" :key="person.key"
                    class="testimonial-card bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-7 flex flex-col">
                    <p class="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed mb-6 flex-1">
                        "{{ $t(`testimonials.people.${person.key}.quote`) }}"
                    </p>
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            :class="person.bg">
                            {{ person.initials }}
                        </div>
                        <div class="min-w-0">
                            <div class="text-sm font-bold text-neutral-900 dark:text-white">
                                {{ $t(`testimonials.people.${person.key}.name`) }}
                            </div>
                            <div class="text-xs text-neutral-500 dark:text-neutral-400">
                                {{ $t(`testimonials.people.${person.key}.role`) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
