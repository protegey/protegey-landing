<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from 'vue';
import { gsap } from 'gsap';
import { HugeiconsIcon } from '@hugeicons/vue';
import { ArrowRight01Icon, Shield01Icon, Activity01Icon, LockComputerIcon } from '@hugeicons/core-free-icons';

defineProps({ isDark: Boolean });

const { t, te, locale } = useI18n();
const localePath = useLocalePath();

const mapCanvasRef = ref(null);
let mapCtx = null;
let mapAnimationId = null;
let mapNodes = [];
let mapPackets = [];
let isDragging = false;
let dragStart = { x: 0, y: 0 };
let panOffset = { x: 0, y: 0 };
let lastPanOffset = { x: 0, y: 0 };
let draggedNode = null;
let hoveredNode = null;

const initMapCanvas = () => {
    const canvas = mapCanvasRef.value;
    if (!canvas) return;
    
    mapCtx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    mapCtx.scale(dpr, dpr);
    
    const width = rect.width;
    const height = rect.height;
    
    const regions = [
        { x: 0.08, y: 0.12, name: 'MA', label: 'MA', threat: 14 },
        { x: 0.14, y: 0.08, name: 'DZ', label: 'DZ', threat: 10 },
        { x: 0.20, y: 0.05, name: 'TN', label: 'TN', threat: 8 },
        { x: 0.28, y: 0.08, name: 'LY', label: 'LY', threat: 6 },
        { x: 0.38, y: 0.12, name: 'EG', label: 'EG', threat: 18 },
        { x: 0.48, y: 0.15, name: 'SD', label: 'SD', threat: 12 },
        { x: 0.58, y: 0.18, name: 'ET', label: 'ET', threat: 16 },
        { x: 0.72, y: 0.20, name: 'KE', label: 'KE', threat: 19 },
        { x: 0.68, y: 0.30, name: 'TZ', label: 'TZ', threat: 24 },
        { x: 0.62, y: 0.40, name: 'UG', label: 'UG', threat: 14 },
        { x: 0.52, y: 0.45, name: 'RW', label: 'RW', threat: 8 },
        { x: 0.60, y: 0.55, name: 'CD', label: 'CD', threat: 31 },
        { x: 0.45, y: 0.50, name: 'CG', label: 'CG', threat: 7 },
        { x: 0.38, y: 0.48, name: 'GA', label: 'GA', threat: 9 },
        { x: 0.30, y: 0.42, name: 'CM', label: 'CM', threat: 18 },
        { x: 0.40, y: 0.35, name: 'NG', label: 'NG', threat: 45 },
        { x: 0.32, y: 0.28, name: 'GH', label: 'GH', threat: 15 },
        { x: 0.45, y: 0.26, name: 'CI', label: 'CI', threat: 22 },
        { x: 0.55, y: 0.22, name: 'SN', label: 'SN', threat: 12 },
        { x: 0.65, y: 0.18, name: 'BF', label: 'BF', threat: 5 },
        { x: 0.75, y: 0.12, name: 'ML', label: 'ML', threat: 11 },
        { x: 0.82, y: 0.20, name: 'NE', label: 'NE', threat: 6 },
    ];
    
    mapNodes = regions.map(r => ({
        x: r.x * width,
        y: r.y * height,
        name: r.name,
        label: r.label,
        threat: r.threat,
        lastAlert: Math.random() * 60,
        alertType: Math.random() > 0.5 ? 'SIM_SWAP' : Math.random() > 0.5 ? 'ACCOUNT_TAKEOVER' : 'FRAUD_ALERT'
    }));
};

const getNodeAtPosition = (clientX, clientY) => {
    if (!mapCanvasRef.value) return null;
    const rect = mapCanvasRef.value.getBoundingClientRect();
    const x = clientX - rect.left - panOffset.x;
    const y = clientY - rect.top - panOffset.y;
    
    for (const node of mapNodes) {
        const dx = node.x - x;
        const dy = node.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const nodeSize = 6 + (node.threat / 45) * 5;
        if (dist < nodeSize + 8) {
            return node;
        }
    }
    return null;
};

const handleMouseDown = (e) => {
    const node = getNodeAtPosition(e.clientX, e.clientY);
    if (node) {
        draggedNode = node;
        return;
    }
    
    isDragging = true;
    dragStart = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
    lastPanOffset = { ...panOffset };
    mapCanvasRef.value.style.cursor = 'grabbing';
};

