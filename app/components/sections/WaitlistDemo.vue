<template>
    <section ref="ctaSection" class="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div :class="[isDark ? 'opacity-20' : 'opacity-10', 'absolute inset-0']">
            <div
                :class="[isDark ? 'bg-lime-500' : 'bg-lime-300', 'absolute top-0 right-0 w-96 h-96 rounded-full filter blur-3xl']">
            </div>
            <div
                :class="[isDark ? 'bg-purple-500' : 'bg-purple-300', 'absolute bottom-0 left-0 w-96 h-96 rounded-full filter blur-3xl']">
            </div>
        </div>

        <div class="max-w-4xl mx-auto relative z-10">
            <div class="text-center mb-12 fade-up">
                <h2
                    :class="[isDark ? 'text-4xl md:text-6xl font-bold mb-6' : 'text-4xl md:text-6xl font-bold mb-6 text-slate-900']">
                    Join Protegey</h2>
                <p :class="[isDark ? 'text-xl text-slate-300' : 'text-xl text-slate-700']">
                    Be among the first to experience Africa's next generation fraud detection platform
                </p>
            </div>

            <div
                :class="[isDark ? 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700' : 'bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300', 'p-8 md:p-12 rounded-3xl border backdrop-blur-sm fade-up delay-200']">
                <form @submit.prevent="handleSubmit" class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label
                                :class="[isDark ? 'text-slate-300' : 'text-slate-700', 'block text-sm font-semibold mb-2']">Full
                                Name</label>
                            <input v-model="formData.name" type="text" required placeholder="John Doe"
                                :class="[isDark ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-500 focus:border-lime-400 focus:ring-lime-400/20' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-lime-500 focus:ring-lime-500/20', 'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all']" />
                        </div>
                        <div>
                            <label
                                :class="[isDark ? 'text-slate-300' : 'text-slate-700', 'block text-sm font-semibold mb-2']">Email
                                Address</label>
                            <input v-model="formData.email" type="email" required placeholder="john@company.com"
                                :class="[isDark ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-500 focus:border-lime-400 focus:ring-lime-400/20' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-lime-500 focus:ring-lime-500/20', 'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all']" />
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label
                                :class="[isDark ? 'text-slate-300' : 'text-slate-700', 'block text-sm font-semibold mb-2']">Company
                                Name</label>
                            <input v-model="formData.company" type="text" required placeholder="Your Company"
                                :class="[isDark ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-500 focus:border-lime-400 focus:ring-lime-400/20' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-lime-500 focus:ring-lime-500/20', 'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all']" />
                        </div>
                        <div>
                            <label
                                :class="[isDark ? 'text-slate-300' : 'text-slate-700', 'block text-sm font-semibold mb-2']">Your
                                Role</label>
                            <select v-model="formData.role" required
                                :class="[isDark ? 'bg-slate-900/50 border-slate-700 text-white focus:border-lime-400 focus:ring-lime-400/20' : 'bg-white border-slate-300 text-slate-900 focus:border-lime-500 focus:ring-lime-500/20', 'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all']">
                                <option value="" disabled>Select your role</option>
                                <option value="ceo">CEO / Founder</option>
                                <option value="cto">CTO / Tech Lead</option>
                                <option value="product">Product Manager</option>
                                <option value="risk">Risk / Compliance</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label
                                :class="[isDark ? 'text-slate-300' : 'text-slate-700', 'block text-sm font-semibold mb-2']">Interest
                                Type</label>
                            <select v-model="formData.interestType" required
                                :class="[isDark ? 'bg-slate-900/50 border-slate-700 text-white focus:border-lime-400 focus:ring-lime-400/20' : 'bg-white border-slate-300 text-slate-900 focus:border-lime-500 focus:ring-lime-500/20', 'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all']">
                                <option value="" disabled>Select interest</option>
                                <option v-for="option in interestOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
                            </select>
                        </div>
                        <div>
                            <label
                                :class="[isDark ? 'text-slate-300' : 'text-slate-700', 'block text-sm font-semibold mb-2']">Message
                                / Notes</label>
                            <textarea v-model="formData.message" rows="4" placeholder="Tell us a little about what you're interested in (optional)"
                                :class="[isDark ? 'bg-slate-900/50 border-slate-700 text-white placeholder-slate-500 focus:border-lime-400 focus:ring-lime-400/20' : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-lime-500 focus:ring-lime-500/20', 'w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all']"></textarea>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row gap-4 pt-4">
                        <button type="submit" :disabled="isSubmitting"
                            aria-busy="isSubmitting"
                            :class="[isDark ? 'bg-lime-400 text-slate-950 hover:bg-lime-300' : 'bg-lime-500 text-white hover:bg-lime-600', 'flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2', isSubmitting ? 'opacity-60 cursor-not-allowed' : '']">
                            <span>{{ isSubmitting ? 'Submitting...' : 'Submit' }}</span>
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                    <div v-if="submitMessage" class="text-center text-green-300 font-medium mt-4">
                        {{ submitMessage }}
                    </div>

                    <div v-if="submitError" class="text-center text-red-300 font-medium mt-4">
                        {{ submitError }}
                    </div>

                    <p class="text-center text-sm opacity-75 mt-6">
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