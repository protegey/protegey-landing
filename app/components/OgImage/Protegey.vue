<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description?: string
}>(), {
  description: 'Shared Fraud Intelligence for African Financial Institutions',
})
</script>

<template>
  <div :style="{
    display: 'flex',
    width: '1200px',
    height: '630px',
    backgroundColor: '#060D1C',
    overflow: 'hidden',
    position: 'relative',
    fontFamily: '\'Inter\', sans-serif',
  }">

    <!-- Teal glow — top right -->
    <div :style="{
      position: 'absolute',
      top: '-160px',
      right: '-160px',
      width: '520px',
      height: '520px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(12,185,158,0.18) 0%, transparent 70%)',
    }" />

    <!-- Subtle secondary glow — bottom left -->
    <div :style="{
      position: 'absolute',
      bottom: '-120px',
      left: '-80px',
      width: '360px',
      height: '360px',
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(27,89,174,0.15) 0%, transparent 70%)',
    }" />

    <!-- Left teal accent bar -->
    <div :style="{
      position: 'absolute',
      left: '0',
      top: '0',
      width: '5px',
      height: '100%',
      background: 'linear-gradient(to bottom, #0CB99E, #1B59AE)',
    }" />

    <!-- Main content -->
    <div :style="{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '56px 72px 52px 80px',
      width: '100%',
      height: '100%',
    }">

      <!-- Header row: logo + badge -->
      <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }">
        <img
          src="https://www.protegey.com/images/logo-light-mode.png"
          width="180"
          height="36"
          :style="{ objectFit: 'contain', objectPosition: 'left center' }"
        />
        <div :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid rgba(12,185,158,0.25)',
          borderRadius: '20px',
          padding: '8px 16px',
          backgroundColor: 'rgba(12,185,158,0.08)',
        }">
          <div :style="{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#0CB99E',
          }" />
          <span :style="{
            fontSize: '12px',
            fontWeight: '600',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#0CB99E',
          }">Fraud Intelligence · Africa</span>
        </div>
      </div>

      <!-- Title + description -->
      <div :style="{ display: 'flex', flexDirection: 'column', gap: '18px' }">
        <div :style="{
          fontSize: '52px',
          fontWeight: '800',
          lineHeight: '1.1',
          color: '#ffffff',
          letterSpacing: '-0.025em',
          maxWidth: '900px',
        }">{{ title }}</div>

        <div :style="{
          fontSize: '22px',
          fontWeight: '400',
          lineHeight: '1.5',
          color: '#6B7EA3',
          maxWidth: '820px',
        }">{{ description }}</div>
      </div>

      <!-- Footer row -->
      <div :style="{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }">
        <div :style="{ display: 'flex', alignItems: 'center', gap: '12px' }">
          <div :style="{
            width: '32px',
            height: '2px',
            backgroundColor: '#0CB99E',
            borderRadius: '2px',
          }" />
          <span :style="{
            fontSize: '15px',
            fontWeight: '500',
            color: '#3A4E7A',
            letterSpacing: '0.04em',
          }">protegey.com</span>
        </div>

        <div :style="{
          display: 'flex',
          gap: '8px',
        }">
          <div v-for="c in ['#0CB99E', '#1B59AE', '#3A4E7A']" :key="c" :style="{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: c,
            opacity: c === '#3A4E7A' ? 0.4 : 1,
          }" />
        </div>
      </div>

    </div>
  </div>
</template>
