<template>
    <div class="bg-neutral-50 dark:bg-neutral-950 min-h-screen overflow-hidden">
        <!-- ── Hero ──────────────────────────────────────────── -->
        <section class="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
            <div class="absolute top-0 right-0 w-[60%] h-[60%] bg-primary-500/5 rounded-full blur-[160px] pointer-events-none" />
            <div class="absolute bottom-0 left-0 w-[40%] h-[40%] bg-accent-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

            <div class="container mx-auto px-4 max-w-7xl relative z-10">
                <div class="grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[10px] font-bold tracking-[0.2em] mb-10 uppercase">
                            <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                            {{ t('api_docs.hero_badge') }}
                        </div>
                        <h1 class="text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-8 leading-[1.1]">
                            {{ t('api_docs.hero_title_1') }} <span class="text-primary-400">{{ t('api_docs.hero_title_2') }}</span>
                        </h1>
                        <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-lg mb-10 leading-relaxed font-medium">
                            {{ t('api_docs.hero_subtitle') }}
                        </p>

                        <div class="flex flex-wrap gap-4">
                            <div class="px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm flex items-center gap-3">
                                <HugeiconsIcon :icon="Settings01Icon" :size="20" class="text-neutral-400" />
                                <span class="text-sm font-bold text-neutral-800 dark:text-neutral-200">REST / HTTPS</span>
                            </div>
                            <div class="px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm flex items-center gap-3">
                                <HugeiconsIcon :icon="LockKeyIcon" :size="20" class="text-neutral-400" />
                                <span class="text-sm font-bold text-neutral-800 dark:text-neutral-200">x-api-key</span>
                            </div>
                            <div class="px-5 py-3 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm flex items-center gap-3">
                                <HugeiconsIcon :icon="Notification02Icon" :size="20" class="text-neutral-400" />
                                <span class="text-sm font-bold text-neutral-800 dark:text-neutral-200">Webhooks</span>
                            </div>
                        </div>
                    </div>

                    <!-- Code Preview Panel with language tabs -->
                    <div data-reveal class="relative group" style="--delay:200ms">
                        <div class="absolute -inset-0.5 bg-gradient-to-br from-primary-500/20 to-accent-cyan-500/20 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000" />
                        <div class="relative bg-neutral-900 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                            <div class="flex items-center gap-1 px-3 pt-3 bg-white/5 border-b border-white/10 overflow-x-auto">
                                <button
                                    v-for="tab in codeTabs"
                                    :key="tab.id"
                                    type="button"
                                    class="px-3 py-2 text-[11px] font-bold uppercase tracking-wide rounded-t-lg whitespace-nowrap transition-colors"
                                    :class="activeTab === tab.id
                                        ? 'bg-neutral-900 text-primary-400 border-t border-x border-white/10'
                                        : 'text-white/40 hover:text-white/70'"
                                    @click="activeTab = tab.id"
                                >
                                    {{ tab.label }}
                                </button>
                            </div>
                            <div class="p-6 leading-relaxed text-neutral-400 overflow-x-auto whitespace-pre font-mono text-[12px] md:text-[13px] min-h-[340px]" v-html="activeTabHtml" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── Authentication ───────────────────────────────── -->
        <section class="py-16 md:py-20 border-y border-neutral-200 dark:border-neutral-900">
            <div class="container mx-auto px-4 max-w-5xl">
                <div class="flex items-start gap-5">
                    <div class="w-12 h-12 shrink-0 rounded-2xl bg-primary-500/10 flex items-center justify-center">
                        <HugeiconsIcon :icon="LockKeyIcon" :size="24" class="text-primary-400" />
                    </div>
                    <div>
                        <h2 class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-3">{{ t('api_docs.auth_title') }}</h2>
                        <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">{{ t('api_docs.auth_desc') }}</p>
                        <div class="mt-5 rounded-xl bg-neutral-900 border border-white/10 p-4 font-mono text-[12px] text-neutral-300 overflow-x-auto">
                            <span class="text-neutral-500"># {{ t('api_docs.sdk_install') === 'Install' ? 'Sandbox' : 'Sandbox' }}</span><br>
                            curl -H <span class="text-secondary-400">"x-api-key: sandbox_live_xxx"</span> https://api.protegey.com/partner-api/transactions/tx-00234
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── Modules ───────────────────────────────────────── -->
        <section class="py-16 md:py-24">
            <div class="container mx-auto px-4 max-w-7xl">
                <div class="max-w-2xl mb-14">
                    <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">{{ t('api_docs.modules_title') }}</h2>
                    <p class="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">{{ t('api_docs.modules_subtitle') }}</p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div
                        v-for="(mod, i) in modules"
                        :key="mod.key"
                        data-reveal
                        class="p-7 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-primary-500/40 transition-colors"
                        :style="`--delay:${(i % 3) * 100}ms`"
                    >
                        <div class="flex items-center justify-between mb-5">
                            <div class="w-11 h-11 rounded-xl bg-primary-500/10 flex items-center justify-center">
                                <HugeiconsIcon :icon="mod.icon" :size="22" class="text-primary-400" />
                            </div>
                            <code class="text-[10px] font-bold text-neutral-400 dark:text-neutral-600">{{ mod.path }}</code>
                        </div>
                        <h3 class="text-base font-bold text-neutral-900 dark:text-white mb-2">{{ t(mod.titleKey) }}</h3>
                        <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">{{ t(mod.descKey) }}</p>
                        <div class="flex flex-wrap gap-1.5">
                            <span v-for="verb in mod.verbs" :key="verb" class="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-[10px] font-bold text-neutral-500 dark:text-neutral-400 font-mono">
                                {{ verb }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── SDKs ──────────────────────────────────────────── -->
        <section class="py-16 md:py-24 bg-white/50 dark:bg-neutral-900/20 border-y border-neutral-200 dark:border-neutral-900">
            <div class="container mx-auto px-4 max-w-7xl">
                <div class="max-w-2xl mb-14">
                    <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">{{ t('api_docs.sdks_title') }}</h2>
                    <p class="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">{{ t('api_docs.sdks_subtitle') }}</p>
                </div>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <a
                        v-for="sdk in sdks"
                        :key="sdk.name"
                        :href="sdk.repo"
                        target="_blank"
                        rel="noopener"
                        data-reveal
                        class="group p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 hover:border-secondary-500/40 transition-colors flex flex-col"
                    >
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-sm font-bold text-neutral-900 dark:text-white">{{ sdk.platform }}</span>
                            <HugeiconsIcon :icon="Link01Icon" :size="16" class="text-neutral-400 group-hover:text-secondary-400 transition-colors" />
                        </div>
                        <code class="text-[11px] text-secondary-500 dark:text-secondary-400 font-mono mb-3 break-all">{{ sdk.package }}</code>
                        <div class="mt-auto rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 font-mono text-[11px] text-neutral-400 overflow-x-auto">
                            {{ sdk.install }}
                        </div>
                        <p v-if="!sdk.published" class="text-[11px] text-neutral-400 dark:text-neutral-500 mt-3 italic">{{ t('api_docs.sdk_not_published') }}</p>
                    </a>
                </div>
            </div>
        </section>

        <!-- ── CTA ───────────────────────────────────────────── -->
        <section class="py-16 md:py-24 px-4">
            <div class="container mx-auto max-w-4xl text-center">
                <div data-reveal class="p-10 md:p-14 rounded-[2rem] border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-primary-500/5 to-secondary-500/5">
                    <h2 class="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white mb-4">{{ t('api_docs.cta_title') }}</h2>
                    <p class="text-base text-neutral-600 dark:text-neutral-400 mb-10 max-w-xl mx-auto">{{ t('api_docs.cta_subtitle') }}</p>
                    <NuxtLink :to="localePath('/contact')"
                        class="inline-flex px-8 py-4 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold hover:scale-[1.03] transition-all">
                        {{ t('api_docs.cta_button') }}
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
    Settings01Icon, LockKeyIcon, Notification02Icon, MoneySend01Icon,
    FingerPrintIcon, Building01Icon, DashboardSquare01Icon, SmartPhone01Icon,
    Activity01Icon, Shield01Icon, Link01Icon
} from '@hugeicons/core-free-icons'

