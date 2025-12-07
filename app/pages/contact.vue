<template>
    <div class="bg-neutral-950 min-h-screen pt-24 pb-12">
        <div class="container mx-auto py-24 px-4 max-w-4xl">

            <div class="grid md:grid-cols-2 gap-12">
                <div>
                    <h1 class="text-4xl md:text-5xl font-bold text-white mb-8">{{ $t('contact.title') }}</h1>
                    <p class="text-xl text-neutral-400 mb-8">
                        {{ $t('contact.subtitle') }}
                    </p>

                    <div class="space-y-6">
                        <div class="flex items-start gap-4">
                            <div
                                class="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center shrink-0">
                                <svg class="w-5 h-5 text-primary-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-white font-semibold mb-1">{{ $t('contact.email') }}</h3>
                                <a href="mailto:hello@protegey.com"
                                    class="text-neutral-400 hover:text-primary-400 transition-colors">hello@protegey.com</a>
                            </div>
                        </div>

                        <div class="flex items-start gap-4">
                            <div
                                class="w-10 h-10 rounded-lg bg-secondary-500/10 flex items-center justify-center shrink-0">
                                <svg class="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-white font-semibold mb-1">{{ $t('contact.location') }}</h3>
                                <p class="text-neutral-400">Middletown, Delaware</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl">
                    <h3 class="text-xl font-bold text-white mb-6">{{ $t('contact.form.title') }}</h3>
                    <form class="space-y-4">
                        <div>
                            <label class="block text-sm font-medium text-neutral-400 mb-1">{{ $t('contact.form.name')
                                }}</label>
                            <input type="text"
                                class="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                                :placeholder="$t('contact.form.name_placeholder')">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-neutral-400 mb-1">{{ $t('contact.form.email')
                                }}</label>
                            <input type="email"
                                class="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors"
                                :placeholder="$t('contact.form.email_placeholder')">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-neutral-400 mb-1">{{ $t('contact.form.message')
                                }}</label>
                            <textarea rows="4"
                                class="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors resize-none"
                                :placeholder="$t('contact.form.message_placeholder')"></textarea>
                        </div>
                        <button type="submit"
                            class="w-full py-3 bg-primary-500 hover:bg-primary-400 text-neutral-950 font-bold rounded-lg transition-colors">
                            {{ $t('contact.form.submit') }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
useHead({
    title: 'Contact Us - Protegey',
    meta: [
        { name: 'description', content: 'Get in touch with the Protegey team.' }
    ]
})
</script>
