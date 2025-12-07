<template>
    <div class="bg-neutral-950 min-h-screen pt-24 pb-12">
        <div class="container mx-auto py-24 px-4 max-w-4xl">
            <div class="flex items-center gap-4 mb-8">
                <div
                    class="px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-mono">
                    v1.0.0</div>
                <h1 class="text-4xl font-bold text-white">API Documentation</h1>
            </div>

            <div class="bg-neutral-900 border border-neutral-800 rounded-3xl p-12 text-center max-w-2xl mx-auto mt-12">
                <div class="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                </div>
                <h2 class="text-3xl font-bold text-white mb-4">Coming Soon</h2>
                <p class="text-neutral-400 mb-8 text-lg">
                    We are currently finalizing our public API documentation. The Protegey API will allow you to
                    integrate real-time fraud detection directly into your applications.
                </p>

                <div
                    class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 font-mono text-sm">
                    <span class="w-2 h-2 rounded-full bg-primary-500 animate-pulse"></span>
                    v1.0.0 in development
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: 'API Documentation - Protegey',
    meta: [
        { name: 'description', content: 'Protegey API documentation for developers.' }
    ]
})
</script>