const { t } = useI18n()
const localePath = useLocalePath()
const baseUrl = 'https://www.protegey.com'

usePageMeta({
    title: t('seo.api_docs.title'),
    description: t('seo.api_docs.description'),
    schemaOrg: [
        {
            '@type': 'TechArticle',
            name: t('seo.api_docs.title'),
            description: t('seo.api_docs.description'),
            author: { '@type': 'Organization', name: 'Protegey' },
            articleSection: 'API Documentation',
        },
        {
            '@type': 'BreadcrumbList',
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('nav.home'), item: baseUrl },
                { '@type': 'ListItem', position: 2, name: t('footer.links.api_docs'), item: `${baseUrl}/api-docs` }
            ]
        }
    ]
})

// ── Modules — every entry below is a real, callable route; nothing here describes HOW a
// decision is computed internally, only what a partner can call and what it's for. ──
const modules = [
    { key: 'transactions', icon: MoneySend01Icon, path: '/partner-api/transactions', titleKey: 'api_docs.module_transactions_title', descKey: 'api_docs.module_transactions_desc', verbs: ['POST', 'GET'] },
    { key: 'kyc', icon: FingerPrintIcon, path: '/partner-api/kyc', titleKey: 'api_docs.module_kyc_title', descKey: 'api_docs.module_kyc_desc', verbs: ['POST', 'GET', 'PATCH'] },
    { key: 'kyb', icon: Building01Icon, path: '/partner-api/kyb', titleKey: 'api_docs.module_kyb_title', descKey: 'api_docs.module_kyb_desc', verbs: ['POST', 'GET'] },
    { key: 'rules', icon: DashboardSquare01Icon, path: '/partner-api/alert-rules', titleKey: 'api_docs.module_rules_title', descKey: 'api_docs.module_rules_desc', verbs: ['GET', 'PATCH', 'DELETE', 'POST'] },
    { key: 'device', icon: SmartPhone01Icon, path: '/partner-api/device-events', titleKey: 'api_docs.module_device_title', descKey: 'api_docs.module_device_desc', verbs: ['POST'] },
    { key: 'behavioral', icon: Activity01Icon, path: '/partner-api/behavioral-events', titleKey: 'api_docs.module_behavioral_title', descKey: 'api_docs.module_behavioral_desc', verbs: ['POST'] },
    { key: 'sanctions', icon: Shield01Icon, path: '/partner-api/sanctions', titleKey: 'api_docs.module_sanctions_title', descKey: 'api_docs.module_sanctions_desc', verbs: ['POST'] },
    { key: 'webhooks', icon: Notification02Icon, path: 'outbound', titleKey: 'api_docs.module_webhooks_title', descKey: 'api_docs.module_webhooks_desc', verbs: ['PUSH'] },
]

