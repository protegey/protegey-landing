<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';

const heroRef = ref(null);

onMounted(() => {
    // Immediate state set to ensure visibility if JS hangs

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
                    {{ $t('products.hero.title_start') }} <span class="text-primary-500">{{
                        $t('products.hero.title_highlight') }}</span>
                </h1>
                <p class="text-xl md:text-2xl text-neutral-500 dark:text-neutral-400 leading-relaxed rtl:text-center">
                    {{ $t('products.hero.subtitle') }}
                </p>

                <!-- Suite Overview -->
                <!-- <div
                    class="max-w-3xl mx-auto mb-16 p-8 rounded-[2rem] bg-neutral-900/40 border border-neutral-800/50 backdrop-blur-md">
                    <p class="text-lg text-neutral-300 leading-relaxed italic">
                        "{{ $t('products.subtitle') }}"
                    </p>
                </div> -->

                <!-- Adoption Path -->
                <!-- <div
                    class="inline-flex flex-col md:flex-row items-center gap-4 p-4 md:p-2 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm mb-12 overflow-hidden max-w-full">
                    <div class="px-6 py-2 rounded-full bg-primary-500 text-white text-sm font-bold whitespace-nowrap">
                        ADOPTION PATH
                    </div>
                    <p class="px-4 text-sm text-neutral-400 font-medium">
                        {{ $t('products.adoption_path') }}
                    </p>
                </div> -->
            </div>
        </div>

        <!-- Background accents -->
        <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-primary-500/10 via-transparent to-transparent pointer-events-none">
        </div>
    </section>
</template>
