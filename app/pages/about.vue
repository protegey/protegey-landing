<template>
    <div class="bg-neutral-950 min-h-screen pt-24 pb-12">
        <div class="container mx-auto px-4 max-w-4xl">
            <h1 class="text-4xl md:text-5xl font-bold text-white mb-8">About Protegey</h1>

            <div class="prose prose-invert max-w-none">
                <p class="text-xl text-neutral-400 mb-8">
                    Protegey is Africa's first shared early-warning network for fraud intelligence. We are building the
                    digital infrastructure to secure the continent's financial future.
                </p>

                <div class="grid md:grid-cols-2 gap-8 my-12">
                    <div class="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
                        <h3 class="text-2xl font-bold text-white mb-4">Our Mission</h3>
                        <p class="text-neutral-400">
                            To eliminate fraud as a barrier to digital commerce in Africa by creating a unified,
                            real-time intelligence network.
                        </p>
                    </div>
                    <div class="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
                        <h3 class="text-2xl font-bold text-white mb-4">Our Vision</h3>
                        <p class="text-neutral-400">
                            A trusted digital ecosystem where businesses can grow without fear of financial loss from
                            fraud.
                        </p>
                    </div>
                </div>

                <h2 class="text-3xl font-bold text-white mt-12 mb-6">Why We Exist</h2>
                <p class="text-neutral-400 mb-6">
                    Fraud in Africa is not just a nuisance; it's an existential threat to the digital economy. Siloed
                    data means fraudsters can attack one institution and move to the next without detection. Protegey
                    changes that.
                </p>
                <p class="text-neutral-400">
                    By aggregating signals from fintechs, banks, telcos, and merchants, we create a "herd immunity"
                    effect. When one member detects a threat, everyone is protected.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: 'About Us - Protegey',
    meta: [
        { name: 'description', content: 'Learn about Protegey\'s mission to secure Africa\'s digital economy through shared fraud intelligence.' }
    ]
})
</script>