// ── SDKs — real package names/paths, matching each SDK's own README. ──
const sdks = [
    { platform: 'JavaScript / TypeScript', package: '@protegey/sdk', install: 'npm install git+https://github.com/protegey/protegey_js_sdk.git', repo: 'https://github.com/protegey/protegey_js_sdk', published: false },
    { platform: 'React Native', package: '@protegey/react-native-sdk', install: 'npm install git+https://github.com/protegey/protegey_react_native_sdk.git', repo: 'https://github.com/protegey/protegey_react_native_sdk', published: false },
    { platform: 'PHP', package: 'protegey/sdk', install: 'composer require protegey/sdk', repo: 'https://github.com/protegey/protegey_php_sdk', published: false },
    { platform: 'Java', package: 'com.protegey:protegey-sdk', install: "implementation 'com.protegey:protegey-sdk:0.5.0'", repo: 'https://github.com/protegey/protegey_java_sdk', published: false },
    { platform: 'Flutter / Dart', package: 'protegey_sdk', install: 'flutter pub add protegey_sdk', repo: 'https://github.com/protegey/protegey-sdk-flutter', published: false },
    { platform: '.NET', package: 'Protegey.Sdk', install: 'dotnet add package Protegey.Sdk', repo: 'https://github.com/protegey/protegey_dotnet_sdk', published: false },
]

