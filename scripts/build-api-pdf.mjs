#!/usr/bin/env node
// Build the downloadable API documentation PDFs (public/docs/protegey-api-documentation-{fr,en}.pdf)
// from exactly what the /api-docs page renders: the page's own i18n strings + the synced
// partner-API catalog (app/data/partner-api-catalog). Re-run after `npm run sync:catalog`.
//
// No npm dependency: the HTML is built here, then printed by a local Chrome/Chromium in headless
// mode (CHROME_PATH, or the usual install locations). Chrome ≥ 131 is needed for the page-number
// margin boxes.
import { execFileSync } from 'node:child_process'
import { existsSync, readdirSync } from 'node:fs'
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { homedir, tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const catalogDir = join(root, 'app', 'data', 'partner-api-catalog')
const outDir = join(root, 'public', 'docs')
const API_BASE_URL = 'https://api.protegey.com'

const readJson = async (p) => JSON.parse(await readFile(p, 'utf8'))

const index = await readJson(join(catalogDir, 'index.json'))
const webhookEvents = await readJson(join(catalogDir, 'webhook-events.json'))
const modules = Object.fromEntries(
    await Promise.all(index.modules.map(async (m) => [m.key, await readJson(join(catalogDir, 'modules', `${m.key}.json`))])),
)

// Same order as the /api-docs page body.
const GROUPS = [
    { id: 'pan-monitor', sections: [
        { key: 'transactions', module: 'transactions', title: 'transactions_title', desc: 'transactions_desc' },
        { key: 'cash-deposits', module: 'cashDeposits', title: 'cash_deposits_title', desc: 'cash_deposits_desc' },
        { key: 'alerts', module: 'alerts', title: 'alerts_title', desc: 'alerts_desc' },
        { key: 'decision-flow', title: 'decision_flow_title', desc: 'decision_flow_desc', diagram: true },
    ] },
    { id: 'pan-id', sections: [
        { key: 'kyc', module: 'kyc', title: 'kyc_title', desc: 'kyc_desc',
          notes: ['kyc_decision_note', 'kyc_capture_note', 'kyc_poll_note', 'kyc_images_note', 'kyc_list_note', 'kyc_update_note'] },
        { key: 'kyb', module: 'kyb', title: 'kyb_title', desc: 'kyb_desc', notes: ['kyb_invite_note', 'kyb_screen_note', 'kyb_scope_note'] },
    ] },
    { id: 'pan-risk', sections: [
        { key: 'sanctions', module: 'screening', title: 'sanctions_title', desc: 'sanctions_desc' },
    ] },
    { id: 'pan-intel', sections: [
        { key: 'device-events', module: 'deviceEvents', title: 'device_title', desc: 'device_desc' },
        { key: 'behavioral-events', module: 'behavioralEvents', title: 'behavioral_title', desc: 'behavioral_desc', notes: ['behavioral_stepup_note'] },
        { key: 'shared-signal', module: 'sharedSignals', title: 'shared_signal_title', desc: 'shared_signal_desc', notes: ['shared_signal_optin_note'] },
    ] },
]

const SDKS = [
    { platform: 'JavaScript / TypeScript', package: '@protegey/sdk', install: 'npm install git+https://github.com/protegey/protegey_js_sdk.git', repo: 'https://github.com/protegey/protegey_js_sdk' },
    { platform: 'React Native', package: '@protegey/react-native-sdk', install: 'npm install git+https://github.com/protegey/protegey_react_native_sdk.git', repo: 'https://github.com/protegey/protegey_react_native_sdk' },
    { platform: 'PHP', package: 'protegey/sdk', install: 'composer require protegey/sdk', repo: 'https://github.com/protegey/protegey_php_sdk' },
    { platform: 'Java', package: 'com.protegey:protegey-sdk', install: "implementation 'com.protegey:protegey-sdk:0.5.0'", repo: 'https://github.com/protegey/protegey_java_sdk' },
    { platform: 'Flutter / Dart', package: 'protegey_sdk', install: 'flutter pub add protegey_sdk', repo: 'https://github.com/protegey/protegey-sdk-flutter' },
    { platform: '.NET', package: 'Protegey.Sdk', install: 'dotnet add package Protegey.Sdk', repo: 'https://github.com/protegey/protegey_dotnet_sdk' },
]

const WEBHOOK_VERIFY_EXAMPLE = `// Node.js — verify a delivery is genuinely from Protegey and hasn't been replayed
import { createHmac, timingSafeEqual } from "node:crypto";

function isValidProtegeyWebhook(rawBody, signatureHeader, timestampHeader, webhookSecret) {
  if (Math.abs(Date.now() / 1000 - Number(timestampHeader)) > 300) return false;

  const expected = createHmac("sha256", webhookSecret)
    .update(\`\${timestampHeader}.\${rawBody}\`, "utf8")
    .digest("hex");

  return timingSafeEqual(Buffer.from(expected), Buffer.from(signatureHeader));
}`

// Strings only the PDF needs (everything else comes from the page's own locale files).
const PDF_STRINGS = {
    fr: {
        doc_title: 'Documentation de l’API partenaire',
        doc_subtitle: 'Guide d’intégration et référence complète : authentification, modules, scénarios, webhooks et erreurs.',
        contents: 'Sommaire',
        generated: 'Édition du',
        catalog: 'Catalogue',
        intro: 'Introduction',
        header: 'Protegey — Documentation API',
        page: 'Page',
        online: 'Version en ligne, toujours à jour',
        sdk_platform: 'Plateforme', sdk_package: 'Paquet', sdk_install: 'Installation', sdk_repo: 'Dépôt',
        module_overview: 'Endpoints',
        see_scenarios: 'Voir les scénarios',
        contact: 'Contact',
        contact_body: 'Pour obtenir une clé sandbox ou poser une question d’intégration :',
    },
    en: {
        doc_title: 'Partner API documentation',
        doc_subtitle: 'Integration guide and full reference: authentication, modules, scenarios, webhooks and errors.',
        contents: 'Contents',
        generated: 'Edition of',
        catalog: 'Catalog',
        intro: 'Introduction',
        header: 'Protegey — API documentation',
        page: 'Page',
        online: 'Online version, always up to date',
        sdk_platform: 'Platform', sdk_package: 'Package', sdk_install: 'Install', sdk_repo: 'Repository',
        module_overview: 'Endpoints',
        see_scenarios: 'See scenarios',
        contact: 'Contact',
        contact_body: 'To get a sandbox key or ask an integration question:',
    },
}

// ── Helpers ──────────────────────────────────────────────────────────────────────────────────
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
// Catalog prose: `backticked` spans become <code>, nothing else is interpreted (same as CatalogText.vue).
const prose = (s) => String(s ?? '').split('`').map((v, i) => (i % 2 ? `<code>${esc(v)}</code>` : esc(v))).join('')
const json = (v) => JSON.stringify(v, null, 2)
const slug = (s) => String(s).replace(/[^a-z0-9]+/gi, '-').toLowerCase()
const pre = (code) => `<pre>${esc(code)}</pre>`

function buildCurl(ep) {
    let path = ep.path
    for (const p of ep.pathParams ?? []) path = path.replace(`{${p.name}}`, encodeURIComponent(String(p.example ?? `<${p.name}>`)))
    const query = (ep.query ?? [])
        .filter((q) => q.example !== undefined && q.example !== null)
        .map((q) => `${encodeURIComponent(q.name)}=${encodeURIComponent(String(q.example))}`)
    const url = `${API_BASE_URL}${path}${query.length ? `?${query.join('&')}` : ''}`
    const lines = [`curl -X ${ep.method} "${url}"`, '  -H "x-api-key: YOUR_API_KEY"']
    const body = {}
    for (const f of ep.body ?? []) if (f.example !== undefined) body[f.name] = f.example
    if (Object.keys(body).length) {
        lines.splice(1, 0, '  -H "Content-Type: application/json"')
        lines.push(`  -d '${JSON.stringify(body, null, 2).replace(/'/g, `'\\''`)}'`)
    }
    return lines.join(' \\\n')
}

function scenarioMatcher(ep) {
    const re = new RegExp(`^${ep.method} ${ep.path.replace(/[.*+?^$()|[\]\\]/g, '\\$&').replace(/\{[^}]+\}/g, '[^/?]+')}(\\?.*)?$`)
    return (s) => re.test(String(s.request).trim())
}

const statusClass = (s) => (s < 300 ? 'ok' : s < 500 ? 'warn' : 'err')
const whType = (w) => (typeof w === 'string' ? w : w?.type ?? '')

// ── Document ─────────────────────────────────────────────────────────────────────────────────
function render(lang, locale) {
    const P = PDF_STRINGS[lang]
    const A = locale.api_docs
    const C = A.catalog
    const t = (key, vars = {}) => String(A[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`)
    const tc = (key, vars = {}) => String(C[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`)
    const L = (v) => (v && typeof v === 'object' ? v[lang] ?? v.en ?? '' : v ?? '')
    const moduleMeta = (key) => index.modules.find((m) => m.key === key)
    const today = new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date())

    const constraintLabel = (key, value) => {
        const map = { minimum: 'c_minimum', maximum: 'c_maximum', exclusiveMinimum: 'c_exclusive_minimum', minLength: 'c_min_length', maxLength: 'c_max_length', notEmpty: 'c_not_empty' }
        return map[key] ? tc(map[key], { n: String(value) }) : `${key}: ${value}`
    }
    const exampleText = (v) => (typeof v === 'string' ? v : JSON.stringify(v))

    const values = (list) => `<ul class="values">${list.map((v) => `<li><code class="val">${esc(v.value === null ? 'null' : v.value)}</code>${v.description ? ` — ${prose(L(v.description))}` : ''}</li>`).join('')}</ul>`

    const params = (list) => {
        const rows = []
        for (const p of list ?? []) {
            rows.push({ ...p, fullName: p.name, depth: 0 })
            for (const f of p.fields ?? []) rows.push({ ...f, fullName: `${p.name}.${f.name}`, depth: 1 })
        }
        return `<div class="rows">${rows.map((r) => `
            <div class="row${r.depth ? ' nested' : ''}">
              <div class="row-head"><code class="name">${esc(r.fullName)}</code> <span class="type">${esc(r.type)}${r.format ? ` · ${esc(r.format)}` : ''}</span>
                ${r.required ? `<span class="pill req">${esc(tc('required'))}</span>` : `<span class="pill opt">${esc(tc('optional'))}</span>`}
                ${r.default !== undefined ? `<span class="muted">${esc(tc('default'))} : <code>${esc(exampleText(r.default))}</code></span>` : ''}</div>
              ${r.description ? `<p>${prose(L(r.description))}</p>` : ''}
              ${r.requiredWhen ? `<p class="warn-text"><b>${esc(tc('required_when'))} :</b> ${prose(L(r.requiredWhen))}</p>` : ''}
              ${r.constraints && Object.keys(r.constraints).length ? `<p class="chips">${Object.entries(r.constraints).map(([k, v]) => `<span class="chip">${esc(constraintLabel(k, v))}</span>`).join(' ')}</p>` : ''}
              ${r.allowedValues?.length ? `<p class="label">${esc(tc('allowed_values'))}</p>${values(r.allowedValues)}` : ''}
              ${r.casing ? `<p class="muted"><b>${esc(tc('casing'))} :</b> ${prose(L(r.casing))}</p>` : ''}
              ${r.notes ? `<p class="muted"><b>${esc(tc('notes'))} :</b> ${prose(L(r.notes))}</p>` : ''}
              ${r.example !== undefined && !r.fields ? `<p class="muted">${esc(tc('example'))} : <code>${esc(exampleText(r.example))}</code></p>` : ''}
            </div>`).join('')}</div>`
    }

    const fields = (list) => `<div class="rows">${(list ?? []).map((f) => {
        const depth = Math.min(3, f.path.split('.').length - 1)
        return `
            <div class="row" style="padding-left:${2.4 + depth * 3.2}mm">
              <div class="row-head"><code class="name">${esc(f.path)}</code> <span class="type">${esc(f.type)}</span>
                ${f.nullable ? `<span class="pill null">${esc(tc('nullable'))}</span>` : ''}
                ${f.optional ? `<span class="pill opt">${esc(tc('may_be_absent'))}</span>` : ''}
                ${f.opaque ? `<span class="pill opt">${esc(tc('opaque'))}</span>` : ''}</div>
              ${f.description ? `<p>${prose(L(f.description))}</p>` : ''}
              ${f.opaque ? `<p class="muted">${esc(tc('opaque_hint'))}</p>` : ''}
              ${f.appearsWhen ? `<p class="muted"><b>${esc(tc('appears_when'))} :</b> ${prose(L(f.appearsWhen))}</p>` : ''}
              ${f.values?.length ? `<p class="label">${esc(tc('possible_values'))}</p>${values(f.values)}` : ''}
              ${f.example !== undefined ? `<p class="muted">${esc(tc('example'))} : <code>${esc(exampleText(f.example))}</code></p>` : ''}
            </div>`
    }).join('')}</div>`

    const lifecycle = (lc) => {
        const splitTo = (to) => to.split(' | ').map((s) => s.trim()).filter(Boolean)
        return `
          <h4>${esc(tc('lifecycle'))}</h4>
          <p class="muted">${esc(tc('lifecycle_field'))} <code>${esc(lc.field)}</code></p>
          <p class="label">${esc(tc('states'))}</p>${values(lc.states)}
          ${lc.submissionStates?.length ? `<p class="label">${esc(tc('submission_states'))}</p>${values(lc.submissionStates)}` : ''}
          ${lc.transitions?.length ? `<p class="label">${esc(tc('transitions'))}</p>
            <ol class="transitions">${lc.transitions.map((tr) => `
              <li>
                <div class="tr-line">
                  <span class="tr-from">${tr.from.length ? tr.from.map((f) => (f === '*' ? `<span class="state any">${esc(tc('any_state'))}</span>` : `<span class="state">${esc(f)}</span>`)).join(' ') : `<span class="state any">${esc(tc('start'))}</span>`}</span>
                  <span class="arrow">→</span>
                  <span class="tr-to">${splitTo(tr.to).map((x) => `<span class="state to">${esc(x)}</span>`).join(' ')}</span>
                  ${tr.webhook ? `<span class="wh">${esc(tr.webhook)}</span>` : `<span class="muted"><i>${esc(tc('no_webhook'))}</i></span>`}
                </div>
                <p>${prose(L(tr.trigger))}</p>
              </li>`).join('')}</ol>` : ''}
          ${lc.note ? `<p class="callout">${prose(L(lc.note))}</p>` : ''}
          ${lc.dispositions?.length ? `<p class="label">${esc(tc('dispositions'))}</p>${values(lc.dispositions)}` : ''}`
    }

    const moduleReference = (key, anchor) => {
        const meta = moduleMeta(key)
        const detail = modules[key]
        const scAnchor = (id) => `${anchor}-sc-${slug(id)}`
        const shapeAnchor = (name) => `${anchor}-shape-${slug(name)}`
        const endpoints = meta.endpoints.map((summary) => {
            const d = detail.endpoints.find((e) => e.id === summary.id) ?? summary
            const outcomes = detail.scenarios.filter(scenarioMatcher(d))
            return `
              <div class="endpoint">
                <h5 id="${anchor}-ep-${slug(d.id)}"><span class="method m-${esc(d.method)}">${esc(d.method)}</span> <code>${esc(d.path)}</code></h5>
                <p>${prose(L(d.summary))}</p>
                ${d.notes ? `<p class="callout"><b>${esc(tc('notes'))} :</b> ${prose(L(d.notes))}</p>` : ''}
                ${['pathParams', 'query', 'body'].map((loc) => (d[loc]?.length ? `<p class="label">${esc(tc(`loc_${loc}`))}</p>${params(d[loc])}` : '')).join('')}
                ${!d.pathParams?.length && !d.query?.length && !d.body?.length ? `<p class="muted">${esc(tc('no_params'))}</p>` : ''}
                <p class="label">${esc(tc('example_request'))}</p>${pre(buildCurl(d))}
                <p class="meta-line">${esc(tc('success'))} : <span class="status ${statusClass(d.successStatus)}">HTTP ${esc(d.successStatus)}</span>
                  ${d.responseShape ? `<a href="#${shapeAnchor(d.responseShape)}"><code>${esc(d.responseShape)}</code></a>` : ''}</p>
                <p class="meta-line">${esc(tc('webhooks_fired'))} : ${d.webhooksFired?.length ? d.webhooksFired.map((w) => `<a class="wh" href="#wh-${slug(w)}">${esc(w)}</a>`).join(' ') : `<i class="muted">${esc(tc('none'))}</i>`}</p>
                ${outcomes.length ? `<p class="meta-line">${esc(tc('possible_outcomes'))} : ${outcomes.map((s) => `<a class="outcome" href="#${scAnchor(s.id)}">${esc(L(s.title))}</a>`).join(' ')}</p>` : ''}
                ${d.errors?.length ? `<p class="label">${esc(tc('errors'))}</p>
                  <div class="errors">${d.errors.map((err) => `
                    <div class="error">
                      <p><span class="status ${statusClass(err.status)}">HTTP ${esc(err.status)}</span> ${err.body?.errorCode ? `<code class="errcode">${esc(err.body.errorCode)}</code>` : ''} ${prose(L(err.when))}</p>
                      ${pre(json(err.body))}
                    </div>`).join('')}</div>` : ''}
              </div>`
        }).join('')

        const scenarios = detail.scenarios.map((s) => `
          <div class="scenario" id="${scAnchor(s.id)}">
            <h5><span class="status ${statusClass(s.httpStatus)}">${esc(s.httpStatus)}</span> ${esc(L(s.title))}
              ${s.sandboxTrigger ? `<span class="sandbox">sandbox : ${esc(s.sandboxTrigger)}</span>` : ''}</h5>
            <p class="callout brand"><b>${esc(tc('what_to_do'))}</b> ${prose(L(s.description))}</p>
            <p class="label">${esc(tc('request'))}</p><p><code>${esc(s.request)}</code></p>
            <p class="label">${esc(tc('response'))} — HTTP ${esc(s.httpStatus)} · <a href="#${shapeAnchor(s.shape)}"><code>${esc(s.shape)}</code></a></p>
            ${pre(json(s.response))}
            ${s.webhooks?.length ? s.webhooks.map((w) => `<p class="label">${esc(tc('webhook_payload'))} · <a class="wh" href="#wh-${slug(whType(w))}">${esc(whType(w))}</a></p>${typeof w === 'object' ? pre(json(w)) : ''}`).join('')
                : `<p class="muted">${esc(tc('webhooks_triggered'))} : <i>${esc(tc('none'))}</i></p>`}
          </div>`).join('')

        const shapes = Object.entries(detail.responses).map(([name, shape]) => `
          <div class="shape">
            <h5 id="${shapeAnchor(name)}"><code>${esc(name)}</code> <span class="muted">· ${esc(tc('field_count', { n: shape.fields.length }))}</span></h5>
            <p>${prose(L(shape.description))}</p>
            ${fields(shape.fields)}
          </div>`).join('')

        return `
          <div class="reference">
            <h4 class="ref-title">${esc(tc('reference_title'))} — ${esc(L(meta.title))}</h4>
            ${meta.lifecycle ? lifecycle(meta.lifecycle) : ''}
            <h4>${esc(tc('tab_endpoints'))} (${meta.endpoints.length})</h4>${endpoints}
            <h4 class="break-before">${esc(tc('tab_scenarios'))} (${detail.scenarios.length})</h4>${scenarios || `<p class="muted">${esc(tc('none'))}</p>`}
            <h4 class="break-before">${esc(tc('tab_responses'))} (${Object.keys(detail.responses).length})</h4>${shapes}
          </div>`
    }

    const decisionFlow = () => {
        const x = { backend: 70, protegey: 340, webhook: 610 }
        const actor = (k, label) => `
          <rect x="${x[k] - 65}" y="14" width="130" height="36" rx="10" fill="#fff" stroke="#1d2b33" stroke-width="1.5"/>
          <text x="${x[k]}" y="37" text-anchor="middle" font-size="12" font-weight="700" fill="#1d2b33">${esc(label)}</text>
          <line x1="${x[k]}" y1="50" x2="${x[k]}" y2="285" stroke="#1d2b33" stroke-dasharray="3,4" opacity=".35"/>`
        const arrow = (a, b, y, label, note, dashed) => {
            const dir = x[b] > x[a] ? 1 : -1
            return `
              <line x1="${x[a]}" y1="${y}" x2="${x[b] - dir * 6}" y2="${y}" stroke="#0a7a69" stroke-width="1.5" ${dashed ? 'stroke-dasharray="5,4"' : ''} marker-end="url(#ah)"/>
              <text x="${(x[a] + x[b]) / 2}" y="${y - 9}" text-anchor="middle" font-size="10.5" font-weight="700" font-family="IBM Plex Mono, monospace" fill="#1d2b33">${esc(label)}</text>
              ${note ? `<text x="${(x[a] + x[b]) / 2}" y="${y + 15}" text-anchor="middle" font-size="9.5" fill="#5b6b73">${esc(note)}</text>` : ''}`
        }
        return `
          <figure class="diagram">
            <svg viewBox="0 0 680 300" role="img" aria-label="${esc(t('decision_flow_desc'))}">
              <defs><marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#0a7a69"/></marker></defs>
              ${actor('backend', t('decision_flow_actor_backend'))}${actor('protegey', t('decision_flow_actor_protegey'))}${actor('webhook', t('decision_flow_actor_webhook'))}
              <text x="10" y="75" font-size="9" font-weight="800" letter-spacing=".6" fill="#5b6b73">${esc(t('decision_flow_sync_label').toUpperCase())}</text>
              ${arrow('backend', 'protegey', 95, t('decision_flow_arrow1'), null, false)}
              ${arrow('protegey', 'backend', 140, t('decision_flow_arrow2'), null, true)}
              <line x1="10" y1="170" x2="670" y2="170" stroke="#1d2b33" stroke-width=".5" opacity=".2"/>
              <text x="10" y="192" font-size="9" font-weight="800" letter-spacing=".6" fill="#5b6b73">${esc(t('decision_flow_async_label').toUpperCase())}</text>
              ${arrow('protegey', 'webhook', 215, t('decision_flow_arrow3'), t('decision_flow_arrow3_note'), true)}
              ${arrow('protegey', 'webhook', 265, t('decision_flow_arrow4'), t('decision_flow_arrow4_note'), true)}
            </svg>
          </figure>`
    }

    // Chapters, numbered in reading order — the TOC is built from the same list.
    const toc = []
    let chapterNo = 0
    const chapter = (id, title, body, { group } = {}) => {
        chapterNo += 1
        toc.push({ id, title, no: chapterNo, group })
        return `<section class="chapter" id="${id}"><h2><span class="no">${chapterNo}</span>${esc(title)}</h2>${body}</section>`
    }

    const c = index.conventions
    const convRows = [
        ['base_url', null, L(c.baseUrl)],
        ['auth', c.authentication?.header, L(c.authentication?.description)],
        ['content_type', c.contentType, ''],
        ['casing', null, L(c.casing?.description), c.casing?.upperCasedFields],
        ['timestamps', null, L(c.timestamps)],
        ['amounts', null, L(c.amounts)],
        ['nulls', null, L(c.nulls)],
        ['unknown_fields', null, L(c.unknownFields)],
        ['pagination', null, L(c.pagination)],
        ['rate_limiting', null, L(c.rateLimiting)],
    ].filter((r) => r[1] || r[2])

    const chapters = []
    chapters.push(chapter('introduction', P.intro, `
        <p class="lead">${esc(t('hero_subtitle'))}</p>
        <h3>${esc(t('auth_title'))}</h3>
        <p>${esc(t('auth_desc'))}</p>
        ${pre(`curl -H "x-api-key: YOUR_API_KEY" ${API_BASE_URL}/partner-api/transactions/tx-00234`)}`))

    chapters.push(chapter('sdks', t('sdks_title'), `
        <p>${esc(t('sdks_subtitle'))}</p>
        <table class="sdk">
          <thead><tr><th>${esc(P.sdk_platform)}</th><th>${esc(P.sdk_package)}</th><th>${esc(P.sdk_install)}</th></tr></thead>
          <tbody>${SDKS.map((s) => `<tr><td><b>${esc(s.platform)}</b><br><a class="small" href="${esc(s.repo)}">${esc(s.repo.replace('https://', ''))}</a></td><td><code>${esc(s.package)}</code></td><td><code class="wrap">${esc(s.install)}</code></td></tr>`).join('')}</tbody>
        </table>`))

    chapters.push(chapter('conventions', tc('conventions_title'), `
        <p>${esc(tc('conventions_desc'))}</p>
        <dl class="defs">${convRows.map(([k, code, text, chips]) => `
          <div><dt>${esc(tc(`conv_${k}`))}</dt><dd>${code ? `<code>${esc(code)}</code> ` : ''}${prose(text)}
            ${chips?.length ? `<p class="chips">${chips.map((f) => `<code class="val">${esc(f)}</code>`).join(' ')}</p>` : ''}</dd></div>`).join('')}
        </dl>`))

    for (const g of GROUPS) {
        const groupTitle = t(`group_pan_${g.id.slice(4).replace('-', '_')}_title`)
        const groupTagline = t(`group_pan_${g.id.slice(4).replace('-', '_')}_tagline`)
        toc.push({ id: `group-${g.id}`, title: groupTitle, isGroup: true })
        chapters.push(`<div class="group" id="group-${g.id}"><p class="group-title">${esc(groupTitle)}</p><p class="group-tagline">${esc(groupTagline)}</p></div>`)
        for (const s of g.sections) {
            chapters.push(chapter(s.key, t(s.title), `
                <p>${esc(t(s.desc))}</p>
                ${s.notes?.length ? `<ul class="notes">${s.notes.map((n) => `<li>${esc(t(n))}</li>`).join('')}</ul>` : ''}
                ${s.diagram ? decisionFlow() : ''}
                ${s.module ? moduleReference(s.module, `ref-${s.key}`) : ''}`, { group: g.id }))
        }
    }

    const sb = index.sandboxScenarios
    const sandboxModuleLabel = (k) => L(moduleMeta(k === 'sanctions' ? 'screening' : k)?.title) || k
    chapters.push(chapter('sandbox', tc('sandbox_title'), `
        <p>${esc(tc('sandbox_desc'))}</p>
        <p>${prose(L(sb.description))}</p>
        <div class="sandbox-list">${sb.scenarios.map((s) => `
          <div class="sb">
            <p class="sb-head"><span class="chip">${esc(sandboxModuleLabel(s.module))}</span> <code>${esc(s.field)}</code> <span class="muted">${esc(tc(s.match === 'prefix' ? 'match_prefix' : 'match_exact'))}</span> <code class="sandbox-val">${esc(s.value)}</code></p>
            <p>${prose(lang === 'fr' ? s.resultFr || s.result : s.result)}</p>
            <p class="muted">${s.endpoints.map((e) => `<code>${esc(e)}</code>`).join(' ')} · ${esc(tc('webhooks_triggered'))} : ${s.webhooks?.length ? s.webhooks.map((w) => `<a class="wh" href="#wh-${slug(w)}">${esc(w)}</a>`).join(' ') : `<i>${esc(tc('none'))}</i>`}</p>
          </div>`).join('')}</div>
        <p class="callout">${esc(tc('kyb_no_sandbox'))}</p>`))

    const wd = index.webhooks.delivery
    chapters.push(chapter('webhooks', t('webhooks_title'), `
        <p>${esc(t('webhooks_desc'))}</p>
        <p>${esc(t('webhooks_sync_note'))}</p>
        <h3>${esc(tc('wh_delivery'))}</h3>
        <dl class="defs">
          <div><dt>${esc(tc('wh_method'))}</dt><dd><code>${esc(`${wd.method} · ${wd.contentType}`)}</code></dd></div>
          ${['success', 'retries', 'ordering', 'environments', 'casing'].map((k) => `<div><dt>${esc(tc(`wh_${k}`))}</dt><dd>${prose(L(wd[k]))}</dd></div>`).join('')}
          ${wd.headers.map((h) => `<div><dt><code>${esc(h.name)}</code></dt><dd>${prose(L(h.description))}</dd></div>`).join('')}
        </dl>
        <h3>${esc(t('webhooks_verify_title'))}</h3>
        <p>${esc(t('webhooks_verify_body'))}</p>
        ${pre(WEBHOOK_VERIFY_EXAMPLE)}
        <h3>${esc(t('webhooks_reliability_title'))}</h3>
        <p>${esc(t('webhooks_reliability_body'))}</p>
        <h3 class="break-before">${esc(tc('wh_events'))}</h3>
        ${index.webhooks.events.map((ev) => {
            const d = webhookEvents[ev.type]
            return `
              <div class="event">
                <h4 id="wh-${slug(ev.type)}"><code class="wh-title">${esc(ev.type)}</code></h4>
                <p>${prose(L(ev.description))}</p>
                ${d ? `<p class="label">${esc(tc('payload_fields'))}</p>${fields(d.fields)}
                  <p class="label">${esc(tc('payload_examples'))}</p>${d.examples.map((ex) => pre(json(ex))).join('')}` : ''}
              </div>`
        }).join('')}`))

    const ef = c.errorFormat
    chapters.push(chapter('errors', t('errors_title'), `
        <p>${esc(t('errors_desc'))}</p>
        ${ef ? `<p>${prose(L(ef.description))}</p>
          ${ef.errorCodes?.length ? `<p class="label">errorCode</p>${values(ef.errorCodes)}` : ''}
          <h3>${esc(tc('error_examples'))}</h3>
          ${ef.examples.map((ex) => `<p><span class="status warn">HTTP ${esc(ex.status)}</span> ${prose(L(ex.when))}</p>${pre(json(ex.body))}`).join('')}
          <p class="muted">${esc(tc('errors_per_endpoint'))}</p>` : ''}`))

    const tocHtml = `
      <section class="toc">
        <h2>${esc(P.contents)}</h2>
        <ol>${toc.map((e) => (e.isGroup
            ? `<li class="toc-group"><a href="#${e.id}">${esc(e.title)}</a></li>`
            : `<li${e.group ? ' class="toc-sub"' : ''}><a href="#${e.id}"><span class="no">${e.no}</span>${esc(e.title)}</a></li>`)).join('')}</ol>
      </section>`

    const logo = pathToFileURL(join(root, 'public', 'images', 'logo-light.svg')).href
    // French is the site's default locale (no prefix).
    const onlineUrl = `https://www.protegey.com${lang === 'fr' ? '' : `/${lang}`}/api-docs`

    return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>Protegey — ${esc(P.doc_title)}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;600&display=swap">
<style>
  :root {
    --ink: #13212a; --body: #34444d; --muted: #66767e; --line: #dbe3e6; --soft: #f3f7f7;
    --brand: #0cb99e; --brand-deep: #0a7a69; --brand-soft: #e9f9f5; --blue: #1b59ae;
    --amber: #a15c07; --amber-soft: #fdf5e7; --rose: #b4233c; --rose-soft: #fdecef; --violet: #6d3fc0;
  }
  @page {
    size: A4; margin: 20mm 17mm 18mm 17mm;
    @top-left { content: "${esc(P.header)}"; font: 600 7.5pt Inter, sans-serif; color: #8a989e; }
    @top-right { content: "${esc(P.catalog)} v${index.catalogVersion} · ${esc(today)}"; font: 400 7.5pt Inter, sans-serif; color: #8a989e; }
    @bottom-right { content: "${esc(P.page)} " counter(page) " / " counter(pages); font: 500 7.5pt Inter, sans-serif; color: #8a989e; }
    @bottom-left { content: "www.protegey.com"; font: 400 7.5pt Inter, sans-serif; color: #8a989e; }
  }
  @page cover { margin: 0; @top-left { content: none } @top-right { content: none } @bottom-right { content: none } @bottom-left { content: none } }
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { margin: 0; font: 9pt/1.55 Inter, "Helvetica Neue", Arial, sans-serif; color: var(--body); background: #fff; }
  a { color: var(--blue); text-decoration: none; }
  code, pre { font-family: "IBM Plex Mono", Menlo, Consolas, monospace; }
  code { font-size: .88em; background: var(--soft); border-radius: 3px; padding: 0 .3em; color: var(--ink); overflow-wrap: anywhere; }
  pre { font-size: 7pt; line-height: 1.45; background: #0f1d24; color: #d7e3e6; border-radius: 6px; padding: 3mm 3.5mm; white-space: pre-wrap; word-break: break-all; margin: 1.5mm 0 3mm; }
  p { margin: 1.2mm 0; }
  h2, h3, h4, h5 { color: var(--ink); break-after: avoid; text-wrap: balance; }
  h2 { font-size: 17pt; font-weight: 800; letter-spacing: -.01em; margin: 0 0 4mm; display: flex; gap: 3mm; align-items: baseline; }
  h2 .no { color: var(--brand); font-size: 12pt; font-weight: 700; min-width: 7mm; }
  h3 { font-size: 11.5pt; font-weight: 700; margin: 6mm 0 2mm; }
  h4 { font-size: 10pt; font-weight: 700; margin: 6mm 0 2mm; padding-bottom: 1mm; border-bottom: 1px solid var(--line); }
  h5 { font-size: 9.5pt; font-weight: 700; margin: 0 0 1.5mm; display: flex; flex-wrap: wrap; gap: 2mm; align-items: center; }
  h5 code { background: none; padding: 0; font-size: 9pt; }
  .break-before { break-before: page; }

  /* Cover */
  .cover { page: cover; height: 297mm; position: relative; display: flex; flex-direction: column; padding: 26mm 22mm 22mm; background: #fff; }
  .cover::before { content: ""; position: absolute; inset: 0 0 auto 0; height: 9mm; background: linear-gradient(90deg, var(--brand) 0 62%, var(--blue) 62% 100%); }
  .cover img { width: 58mm; }
  .cover .kicker { margin-top: 62mm; font-size: 10pt; font-weight: 700; color: var(--brand-deep); letter-spacing: .04em; }
  .cover h1 { font-size: 34pt; line-height: 1.08; letter-spacing: -.02em; color: var(--ink); margin: 3mm 0 6mm; font-weight: 800; max-width: 150mm; }
  .cover .sub { font-size: 12pt; line-height: 1.5; color: var(--body); max-width: 135mm; }
  .cover .modules { margin-top: 12mm; display: grid; grid-template-columns: repeat(4, 1fr); gap: 3mm; max-width: 166mm; }
  .cover .modules div { border-top: 2px solid var(--brand); padding-top: 2mm; font-size: 8pt; color: var(--muted); }
  .cover .modules b { display: block; color: var(--ink); font-size: 10pt; margin-bottom: 1mm; }
  .cover .foot { margin-top: auto; display: flex; justify-content: space-between; align-items: flex-end; font-size: 8.5pt; color: var(--muted); border-top: 1px solid var(--line); padding-top: 4mm; }
  .cover .foot b { color: var(--ink); }

  /* TOC */
  .toc { break-after: page; }
  .toc ol { list-style: none; padding: 0; margin: 0; columns: 1; }
  .toc li a { display: flex; gap: 3mm; padding: 1.6mm 0; border-bottom: 1px dotted var(--line); color: var(--ink); font-size: 10pt; }
  .toc li .no { color: var(--brand-deep); font-weight: 700; min-width: 7mm; }
  .toc .toc-sub a { padding-left: 6mm; font-size: 9.5pt; }
  .toc .toc-group a { margin-top: 3mm; font-weight: 800; color: var(--brand-deep); border-bottom: none; font-size: 10.5pt; }

  .chapter { break-before: page; }
  .group + .chapter { break-before: avoid; }
  .group { break-before: page; margin-bottom: 8mm; padding: 6mm 7mm; border-radius: 8px; background: var(--brand-soft); border-left: 3px solid var(--brand); }
  .group-title { font-size: 20pt; font-weight: 800; color: var(--ink); margin: 0; }
  .group-tagline { font-size: 10pt; color: var(--body); margin: 1.5mm 0 0; }
  .lead { font-size: 11pt; color: var(--ink); line-height: 1.55; }
  .notes { padding-left: 5mm; margin: 2mm 0; }
  .notes li { margin: 1.2mm 0; }

  .muted { color: var(--muted); font-size: 8pt; }
  .label { font-size: 7pt; font-weight: 700; letter-spacing: .06em; text-transform: uppercase; color: var(--muted); margin: 3.5mm 0 1.2mm; }
  .label code, .label a { text-transform: none; letter-spacing: 0; }
  .callout { background: var(--amber-soft); border-left: 2px solid #e7a63b; padding: 2mm 3mm; border-radius: 4px; font-size: 8.5pt; }
  .callout.brand { background: var(--brand-soft); border-left-color: var(--brand); }
  .warn-text { color: var(--amber); font-size: 8.5pt; }
  .chips { display: flex; flex-wrap: wrap; gap: 1.2mm; }
  .chip { display: inline-block; background: var(--soft); border-radius: 3px; padding: 0 1.6mm; font-size: 7.5pt; color: var(--body); }
  code.val { background: var(--brand-soft); color: var(--brand-deep); font-weight: 600; }

  .values { list-style: none; padding: 0; margin: 0 0 1mm; }
  .values li { font-size: 8.5pt; margin: .9mm 0; break-inside: avoid; }

  .rows { border: 1px solid var(--line); border-radius: 6px; }
  .row { padding: 2mm 2.4mm; border-top: 1px solid var(--line); break-inside: avoid; }
  .row:first-child { border-top: none; }
  .row.nested { padding-left: 7mm; background: #fafcfc; }
  .row p { font-size: 8.5pt; }
  .row-head { display: flex; flex-wrap: wrap; gap: 1.6mm; align-items: center; }
  .row-head code.name { background: none; padding: 0; font-weight: 600; font-size: 8.5pt; }
  .type { font-family: "IBM Plex Mono", monospace; font-size: 7.5pt; color: var(--blue); }
  .pill { font-size: 6.5pt; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; border-radius: 99px; padding: .2mm 1.6mm; }
  .pill.req { background: var(--rose-soft); color: var(--rose); }
  .pill.opt { background: var(--soft); color: var(--muted); }
  .pill.null { background: var(--amber-soft); color: var(--amber); }

  .reference { margin-top: 6mm; }
  .ref-title { font-size: 12pt; border-bottom: 2px solid var(--brand); }
  .endpoint, .scenario, .shape, .event { margin: 4mm 0 5mm; padding-top: 3mm; border-top: 1px solid var(--line); }
  .endpoint:first-of-type { border-top: none; }
  .method { font: 700 7.5pt "IBM Plex Mono", monospace; border-radius: 3px; padding: .4mm 1.6mm; }
  .m-GET { background: #e6f0fb; color: #1b59ae; }
  .m-POST { background: var(--brand-soft); color: var(--brand-deep); }
  .m-PATCH, .m-PUT { background: var(--amber-soft); color: var(--amber); }
  .m-DELETE { background: var(--rose-soft); color: var(--rose); }
  .status { font: 700 7.5pt "IBM Plex Mono", monospace; border-radius: 3px; padding: .3mm 1.4mm; }
  .status.ok { background: var(--brand-soft); color: var(--brand-deep); }
  .status.warn { background: var(--amber-soft); color: var(--amber); }
  .status.err { background: var(--rose-soft); color: var(--rose); }
  .meta-line { font-size: 8.5pt; display: flex; flex-wrap: wrap; gap: 1.4mm; align-items: center; }
  .wh { font: 600 7.5pt "IBM Plex Mono", monospace; background: #e7f7ef; color: #11734a; border-radius: 99px; padding: .2mm 1.8mm; }
  .wh-title { background: none; padding: 0; color: #11734a; font-size: 10pt; }
  .outcome { font-size: 7.5pt; border: 1px solid var(--line); border-radius: 99px; padding: .1mm 1.8mm; color: var(--body); }
  .sandbox { font: 600 7.5pt "IBM Plex Mono", monospace; background: #f1ebfb; color: var(--violet); border-radius: 99px; padding: .2mm 1.8mm; }
  .sandbox-val { background: #f1ebfb; color: var(--violet); font-weight: 600; }
  .errors .error { margin: 1.5mm 0 2.5mm; }
  .errors .error p { font-size: 8.5pt; }
  .errcode { color: var(--rose); font-weight: 600; background: none; }

  .transitions { list-style: none; padding: 0; margin: 0; }
  .transitions li { border: 1px solid var(--line); border-radius: 6px; background: #fafcfc; padding: 2mm 2.6mm; margin: 0 0 1.6mm; break-inside: avoid; }
  .transitions li p { font-size: 8.5pt; }
  .tr-line { display: flex; flex-wrap: wrap; gap: 1.6mm; align-items: center; }
  .state { font: 600 7.5pt "IBM Plex Mono", monospace; background: #e8edef; color: var(--ink); border-radius: 99px; padding: .2mm 1.8mm; }
  .state.to { background: var(--brand-soft); color: var(--brand-deep); }
  .state.any { background: none; border: 1px dashed #9aa8ad; color: var(--muted); font-family: Inter, sans-serif; }
  .arrow { color: var(--muted); }

  .defs { margin: 3mm 0; border: 1px solid var(--line); border-radius: 6px; }
  .defs div { display: grid; grid-template-columns: 34mm 1fr; gap: 3mm; padding: 2.2mm 3mm; border-top: 1px solid var(--line); break-inside: avoid; }
  .defs div:first-child { border-top: none; }
  .defs dt { font-weight: 700; color: var(--ink); font-size: 8.5pt; }
  .defs dd { margin: 0; font-size: 8.5pt; }

  table.sdk { width: 100%; border-collapse: collapse; margin-top: 3mm; font-size: 8.5pt; }
  table.sdk th { text-align: left; font-size: 7pt; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); border-bottom: 1px solid var(--line); padding: 1.6mm 2mm; }
  table.sdk td { border-bottom: 1px solid var(--line); padding: 2mm; vertical-align: top; }
  table.sdk tr { break-inside: avoid; }
  .small { font-size: 7.5pt; }
  code.wrap { white-space: normal; }

  .sandbox-list .sb { border: 1px solid var(--line); border-radius: 6px; padding: 2mm 3mm; margin: 0 0 2mm; break-inside: avoid; }
  .sb-head { display: flex; flex-wrap: wrap; gap: 1.6mm; align-items: center; }

  .diagram { margin: 5mm 0; padding: 4mm; border: 1px solid var(--line); border-radius: 8px; break-inside: avoid; }
  .diagram svg { width: 100%; height: auto; font-family: Inter, sans-serif; }

  .closing { break-before: page; }
  .closing .box { margin-top: 6mm; padding: 7mm; border-radius: 8px; background: var(--brand-soft); }
</style>
</head>
<body>
  <section class="cover">
    <img src="${logo}" alt="Protegey">
    <p class="kicker">${esc(t('hero_badge'))}</p>
    <h1>${esc(P.doc_title)}</h1>
    <p class="sub">${esc(P.doc_subtitle)}</p>
    <div class="modules">
      ${GROUPS.map((g) => {
          const k = g.id.slice(4).replace('-', '_')
          return `<div><b>${esc(t(`group_pan_${k}_title`))}</b>${esc(t(`group_pan_${k}_tagline`).split(/ — |\. /)[0])}</div>`
      }).join('')}
    </div>
    <div class="foot">
      <div><b>${esc(P.generated)} ${esc(today)}</b><br>${esc(P.catalog)} v${index.catalogVersion} · ${API_BASE_URL}/partner-api</div>
      <div style="text-align:right">${esc(P.online)}<br><b>${esc(onlineUrl.replace('https://', ''))}</b></div>
    </div>
  </section>
  ${tocHtml}
  ${chapters.join('\n')}
  <section class="closing">
    <h2>${esc(t('cta_title'))}</h2>
    <p class="lead">${esc(t('cta_subtitle'))}</p>
    <div class="box">
      <p><b>${esc(P.contact)}</b></p>
      <p>${esc(P.contact_body)}</p>
      <p><a href="https://www.protegey.com/contact">www.protegey.com/contact</a></p>
      <p class="muted">${esc(P.online)} : <a href="${onlineUrl}">${esc(onlineUrl.replace('https://', ''))}</a></p>
    </div>
  </section>
</body>
</html>`
}

// ── Chrome ───────────────────────────────────────────────────────────────────────────────────
function findChrome() {
    if (process.env.CHROME_PATH) return process.env.CHROME_PATH
    const candidates = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
        '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
    ]
    const pwCache = join(homedir(), 'Library', 'Caches', 'ms-playwright')
    if (existsSync(pwCache)) {
        for (const dir of readdirSync(pwCache).filter((d) => /^chromium-\d+$/.test(d)).sort().reverse()) {
            candidates.push(join(pwCache, dir, 'chrome-mac-arm64', 'Google Chrome for Testing.app', 'Contents', 'MacOS', 'Google Chrome for Testing'))
            candidates.push(join(pwCache, dir, 'chrome-mac', 'Chromium.app', 'Contents', 'MacOS', 'Chromium'))
            candidates.push(join(pwCache, dir, 'chrome-linux', 'chrome'))
        }
    }
    const found = candidates.find((p) => existsSync(p))
    if (!found) throw new Error('No Chrome/Chromium found — set CHROME_PATH.')
    return found
}

const chrome = findChrome()
const work = await mkdtemp(join(tmpdir(), 'protegey-api-pdf-'))
await mkdir(outDir, { recursive: true })
try {
    for (const lang of ['fr', 'en']) {
        const locale = await readJson(join(root, 'i18n', 'locales', `${lang}.json`))
        const html = render(lang, locale)
        // Hard guard: this document is public — the identity-verification vendor is never named.
        if (/face\s?tec/i.test(html)) throw new Error(`Forbidden vendor name found in the ${lang} document.`)
        const htmlPath = join(work, `api-${lang}.html`)
        await writeFile(htmlPath, html)
        const out = join(outDir, `protegey-api-documentation-${lang}.pdf`)
        execFileSync(chrome, [
            '--headless', '--disable-gpu', '--no-pdf-header-footer', '--allow-file-access-from-files',
            '--run-all-compositor-stages-before-draw', '--virtual-time-budget=15000',
            `--print-to-pdf=${out}`, pathToFileURL(htmlPath).href,
        ], { stdio: 'ignore' })
        console.log(`✓ ${out}`)
    }
} finally {
    await rm(work, { recursive: true, force: true })
}
