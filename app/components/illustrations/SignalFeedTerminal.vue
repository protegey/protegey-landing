<script setup>
const rawSignals = [
    { time: '14:32:07.441', type: 'VELOCITY_BREACH',    entity: 'CCA Bank·***4821',       action: 'BLOCK',  risk: 'HIGH' },
    { time: '14:32:08.203', type: 'SIM_SWAP_PROXIMITY', entity: 'Orange Money·CAR·***7293',action: 'FLAG',   risk: 'MED'  },
    { time: '14:32:09.847', type: 'LARGE_OUTLIER',      entity: 'BGFI Cameroun·***1149',   action: 'REVIEW', risk: 'MED'  },
    { time: '14:32:11.012', type: 'IMPOSSIBLE_TRAVEL',  entity: 'MTN MoMo·GH·***9872',    action: 'BLOCK',  risk: 'HIGH' },
    { time: '14:32:12.589', type: 'RAPID_VELOCITY',     entity: 'MTN CI·***3341',          action: 'FLAG',   risk: 'MED'  },
    { time: '14:32:13.771', type: 'NEW_DEVICE_ACCESS',  entity: 'Wafacash·***6621',        action: 'FLAG',   risk: 'MED'  },
    { time: '14:32:15.123', type: 'SYNTHETIC_IDENTITY', entity: 'BCI Mali·***0184',        action: 'BLOCK',  risk: 'HIGH' },
    { time: '14:32:16.004', type: 'MULE_NETWORK',       entity: 'NFC Bank·***7743',        action: 'REVIEW', risk: 'MED'  },
    { time: '14:32:17.888', type: 'VELOCITY_BREACH',    entity: 'Airtel Money·Congo·***2291',action: 'BLOCK', risk: 'HIGH' },
    { time: '14:32:19.033', type: 'GEO_ANOMALY',        entity: 'Afrika Bank·SN·***5519',  action: 'FLAG',   risk: 'MED'  },
];
const terminalSignals = [...rawSignals, ...rawSignals];
</script>

<template>
    <div class="dashboard-card relative z-10 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-white/10 rounded-xl overflow-hidden shadow-xl dark:shadow-none">
        <div class="flex items-center gap-2.5 px-3.5 py-2.5 bg-neutral-100 dark:bg-black/40 border-b border-neutral-200 dark:border-white/[0.07]">
            <div class="flex gap-1.5 shrink-0">
                <span class="w-2 h-2 rounded-full bg-accent-orange-500/80" />
                <span class="w-2 h-2 rounded-full bg-yellow-400/80" />
                <span class="w-2 h-2 rounded-full bg-primary-500/80" />
            </div>
            <span class="flex-1 font-mono text-[0.6rem] tracking-[0.1em] text-neutral-400 dark:text-white/30">PROTEGEY // SIGNAL FEED</span>
            <span class="font-mono text-[0.6rem] tracking-[0.06em] text-primary-500 dark:text-primary-400 terminal-live">● LIVE</span>
        </div>
        <div class="terminal-grid px-3.5 py-1.5 bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200 dark:border-white/[0.05] font-mono text-[0.55rem] tracking-[0.12em] text-neutral-400 dark:text-white/25">
            <span>TIME</span>
            <span>DETECTOR</span>
            <span>ENTITY</span>
            <span>ACTION</span>
        </div>
        <div class="relative h-[220px] overflow-hidden">
            <div class="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
            <div class="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent z-10 pointer-events-none" />
            <div class="terminal-track">
                <div
                    v-for="(s, i) in terminalSignals"
                    :key="`${s.time}-${i}`"
                    class="terminal-grid items-center px-3.5 py-[7px] border-b border-neutral-100 dark:border-white/[0.04] font-mono text-[0.65rem]"
                    :class="s.risk === 'HIGH' ? 'border-l-2 border-l-accent-orange-500' : 'border-l-2 border-l-primary-500/50'"
                >
                    <span class="text-neutral-400 dark:text-white/30 text-[0.6rem]">{{ s.time }}</span>
                    <span class="text-neutral-700 dark:text-white/65 tracking-[0.02em] truncate">{{ s.type }}</span>
                    <span class="text-neutral-500 dark:text-white/45 truncate">{{ s.entity }}</span>
                    <span
                        class="text-[0.55rem] font-semibold tracking-[0.08em] px-1.5 py-0.5 rounded-[2px] text-center"
                        :class="{
                            'bg-accent-orange-500/10 text-accent-orange-500 dark:bg-accent-orange-500/15 dark:text-accent-orange-400': s.action === 'BLOCK',
                            'bg-primary-500/10 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400':                        s.action === 'FLAG',
                            'bg-neutral-100 text-neutral-500 dark:bg-white/[0.06] dark:text-white/45':                                s.action === 'REVIEW',
                        }"
                    >{{ s.action }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.terminal-grid {
    display: grid;
    grid-template-columns: 100px 1fr 110px 52px;
    gap: 0 8px;
}

@keyframes scroll-feed {
    0%   { transform: translateY(0); }
    100% { transform: translateY(-50%); }
}

.terminal-track {
    animation: scroll-feed 32s linear infinite;
}

.terminal-track:hover {
    animation-play-state: paused;
}

@keyframes blink-live {
    0%, 80%, 100% { opacity: 1; }
    40%           { opacity: 0.3; }
}

.terminal-live {
    animation: blink-live 2s ease-in-out infinite;
}
</style>
