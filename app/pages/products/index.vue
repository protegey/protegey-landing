<script setup>
import ProductHero from '~/components/products/ProductHero.vue'
import Products from '~/components/sections/Products.vue'
import ProductCTA from '~/components/products/ProductCTA.vue'

useHead({
    title: 'Protegey - Products Hub',
    meta: [
        { name: 'description', content: 'Explore Protegey\'s suite of specialized fraud detection and network intelligence products.' }
    ]
})
</script>

<template>
    <div class="relative min-h-screen bg-neutral-950">
        <ProductHero />
        <Products />
        <ProductCTA />
    </div>
</template>
