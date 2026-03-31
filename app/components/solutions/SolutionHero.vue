<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const heroRef = ref(null);

onMounted(() => {
    if (heroRef.value) {
        gsap.fromTo(heroRef.value,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out'
            }
        );
    }
});
</script>

<template>
    <section ref="heroRef" class="relative pt-32 pb-0 md:pt-48 md:pb-0 overflow-visible">
        <div class="container mx-auto px-4 relative z-10">
            <div class="max-w-4xl mx-auto text-center rtl:text-center">
                <h1 class="text-5xl md:text-7xl font-bold text-neutral-900 dark:text-white mb-8 tracking-tight rtl:text-center">
                    {{ $t('solutions.hero.title_start') }} <span class="text-primary-500">{{
                        $t('solutions.hero.title_highlight') }}</span>
                </h1>
                <p class="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 leading-relaxed rtl:text-center">
                    {{ $t('solutions.hero.subtitle') }}
                </p>
            </div>
        </div>

        <!-- Background accents -->
        <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-primary-500/10 via-transparent to-transparent pointer-events-none">
        </div>
    </section>
</template>