const handleMouseMove = (e) => {
    const node = getNodeAtPosition(e.clientX, e.clientY);
    if (node && !hoveredNode) {
        hoveredNode = node;
        mapCanvasRef.value.style.cursor = 'move';
    } else if (!node && hoveredNode) {
        hoveredNode = null;
        if (!isDragging) {
            mapCanvasRef.value.style.cursor = 'grab';
        }
    }
    
    if (draggedNode) {
        const rect = mapCanvasRef.value.getBoundingClientRect();
        draggedNode.x = e.clientX - rect.left - panOffset.x;
        draggedNode.y = e.clientY - rect.top - panOffset.y;
        return;
    }
    
    if (!isDragging) return;
    panOffset = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
    };
};

const handleMouseUp = () => {
    draggedNode = null;
    isDragging = false;
    if (mapCanvasRef.value) {
        mapCanvasRef.value.style.cursor = hoveredNode ? 'move' : 'grab';
    }
};

const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = e.deltaY > 0 ? 0.95 : 1.05;
    const canvas = mapCanvasRef.value;
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    panOffset.x = centerX - (centerX - panOffset.x) * zoomFactor;
    panOffset.y = centerY - (centerY - panOffset.y) * zoomFactor;
};

const drawMap = (timestamp = 0) => {
    if (!mapCtx || !mapCanvasRef.value) return;
    const canvas = mapCanvasRef.value;
    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    
    mapCtx.clearRect(0, 0, canvas.width, canvas.height);
    
    mapCtx.save();
    mapCtx.translate(panOffset.x, panOffset.y);
    
    // Background with subtle grid
    mapCtx.fillStyle = 'rgba(11, 23, 65, 0.02)';
    mapCtx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw connecting lines (intelligence sharing network)
    mapNodes.forEach(node => {
        mapNodes.forEach(other => {
            if (node === other) return;
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < 120) {
                mapCtx.beginPath();
                mapCtx.moveTo(node.x, node.y);
                mapCtx.lineTo(other.x, other.y);
                mapCtx.strokeStyle = 'rgba(12, 185, 158, 0.15)';
                mapCtx.lineWidth = 1;
                mapCtx.stroke();
            }
        });
    });
    
    // Draw data packets traveling on lines
    if (timestamp % 500 < 25 && Math.random() > 0.5) {
        const idx1 = Math.floor(Math.random() * mapNodes.length);
        let idx2 = Math.floor(Math.random() * mapNodes.length);
        while (idx2 === idx1) idx2 = Math.floor(Math.random() * mapNodes.length);
        
        const from = mapNodes[idx1];
        const to = mapNodes[idx2];
        const dist = Math.hypot(to.x - from.x, to.y - from.y);
        
        if (dist < 90) {
            mapPackets.push({
                x: from.x, y: from.y,
                tx: to.x, ty: to.y,
                progress: 0, speed: 0.008 + Math.random() * 0.005,
                size: 2 + Math.random()
            });
        }
    }
    
    // Update and draw packets
    mapPackets = mapPackets.filter(pkt => {
        pkt.progress += pkt.speed;
        if (pkt.progress >= 1) return false;
        
        const x = pkt.x + (pkt.tx - pkt.x) * pkt.progress;
        const y = pkt.y + (pkt.ty - pkt.y) * pkt.progress;
        
        mapCtx.beginPath();
        mapCtx.arc(x, y, pkt.size, 0, Math.PI * 2);
        mapCtx.fillStyle = '#22d3ee';
        mapCtx.fill();
        
        return true;
    });
    
    // Draw region nodes with threat indicators
    mapNodes.forEach(node => {
        const nodeSize = 6 + (node.threat / 45) * 5;
        const alertColor = node.threat > 30 ? '#ff6b00' : node.threat > 15 ? '#fbbf24' : '#22d3ee';
        const seconds = (timestamp / 1000) % 60;
        const alertAge = seconds - node.lastAlert;
        const isRecent = alertAge > -5 && alertAge < 0;
        
        // Outer ring for recent alerts
        if (isRecent) {
            const pulse = (Math.sin(timestamp / 200) + 1) / 2;
            mapCtx.beginPath();
            mapCtx.arc(node.x, node.y, nodeSize + 8, 0, Math.PI * 2);
            mapCtx.strokeStyle = `rgba(255, 107, 0, ${0.6 - pulse * 0.4})`;
            mapCtx.lineWidth = 2;
            mapCtx.stroke();
        }
        
        // Main node
        mapCtx.beginPath();
        mapCtx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        mapCtx.fillStyle = alertColor;
        mapCtx.fill();
        
        // Inner dot
        mapCtx.beginPath();
        mapCtx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        mapCtx.fillStyle = '#0B1741';
        mapCtx.fill();
        
        // Country label
        mapCtx.font = '600 9px Inter, sans-serif';
        mapCtx.fillStyle = '#6B7EA3';
        mapCtx.textAlign = 'center';
        mapCtx.fillText(node.label, node.x, node.y + nodeSize + 8);
        
        // Threat count
        mapCtx.font = '700 8px Inter, sans-serif';
        mapCtx.fillStyle = alertColor;
        mapCtx.fillText(node.threat.toString(), node.x, node.y - nodeSize - 5);
    });
    
    mapCtx.restore();
    
    mapAnimationId = requestAnimationFrame(drawMap);
};