// ── Code tabs — real DTO field names, matching CreateTransactionDto (protegey-backend). ──
const codeTabs = [
    { id: 'curl', label: 'cURL' },
    { id: 'js', label: 'JS / TS' },
    { id: 'php', label: 'PHP' },
]
const activeTab = ref('curl')

const snippets = {
    curl: `<span class="text-neutral-500"># Submit a transaction</span>
curl -X POST https://api.protegey.com/partner-api/transactions \\
  -H <span class="text-secondary-400">"x-api-key: YOUR_API_KEY"</span> \\
  -H <span class="text-secondary-400">"Content-Type: application/json"</span> \\
  -d <span class="text-secondary-400">'{
    "externalTransactionId": "tx-00234",
    "externalCustomerId": "cust-9981",
    "direction": "DEBIT",
    "amount": 250000,
    "currency": "XOF",
    "transactionType": "cashout"
  }'</span>

<span class="text-neutral-500"># Check its status later</span>
curl https://api.protegey.com/partner-api/transactions/tx-00234 \\
  -H <span class="text-secondary-400">"x-api-key: YOUR_API_KEY"</span>`,
    js: `<span class="text-primary-400">import</span> { Protegey } <span class="text-primary-400">from</span> <span class="text-secondary-400">"@protegey/sdk"</span>;

<span class="text-primary-400">const</span> protegey = <span class="text-primary-400">new</span> <span class="text-white">Protegey</span>({ apiKey: <span class="text-secondary-400">"YOUR_API_KEY"</span>, baseUrl: <span class="text-secondary-400">"https://api.protegey.com"</span> });

<span class="text-neutral-500">// Submit a transaction</span>
<span class="text-primary-400">const</span> result = <span class="text-primary-400">await</span> protegey.transactions.<span class="text-white">report</span>({
  externalTransactionId: <span class="text-secondary-400">"tx-00234"</span>,
  externalCustomerId: <span class="text-secondary-400">"cust-9981"</span>,
  direction: <span class="text-secondary-400">"DEBIT"</span>,
  amount: <span class="text-accent-cyan-400">250000</span>,
  currency: <span class="text-secondary-400">"XOF"</span>,
  transactionType: <span class="text-secondary-400">"cashout"</span>,
});

<span class="text-neutral-500">// result.decision / result.riskScore / result.alerts</span>`,
    php: `<span class="text-primary-400">use</span> Protegey\\Sdk\\Protegey;

$protegey = <span class="text-primary-400">new</span> <span class="text-white">Protegey</span>(<span class="text-secondary-400">'YOUR_API_KEY'</span>, <span class="text-secondary-400">'https://api.protegey.com'</span>);

<span class="text-neutral-500">// Submit a transaction</span>
$result = $protegey->transactions->report([
    <span class="text-secondary-400">'externalTransactionId'</span> => <span class="text-secondary-400">'tx-00234'</span>,
    <span class="text-secondary-400">'externalCustomerId'</span> => <span class="text-secondary-400">'cust-9981'</span>,
    <span class="text-secondary-400">'direction'</span> => <span class="text-secondary-400">'DEBIT'</span>,
    <span class="text-secondary-400">'amount'</span> => <span class="text-accent-cyan-400">250000</span>,
    <span class="text-secondary-400">'currency'</span> => <span class="text-secondary-400">'XOF'</span>,
    <span class="text-secondary-400">'transactionType'</span> => <span class="text-secondary-400">'cashout'</span>,
]);`,
}

const activeTabHtml = computed(() => snippets[activeTab.value])
</script>

<style scoped>
h1 span {
    text-shadow: 0 0 30px rgba(74, 222, 128, 0.2);
}

[data-reveal] {
    animation: fade-in-up 0.8s ease-out both;
}

@keyframes fade-in-up {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
