<script setup>
import { computed } from 'vue';

// The original list of company data
const companiesLogo = [
    { name: "Framer", logo: "https://saasly.prebuiltui.com/assets/companies-logo/framer.svg" },
    { name: "Huawei", logo: "https://saasly.prebuiltui.com/assets/companies-logo/huawei.svg" },
];

// Create a computed property that duplicates the list. 
// This is essential for the seamless, infinite scrolling animation.
const marqueeItems = computed(() => {
    return [...companiesLogo, ...companiesLogo];
});
</script>

<template>
    <section id="trustedby" class="py-12 bg-neutral-950 w-full border-t border-neutral-900">
        <!-- Title Text -->
        <div class="text-center mb-12 md:mb-16 lg:mb-20">
            <div class="text-neutral-500 font-bold mb-3 uppercase tracking-wider text-sm">
                Trusted by Industry Leaders
            </div>
        </div>
        <div class="overflow-hidden w-full relative max-w-5xl mx-auto select-none mb-20">

            <!-- Left Gradient Mask (Fades the logos in) -->
            <div
                class="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-neutral-950 to-transparent" />

            <!-- Marquee Content Wrapper -->
            <!-- The 'marquee-inner' class applies the scrolling CSS animation -->
            <div class="flex marquee-inner will-change-transform">
                <div v-for="(company, index) in marqueeItems" :key="index"
                    class="mx-11 h-8 md:h-10 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
                    <img :src="company.logo" :alt="company.name" class="h-full w-auto object-contain invert" />
                </div>
            </div>

            <!-- Right Gradient Mask (Fades the logos out) -->
            <div
                class="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-neutral-950 to-transparent" />
        </div>
        <div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
            <!-- ISO 27001 Card -->
            <div
                class="rounded-2xl bg-neutral-900 border border-neutral-800 shadow-lg p-7 flex flex-col items-start hover:border-blue-500/30 transition-colors duration-300">
                <div class="flex items-center gap-3 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-blue-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 17l1.47-1.358a6.375 6.375 0 008.372-.235L21 11.61M5.147 15.006A6.375 6.375 0 0021 11.61V7a2 2 0 00-2-2H5a2 2 0 00-2 2v4.61c0 .111.003.222.008.332M9.25 17a5.25 5.25 0 105.5 0" />
                    </svg>
                    <span class="font-semibold text-md text-blue-400">ISO 27001 Compliance</span>
                </div>
                <div class="text-neutral-400">
                    Our Information Security Management System (ISMS) is ISO 27001 compliant, guaranteeing rigorous
                    management of your data security.
                </div>
            </div>
            <!-- SOC2 Card -->
            <div
                class="rounded-2xl bg-neutral-900 border border-neutral-800 shadow-lg p-7 flex flex-col items-start hover:border-lime-500/30 transition-colors duration-300">
                <div class="flex items-center gap-3 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-lime-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17 9V7a5 5 0 00-10 0v2m12 4v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6m16 0a2 2 0 01-2 2m-4 0v2a2 2 0 11-4 0v-2" />
                    </svg>
                    <span class="font-semibold text-md text-lime-400">SOC 2 Type II Compliance</span>
                </div>
                <div class="text-neutral-400">
                    PROTEGEY complies with SOC 2 Type II requirements, demonstrating our effective controls regarding
                    security, availability, processing integrity, confidentiality, and privacy.
                </div>
            </div>
        </div>
    </section>
</template>

<style>
/* This CSS is placed here (outside the 'scoped' attribute) to ensure 
the @keyframes animation is globally available and works correctly.
*/

.marquee-inner {
    /* 15s speed, linear timing, infinite loop */
    animation: marqueeScroll 15s linear infinite;
}

@keyframes marqueeScroll {
    0% {
        /* Start position */
        transform: translateX(0%);
    }

    100% {
        /* Scroll exactly half the content width (moving the first set off screen) */
        transform: translateX(-50%);
    }
}
</style>