let tl;
let typewriterTimeout = null;

const typewriterText = ref('');

const texts = computed(() => [
    t('hero.typewriter.detect'),
    t('hero.typewriter.analyze'),
    t('hero.typewriter.monitor'),
    t('hero.typewriter.prevent'),
]);

const useSplitHeroTitle = computed(() => te('hero.title_line_1.prefix'));

const typingSpeed = 55;
const deletingSpeed = 35;
const pauseDelay = 1200;

const scrollTo = (selector) => {
    const el = document.getElementById(selector)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const startTypewriter = () => {
    if (typewriterTimeout) clearTimeout(typewriterTimeout);

    typewriterText.value = '';
    let currentTextIndex = 0;
    let currentIndex = 0;
    let isDeleting = false;

    const type = () => {
        const currentText = texts.value[currentTextIndex] || '';

        if (!isDeleting) {
            if (currentIndex < currentText.length) {
                typewriterText.value += currentText[currentIndex];
                currentIndex++;
                typewriterTimeout = setTimeout(type, typingSpeed);
            } else {
                isDeleting = true;
                typewriterTimeout = setTimeout(type, pauseDelay);
            }
        } else if (typewriterText.value.length > 0) {
            typewriterText.value = typewriterText.value.slice(0, -1);
            typewriterTimeout = setTimeout(type, deletingSpeed);
        } else {
            isDeleting = false;
            currentIndex = 0;
            currentTextIndex = (currentTextIndex + 1) % texts.value.length;
            typewriterTimeout = setTimeout(type, typingSpeed);
        }
    };

    type();
};

watch(locale, () => {
    startTypewriter();
});

onMounted(() => {
    initMapCanvas();
    
    if (mapCanvasRef.value) {
        mapCanvasRef.value.style.cursor = 'grab';
        mapCanvasRef.value.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        mapCanvasRef.value.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    requestAnimationFrame(drawMap);
    
    nextTick(() => {
        try {
            const heroTitle = document.querySelector('.hero-title');
            const heroSubtitle = document.querySelector('.hero-subtitle');
            const heroCtaButton = document.querySelector('.hero-cta-button');
            const heroBadge = document.querySelector('.hero-badge');
            const dashboardCard = document.querySelector('.dashboard-card');
            
            if (!heroTitle || !heroSubtitle || !heroCtaButton || !heroBadge || !dashboardCard) {
                console.warn('Hero animation elements not found, skipping GSAP animation');
                return;
            }
            
            gsap.set('.hero-title', { opacity: 0, y: 40 });
            gsap.set('.hero-subtitle', { opacity: 0, y: 20 });
            gsap.set('.hero-cta-button', { opacity: 0, y: 20 });
            gsap.set('.hero-badge', { opacity: 0, y: -20 });
            gsap.set('.dashboard-card', { opacity: 0, scale: 0.95, rotationX: 10 });

            tl = gsap.timeline();

            tl.to('.hero-badge', {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            })
                .to('.hero-title', {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.4')
                .to('.hero-subtitle', {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: 'power3.out'
                }, '-=0.6')
                .to('.hero-cta-button', {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out'
                }, '-=0.6')
                .to('.dashboard-card', {
                    scale: 1,
                    opacity: 1,
                    rotationX: 0,
                    duration: 1.2,
                    ease: 'power3.out'
                }, '-=0.4');

            startTypewriter();

        } catch (error) {
            console.warn('GSAP animation failed:', error);
        }
    });
});

onUnmounted(() => {
    if (tl && tl.kill) tl.kill();
    if (typewriterTimeout) clearTimeout(typewriterTimeout);
    if (mapAnimationId) cancelAnimationFrame(mapAnimationId);
    if (mapCanvasRef.value) {
        mapCanvasRef.value.removeEventListener('mousedown', handleMouseDown);
        mapCanvasRef.value.removeEventListener('wheel', handleWheel);
    }
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
});
</script>

<template>
    <section id="hero"
        class="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center overflow-hidden pt-36 sm:pt-32 md:pt-20">
        <!-- Animated Background Grid -->
        <div class="absolute inset-0 z-0">
            <div
                class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]">
            </div>
            <div class="absolute inset-0 bg-gradient-to-b from-neutral-50 dark:from-neutral-950 via-transparent to-neutral-50 dark:to-neutral-950"></div>

            <!-- Glowing Orbs -->
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-glow">
            </div>
            <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-glow"
                style="animation-delay: 1s;"></div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                <!-- Left Content -->
                <div class="text-left rtl:text-right space-y-8">
                    <!-- Badge -->
                    <div
                        class="hero-badge inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-500/30 bg-primary-500/10 text-primary-400 text-sm font-mono tracking-wide">
                        <span class="relative flex h-2 w-2">
                            <span
                                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                        </span>
                        {{ $t('hero.badge') }}
                    </div>

                    <h1
                        class="hero-title text-4xl lg:text-5xl font-bold leading-[1.1] text-neutral-900 dark:text-white tracking-tight">
                        <template v-if="useSplitHeroTitle">
                            <span class="block">
                                {{ $t('hero.title_line_1.prefix') }}<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">{{ $t('hero.title_line_1.highlight') }}</span>{{ $t('hero.title_line_1.suffix') }}
                            </span>
                            <span class="block">
                                {{ $t('hero.title_line_2.prefix') }}<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">{{ $t('hero.title_line_2.highlight') }}</span>{{ $t('hero.title_line_2.suffix') }}
                            </span>
                        </template>
                        <template v-else>
                            <span class="block">{{ $t('hero.title_part_1') }}</span>
                            <span v-if="$t('hero.title_highlight')" class="block text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400">
                                {{ $t('hero.title_highlight') }}
                            </span>
                            <span class="block">{{ $t('hero.title_part_2') }}</span>
                        </template>
                    </h1>

                    <p class="hero-subtitle text-base text-neutral-500 dark:text-neutral-400 max-w-2xl leading-relaxed"
                        aria-live="off"
                        v-html="$t('hero.subtitle', { action: typewriterText })">
                    </p>

                    <!-- CTA Buttons -->
                    <div class="flex flex-col sm:flex-row gap-4 pt-4">
                        <NuxtLink :to="localePath('/#waitlist')"
                            class="hero-cta-button group bg-primary-500 hover:bg-primary-400 text-neutral-950 px-5 py-2.5 rounded-lg font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(12,185,158,0.3)] hover:shadow-[0_0_30px_rgba(12,185,158,0.5)]">
                            <HugeiconsIcon :icon="Shield01Icon" :size="18"
                                class="transition-colors" />
                            {{ $t('hero.cta.request_demo') }}
                            <HugeiconsIcon :icon="ArrowRight01Icon" :size="18"
                                class="rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                        </NuxtLink>
                        <NuxtLink :to="localePath('/expert')"
                            class="hero-cta-button group border border-neutral-300 dark:border-neutral-700 hover:border-primary-500/50 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-5 py-2.5 rounded-lg font-bold text-base transition-all duration-300 flex items-center justify-center gap-2 bg-white/50 dark:bg-neutral-900/50 hover:bg-white dark:hover:bg-neutral-800 backdrop-blur-sm">
                            {{ $t('hero.cta.speak_expert') }}
                        </NuxtLink>
                    </div>

                    <!-- Trust Indicators -->
                    <div class="hero-cta flex flex-wrap gap-6 pt-8 border-t border-neutral-200/80 dark:border-neutral-800/50">
                        <div class="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
                            <HugeiconsIcon :icon="LockComputerIcon" :size="16" class="text-primary-500" />
                            <span>{{ $t('hero.trust.security') }}</span>
                        </div>
                        <div class="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
                            <HugeiconsIcon :icon="Activity01Icon" :size="16" class="text-primary-500" />
                            <span>{{ $t('hero.trust.analysis') }}</span>
                        </div>
                    </div>
                </div>

                <!-- Right Visual (Dashboard Mockup) -->
                <div class="relative perspective-1000">
                    <div
                        class="dashboard-card relative z-10 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl overflow-hidden">
                        <!-- Header -->
                        <div
                            class="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/90 backdrop-blur">
                            <div class="flex items-center gap-2">
                                <div class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                <div class="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                                <div class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            </div>
                            <div class="text-xs font-mono text-neutral-400 dark:text-neutral-500">PROTEGEY_INTELLIGENCE_V2.0</div>
                        </div>

                        <!-- Dashboard Content -->
                        <div class="p-5 space-y-5 bg-white/90 dark:bg-neutral-900/50">
                            <!-- Stats Row -->
                            <div class="grid grid-cols-2 gap-4">
                                <div class="bg-neutral-100/80 dark:bg-neutral-800/50 p-4 rounded-lg border border-neutral-200/80 dark:border-neutral-700/50">
                                    <div class="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">{{
                                        $t('hero.dashboard.threats_blocked') }}
                                    </div>
                                    <div class="text-xl font-mono font-bold text-neutral-900 dark:text-white">84,291</div>
                                    <div class="text-xs text-primary-400 mt-1 flex items-center gap-1">
                                        <span
                                            class="inline-block w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[6px] border-b-primary-400"></span>
                                        {{ $t('hero.dashboard.vs_last_week') }}
                                    </div>
                                </div>
                                <div class="bg-neutral-100/80 dark:bg-neutral-800/50 p-4 rounded-lg border border-neutral-200/80 dark:border-neutral-700/50">
                                    <div class="text-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1">{{
                                        $t('hero.dashboard.active_nodes') }}
                                    </div>
                                    <div class="text-xl font-mono font-bold text-neutral-900 dark:text-white">1,402</div>
                                    <div class="text-xs text-secondary-400 mt-1">{{ $t('hero.dashboard.uptime') }}</div>
                                </div>
                            </div>

                            <!-- Live Feed -->
                            <div class="bg-neutral-100/50 dark:bg-neutral-800/30 rounded-lg border border-neutral-200/50 dark:border-neutral-700/30 overflow-hidden">
                                <div
                                    class="px-3 py-2 md:px-4 md:py-2 border-b border-neutral-200/50 dark:border-neutral-700/30 bg-neutral-100/80 dark:bg-neutral-800/50 flex justify-between items-center">
                                    <span class="text-[10px] md:text-xs font-semibold text-neutral-600 dark:text-neutral-300">{{
                                        $t('hero.dashboard.live_feed') }}</span>
                                    <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                                </div>
                                <div class="p-1.5 md:p-2 space-y-1.5 md:space-y-2">
                                    <div
                                        class="flex items-center gap-2 md:gap-3 p-1.5 md:p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700/30 transition-colors text-[9px] md:text-xs font-mono">
                                        <span class="text-red-400">[{{ $t('hero.dashboard.critical') }}]</span>
                                        <span class="text-neutral-600 dark:text-neutral-300 truncate">{{ $t('hero.dashboard.sim_swap') }}</span>
                                        <span class="text-neutral-500 dark:text-neutral-400 ms-auto shrink-0">00:01:23</span>
                                    </div>
                                    <div
                                        class="flex items-center gap-2 md:gap-3 p-1.5 md:p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700/30 transition-colors text-[9px] md:text-xs font-mono">
                                        <span class="text-yellow-400">[{{ $t('hero.dashboard.warning') }}]</span>
                                        <span class="text-neutral-600 dark:text-neutral-300 truncate">{{ $t('hero.dashboard.unusual_login') }}</span>
                                        <span class="text-neutral-500 dark:text-neutral-400 ms-auto shrink-0">00:01:45</span>
                                    </div>
                                    <div
                                        class="flex items-center gap-2 md:gap-3 p-1.5 md:p-2 rounded hover:bg-neutral-100 dark:hover:bg-neutral-700/30 transition-colors text-[9px] md:text-xs font-mono">
                                        <span class="text-primary-400">[{{ $t('hero.dashboard.info') }}]</span>
                                        <span class="text-neutral-600 dark:text-neutral-300 truncate">{{ $t('hero.dashboard.new_node') }}</span>
                                        <span class="text-neutral-500 dark:text-neutral-400 ms-auto shrink-0">00:02:10</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Map Visualization Placeholder -->
                            <div
                                class="h-56 bg-neutral-100/50 dark:bg-neutral-800/30 rounded-lg border border-neutral-200/50 dark:border-neutral-700/30 relative overflow-hidden group">
                                <canvas ref="mapCanvasRef" class="w-full h-full absolute inset-0"></canvas>
                            </div>
                        </div>

                        <!-- Scan Line Animation -->
                        <div
                            class="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-primary-500/5 to-transparent h-[20%] w-full animate-scan">
                        </div>
                    </div>

                    <!-- Decorative Elements behind card -->
                    <div class="absolute -top-10 -right-10 w-40 h-40 bg-secondary-500/20 rounded-full blur-3xl -z-10">
                    </div>
                    <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl -z-10">
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.perspective-1000 {
    perspective: 1000px;
}

.hero-badge,
.hero-title,
.hero-subtitle,
.hero-cta-button,
.dashboard-card {
    will-change: transform, opacity;
}
</style>
