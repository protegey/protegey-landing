<template>
    <div class="bg-neutral-50 dark:bg-neutral-950 min-h-screen overflow-hidden">
        <!-- ── Hero ──────────────────────────────────────────── -->
        <section class="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808007_1px,transparent_1px),linear-gradient(to_bottom,#80808007_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
            <div class="absolute top-0 right-0 w-[60%] h-[60%] bg-primary-500/5 rounded-full blur-[160px] pointer-events-none" />

            <div class="container mx-auto px-4 max-w-5xl relative z-10 text-center">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-[10px] font-bold tracking-[0.2em] mb-8 uppercase">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                    {{ t('api_docs.hero_badge') }}
                </div>
                <h1 class="text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white mb-6 leading-[1.1]">
                    {{ t('api_docs.hero_title_1') }} <span class="text-primary-400">{{ t('api_docs.hero_title_2') }}</span>
                </h1>
                <p class="text-base md:text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed font-medium">
                    {{ t('api_docs.hero_subtitle') }}
                </p>
            </div>
        </section>

        <!-- ── Auth ──────────────────────────────────────────── -->
        <section id="auth" class="scroll-mt-28 py-10 border-y border-neutral-200 dark:border-neutral-900">
            <div class="container mx-auto px-4 max-w-5xl">
                <div class="flex items-start gap-5">
                    <div class="w-12 h-12 shrink-0 rounded-2xl bg-primary-500/10 flex items-center justify-center">
                        <HugeiconsIcon :icon="LockKeyIcon" :size="24" class="text-primary-400" />
                    </div>
                    <div class="min-w-0">
                        <h2 class="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-3">{{ t('api_docs.auth_title') }}</h2>
                        <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl">{{ t('api_docs.auth_desc') }}</p>
                        <div class="mt-5 rounded-xl bg-neutral-950 border border-white/10 p-4 font-mono text-[12px] text-neutral-300 overflow-x-auto">
                            curl -H <span class="text-emerald-400">"x-api-key: YOUR_API_KEY"</span> https://api.protegey.com/partner-api/transactions/tx-00234
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ── Body: sidebar + sections ─────────────────────── -->
        <section class="py-14 md:py-20">
            <div class="container mx-auto px-4 max-w-7xl flex gap-10">
                <nav class="sticky top-28 hidden lg:flex h-fit w-56 shrink-0 flex-col gap-1">
                    <template v-for="item in navItems" :key="item.id">
                        <div v-if="item.isGroup" class="mt-3 first:mt-0 px-3 text-[10px] font-black uppercase tracking-wider text-neutral-400 dark:text-neutral-600">
                            {{ t(item.labelKey) }}
                        </div>
                        <a v-else :href="`#${item.id}`"
                           class="rounded-lg px-3 py-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white transition-colors">
                            {{ t(item.labelKey) }}
                        </a>
                    </template>
                </nav>

                <div class="min-w-0 flex-1 flex flex-col gap-6 max-w-3xl">

                    <!-- SDKs -->
                    <DocSection id="sdks" :icon="Package01Icon" :title="t('api_docs.sdks_title')" :body="t('api_docs.sdks_subtitle')">
                        <div class="mt-4 grid sm:grid-cols-2 gap-3">
                            <a v-for="sdk in sdks" :key="sdk.name" :href="sdk.repo" target="_blank" rel="noopener"
                               class="group p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-primary-500/40 transition-colors flex flex-col">
                                <div class="flex items-center justify-between mb-2">
                                    <span class="flex items-center gap-2 text-sm font-bold text-neutral-900 dark:text-white">
                                        <HugeiconsIcon :icon="sdk.icon" :size="18" class="text-neutral-500 dark:text-neutral-400 shrink-0" />
                                        {{ sdk.platform }}
                                    </span>
                                    <HugeiconsIcon :icon="Link01Icon" :size="14" class="text-neutral-400 group-hover:text-primary-500 shrink-0" />
                                </div>
                                <code class="text-[11px] text-secondary-500 dark:text-secondary-400 font-mono mb-2 break-all">{{ sdk.package }}</code>
                                <div class="mt-auto rounded-lg bg-neutral-950 border border-white/10 px-2.5 py-1.5 font-mono text-[10.5px] text-neutral-400 overflow-x-auto">
                                    {{ sdk.install }}
                                </div>
                            </a>
                        </div>
                    </DocSection>

                    <!-- ═══ Pan-Monitor™ ═══ -->
                    <ModuleGroup id="group-pan-monitor" :title="t('api_docs.group_pan_monitor_title')" :tagline="t('api_docs.group_pan_monitor_tagline')">
                    <DocSection id="transactions" :icon="Exchange01Icon" :title="t('api_docs.transactions_title')" :body="t('api_docs.transactions_desc')">
                        <p class="mt-4 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.example_label') }}</p>
                        <CodeBlock :code="TRANSACTION_EXAMPLE" />
                        <div class="mt-4">
                            <ApiConsole method="POST" path="/partner-api/transactions" :fields="transactionFields" />
                        </div>
                        <p class="mt-6 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.transactions_status_label') }}</p>
                        <CodeBlock :code="TRANSACTION_STATUS_EXAMPLE" />
                        <p class="mt-4 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.transactions_list_label') }}</p>
                        <CodeBlock :code="TRANSACTION_LIST_EXAMPLE" />
                        <ValuesRef :label="t('api_docs.values_label')" :items="transactionValues" />
                    </DocSection>

                    <!-- Decision flow diagram -->
                    <DocSection id="decision-flow" :icon="Exchange01Icon" :title="t('api_docs.decision_flow_title')" :body="t('api_docs.decision_flow_desc')">
                        <DecisionFlowDiagram class="mt-5" />
                    </DocSection>
                    </ModuleGroup>

                    <!-- ═══ Pan-ID™ ═══ -->
                    <ModuleGroup id="group-pan-id" :title="t('api_docs.group_pan_id_title')" :tagline="t('api_docs.group_pan_id_tagline')">
                    <DocSection id="kyc" :icon="FingerPrintIcon" :title="t('api_docs.kyc_title')" :body="t('api_docs.kyc_desc')">
                        <p class="mt-4 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.example_label') }}</p>
                        <CodeBlock :code="KYC_EXAMPLE" />
                        <p class="mt-4 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.kyc_poll_label') }}</p>
                        <CodeBlock :code="KYC_POLL_EXAMPLE" />
                        <p class="mt-3 text-xs text-neutral-500 dark:text-neutral-400">{{ t('api_docs.kyc_poll_note') }}</p>
                        <p class="mt-4 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.kyc_update_label') }}</p>
                        <CodeBlock :code="KYC_UPDATE_EXAMPLE" />
                        <p class="mt-4 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.kyc_resend_label') }}</p>
                        <CodeBlock :code="KYC_RESEND_EXAMPLE" />
                        <ValuesRef :label="t('api_docs.values_label')" :items="kycValues" />
                        <div class="mt-4">
                            <p class="mb-1.5 text-xs text-amber-600 dark:text-amber-500">{{ t('api_docs.kyc_console_warning') }}</p>
                            <ApiConsole method="POST" path="/partner-api/kyc/sessions" :fields="kycFields" />
                        </div>
                    </DocSection>

                    <DocSection id="kyb" :icon="Building01Icon" :title="t('api_docs.kyb_title')" :body="t('api_docs.kyb_desc')">
                        <p class="mt-4 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.kyb_invite_label') }}</p>
                        <CodeBlock :code="KYB_INVITE_EXAMPLE" />
                        <p class="mt-4 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.kyb_list_label') }}</p>
                        <CodeBlock :code="KYB_LIST_EXAMPLE" />
                        <p class="mt-4 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.kyb_get_label') }}</p>
                        <CodeBlock :code="KYB_GET_EXAMPLE" />
                        <p class="mt-4 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.kyb_resend_label') }}</p>
                        <CodeBlock :code="KYB_RESEND_EXAMPLE" />
                        <p class="mt-4 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.kyb_screen_label') }}</p>
                        <CodeBlock :code="KYB_SCREEN_EXAMPLE" />
                        <ValuesRef :label="t('api_docs.values_label')" :items="kybValues" />
                        <p class="mt-3 text-xs text-neutral-500 dark:text-neutral-400">{{ t('api_docs.kyb_scope_note') }}</p>
                        <div class="mt-4">
                            <ApiConsole method="POST" path="/partner-api/kyb/applicants" :fields="kybFields" />
                        </div>
                    </DocSection>
                    </ModuleGroup>

                    <!-- ═══ Pan-Risk™ ═══ -->
                    <ModuleGroup id="group-pan-risk" :title="t('api_docs.group_pan_risk_title')" :tagline="t('api_docs.group_pan_risk_tagline')">
                    <DocSection id="sanctions" :icon="Shield01Icon" :title="t('api_docs.sanctions_title')" :body="t('api_docs.sanctions_desc')">
                        <p class="mt-4 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.example_label') }}</p>
                        <CodeBlock :code="SANCTIONS_EXAMPLE" />
                        <ValuesRef :label="t('api_docs.values_label')" :items="sanctionsValues" />
                        <div class="mt-4">
                            <ApiConsole method="POST" path="/partner-api/sanctions/screen" :fields="sanctionsFields" />
                        </div>
                    </DocSection>
                    </ModuleGroup>

                    <!-- ═══ Pan-Intel™ ═══ -->
                    <ModuleGroup id="group-pan-intel" :title="t('api_docs.group_pan_intel_title')" :tagline="t('api_docs.group_pan_intel_tagline')">
                    <DocSection id="device-events" :icon="SmartPhone01Icon" :title="t('api_docs.device_title')" :body="t('api_docs.device_desc')">
                        <p class="mt-4 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.example_label') }}</p>
                        <CodeBlock :code="DEVICE_EVENT_EXAMPLE" />
                        <ValuesRef :label="t('api_docs.values_label')" :items="deviceValues" />
                        <div class="mt-4">
                            <ApiConsole method="POST" path="/partner-api/device-events" :fields="deviceFields" />
                        </div>
                    </DocSection>

                    <DocSection id="behavioral-events" :icon="Activity01Icon" :title="t('api_docs.behavioral_title')" :body="t('api_docs.behavioral_desc')">
                        <p class="mt-4 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.example_label') }}</p>
                        <CodeBlock :code="BEHAVIORAL_EVENT_EXAMPLE" />
                        <p class="mt-3 text-xs text-neutral-500 dark:text-neutral-400">{{ t('api_docs.behavioral_stepup_note') }}</p>
                        <ValuesRef :label="t('api_docs.values_label')" :items="behavioralValues" />
                        <div class="mt-4">
                            <p class="mb-1.5 text-xs text-neutral-500 dark:text-neutral-400">{{ t('api_docs.behavioral_console_note') }}</p>
                            <ApiConsole method="POST" path="/partner-api/behavioral-events" :fields="behavioralFields" />
                        </div>
                    </DocSection>

                    <DocSection id="shared-signal" :icon="Share01Icon" :title="t('api_docs.shared_signal_title')" :body="t('api_docs.shared_signal_desc')">
                        <p class="mt-4 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.example_label') }}</p>
                        <CodeBlock :code="SHARED_SIGNAL_EXAMPLE" />
                        <p class="mt-3 text-xs text-neutral-500 dark:text-neutral-400">{{ t('api_docs.shared_signal_optin_note') }}</p>
                        <ValuesRef :label="t('api_docs.values_label')" :items="sharedSignalValues" />
                        <div class="mt-4">
                            <ApiConsole method="POST" path="/partner-api/shared-signal/check" :fields="sharedSignalFields" />
                        </div>
                    </DocSection>
                    </ModuleGroup>

                    <!-- Webhooks -->
                    <DocSection id="webhooks" :icon="WebhookIcon" :title="t('api_docs.webhooks_title')" :body="t('api_docs.webhooks_desc')">
                        <p class="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{{ t('api_docs.webhooks_sync_note') }}</p>

                        <p class="mt-5 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.webhooks_events_title') }}</p>
                        <div class="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                            <table class="w-full text-left text-sm">
                                <thead class="bg-neutral-100 dark:bg-neutral-900 text-neutral-500 dark:text-neutral-400">
                                    <tr>
                                        <th class="px-3 py-2 font-medium">type</th>
                                        <th class="px-3 py-2 font-medium">{{ t('api_docs.webhooks_col_trigger') }}</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-neutral-200 dark:divide-neutral-800">
                                    <tr>
                                        <td class="whitespace-nowrap px-3 py-2 font-mono text-xs text-neutral-900 dark:text-white">kyc.status_changed</td>
                                        <td class="px-3 py-2 text-xs text-neutral-500 dark:text-neutral-400">{{ t('api_docs.webhooks_kyc_trigger') }}</td>
                                    </tr>
                                    <tr>
                                        <td class="whitespace-nowrap px-3 py-2 font-mono text-xs text-neutral-900 dark:text-white">alert.created</td>
                                        <td class="px-3 py-2 text-xs text-neutral-500 dark:text-neutral-400">{{ t('api_docs.webhooks_alert_created_trigger') }}</td>
                                    </tr>
                                    <tr>
                                        <td class="whitespace-nowrap px-3 py-2 font-mono text-xs text-neutral-900 dark:text-white">alert.status_changed</td>
                                        <td class="px-3 py-2 text-xs text-neutral-500 dark:text-neutral-400">{{ t('api_docs.webhooks_alert_status_trigger') }}</td>
                                    </tr>
                                    <tr>
                                        <td class="whitespace-nowrap px-3 py-2 font-mono text-xs text-neutral-900 dark:text-white">transaction.blocked</td>
                                        <td class="px-3 py-2 text-xs text-neutral-500 dark:text-neutral-400">{{ t('api_docs.webhooks_transaction_blocked_trigger') }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">{{ t('api_docs.webhooks_more_types_note') }}</p>

                        <p class="mt-5 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.webhooks_request_shape_title') }}</p>
                        <CodeBlock :code="WEBHOOK_HEADERS_EXAMPLE" />

                        <p class="mt-5 mb-1.5 text-xs font-semibold uppercase text-neutral-400">kyc.status_changed</p>
                        <CodeBlock :code="WEBHOOK_KYC_PAYLOAD_EXAMPLE" />

                        <p class="mt-5 mb-1.5 text-xs font-semibold uppercase text-neutral-400">alert.created</p>
                        <CodeBlock :code="WEBHOOK_ALERT_CREATED_EXAMPLE" />

                        <p class="mt-5 mb-1.5 text-xs font-semibold uppercase text-neutral-400">alert.status_changed</p>
                        <CodeBlock :code="WEBHOOK_ALERT_STATUS_EXAMPLE" />

                        <p class="mt-5 mb-1.5 text-xs font-semibold uppercase text-neutral-400">transaction.blocked</p>
                        <CodeBlock :code="WEBHOOK_TRANSACTION_BLOCKED_EXAMPLE" />

                        <p class="mt-5 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.webhooks_headers_title') }}</p>
                        <div class="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
                            <table class="w-full text-left text-sm">
                                <tbody class="divide-y divide-neutral-200 dark:divide-neutral-800">
                                    <tr>
                                        <td class="whitespace-nowrap px-3 py-2 font-mono text-xs text-neutral-900 dark:text-white">X-Signature</td>
                                        <td class="px-3 py-2 text-xs text-neutral-500 dark:text-neutral-400">{{ t('api_docs.webhooks_header_signature') }}</td>
                                    </tr>
                                    <tr>
                                        <td class="whitespace-nowrap px-3 py-2 font-mono text-xs text-neutral-900 dark:text-white">X-Timestamp</td>
                                        <td class="px-3 py-2 text-xs text-neutral-500 dark:text-neutral-400">{{ t('api_docs.webhooks_header_timestamp') }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p class="mt-5 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.webhooks_verify_title') }}</p>
                        <p class="mb-1.5 text-sm text-neutral-600 dark:text-neutral-400">{{ t('api_docs.webhooks_verify_body') }}</p>
                        <CodeBlock :code="WEBHOOK_VERIFY_EXAMPLE" />

                        <p class="mt-5 mb-1.5 text-xs font-semibold uppercase text-neutral-400">{{ t('api_docs.webhooks_reliability_title') }}</p>
                        <p class="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">{{ t('api_docs.webhooks_reliability_body') }}</p>
                    </DocSection>

                    <!-- Errors -->
                    <DocSection id="errors" :icon="Alert02Icon" :title="t('api_docs.errors_title')" :body="t('api_docs.errors_desc')" />
                </div>
            </div>
        </section>

        <!-- ── CTA ───────────────────────────────────────────── -->
        <section class="py-16 md:py-24 px-4">
            <div class="container mx-auto max-w-4xl text-center">
                <div class="p-10 md:p-14 rounded-[2rem] border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-primary-500/5 to-secondary-500/5">
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
import { h } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import CodeBlock from '~/components/CodeBlock.vue'
import ApiConsole from '~/components/ApiConsole.vue'
import {
    LockKeyIcon, Package01Icon, Exchange01Icon, FingerPrintIcon, Shield01Icon,
    SmartPhone01Icon, Activity01Icon, Share01Icon, WebhookIcon, Alert02Icon, Link01Icon,
    JavaScriptIcon, ReactIcon, PhpIcon, JavaIcon, DartIcon, MicrosoftIcon,
    Building01Icon
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

// ── Section wrapper — a titled card matching the rest of the page's style. ──
const DocSection = (props, { slots }) =>
    h('section', { id: props.id, class: 'scroll-mt-28 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/40 p-6' }, [
        h('div', { class: 'flex items-center gap-2.5' }, [
            h('div', { class: 'flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-500' }, [
                h(HugeiconsIcon, { icon: props.icon, size: 18 })
            ]),
            h('p', { class: 'text-base font-bold text-neutral-900 dark:text-white' }, props.title)
        ]),
        h('p', { class: 'mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400' }, props.body),
        slots.default ? slots.default() : null
    ])
DocSection.props = ['id', 'icon', 'title', 'body']

// ── Module group banner — groups endpoint sections the same way the dashboard's own sidebar
// groups its pages (Pan-ID / Pan-Monitor / Pan-Risk / Pan-Intel), so this reference reads the
// same way the product itself is organized, not by an arbitrary technical taxonomy. ──
const ModuleGroup = (props, { slots }) =>
    h('div', { id: props.id, class: 'flex flex-col gap-6 scroll-mt-28' }, [
        h('div', { class: 'flex items-center gap-3 pt-4' }, [
            h('div', { class: 'h-px flex-1 bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-neutral-200 dark:to-neutral-800' }),
            h('div', { class: 'flex items-center gap-2 px-1' }, [
                h('span', { class: 'text-sm font-black tracking-tight text-neutral-900 dark:text-white' }, props.title),
            ]),
            h('div', { class: 'h-px flex-1 bg-gradient-to-l from-transparent via-neutral-200 dark:via-neutral-800 to-neutral-200 dark:to-neutral-800' }),
        ]),
        h('p', { class: 'text-center text-xs text-neutral-500 dark:text-neutral-400 -mt-4' }, props.tagline),
        ...(slots.default ? slots.default() : []),
    ])
ModuleGroup.props = ['id', 'title', 'tagline']

// ── Enum/status reference box — field: value1 | value2 | value3. Field names and enum tokens are
// API vocabulary, language-agnostic; only the box's own label is translated. ──
const ValuesRef = (props) =>
    h('div', { class: 'mt-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 p-3.5' }, [
        h('p', { class: 'text-[10px] font-bold uppercase tracking-wide text-neutral-400 mb-2' }, props.label),
        h('dl', { class: 'flex flex-col gap-1.5' },
            props.items.map((item) =>
                h('div', { key: item.field, class: 'flex flex-wrap items-baseline gap-x-2 text-xs' }, [
                    h('dt', { class: 'font-mono font-bold text-neutral-700 dark:text-neutral-300' }, `${item.field}:`),
                    h('dd', { class: 'font-mono text-neutral-500 dark:text-neutral-400' }, item.values.join(' | ')),
                ])
            )
        ),
    ])
ValuesRef.props = ['label', 'items']

// ── Decision-flow diagram — the two delivery channels (sync HTTP response vs async webhook),
// not the internal scoring logic: what a partner's own backend needs to build around, nothing
// about how a verdict is computed. Plain inline SVG, currentColor so it follows the page theme. ──
const DecisionFlowDiagram = () => {
    const laneX = { backend: 70, protegey: 340, webhook: 610 }
    const laneLabel = {
        backend: t('api_docs.decision_flow_actor_backend'),
        protegey: t('api_docs.decision_flow_actor_protegey'),
        webhook: t('api_docs.decision_flow_actor_webhook'),
    }
    const actorBox = (key) => [
        h('rect', { x: laneX[key] - 65, y: 14, width: 130, height: 36, rx: 10, fill: 'none', stroke: 'currentColor', 'stroke-width': 1.5 }),
        h('text', { x: laneX[key], y: 37, 'text-anchor': 'middle', class: 'fill-current', style: 'font-size:12px;font-weight:700' }, laneLabel[key]),
        h('line', { x1: laneX[key], y1: 50, x2: laneX[key], y2: 275, stroke: 'currentColor', 'stroke-width': 1, 'stroke-dasharray': '3,4', opacity: 0.4 }),
    ]
    const arrow = (fromKey, toKey, y, label, note, dashed) => {
        const x1 = laneX[fromKey], x2 = laneX[toKey]
        const dir = x2 > x1 ? 1 : -1
        const tipX = x2 - dir * 6
        return [
            h('line', { x1, y1: y, x2: tipX, y2: y, stroke: 'currentColor', 'stroke-width': 1.5, 'stroke-dasharray': dashed ? '5,4' : undefined, 'marker-end': 'url(#arrowhead)' }),
            h('text', { x: (x1 + x2) / 2, y: y - 9, 'text-anchor': 'middle', class: 'fill-current font-mono', style: 'font-size:10.5px;font-weight:700' }, label),
            note ? h('text', { x: (x1 + x2) / 2, y: y + 15, 'text-anchor': 'middle', class: 'fill-current', style: 'font-size:9.5px;opacity:0.6' }, note) : null,
        ]
    }
    return h('div', { class: 'overflow-x-auto' }, [
        h('svg', { viewBox: '0 0 680 300', class: 'w-full min-w-[560px] text-neutral-700 dark:text-neutral-300', role: 'img', 'aria-label': 'Sequence diagram: your backend calls Protegey and gets a synchronous verdict, while Protegey also pushes webhook events to your endpoint on an independent channel.' }, [
            h('defs', {}, [
                h('marker', { id: 'arrowhead', markerWidth: 8, markerHeight: 8, refX: 6, refY: 3, orient: 'auto' }, [
                    h('path', { d: 'M0,0 L6,3 L0,6 Z', fill: 'currentColor' }),
                ]),
            ]),
            ...actorBox('backend'), ...actorBox('protegey'), ...actorBox('webhook'),
            // Sync group
            h('text', { x: 10, y: 75, class: 'fill-current font-black uppercase', style: 'font-size:9px;letter-spacing:0.08em;opacity:0.5' }, t('api_docs.decision_flow_sync_label')),
            ...arrow('backend', 'protegey', 95, t('api_docs.decision_flow_arrow1'), null, false),
            ...arrow('protegey', 'backend', 140, t('api_docs.decision_flow_arrow2'), null, true),
            // Async group
            h('line', { x1: 10, y1: 170, x2: 670, y2: 170, stroke: 'currentColor', 'stroke-width': 0.5, opacity: 0.15 }),
            h('text', { x: 10, y: 192, class: 'fill-current font-black uppercase', style: 'font-size:9px;letter-spacing:0.08em;opacity:0.5' }, t('api_docs.decision_flow_async_label')),
            ...arrow('protegey', 'webhook', 215, t('api_docs.decision_flow_arrow3'), t('api_docs.decision_flow_arrow3_note'), true),
            ...arrow('protegey', 'webhook', 265, t('api_docs.decision_flow_arrow4'), t('api_docs.decision_flow_arrow4_note'), true),
        ]),
    ])
}

const navItems = [
    { id: 'auth', labelKey: 'api_docs.nav_auth' },
    { id: 'sdks', labelKey: 'api_docs.nav_sdks' },
    { id: 'group-pan-id', labelKey: 'api_docs.nav_group_pan_id', isGroup: true },
    { id: 'kyc', labelKey: 'api_docs.nav_kyc' },
    { id: 'kyb', labelKey: 'api_docs.nav_kyb' },
    { id: 'group-pan-monitor', labelKey: 'api_docs.nav_group_pan_monitor', isGroup: true },
    { id: 'transactions', labelKey: 'api_docs.nav_transactions' },
    { id: 'decision-flow', labelKey: 'api_docs.nav_decision_flow' },
    { id: 'group-pan-risk', labelKey: 'api_docs.nav_group_pan_risk', isGroup: true },
    { id: 'sanctions', labelKey: 'api_docs.nav_sanctions' },
    { id: 'group-pan-intel', labelKey: 'api_docs.nav_group_pan_intel', isGroup: true },
    { id: 'device-events', labelKey: 'api_docs.nav_device' },
    { id: 'behavioral-events', labelKey: 'api_docs.nav_behavioral' },
    { id: 'shared-signal', labelKey: 'api_docs.nav_shared_signal' },
    { id: 'webhooks', labelKey: 'api_docs.nav_webhooks' },
    { id: 'errors', labelKey: 'api_docs.nav_errors' },
]

const sdks = [
    { platform: 'JavaScript / TypeScript', icon: JavaScriptIcon, package: '@protegey/sdk', install: 'npm install git+https://github.com/protegey/protegey_js_sdk.git', repo: 'https://github.com/protegey/protegey_js_sdk' },
    { platform: 'React Native', icon: ReactIcon, package: '@protegey/react-native-sdk', install: 'npm install git+https://github.com/protegey/protegey_react_native_sdk.git', repo: 'https://github.com/protegey/protegey_react_native_sdk' },
    { platform: 'PHP', icon: PhpIcon, package: 'protegey/sdk', install: 'composer require protegey/sdk', repo: 'https://github.com/protegey/protegey_php_sdk' },
    { platform: 'Java', icon: JavaIcon, package: 'com.protegey:protegey-sdk', install: "implementation 'com.protegey:protegey-sdk:0.5.0'", repo: 'https://github.com/protegey/protegey_java_sdk' },
    { platform: 'Flutter / Dart', icon: DartIcon, package: 'protegey_sdk', install: 'flutter pub add protegey_sdk', repo: 'https://github.com/protegey/protegey-sdk-flutter' },
    { platform: '.NET', icon: MicrosoftIcon, package: 'Protegey.Sdk', install: 'dotnet add package Protegey.Sdk', repo: 'https://github.com/protegey/protegey_dotnet_sdk' },
]

// ── ApiConsole field sets — mirror the real DTOs of each endpoint. ──
const transactionFields = [
    { name: 'externalTransactionId', label: 'externalTransactionId', type: 'text', required: true, placeholder: 'tx-0001' },
    { name: 'externalCustomerId', label: 'externalCustomerId', type: 'text', required: true, placeholder: 'cust-0001' },
    { name: 'direction', label: 'direction', type: 'select', options: ['CREDIT', 'DEBIT'], defaultValue: 'DEBIT' },
    { name: 'amount', label: 'amount', type: 'number', required: true, placeholder: '50000' },
    { name: 'currency', label: 'currency', type: 'text', defaultValue: 'XOF' },
    { name: 'transactionType', label: 'transactionType', type: 'text', required: true, placeholder: 'TRANSFER' },
    { name: 'isCash', label: 'isCash', type: 'boolean', defaultValue: false },
    { name: 'channel', label: 'channel', type: 'select', options: ['branch', 'atm', 'pos', 'online', 'mobile_app', 'ussd', 'agent', 'api', 'call_center'] },
    { name: 'counterpartyInstitutionCode', label: 'counterpartyInstitutionCode', type: 'text', placeholder: 'SWIFT/BIC or local bank code' },
    { name: 'counterpartyCountry', label: 'counterpartyCountry', type: 'text', placeholder: 'SN' },
    { name: 'occurredAt', label: 'occurredAt', type: 'text', required: true, defaultValue: new Date().toISOString() },
]
const kycFields = [{ name: 'externalUserId', label: 'externalUserId', type: 'text', required: true, placeholder: 'cust-0001' }]
const sanctionsFields = [{ name: 'name', label: 'name', type: 'text', required: true, placeholder: 'Jane Doe' }]
const deviceFields = [
    { name: 'eventId', label: 'eventId', type: 'text', required: true, placeholder: 'evt-0001' },
    { name: 'externalCustomerId', label: 'externalCustomerId', type: 'text', placeholder: 'cust-0001' },
    { name: 'visitorId', label: 'visitorId', type: 'text', placeholder: 'visitor-id-from-the-sdk' },
]
const behavioralFields = [
    { name: 'externalCustomerId', label: 'externalCustomerId', type: 'text', required: true, placeholder: 'cust-0001' },
    { name: 'sessionId', label: 'sessionId', type: 'text', required: true, placeholder: 'session-0001' },
]
const sharedSignalFields = [
    { name: 'phoneNumber', label: 'phoneNumber', type: 'text', placeholder: '+22890123456' },
    { name: 'email', label: 'email', type: 'text', placeholder: 'jane@example.com' },
    { name: 'deviceFingerprint', label: 'deviceFingerprint', type: 'text', placeholder: 'visitor-id-from-the-sdk' },
]
const kybFields = [
    { name: 'contactName', label: 'contactName', type: 'text', required: true, placeholder: 'Awa Diallo' },
    { name: 'contactEmail', label: 'contactEmail', type: 'text', required: true, placeholder: 'awa@acme-sarl.com' },
]

// ── Enum/status reference data — real values from the backend's own entities/DTOs. ──
const kycValues = [
    { field: 'status', values: ['In Progress', 'Approved', 'Declined', 'In Review', 'Expired', 'Resubmitted'] },
    { field: 'decision.outcome', values: ['SUCCESS', 'MANUAL', 'FAILED'] },
]
const kybValues = [
    { field: 'status', values: ['invited', 'pending_review', 'more_info_required', 'active', 'rejected'] },
    { field: 'stage (query filter)', values: ['invited', 'responded'] },
    { field: 'business.decision / owners[].decision', values: ['clear', 'review', 'blocked'] },
]
const transactionValues = [
    { field: 'direction', values: ['DEBIT', 'CREDIT'] },
    { field: 'channel', values: ['branch', 'atm', 'pos', 'online', 'mobile_app', 'ussd', 'agent', 'api', 'call_center'] },
    { field: 'decision', values: ['clear', 'review', 'blocked'] },
    { field: 'deviceAction', values: ['allow', 'soft_challenge', 'hard_challenge', 'block'] },
]
const sanctionsValues = [
    { field: 'decision', values: ['clear', 'review', 'blocked'] },
    { field: 'score', values: ['0.0', '–', '1.0 (similarity ratio, not a percentage)'] },
]
const deviceValues = [
    { field: 'action', values: ['allow', 'soft_challenge', 'hard_challenge', 'block'] },
]
const behavioralValues = [
    { field: 'status', values: ['learning', 'scored'] },
    { field: 'confidenceTier', values: ['null (while learning)', 'low', 'medium', 'high'] },
]
const sharedSignalValues = [
    { field: 'category', values: ['confirmed_fraud', 'identity_theft', 'money_laundering', 'other'] },
]

// ── Real curl examples — real field names, matching the actual DTOs/responses. ──
const TRANSACTION_EXAMPLE = `curl -X POST https://api.protegey.com/partner-api/transactions \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "externalTransactionId": "tx-00234",
    "externalCustomerId": "cust-9981",
    "direction": "DEBIT",
    "amount": 250000,
    "currency": "XOF",
    "transactionType": "cashout",
    "isCash": true,
    "channel": "ussd",
    "counterpartyInstitutionCode": "ECOBKTGTG",
    "counterpartyCountry": "SN",
    "occurredAt": "2026-01-15T10:00:00.000Z"
  }'

# Response
{
  "transactionId": "b3b4f28f-...",
  "decision": "review",
  "riskScore": 20,
  "alerts": [ { "ruleCode": "IND006-KYC1", "status": "open", ... } ]
}`

const TRANSACTION_STATUS_EXAMPLE = `# Looked up by YOUR OWN externalTransactionId — never Protegey's internal id, so you never have
# to learn or persist a second identifier just to ask "what happened to the one I sent you".
curl https://api.protegey.com/partner-api/transactions/tx-00234 \\
  -H "x-api-key: YOUR_API_KEY"

# Response — same shape as the synchronous POST response above
{
  "transactionId": "b3b4f28f-...",
  "externalTransactionId": "tx-00234",
  "externalCustomerId": "cust-9981",
  "decision": "review",
  "riskScore": 20,
  "deviceAction": "allow",
  "occurredAt": "2026-01-15T10:00:00.000Z",
  "createdAt": "2026-01-15T10:00:01.482Z",
  "alerts": [ { "id": "27bfd203-...", "alertNumber": 1042, "ruleCode": "IND006-KYC1", "status": "open", "decisionVerdict": "review", "triggeredAt": "2026-01-15T10:00:01.482Z" } ]
}`

const TRANSACTION_LIST_EXAMPLE = `# direction / decision / externalCustomerId / dateFrom / dateTo / page / limit are all optional
curl "https://api.protegey.com/partner-api/transactions?externalCustomerId=cust-9981&decision=review&page=1&limit=20" \\
  -H "x-api-key: YOUR_API_KEY"

# Response — each row omits "alerts" (fetching them for every row on a list this size would be
# an N+1 query per page); call the status endpoint above for one transaction's own alerts.
{
  "data": [
    { "transactionId": "b3b4f28f-...", "externalTransactionId": "tx-00234", "externalCustomerId": "cust-9981", "direction": "DEBIT", "amount": 250000, "currency": "XOF", "decision": "review", "riskScore": 20, "deviceAction": "allow", "occurredAt": "2026-01-15T10:00:00.000Z", "createdAt": "2026-01-15T10:00:01.482Z" }
  ],
  "total": 1,
  "page": 1,
  "limit": 20,
  "totalPages": 1
}`

const KYC_EXAMPLE = `curl -X POST https://api.protegey.com/partner-api/kyc/sessions \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{ "externalUserId": "cust-9981" }'

# Response — "url" is a one-time link to our hosted FaceTec capture app, not a third-party page
{ "sessionId": "018f2a3e-...", "url": "https://verify-kyc.protegey.com/?enrollmentId=...&token=...&apiBase=..." }`

const KYC_POLL_EXAMPLE = `# Polling fallback — see the Webhooks section: delivery is best-effort (one retry, no queue).
curl https://api.protegey.com/partner-api/kyc/sessions/018f2a3e-... \\
  -H "x-api-key: YOUR_API_KEY"

# Response — identical shape to the outbound webhook payload, minus eventId.
{ "sessionId": "018f2a3e-...", "externalUserId": "cust-9981", "status": "Approved", "outcome": "SUCCESS", "decision": { "source": "facetec", "outcome": "SUCCESS", "passed": true, "confidenceScore": 94, ... } }`

const KYC_UPDATE_EXAMPLE = `# Correct an OCR misread, or resolve an "In Review" session by overriding its status.
curl -X PATCH https://api.protegey.com/partner-api/kyc/sessions/018f2a3e-... \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{ "status": "Approved", "reviewNote": "Manually verified against a second document" }'`

const KYC_RESEND_EXAMPLE = `# Issues a fresh single-use capture link for an enrollment whose previous attempt didn't lead
# anywhere (Declined, Expired, or stuck In Review). Sets status to "Resubmitted".
curl -X POST https://api.protegey.com/partner-api/kyc/sessions/018f2a3e-.../resend \\
  -H "x-api-key: YOUR_API_KEY"

# Response
{ "sessionId": "018f2a3e-...", "url": "https://verify-kyc.protegey.com/?enrollmentId=...&token=...&apiBase=..." }`

const SANCTIONS_EXAMPLE = `curl -X POST https://api.protegey.com/partner-api/sanctions/screen \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{ "name": "Jane Doe", "type": "person" }'

# Response
{ "decision": "clear", "score": 0, "matches": [] }`

const DEVICE_EVENT_EXAMPLE = `curl -X POST https://api.protegey.com/partner-api/device-events \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "eventId": "your-own-idempotency-key",
    "externalCustomerId": "cust-9981",
    "visitorId": "computed-by-the-sdk",
    "deviceAttributes": { "platform": "Web", "isRooted": false }
  }'

# Response
{ "recorded": true, "action": "allow", "riskScore": 5 }`

const BEHAVIORAL_EVENT_EXAMPLE = `curl -X POST https://api.protegey.com/partner-api/behavioral-events \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "externalCustomerId": "cust-9981",
    "sessionId": "sess-20260115-01",
    "keystroke": { "avgInterKeyLatencyMs": 145, "typingSpeedCharsPerSec": 4.2, "errorRate": 0.02 },
    "touch": { "avgSwipeVelocity": 22, "scrollBehaviorScore": 0.8 },
    "navigation": { "screenSequence": ["login", "dashboard", "transfer", "confirm"] },
    "session": { "loginHourBucket": 14, "loginDayOfWeek": 2, "sessionDurationMs": 45000 }
  }'

# Response — first sessions for a customer come back as "learning" (no score yet)
{ "status": "learning", "deviationScore": 0, "confidenceTier": null, "stepUpRecommended": false, "escalatedAlertId": null }

# Response — once a baseline exists for that customer
{ "status": "scored", "deviationScore": 35, "confidenceTier": "medium", "stepUpRecommended": true, "escalatedAlertId": null }`

const SHARED_SIGNAL_EXAMPLE = `curl -X POST https://api.protegey.com/partner-api/shared-signal/check \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{ "phoneNumber": "+22890123456", "email": "jane@example.com", "deviceFingerprint": "visitor-id-from-the-sdk", "externalCustomerId": "cust-9981" }'
  # phoneNumber, email and deviceFingerprint are all optional — send whichever you have

# Response — no match
{ "flagged": false, "category": null, "reportedDaysAgo": null }

# Response — a match (never reveals which partner reported it, or their case details)
{ "flagged": true, "category": "confirmed_fraud", "reportedDaysAgo": 12 }`

const KYB_INVITE_EXAMPLE = `curl -X POST https://api.protegey.com/partner-api/kyb/applicants \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "contactName": "Awa Diallo",
    "contactEmail": "awa@acme-sarl.com",
    "templateId": "optional-custom-template-id"
  }'

# Response
{ "id": "6e2e6a2e-...", "legalName": null, "contactName": "Awa Diallo", "contactEmail": "awa@acme-sarl.com", "status": "invited" }`

const KYB_LIST_EXAMPLE = `# search / status / stage are all optional filters
curl "https://api.protegey.com/partner-api/kyb/applicants?status=pending_review&stage=responded" \\
  -H "x-api-key: YOUR_API_KEY"

# Response — status is one of: invited, pending_review, more_info_required, active, rejected
{ "data": [ { "id": "6e2e6a2e-...", "legalName": "Acme SARL", "status": "pending_review", ... } ], "total": 1, "page": 1, "limit": 20 }`

const KYB_GET_EXAMPLE = `curl https://api.protegey.com/partner-api/kyb/applicants/6e2e6a2e-... \\
  -H "x-api-key: YOUR_API_KEY"`

const KYB_RESEND_EXAMPLE = `# Issues a fresh invitation link — use when the first one expired or was lost, without
# restarting the applicant's progress.
curl -X POST https://api.protegey.com/partner-api/kyb/applicants/6e2e6a2e-.../resend-invitation \\
  -H "x-api-key: YOUR_API_KEY"`

const KYB_SCREEN_EXAMPLE = `# Sanctions/PEP screening for the business and each declared owner — the same check that runs
# automatically on submission, re-run on demand.
curl https://api.protegey.com/partner-api/kyb/applicants/6e2e6a2e-.../screen \\
  -H "x-api-key: YOUR_API_KEY"

# Response
{
  "business": { "decision": "clear", "score": 0, "matches": [] },
  "owners": [ { "ownerName": "Awa Diallo", "ownershipPercent": 60, "decision": "clear", "score": 0, "matches": [] } ],
  "screenedAt": "2026-11-13T10:00:00.000Z"
}`

const WEBHOOK_HEADERS_EXAMPLE = `POST https://your-endpoint.example.com/webhooks/protegey
Content-Type: application/json
X-Signature: 08fa142f2349cd86b4c4c3a46ce53afe5c63c4a587d7ff3cf52023f201c1526d
X-Timestamp: 1789905404`

const WEBHOOK_KYC_PAYLOAD_EXAMPLE = `{
  "type": "kyc.status_changed",
  "eventId": "d0d61d39-88c5-4bfb-89eb-08bb1d407c5a",
  "externalUserId": "cust-9981",
  "status": "Approved",
  "sessionId": "018f2a3e-...",
  "decision": { "source": "facetec", "outcome": "SUCCESS", "passed": true, "confidenceScore": 94, "livenessScore": 97, "matchScore": 91, ... }
}`

const WEBHOOK_ALERT_CREATED_EXAMPLE = `{
  "type": "alert.created",
  "eventId": "77cf7610-5380-4b72-aeaf-35645098140c",
  "alertId": "27bfd203-d554-418a-bc19-fcaf13164a0e",
  "ruleCode": "IND006-KYC1",
  "externalCustomerId": "cust-9981",
  "transactionId": "4d06ad4e-2018-428a-8323-d537da5e19fa",
  "status": "open",
  "triggeredAt": "2026-09-20T12:51:42.593Z"
}
// transactionId is null for an alert escalated from behavioral biometrics (not tied to one transaction).`

const WEBHOOK_ALERT_STATUS_EXAMPLE = `{
  "type": "alert.status_changed",
  "eventId": "31d8d981-1177-476f-b65a-dd69c700bb08",
  "alertId": "27bfd203-d554-418a-bc19-fcaf13164a0e",
  "ruleCode": "IND006-KYC1",
  "externalCustomerId": "cust-9981",
  "status": "confirmed"
}`

const WEBHOOK_TRANSACTION_BLOCKED_EXAMPLE = `{
  "type": "transaction.blocked",
  "eventId": "8a5e6f5a-8b7f-4b51-9df3-2f6c3a1f0c2e",
  "transactionId": "4d06ad4e-2018-428a-8323-d537da5e19fa",
  "externalTransactionId": "tx-9981-004",
  "externalCustomerId": "cust-9981",
  "amount": 400000,
  "currency": "XOF",
  "riskScore": 82,
  "ruleDecision": "review",
  "deviceAction": "block",
  "alertIds": ["27bfd203-d554-418a-bc19-fcaf13164a0e"],
  "occurredAt": "2026-09-26T09:12:03.000Z"
}
// Fires whenever a transaction's FINAL decision is "blocked" — from a rule (ruleDecision) or the
// device signal (deviceAction), or both.`

const WEBHOOK_VERIFY_EXAMPLE = `// Node.js — verify a delivery is genuinely from Protegey and hasn't been replayed
import { createHmac, timingSafeEqual } from "node:crypto";

function isValidProtegeyWebhook(rawBody, signatureHeader, timestampHeader, webhookSecret) {
  if (Math.abs(Date.now() / 1000 - Number(timestampHeader)) > 300) return false;

  const expected = createHmac("sha256", webhookSecret)
    .update(\`\${timestampHeader}.\${rawBody}\`, "utf8")
    .digest("hex");

  return timingSafeEqual(Buffer.from(expected), Buffer.from(signatureHeader));
}`
</script>
