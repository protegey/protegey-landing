<template>
    <section id="waitlist" ref="ctaSection" class="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 overflow-hidden">
        <!-- Subtle grid pattern -->
        <div class="absolute inset-0 opacity-10">
            <div class="absolute inset-0" style="background-image: linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px); background-size: 50px 50px;"></div>
        </div>

        <div class="max-w-4xl mx-auto relative z-10">
            <div class="text-center mb-12 fade-up">
                <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                    Experience the future of
                </h2>
                <h3 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                    <span class="text-lime-400">business finance</span>
                    <span class="text-white"> today</span>
                </h3>
                <p class="text-xl text-white/80 max-w-2xl mx-auto">
                    Be among the first to experience Africa's next generation fraud detection platform
                </p>
            </div>

            <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-12 fade-up delay-200">
                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold mb-2 text-gray-700">Full Name</label>
                            <input v-model="formData.name" type="text" required placeholder="John Doe"
                                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50" />
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-2 text-gray-700">Email Address</label>
                            <input v-model="formData.email" type="email" required placeholder="john@company.com"
                                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50" />
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold mb-2 text-gray-700">Company Name</label>
                            <input v-model="formData.company" type="text" required placeholder="Your Company"
                                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50" />
                        </div>
                        <div>
                            <label class="block text-sm font-semibold mb-2 text-gray-700">Your Role</label>
                            <select v-model="formData.role" required
                                class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50">
                                <option value="" disabled>Select your role</option>
                                <option value="ceo">CEO / Founder</option>
                                <option value="cto">CTO / Tech Lead</option>
                                <option value="product">Product Manager</option>
                                <option value="risk">Risk / Compliance</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold mb-2 text-gray-700">Interest Type</label>
                        <select v-model="formData.interestType" required
                            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50">
                            <option value="" disabled>Select interest</option>
                            <option v-for="option in interestOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold mb-2 text-gray-700">Message / Notes (Optional)</label>
                        <textarea v-model="formData.message" rows="4" placeholder="Tell us a little about what you're interested in..."
                            class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-gray-50"></textarea>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 pt-4">
                        <button type="submit" :disabled="isSubmitting"
                            :class="['flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg', 
                                    isSubmitting ? 'opacity-60 cursor-not-allowed bg-gray-400' : 'bg-blue-600 hover:bg-blue-700 text-white']">
                            <span>{{ isSubmitting ? 'Submitting...' : 'Get Started' }}</span>
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>

                    <div v-if="submitMessage" class="text-center text-green-600 font-medium mt-4 bg-green-50 py-3 px-4 rounded-lg">
                        {{ submitMessage }}
                    </div>

                    <div v-if="submitError" class="text-center text-red-600 font-medium mt-4 bg-red-50 py-3 px-4 rounded-lg">
                        {{ submitError }}
                    </div>

                    <p class="text-center text-sm text-gray-600 mt-6">
                        We respect your privacy. No spam — ever.
                    </p>
                </form>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({ isDark: Boolean })

const formData = ref({
    name: '',
    email: '',
    company: '',
    role: '',
    interestType: '',
    message: ''
})

const ctaSection = ref(null)

const interestOptions = [
    { value: 'early_access', label: 'Early Access' },
    { value: 'integration', label: 'Integration / API' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'security_review', label: 'Security / Compliance' },
    { value: 'other', label: 'Other' }
]

defineEmits(['scrollToJoin'])

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitError = ref('')

const handleSubmit = async () => {
    // Reset messages
    submitMessage.value = ''
    submitError.value = ''

    // Basic validation: ensure name + email present and interest selected for waitlist
    if (!formData.value.name || !formData.value.email) {
        submitError.value = 'Please provide your name and email to continue'
        return
    }

    if (!formData.value.interestType) {
        submitError.value = 'Please let us know what you are interested in'
        return
    }

    isSubmitting.value = true

    try {
        // Minimal API post to /api/waitlist — server should accept interest/message fields
    const payload = { ...formData.value }
        const res = await fetch('/api/waitlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (!res.ok) throw new Error(await res.text())

    const interestLabel = interestOptions.find(o => o.value === formData.value.interestType)?.label || formData.value.interestType || 'Request'
    submitMessage.value = `${interestLabel} request submitted for ${formData.value.email} (interest: ${formData.value.interestType || 'N/A'})`
        formData.value = { name: '', email: '', company: '', role: '', interestType: '', message: '' }
    } catch (err) {
        console.error('Failed to submit form', err)
        submitError.value = 'There was an error submitting your request. Please try again.'
    } finally {
        isSubmitting.value = false
    }
}

onMounted(() => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in')
            }
        })
    }, observerOptions)

    if (ctaSection.value) {
        const fadeElements = ctaSection.value.querySelectorAll('.fade-up')
        fadeElements.forEach(el => observer.observe(el))

        // Fallback: force animation after a short delay to ensure visibility
        setTimeout(() => {
            fadeElements.forEach(el => {
                if (!el.classList.contains('animate-in')) {
                    el.classList.add('animate-in')
                }
            })
        }, 300)
    }
})
</script>

<style scoped>
.fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-up.animate-in {
    opacity: 1;
    transform: translateY(0);
}

.fade-up.delay-200 {
    transition-delay: 0.2s;
}
</style>