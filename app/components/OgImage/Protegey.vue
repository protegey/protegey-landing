<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description?: string
  tagline?: string
  siteName?: string
}>(), {
  description: 'Shared Fraud Intelligence for African Financial Institutions',
  tagline: 'Fraud Intelligence · Africa',
  siteName: 'protegey.com',
})
</script>

<template>
  <!-- Root: flex row — accent bar left, content right -->
  <div :style="{
    display: 'flex',
    flexDirection: 'row',
    width: '1200px',
    height: '630px',
    backgroundColor: '#060D1C',
    overflow: 'hidden',
    fontFamily: 'Inter, sans-serif',
  }">

    <!-- Left accent bar -->
    <div :style="{
      display: 'flex',
      width: '6px',
      height: '630px',
      background: 'linear-gradient(to bottom, #0CB99E, #1B59AE)',
      flexShrink: '0',
    }" />

    <!-- Main content column -->
    <div :style="{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '56px 72px 52px 74px',
      width: '100%',
      height: '100%',
    }">

      <!-- Header row: wordmark + badge -->
      <div :style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }">
        <!-- Logo -->
        <img
          src="/images/logo-light-mode.png"
          :style="{ height: '36px', width: 'auto' }"
        />

        <!-- Tagline badge -->
        <div :style="{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid rgba(12,185,158,0.30)',
          borderRadius: '20px',
          padding: '8px 18px',
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
          }">{{ tagline }}</span>
        </div>
      </div>

      <!-- Title + description -->
      <div :style="{ display: 'flex', flexDirection: 'column', gap: '20px' }">
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
          }">{{ siteName }}</span>
        </div>

        <!-- Three static dots -->
        <div :style="{ display: 'flex', gap: '8px', alignItems: 'center' }">
          <div :style="{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0CB99E' }" />
          <div :style="{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1B59AE' }" />
          <div :style="{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3A4E7A', opacity: 0.4 }" />
        </div>
      </div>

    </div>
  </div>
</template>
