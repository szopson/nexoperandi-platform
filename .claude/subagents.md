# NexOperandi Subagents

> Focused helpers for specific tasks. Invoke with `use <subagent>` or agents call them automatically.

## voice-analyzer

**Purpose:** Extract writing style from text samples

**Input:** Text samples (tweets, articles, emails) from target person/brand

**Output:**
```yaml
voice_profile:
  tone: [professional, casual, technical, etc.]
  sentence_length: [short, medium, long, varied]
  vocabulary: [simple, technical, industry-specific]
  patterns:
    - common_phrases: ["...", "..."]
    - sentence_starters: ["...", "..."]
    - transitions: ["...", "..."]
  emoji_usage: [none, minimal, frequent]
  formatting: [plain, headers, bullets, threads]
  engagement_style: [questions, statements, CTAs]
```

**Use when:** Creating content that needs to match existing voice

---

## competitor-scan

**Purpose:** Quick competitive analysis

**Input:** Company name or URL

**Output:**
```yaml
competitor_analysis:
  company: "..."
  positioning: "..." 
  target_audience: "..."
  services:
    - name: "..."
      price_signal: "..."
  strengths:
    - "..."
  weaknesses:
    - "..."
  opportunities:
    - "How we can differentiate"
  tech_stack_hints:
    - "..."
```

**Use when:** Before proposals, positioning discussions, market research

---

## prompt-optimizer

**Purpose:** Improve AI prompts for better results

**Input:** Original prompt (for any AI model)

**Output:**
```yaml
optimized_prompt:
  original_issues:
    - "..."
  improvements:
    - "..."
  optimized_version: |
    ...
  expected_improvement: "..."
```

**Optimization techniques:**
- Add specific context
- Include examples (few-shot)
- Structure with clear sections
- Add constraints and format requirements
- Remove ambiguity

**Use when:** Prompts aren't giving good results

---

## lead-scorer

**Purpose:** Evaluate lead quality

**Input:** Lead data (company, role, source, behavior)

**Output:**
```yaml
lead_score:
  score: 0-100
  tier: hot | warm | cold
  factors:
    positive:
      - factor: "..."
        weight: +X
    negative:
      - factor: "..."
        weight: -X
  recommended_action: "..."
  talking_points:
    - "..."
```

**Scoring factors:**
- Company size and revenue (+)
- Industry fit (+)
- Decision maker role (+)
- Engagement level (+)
- Budget signals (+)
- Generic email domain (-)
- Low engagement (-)

**Use when:** Prioritizing leads, preparing for calls

---

## tender-hunter

**Purpose:** Find relevant tender opportunities

**Input:** Keywords, regions, categories

**Output:**
```yaml
tenders:
  - title: "..."
    source: "..."
    deadline: "..."
    value_estimate: "..."
    relevance_score: 0-100
    key_requirements:
      - "..."
    link: "..."
```

**Sources:**
- TED (EU tenders)
- UZP (Polish public procurement)
- Industry-specific portals

**Use when:** Tender monitoring workflow, client research

---

## storyboard-maker

**Purpose:** Create scene-by-scene video storyboard

**Input:** Video concept or script

**Output:**
```
| Scene | Duration | Visual | Audio/VO | Text Overlay |
|-------|----------|--------|----------|--------------|
| 1     | 0-3s     | ...    | ...      | ...          |
| 2     | 3-8s     | ...    | ...      | ...          |
...
```

**Includes:**
- Scene transitions
- Camera movements (zoom, pan)
- B-roll suggestions
- Music/mood notes
- Text animation hints

**Use when:** Planning video content, text-to-video workflows

---

## offer-reviewer

**Purpose:** Audit and improve service offerings

**Input:** Current service descriptions

**Output:**
```yaml
offer_review:
  strengths:
    - "..."
  gaps:
    - "Missing service area: ..."
  improvements:
    - service: "..."
      issue: "..."
      suggestion: "..."
  market_alignment:
    - "..."
  pricing_notes:
    - "..."
  recommended_changes:
    - priority: high | medium | low
      change: "..."
```

**Use when:** Quarterly reviews, before major pivots, after competitor analysis

---

## client-profiler

**Purpose:** Research client before engagement

**Input:** Company name, URL, contact info

**Output:**
```yaml
client_profile:
  company:
    name: "..."
    size: "..."
    industry: "..."
    founded: "..."
    location: "..."
  online_presence:
    website_quality: "..."
    tech_stack_hints: ["..."]
    social_activity: "..."
  potential_pain_points:
    - "..."
  decision_makers:
    - role: "..."
      name: "..." (if public)
  budget_signals:
    - "..."
  talking_points:
    - "..."
  risks:
    - "..."
```

**Use when:** Before discovery calls, proposal prep

---

## copy-improver

**Purpose:** Enhance existing copy

**Input:** Current copy text

**Output:**
```yaml
copy_review:
  issues:
    - type: clarity | engagement | cta | seo
      location: "..."
      issue: "..."
  improved_version: |
    ...
  changes_made:
    - "..."
  a_b_variants:
    - variant_a: "..."
    - variant_b: "..."
```

**Checks:**
- Clarity and readability
- Value proposition strength
- CTA effectiveness
- Brand voice alignment
- SEO keywords (if web)

**Use when:** Reviewing page copy, improving conversions

---

## code-reviewer

**Purpose:** Review code for quality and patterns

**Input:** Code file or snippet

**Output:**
```yaml
code_review:
  overall: good | needs_work | major_issues
  issues:
    - severity: error | warning | suggestion
      line: X
      issue: "..."
      fix: "..."
  patterns:
    followed: ["..."]
    violated: ["..."]
  suggestions:
    - "..."
```

**Checks:**
- TypeScript strict compliance
- React best practices
- Tailwind patterns
- Accessibility
- Performance considerations

**Use when:** Before committing, PR reviews
