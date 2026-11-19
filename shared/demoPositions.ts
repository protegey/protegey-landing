// Job positions offered in the demo-request form. Shared by the form (labels come from
// i18n `waitlist.positions.<key>`, grouped under `waitlist.position_groups.<group>`) and by
// server/api/waitlist.post.ts, which only accepts these keys — the English label is what the
// sales notification shows.

export interface DemoPositionGroup {
    group: string
    positions: { key: string; en: string }[]
}

export const DEMO_POSITION_GROUPS: DemoPositionGroup[] = [
    {
        group: 'executive',
        positions: [
            { key: 'ceo', en: 'CEO / Founder' },
            { key: 'managing_director', en: 'Managing Director / General Manager' },
            { key: 'coo', en: 'COO — Chief Operating Officer' },
            { key: 'cfo', en: 'CFO — Chief Financial Officer' },
            { key: 'cto', en: 'CTO — Chief Technology Officer' },
            { key: 'cio', en: 'CIO — Chief Information Officer' },
            { key: 'cro', en: 'CRO — Chief Risk Officer' },
            { key: 'cco', en: 'CCO — Chief Compliance Officer' },
            { key: 'ciso', en: 'CISO — Chief Information Security Officer' },
            { key: 'cpo', en: 'CPO — Chief Product Officer' },
            { key: 'board_member', en: 'Board member' },
        ],
    },
    {
        group: 'risk_compliance',
        positions: [
            { key: 'head_of_compliance', en: 'Head of Compliance' },
            { key: 'mlro', en: 'MLRO / AML Officer' },
            { key: 'compliance_officer', en: 'Compliance Officer / Analyst' },
            { key: 'kyc_onboarding_manager', en: 'KYC / Onboarding Manager' },
            { key: 'risk_manager', en: 'Risk Manager' },
            { key: 'credit_risk_manager', en: 'Credit Risk Manager' },
            { key: 'internal_audit', en: 'Internal Audit' },
            { key: 'legal_counsel', en: 'Legal Counsel' },
            { key: 'regulatory_affairs', en: 'Regulatory Affairs' },
        ],
    },
    {
        group: 'fraud_security',
        positions: [
            { key: 'head_of_fraud', en: 'Head of Fraud' },
            { key: 'fraud_analyst', en: 'Fraud Analyst / Investigator' },
            { key: 'security_manager', en: 'Security Manager' },
        ],
    },
    {
        group: 'technology',
        positions: [
            { key: 'vp_engineering', en: 'VP / Head of Engineering' },
            { key: 'engineering_manager', en: 'Engineering Manager / Tech Lead' },
            { key: 'software_engineer', en: 'Software Engineer / Developer' },
            { key: 'solutions_architect', en: 'Solutions / Integration Architect' },
            { key: 'data_scientist', en: 'Data Scientist / Data Analyst' },
            { key: 'it_manager', en: 'IT Manager' },
        ],
    },
    {
        group: 'product_operations',
        positions: [
            { key: 'head_of_product', en: 'Head of Product' },
            { key: 'product_manager', en: 'Product Manager' },
            { key: 'operations_manager', en: 'Operations Manager' },
            { key: 'customer_experience', en: 'Customer Experience / Support Manager' },
            { key: 'agent_network_manager', en: 'Agent Network / Distribution Manager' },
        ],
    },
    {
        group: 'business',
        positions: [
            { key: 'head_of_payments', en: 'Head of Payments' },
            { key: 'business_development', en: 'Business Development / Partnerships' },
            { key: 'sales', en: 'Sales' },
            { key: 'marketing', en: 'Marketing' },
            { key: 'finance', en: 'Finance / Treasury' },
            { key: 'procurement', en: 'Procurement' },
        ],
    },
    {
        group: 'other',
        positions: [
            { key: 'consultant', en: 'Consultant / Advisor' },
            { key: 'investor', en: 'Investor' },
            { key: 'regulator', en: 'Regulator / Public institution' },
            { key: 'student_researcher', en: 'Student / Researcher' },
            { key: 'other', en: 'Other' },
        ],
    },
]

export const DEMO_POSITION_EN: Record<string, string> = Object.fromEntries(
    DEMO_POSITION_GROUPS.flatMap((g) => g.positions.map((p) => [p.key, p.en])),
)
